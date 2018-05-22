'use strict'

const AWS = require('aws-sdk')
const fs = require('fs')
const crypto = require('crypto')
const s3 = new AWS.S3()
// const path = require('path')
// const mime = require('mime-types')

const awsUpload = (file) => {
  console.log(file)
  const filepath = file.path

  const filename = file.originalname
  // const fileStats = fs.statSync(filepath)
  // const fileSizeInMegabytes = fileStats.size / 1000000.0
  // const fileType = mime.lookup(filepath)
  const stream = fs.createReadStream(filepath)
  const filesplit = filename.split('.')

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

  const addcrypto = (crypt) => {
    const filewithcrypt = [filesplit[0], '-' + crypt, '.' + filesplit[1]].join('')
    return filewithcrypt
  }

  const buildParams = (crypt) => {
    const params = {
      ACL: 'public-read',
      Body: stream,
      Bucket: 'file-bucket-team',
      ContentType: file.mimetype,
      Key: crypt
    }
    console.log('params in buildparams: ', params)
    return params
  }

  const promiseS3 = (params) => {
    return new Promise((resolve, reject) => {
      console.log('params in promises3', params)
      s3.upload(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          console.log(data) // fails
          // data.fileSizeInMegabytes = 10
          resolve(data)
        }
      })
    })
  }

  return promiseRandomBytes()
    .then((data) => {
      console.log('data before addcrypto is', data)
      return data
    })
    .then(addcrypto)
    .then((data) => {
      console.log('data after addcrypto is', data)
      return data
    })
    .then(buildParams)
    .then(promiseS3)
}

module.exports = awsUpload
