'use strict'

// require .env's content
require('dotenv').config()

const awsUpload = require('../lib/s3upload')

console.log(awsUpload)
// const AWS = require('aws-sdk')
// const fs = require('fs')
// const crypto = require('crypto')
// const s3 = new AWS.S3()
// const path = require('path')
// const mime = require('mime-types')
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

// const promiseRandomBytes = () => {
//   return new Promise((resolve, reject) => {
//     crypto.randomBytes(4, (err, buf) => {
//       if (err) {
//         reject(err)
//       } else {
//         resolve(buf.toString('hex'))
//       }
//     })
//   })
// }
//
// const addcrypto = (crypt) => {
//   const filewithcrypt = [filesplit[0], '-' + crypt, '.' + filesplit[1]].join('')
//   return filewithcrypt
// }
//
// const buildParams = (crypt) => {
//   const params = {
//     ACL: 'public-read',
//     Body: stream,
//     Bucket: 'file-bucket-team',
//     ContentType: fileType,
//     Key: crypt
//   }
//   return params
// }
//
// const promiseS3 = (params) => {
//   return new Promise((resolve, reject) => {
//     s3.upload(params, (err, data) => {
//       if (err) {
//         reject(err)
//       }
//       console.log(data)
//       resolve(data)
//     })
//   })
// }

// const promiseAddCrypto = () => {
//   return new Promise((resolve, reject))
// }

const file = process.argv[2]
const title = process.argv[3]
// const filename = path.basename(file)
// const fileStats = fs.statSync(file)
// const fileSizeInMegabytes = fileStats.size / 1000000.0
// const fileType = mime.lookup(file)
// const stream = fs.createReadStream(file)

// const filesplit = filename.split('.')

mongoose.connection.once('open', () => {
  // promiseRandomBytes()
  //   .then(addcrypto)
  //   .then(buildParams)
  //   .then(promiseS3)
  awsUpload(file, title) // fires and passes data
    .then((s3Response) => {
      console.log(s3Response)
      return FileUpload.create({
        owner: '5af45560a3fcd30e62ea0ca0', // user ID
        title: title, // From input
        url: s3Response.Location, // working
        size: s3Response.fileSizeInMegabytes
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
