var Names = names.split("\n");
var output = "";

var putout = document.getElementById("output");

// Remove the numbers (multis have to be removed manually)
for (n = 0; n < Names.length; n++){
    Names[n] = Names[n].replace(/^[^_]*: /, "")
}

function pickAName() {
    return Names[Math.floor(Math.random() * Names.length)];
}

// Name 1
function generateFrontName() {
    let name = pickAName();
    let splittedName = name.split(" ");
    name = splittedName[0]
    for (i = 1; i < splittedName.length; i++) {
        if (Math.random() > 0.25) name = name + " " + splittedName[i];
        else return name;
    }
    return name;
}

// Name 2
function generateBackName() {
    let name = pickAName();
    let splittedName = name.split(" ");
    name = splittedName[splittedName.length - 1]
    for (i = splittedName.length - 1; i > 1; i--) {
        if (Math.random() > 0.25) name = splittedName[i] + " " + name;
        else return name;
    }
    return name;
}

function generateCombination() {
    let name1 = generateFrontName();
    let name2 = generateBackName();

    output = name1 + " " + name2;
}

function updateUI() {
    putout.innerHTML = output;
}