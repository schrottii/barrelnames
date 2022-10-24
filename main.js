var names1 = names.split("\n");
var output = "";

var putout = document.getElementById("output");

for (n = 0; n < names1.length; n++){
    names1[n] = names1[n].replace(/^[^_]*: /, "")
}

output = names1[Math.floor(Math.random() * names1.length)] + " " + names1[Math.floor(Math.random() * names1.length)];

putout.innerHTML = output;