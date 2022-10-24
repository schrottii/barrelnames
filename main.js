var names1 = names.split("\n");
var output = "";

var putout = document.getElementById("output");

for (n in names1){
    names1[n].replace(/^[^_]*: /, "")
    output = output + names1[n];
}

putout.innerHTML = output;