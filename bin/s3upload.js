'use strict'

// require .env's content
require('dotenv').config()

const AWS = require('aws-sdk')
const fs = require('fs')
const crypto = require('crypto')
const s3 = new AWS.S3()
const path = require('path')
const mime = require('mime-types')
const mongoose = require('mongoose')
const FileUpload = require('../app/models/fileupload')
// assign native promises
mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost/filebucket-api-development', {
  useMongoClient: true
})

const done = () => {
  mongoose.connection.close()
}

const promiseRandomBytes = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(4, (err, buf) => {
      if (err) {
        reject(err)
      } else {
        resolve(buf.toString('hex'))
      }
    })
  })
}

const promiseS3 = (params) => {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err)
      }
      console.log(data)
      resolve(data)
    })
  })
}

const file = process.argv[2]
const title = process.argv[3]
const filename = path.basename(file)
const fileStats = fs.statSync(file)
const fileSizeInMegabytes = fileStats.size / 1000000.0
const fileType = mime.lookup(file)
const stream = fs.createReadStream(file)

const filesplit = filename.split('.')

mongoose.connection.once('open', () => {
  promiseRandomBytes()
    .then((crypt) => {
      const filewithcrypt = [filesplit[0], '-' + crypt, '.' + filesplit[1]].join('')
      return filewithcrypt
    })
    .then((crypt) => {
      const params = {
        ACL: 'public-read',
        Body: stream,
        Bucket: 'file-bucket-team',
        ContentType: fileType,
        Key: crypt
      }
      return params
      // s3.upload(params, function (err, data) {
      //   console.log(err, data)
      //   let s3Response = data
      //   return (s3Response)
      // })
    })
    .then(promiseS3)
    .then((s3Response) => {
      // console.log(s3Response)
      return FileUpload.create({
        owner: '5af45560a3fcd30e62ea0ca0', // user ID
        title: title, // From input
        url: s3Response.Location, // working
        size: fileSizeInMegabytes
      })
    })
    .then((createdata) => {
      console.log(createdata)
    })
    .catch(console.error)
    .then(done)
})

console.log('s3 time!', file)

// const params = {
//   // ACL: 'public-read',
//   Body: 'Body',
//   Bucket: 'file-bucket-team',
//   Key: 'key'
// }
