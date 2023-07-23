/**
 * Desc:    User Crud Operation
 * - GET    '/users' - Get All users
 * - POST   '/users' - Create New User
 * - GET    '/users/:userID' - Get Single User
 * - PUT    '/users/:userID' - Update Existing User
 * - DELETE '/users/:userID' - Delete Existing User
 */

const http = require('http')

const UserDatabase = []

const server = http.createServer((req, res) => {
  const { url, method } = req

  //GET    '/users' - Get All users
  if (url === '/users' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        success: true,
        message: 'User Fetch  Success!',
        data: UserDatabase,
      })
    )
  }
  //POST   '/users' - Create New User
  if (url === '/users' && method === 'POST') {
    // Store Chunk of data
    let body = ''

    // Receive Data as Chunk
    req.on('data', (chunk) => (body += chunk))

    //End Data receive
    req.on('end', () => {
      body = JSON.parse(body)
      UserDatabase.push(body)

      res.writeHead(201, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          success: true,
          message: 'User Created Successfully!',
          data: body,
        })
      )
    })
  }

  //GET    '/users/:userID' - Get Single User
  if (url.startsWith('/users/') && method === 'GET') {
    let userID = Number(req.url.split('/').pop())
    let userIndex = UserDatabase.findIndex((value) => value?.id === userID)

    if (userIndex !== -1) {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          success: true,
          message: 'Single User Find Success!',
          data: UserDatabase[userIndex],
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

  //PUT    '/users/:userID' - Update Existing User
  if (url.startsWith('/users/') && method === 'PUT') {
    let userID = Number(req.url.split('/').pop())
    let userIndex = UserDatabase.findIndex((value) => value?.id === userID)

    if (userIndex !== -1) {
      // Store Chunk of data
      let body = ''

      // Receive Data as Chunk
      req.on('data', (chunk) => (body += chunk))

      //End Data receive
      req.on('end', () => {
        body = JSON.parse(body)
        UserDatabase[userIndex] = { ...UserDatabase[userIndex], ...body }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            success: true,
            message: 'User Update Successfully!',
            data: UserDatabase[userIndex],
          })
        )
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
  
  //DELETE '/users/:userID' - Delete Existing User
  if (url.startsWith('/users/') && method === 'DELETE') {
    let userID = Number(req.url.split('/').pop())
    let userIndex = UserDatabase.findIndex((value) => value?.id === userID)

    if (userIndex !== -1) {
      let deletedData = UserDatabase.splice(userIndex, 1)[0]

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          success: true,
          message: 'User Delete Success!',
          data: deletedData,
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

server.listen(5000, () => {
  console.log('Server is listening on 5000 port')
})
