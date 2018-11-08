'use strict';

require('dotenv').config();

var connect = require('connect');
var serveStatic = require('serve-static');

connect().use(serveStatic("your_files")).listen(process.env.PORT, function(){
    console.log("Server running on " + process.env.PORT);
});
