//
// This work is copyrighted. Copying, cloning or stealing is prohibited.
//

var Names = names.split("\n");
var output = "";

var putout = document.getElementById("output");
var barrel1 = document.getElementById("barrel1");
var barrel2 = document.getElementById("barrel2");
var favoritesList = document.getElementById("favoritesList");
var pic1 = document.getElementById("pic1");

var name1 = "";
var name2 = "";

var favorites = [];

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
    name = splittedName[0];
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
    name = splittedName[splittedName.length - 1];
    for (i = splittedName.length - 2; i > -1; i--) {
        if (Math.random() > 0.25) name = splittedName[i] + " " + name;
        else return name;
    }
    return name;
}

function generateCombination() {
    name1 = generateFrontName();
    name2 = generateBackName();

    output = name1 + " " + name2;
}

function loadSave() {
    favorites = JSON.parse(localStorage.getItem("NameMixer"));
}

function saveSave() {
    let strn = JSON.stringify(favorites);
    localStorage.setItem("NameMixer", strn);
}

function addFavorite() {
    favorites.push(output);
}

function removeFavorite() {
    favorites.pop();
}

function updateUI() {
    putout.innerHTML = output;

    barrel1.innerHTML = name1 + "  -->";
    barrel2.innerHTML = "<--  " + name2;

    favoritesList.innerHTML = "<ul>";
    for (f in favorites) {
        favoritesList.innerHTML = favoritesList.innerHTML + "<br /><ul>" + favorites[f] + "</ul>";
    }
    favoritesList.innerHTML = favoritesList.innerHTML + "</ul>";


    pic1.src = "barrels\barrel_5.png";
}

loadSave();
updateUI();