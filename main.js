//
// This work is copyrighted. Copying, cloning or stealing is prohibited.
//

const notes = 'New in Update 1.1:<br>- Added patch notes<br>- Added "View" and "Remove" buttons for favorites<br>- Removed "Remove latest favorite" button<br>- Added "Go back" button (to load the previous combination)<br>- Reduced space between favorites<br>- Fixed barrel 343 not loading';

var Names = names_en.split("\n");
var output = "";

var putout = document.getElementById("output");
var barrel1 = document.getElementById("barrel1");
var barrel2 = document.getElementById("barrel2");
var favoritesList = document.getElementById("favoritesList");
var pic1 = document.getElementById("pic1");
var pic2 = document.getElementById("pic2");
var patchNotesText = document.getElementById("patchNotesText");
var notesButton = document.getElementById("notesButton");

var name1 = "";
var name2 = "";

var fullname1 = "";
var fullname2 = "";

var id1 = 0;
var id2 = 0;

var favoritesPage = 0;

var showPatchNotes = false;

var favorites = [];
var prev = [];
var prefull = [0, 0];

// Remove the numbers (multis have to be removed manually)
for (n = 0; n < Names.length; n++){
    Names[n] = Names[n].replace(/^[^_]*: /, "")
}

function pickAName(number=0) {
    let num = Math.floor(Math.random() * (Names.length - 1)) + 1;
    if (number == 1) id1 = num;
    if (number == 2) id2 = num;
    return Names[num];
}

// Name 1
function generateFrontName() {
    let name = pickAName(1);
    prefull[0] = fullname1;
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
    prefull[1] = fullname2;
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
    prev = [name1, name2, output];

    name1 = generateFrontName();
    name2 = generateBackName();

    output = name1 + " " + name2;
}

function goBack() {
    name1 = prev[0];
    name2 = prev[1];
    output = prev[2];

    fullname1 = prefull[0];
    fullname2 = prefull[1];

    for (b = 0; b < Names.length; b++) {
        if (Names[b] == prefull[0]) id1 = b;
        if (Names[b] == prefull[1]) id2 = b;
    }
    updateUI();
}

function loadSave() {
    let temp = JSON.parse(localStorage.getItem("NameMixer"));

    if (temp != null) {
        if (typeof (temp[0]) != "object") {
            for (t in temp) {
                let thisName = temp[t].split(" ");
                let b1;
                let b2;
                for (b = 0; b < Names.length; b++) {
                    let splittedName = Names[b].split(" ");
                    if (splittedName[0] == thisName[0]) b1 = b;

                    splittedName = Names[b].split(" ");
                    if (splittedName[splittedName.length - 1] == thisName[thisName.length - 1]) b2 = b;
                }
                temp[t] = [temp[t], b1, b2];
            }
        }
        favorites = temp;
        }
}

function saveSave() {
    let strn = JSON.stringify(favorites);
    localStorage.setItem("NameMixer", strn);
}

function addFavorite() {
    if(output != "") favorites.push([output, id1, id2]);
}

function removeFavorite(f) {
    favorites.splice(f, 1);
    updateUI();
}

function viewFavorite(f) {
    let fav = favorites[f];

    prev = [name1, name2, output];
    prefull = [Names[id1], Names[id2]];

    output = fav[0];
    id1 = fav[1];
    id2 = fav[2];

    fullname1 = Names[id1];
    fullname2 = Names[id2];

    updateUI();
}

function patchNotes() {
    if (showPatchNotes) {
        showPatchNotes = false;
        patchNotesText.innerHTML = "";
        notesButton.innerHTML = "Show patch notes";
    }
    else {
        showPatchNotes = true;
        patchNotesText.innerHTML = '<br /> <div class="resultStyle" style="font-size: 24px; text-align: left;"> ' + notes + ' </div>';
        notesButton.innerHTML = "Hide";
    }
}

function changePage(p) {
    if (p == 0) favoritesPage = 0;
    if (p == 999) favoritesPage = Math.floor((favorites.length - 1) / 25);
    else favoritesPage = Math.min(Math.max(0, favoritesPage + p), Math.floor((favorites.length - 1) / 25));
    updateFavorites();
}

function updateFavorites() {
    favoritesList.innerHTML = "<ul>";
    for (f = 0 + (favoritesPage * 25); f < 25 + (favoritesPage * 25); f++) {
        if (f > favorites.length - 1) continue;
        favoritesList.innerHTML = favoritesList.innerHTML + "<br /><ul> #" + (f + 1) + "  " + favorites[f][0] + ' <button onclick="viewFavorite(' + f + '); " class="buttonStyle" style="font-size: 24px">View</button>                   <button onclick="removeFavorite(' + f + '); " class="buttonStyle" style="font-size: 24px">Remove</button></ul>';
    }
    favoritesList.innerHTML = favoritesList.innerHTML + "</ul>";
}

function updateUI() {
    putout.innerHTML = output;

    barrel1.innerHTML = fullname1 + "  -->";
    barrel2.innerHTML = "<--  " + fullname2;

    updateFavorites();

    pic1.src = "barrels/" + (id1 > 177 ? "B" : "b") + "arrel_" + Math.max(1, id1) + ".png";
    pic2.src = "barrels/" + (id2 > 177 ? "B" : "b") + "arrel_" + Math.max(1, id2) + ".png";
}

loadSave();
updateUI();
