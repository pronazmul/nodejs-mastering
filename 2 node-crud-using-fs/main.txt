const http = require('http')
const path = require('path')
const fs = require('fs')

const filePath = path.join(__dirname, 'database.json')

// File System Operations
function readFile(callback) {
  fs.readFile(filePath, 'utf-8', (error, content) => {
    if (error) {
      callback(error, null)
    } else {
      let data = JSON.parse(content)
      callback(null, data)
    }
  })
}

function writeFile(data, callback) {
  fs.writeFile(filePath, data, (error) => {
    if (error) {
      callback(error)
    } else {
      callback(null)
    }
  })
}

// Handle Request And Response
const server = http.createServer((req, res) => {
  const { url, method } = req

  //GET    '/users' - Get All users
  if (url === '/users' && method === 'GET') {
    readFile((error, data) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            message: 'Failed to Fetch User Data!',
            data: null,
          })
        )
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: true,
            message: 'Fetch User Success!',
            data: data,
          })
        )
      }
    })
  }
  //POST   '/users' - Create New User
  if (url === '/users' && method === 'POST') {
    readFile((error, data) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            message: 'Internal Server Error!',
            data: null,
          })
        )
      } else {
        // Store Chunk of data
        let body = ''

        // Receive Data as Chunk
        req.on('data', (chunk) => (body += chunk))

        //End Data receive
        req.on('end', () => {
          body = JSON.parse(body)
          data.push(body)
          writeFile(JSON.stringify(data), (error) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(
                JSON.stringify({
                  success: false,
                  message: 'Internal Server Error!',
                  data: null,
                })
              )
            } else {
              res.writeHead(201, { 'Content-Type': 'application/json' })
              res.end(
                JSON.stringify({
                  success: true,
                  message: 'User Created Successfully!',
                  data: body,
                })
              )
            }
          })
        })
      }
    })
  }

  //GET    '/users/:userID' - Get Single User
  if (url.startsWith('/users/') && method === 'GET') {
    let userID = Number(req.url.split('/').pop())

    readFile((error, data) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            message: 'Internal Server Error!',
            data: null,
          })
        )
      } else {
        let userIndex = data.findIndex((value) => value?.id === userID)
        if (userIndex !== -1) {
          res.writeHead(200, { 'Content-Type': 'application/json' })
          res.end(
            JSON.stringify({
              success: true,
              message: 'Single User Find Success!',
              data: data[userIndex],
            })
          )
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' })
          res.end(
            JSON.stringify({
              success: false,
              message: 'User Not Found!',
              data: null,
            })
          )
        }
      }
    })
  }

  //PUT    '/users/:userID' - Update Existing User
  if (url.startsWith('/users/') && method === 'PUT') {
    let userID = Number(req.url.split('/').pop())
    readFile((error, data) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            message: 'Internal Server Error!',
            data: null,
          })
        )
      } else {
        let userIndex = data.findIndex((value) => value?.id === userID)
        if (userIndex !== -1) {
          // Store Chunk of data
          let body = ''

          // Receive Data as Chunk
          req.on('data', (chunk) => (body += chunk))

          //End Data receive
          req.on('end', () => {
            body = JSON.parse(body)
            data[userIndex] = { ...data[userIndex], ...body }

            writeFile(JSON.stringify(data), (error) => {
              if (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(
                  JSON.stringify({
                    success: false,
                    message: 'Internal Server Error!',
                    data: null,
                  })
                )
              } else {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(
                  JSON.stringify({
                    success: true,
                    message: 'User Update Successfully!',
                    data: data[userIndex],
                  })
                )
              }
            })
          })
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' })
          res.end(
            JSON.stringify({
              success: false,
              message: 'User Not Found!',
              data: null,
            })
          )
        }
      }
    })
  }

  //DELETE '/users/:userID' - Delete Existing User
  if (url.startsWith('/users/') && method === 'DELETE') {
    let userID = Number(req.url.split('/').pop())
    readFile((error, data) => {
      if (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: false,
            message: 'Internal Server Error!',
            data: null,
          })
        )
      } else {
        let userIndex = data.findIndex((value) => value?.id === userID)

        if (userIndex !== -1) {
          let deletedData = data.splice(userIndex, 1)[0]

          writeFile(JSON.stringify(data), (error) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(
                JSON.stringify({
                  success: false,
                  message: 'Internal Server Error!',
                  data: null,
                })
              )
            } else {
              res.writeHead(200, { 'Content-Type': 'application/json' })
              res.end(
                JSON.stringify({
                  success: true,
                  message: 'User Delete Success!',
                  data: deletedData,
                })
              )
            }
          })
        } else {
          res.writeHead(404, { 'Content-Type': 'application/json' })
          res.end(
            JSON.stringify({
              success: false,
              message: 'User Not Found!',
              data: null,
            })
          )
        }
      }
    })
  }
})

// Run the server
server.listen(5000, () => {
  console.log('Server is listening on 5000 port')
})
