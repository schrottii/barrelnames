const { readFileSync, promises: fsPromises } = require('fs');

var names1 = names.split("\n");
var output = "";

for (n in names1){
    names1[n].replace(/^[^_]*: /, "")
    output = output + names1[n];
}

output.innerHTML = output;