//
// This work is copyrighted. Copying, cloning or stealing is prohibited.
//

const notes = 'New in Update 1.3:<br>- Added mixed images!<br>- Turned on by default, can be turned off in the settings<br>- Added four mix types: Left / Right, Top / Bottom, Fusion and Random!<br>- Mix type can be changed in the settings<br>- On PC, the mixed images can be saved with right click<br>- The selected language is now kept after closing the name mixer';

var canvas = document.getElementById("canvie");
var ctx = canvas.getContext("2d");

const SX = 256;
const SY = 256;

var Names;
var output = "";

var putout = document.getElementById("output");
var barrel1 = document.getElementById("barrel1");
var barrel2 = document.getElementById("barrel2");
var favoritesList = document.getElementById("favoritesList");
var pic1 = document.getElementById("pic1");
var pic2 = document.getElementById("pic2");
var patchNotesText = document.getElementById("patchNotesText");
var notesButton = document.getElementById("notesButton");
var favoritesCurrentPage = document.getElementById("favoritesCurrentPage");
var currentLanguage = document.getElementById("currentLanguage");

var setb1 = document.getElementById("setb1");
var setb2 = document.getElementById("setb2");

var name1 = "";
var name2 = "";

var fullname1 = "";
var fullname2 = "";

var id1 = 0;
var id2 = 0;

var favoritesPage = 0;

var showPatchNotes = false;

var favorites = [];

var settings = {
    lang: "en",
    miximg: true,
    mixtype: 0,
}

var images = [];
var prev = [];
var prefull = [0, 0];

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
        let loadFavs;

        if (temp[0] == undefined) {
            loadFavs = temp.fav;
            for (s in temp.set) {
                settings[s] = temp.set[s];
            }
        }
        else {
            loadFavs = temp;
        }
        if (typeof (loadFavs[0]) != "object") {
            for (t in loadFavs) {
                let thisName = loadFavs[t].split(" ");
                let b1;
                let b2;
                for (b = 0; b < Names.length; b++) {
                    let splittedName = Names[b].split(" ");
                    if (splittedName[0] == thisName[0]) b1 = b;

                    splittedName = Names[b].split(" ");
                    if (splittedName[splittedName.length - 1] == thisName[thisName.length - 1]) b2 = b;
                }
                loadFavs[t] = [loadFavs[t], b1, b2];
            }
        }
        favorites = loadFavs;
        }
}

function saveSave() {
    let strn = JSON.stringify({
        "fav": favorites,
        "set": settings
    });
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

function changeLanguage(langTo) {
    settings.lang = langTo;
    preloadNames();
    saveSave();
}

function preloadNames() {
    switch (settings.lang) {
        case "en":
            Names = names_en.split("\n");
            currentLanguage.innerHTML = "Current Language: English";
            break;
        case "uk":
            Names = names_uk.split("\n");
            currentLanguage.innerHTML = "Current Language: Ukrainian";
            break
        case "it":
            Names = names_it.split("\n");
            currentLanguage.innerHTML = "Current Language: Italian";
            break;
        case "ru":
            Names = names_ru.split("\n");
            currentLanguage.innerHTML = "Current Language: Russian";
            break
    }

    // Remove the numbers (multis have to be removed manually)
    for (n = 0; n < Names.length; n++) {
        Names[n] = Names[n].replace(/^[^_]*: /, "")
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
        favoritesList.innerHTML = favoritesList.innerHTML + "<br /><ul> #" + (f + 1) + "  " + favorites[f][0] + ' <button onclick="viewFavorite(' + f + '); " class="buttonStyle" style="font-size: 16px">View</button>                   <button onclick="removeFavorite(' + f + '); updateFavorites();" class="buttonStyle" style="font-size: 24px">Remove</button></ul>';
    }
    favoritesList.innerHTML = favoritesList.innerHTML + "</ul>";
    favoritesCurrentPage.innerHTML = "(Page " + (favoritesPage + 1) + "/" + (Math.floor((favorites.length - 1) / 25) + 1) + ")";
}

function toggleCanvas() {
    if (settings.miximg == true) {
        settings.miximg = false;
        setb1.innerHTML = "Mixed images: OFF";
    }
    else {
        settings.miximg = true;
        setb1.innerHTML = "Mixed images: ON";
    }
    saveSave();
}

function toggleMixType() {
    switch (settings.mixtype) {
        case 0:
            settings.mixtype = 1;
            setb2.innerHTML = "Mix Type: Top / Bottom";
            break;
        case 1:
            settings.mixtype = 2;
            setb2.innerHTML = "Mix Type: Fusion";
            break;
        case 2:
            settings.mixtype = 3;
            setb2.innerHTML = "Mix Type: Random";
            break;
        case 3:
            settings.mixtype = 0;
            setb2.innerHTML = "Mix Type: Left / Right";
            break;
    }
    saveSave();
}

function getFile(num) {
    return "barrels/" + (num > 177 ? "B" : "b") + "arrel_" + Math.max(1, num) + ".png";
}

// Canvas stuff
for (i = 1; i < 595; i++) {
    images["barrel" + i] = getFile(i);
}

let loadedImages = 0;

for (let image in images) {
    let img = new Image();
    img.src = images[image];
    images[image] = img;
    img.onload = () => {
        loadedImages += 1;
        putout.innerHTML = "Loading images, please wait... " + loadedImages + "/594";
        if (loadedImages == 594) {
            // All images loaded
            updateUI();
            updateFavorites();
        }
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, SX, SY);
}

function drawSides(b1, b2) {
    let p1 = images["barrel" + b1];
    let p2 = images["barrel" + b2];

    ctx.drawImage(p1, 0, 0, p1.width / 2, SY, 128 - p1.width / 2, 0, p1.width / 2, SY);
    ctx.drawImage(p2, p2.width / 2, 0, p1.width / 2, SY, 128, 0, p2.width / 2, SY);
    //ctx.fillRect(128, 0, 1, 256);
}

function drawStacked(b1, b2) {
    let p1 = images["barrel" + b1];
    let p2 = images["barrel" + b2];

    ctx.drawImage(p1, 0, 0, SX, p1.height / 2, 128 - p1.width / 2, 128 - p1.height / 2, SX, p1.height / 2);
    ctx.drawImage(p2, 0, p2.height / 2, SX, p1.height / 2, 128 - p2.width / 2, 128, SX, p2.height / 2);
}

function drawBlend(b1, b2) {
    let p1 = images["barrel" + b1];
    let p2 = images["barrel" + b2];

    ctx.globalAlpha = 1;
    ctx.drawImage(p1, 0, 0, p1.width, p1.height, 128 - p1.width / 2, 0, p1.width, SY);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(p2, 0, 0, p2.width, p2.height, 128 - p2.width / 2, 0, p2.width, SY);
    ctx.globalAlpha = 1;
}

// Update UI

function updateUI() {
    putout.innerHTML = output;

    barrel1.innerHTML = fullname1 + "  -->";
    barrel2.innerHTML = "<--  " + fullname2;

    clearCanvas();
    if (id1 > 0 && id2 > 0 && settings.miximg) {
        switch (settings.mixtype) {
            case 0:
                drawSides(id1, id2);
                break;
            case 1:
                drawStacked(id1, id2);
                break;
            case 2:
                drawBlend(id1, id2);
                break;
            case 3:
                let rand = Math.random() * 100;
                if (rand > 66) drawSides(id1, id2);
                else if (rand > 33) drawStacked(id1, id2);
                else drawBlend(id1, id2);
                break;
        }
    }

    pic1.src = getFile(id1);
    pic2.src = getFile(id2);
}

loadSave();
preloadNames();