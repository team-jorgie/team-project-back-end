'use strict'

// require .env's content
require('dotenv').config()

const AWS = require('aws-sdk')
const fs = require('fs')
const s3 = new AWS.S3()

const file = process.argv[2]

console.log('s3 time!', file)

const params = {
  // ACL: 'public-read',
  Body: 'Body',
  Bucket: 'file-bucket-team',
  Key: 'key'
}

s3.upload(params, function (err, data) {
  console.log(err, data)
})
