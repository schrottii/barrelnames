var Names = names.split("\n");
var output = "";

var putout = document.getElementById("output");

// Remove the numbers (multis have to be removed manually)
for (n = 0; n < Names.length; n++){
    Names[n] = Names[n].replace(/^[^_]*: /, "")
}

// Name 1
function generateFrontName() {
    let name = Names[Math.floor(Math.random() * Names.length)];
    let splittedName = name.split(" ");
    name = splittedName[0]
    for (i = 1; i < splittedName.length; i++) {
        if (Math.random() > 0.25) name = name + " " + splittedName[i];
    }
    return name;
}

// Name 2
function generateBackName() {
    let name = Names[Math.floor(Math.random() * Names.length)];
    let splittedName = name.split(" ");
    name = splittedName[0]
    for (i = splittedName.length - 1; i > 0; i--) {
        if (Math.random() > 0.25) name = name + " " + splittedName[i];
    }
    return name;
}

var name1 = generateFrontName();
var name2 = generateBackName();

output = name1 + " " + name2;

putout.innerHTML = output;