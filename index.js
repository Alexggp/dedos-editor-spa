const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});




app.use('/',express.static(__dirname + '/build/'));

app.listen(PORT, () => {
    console.log(`Server starterd at port ${PORT}`);
});

module.exports = {
    app
};