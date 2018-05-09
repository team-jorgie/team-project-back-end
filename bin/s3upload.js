'use strict'

// require .env's content
require('dotenv').config()

const AWS = require('aws-sdk')
const fs = require('fs')
const crypto = require('crypto')
const s3 = new AWS.S3()
const path = require('path')
const mime = require('mime-types')

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

const file = process.argv[2]
const filename = path.basename(file)
const fileType = mime.lookup(file)
const stream = fs.createReadStream(file)

const filesplit = filename.split('.')

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
    s3.upload(params, function (err, data) {
      console.log(err, data)
    })
  })

console.log('s3 time!', file)

// const params = {
//   // ACL: 'public-read',
//   Body: 'Body',
//   Bucket: 'file-bucket-team',
//   Key: 'key'
// }
