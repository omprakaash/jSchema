const generateSchema = require('generate-schema');
const ejs        = require('easy-json-schema')
const fs             = require('fs');

// Reading targer json file
fs.readFile(process.argv[2], (err, data)=>{
    if (err) {
        console.log(err)
    }

    console.log(data)

    var jsonData = JSON.parse(data)
    var schema = generateSchema.json("JSON-Schema", jsonData)
    var schema_1 = ejs(jsonData)
    console.log(schema)
    console.log(JSON.stringify(schema_1,null, 2))

})
