'use strict'

const AWS = require('aws-sdk')
const s3 = new AWS.S3()
// const path = require('path')
// const mime = require('mime-types')

const awsDelete = (fileKey) => {
  console.log('FILEKEY IN AWSDELETE', fileKey)
  const buildParams = () => {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: 'file-bucket-team',
        Key: fileKey
      }
      console.log('params in buildparams-delete: ', params)
      resolve(params)
    })
  }

  const promiseS3 = () => {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: 'file-bucket-team',
        Key: fileKey
      }
      console.log('params in promises3', params)
      s3.deleteObject(params, (err, data) => {
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

  return promiseS3()
}

module.exports = awsDelete
