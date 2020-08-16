var mongoose = require('mongoose');
mongoose.connect('mongodb://172.19.0.3:27019/restaurant');
module.exports = mongoose;

