const mongoose = require('mongoose')

const fileUploadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tag: [{ type: String }]
}, {
  timestamps: true
})

module.exports = mongoose.model('FileUpload', fileUploadSchema)
