const generateSchema = require('generate-schema');
const ejs            = require('easy-json-schema')
const fs             = require('fs');

// Reading targer json file
fs.readFile(process.argv[2], (err, data)=>{
    if (err) {
        console.log(err)
    }

    console.log(data)

    var jsonData = JSON.parse(data)
    schema = {}
    Parse(jsonData, schema)

    console.log(JSON.stringify(schema))

})

function Parse(data, schema){
    if (Array.isArray(data)){
        schema['type'] = "Array" // Root Level Type = Array
        ParseArray(data, schema)
    }
    else{
        ParseObject(data, schema)
    }
}

function ParseObject(object, schema){
    for (var key in object){

        // Literal Value
        if (typeof object[key] != 'object'){
            console.log(key, object[key])
            schema[key] = typeof object[key]
        }
        else if (typeof object[key] == 'object'){  // If nested Object or Array
            
            // Nested Object
            if ( ! Array.isArray(object[key])){
                nestedSchema = {}
                schema[key] = nestedSchema
                ParseObject(object[key], nestedSchema)
            }
            // Array
            else{
                console.log("Correct")
                list = ['array']
                schema[key] = list
                console.log(object[key])
                ParseArray(object[key], list )
            }

        }       

    }

}

function ParseArray(array, list){
    console.log(array)
    for (var i = 0; i < array.length; i++){
        var item = array[i]
        if (typeof item != 'object'){ // Literal Value
            console.log(item)
            list[1] = typeof item
        }
        else if (Array.isArray(item)){ // Nested Array
            console.log('Wrong')
            nestedList = ['array']
            list[1] = nestedList
            ParseArray(item, nestedList)
        }
        else{   // Object type
            console.log('Dict in array')
            nestedSchema = {}
            list.push(nestedSchema)
            ParseObject(item, nestedSchema)
        }
    }

}

