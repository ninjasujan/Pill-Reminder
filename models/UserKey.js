const mongoose = require('mongoose');

const UserKey = new mongoose.Schema({
  key: {
    type: String,
  },
});

module.exports = mongoose.model('userkeys', UserKey);
