var Names = names.split("\n");
var output = "";

var putout = document.getElementById("output");

// Remove the numbers (multis have to be removed manually)
for (n = 0; n < Names.length; n++){
    Names[n] = Names[n].replace(/^[^_]*: /, "")
}

// Name 1
var name1 = Names[Math.floor(Math.random() * Names.length)];
var splittedName = name1.split(" ");
name1 = splittedName[0]
for (i = 1; i < splittedName.length; i++) {
    if (Math.random() > 0.25) name1 = name1 + splittedName[i];
}

// Name 1
var name2 = Names[Math.floor(Math.random() * Names.length)];
var splittedName = name2.split(" ");
name2 = splittedName[0]
for (i = splittedName.length - 1; i > -1; i--) {
    if (Math.random() > 0.25) name2 = name2 + splittedName[i];
}

output = name1 + " " + name2;

putout.innerHTML = output;