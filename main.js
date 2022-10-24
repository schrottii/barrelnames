var names1 = names.split("\n");
var output = "";

var putout = document.getElementById("output");

for (n = 0; n < names1.length; n++){
    names1[n] = names1[n].replace(/^[^_]*: /, "")
    output = output + names1[n];
}

putout.innerHTML = output;