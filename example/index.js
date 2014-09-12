var fs = require('fs');
var parseEngineData = require('../lib/parseEngineData');

fs.readFile('./enginedata', function(err, res){
    var r = parseEngineData(res);
    console.log(r);
})