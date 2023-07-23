const path = require('path')
const fs = require('fs')

const filePath = path.join(__dirname, 'database.json')

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
