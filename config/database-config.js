const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

const db_url = 'mongodb://127.0.0.1:27017/TechGeekNextDB';

const connection = () => {
mongoose.connect(db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>console.log('Database connected!'))
.catch(e=>console.log(e));

};

module.exports = connection; 