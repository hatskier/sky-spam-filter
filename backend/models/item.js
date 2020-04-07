const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  type: {
    type: 'string',
    default: 'Spam',
    enum: ['Spam'], // We can add more options later
  },
  message: 'string',
  state: {
    type: 'string',
    default: 'Open',
    enum: ['Open', 'Blocked', 'Resolved'],
  },
});

module.exports = mongoose.model('Item', schema);
