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
var pic2 = document.getElementById("pic2");

var name1 = "";
var name2 = "";

var fullname1 = "";
var fullname2 = "";

var id1 = 0;
var id2 = 0;

var favorites = [];

// Remove the numbers (multis have to be removed manually)
for (n = 0; n < Names.length; n++){
    Names[n] = Names[n].replace(/^[^_]*: /, "")
}

function pickAName(number=0) {
    let num = Math.floor(Math.random() * Names.length);
    if (number == 1) id1 = num;
    if (number == 2) id2 = num;
    return Names[num];
}

// Name 1
function generateFrontName() {
    let name = pickAName(1);
    fullname1 = name;
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
    let name = pickAName(2);
    fullname2 = name;
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
    if (favorites == null) favorites = [];
}

function saveSave() {
    let strn = JSON.stringify(favorites);
    localStorage.setItem("NameMixer", strn);
}

function addFavorite() {
    if(output != "") favorites.push(output);
}

function removeFavorite() {
    favorites.pop();
}

function updateUI() {
    putout.innerHTML = output;

    barrel1.innerHTML = fullname1 + "  -->";
    barrel2.innerHTML = "<--  " + fullname2;

    favoritesList.innerHTML = "<ul>";
    for (f in favorites) {
        favoritesList.innerHTML = favoritesList.innerHTML + "<br /><ul>" + favorites[f] + "</ul>";
    }
    favoritesList.innerHTML = favoritesList.innerHTML + "</ul>";


    pic1.src = "/barrels/" + (id1 > 177 ? "B" : "b") + "arrel_" + id1 + ".png";
    pic2.src = "/barrels/" + (id2 > 177 ? "B" : "b") + "arrel_" + id2 + ".png";
}

loadSave();
updateUI();
