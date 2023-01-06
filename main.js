//
// This work is copyrighted. Copying, cloning or stealing is prohibited.
//

const notes = 'New in Update 1.5:<br>- Changing the language now also translates buttons and texts (rather than only using the barrel names from a different language)!<br>- Added French translation (by Varlyne)<br>-Added German translation (by Schrottii)<br>- Added barrel icons to flags that have their own barrel names, other languages use the English names<br>- Up to 25 previous barrels are now cached (rather than only one), making it possible to go back by up to 25 barrels with the "Go back" button!<br>- If the origin barrel names are very long, their size will now be reduced, to avoid overlapping';

var canvas = document.getElementById("canvie");
var ctx = canvas.getContext("2d");

const SX = 256;
const SY = 256;

const BARRELS = 594; // Amount of barrels

var Names;
var output = "";

var putout = document.getElementById("output");
var barrel1 = document.getElementById("barrel1");
var barrel2 = document.getElementById("barrel2");
var favoritesList = document.getElementById("favoritesList");
var favoritesListFull = document.getElementById("favoritesListFull");
var favoritesListShowButton = document.getElementById("favoritesListShowButton");
var pic1 = document.getElementById("pic1");
var pic2 = document.getElementById("pic2");
var patchNotesText = document.getElementById("patchNotesText");
var notesButton = document.getElementById("notesButton");
var favoritesCurrentPage = document.getElementById("favoritesCurrentPage");
var currentLanguage = document.getElementById("currentLanguage");
var creditsText1 = document.getElementById("creditsText1");
var creditsText2 = document.getElementById("creditsText2");
var mix = document.getElementById("mix");
var favoritehtml = document.getElementById("favorite");
var favoritehtml2 = document.getElementById("favoriteshidden");
var back = document.getElementById("back");

var firstpage = document.getElementById("firstpage");
var previouspage = document.getElementById("prevpage");
var nextpage = document.getElementById("nextpage");
var lastpage = document.getElementById("lastpage");

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

var images = {};
var prev = [];
var prefull = [0, 0];

function tt(id) {
    switch (settings.lang) {
        case "en":
            return trans_en[id];
            break;
        case "uk":
            return trans_uk[id];
            break;
        case "it":
            return trans_it[id];
            break;
        case "ru":
            return trans_ru[id];
            break;
        case "fr":
            return trans_fr[id];
            break;
        case "de":
            return trans_de[id];
            break;
    }
}

function pickAName(number = 0) {
    let num = Math.floor(Math.random() * (Names.length - 2)) + 1;
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
    name1 = generateFrontName();
    name2 = generateBackName();

    output = name1 + " " + name2;

    prev.push([name1, name2, output, id1, id2]);
    if (prev.length > 25) prev.shift();
}

function goBack() {
    if (prev.length < 2) return false;

    prev.pop();

    name1 = prev[prev.length - 1][0];
    name2 = prev[prev.length - 1][1];
    output = prev[prev.length - 1][2];

    if (prev[prev.length - 1][3] != undefined) {
        id1 = prev[prev.length - 1][3];
        id2 = prev[prev.length - 1][4];

        fullname1 = Names[id1];
        fullname2 = Names[id2];
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
    if (output != "") favorites.push([output, id1, id2]);
}

function removeFavorite(f) {
    favorites.splice(f, 1);
    updateFavorites();
}

function viewFavorite(f) {
    let fav = favorites[f];

    output = fav[0];
    id1 = fav[1];
    id2 = fav[2];

    fullname1 = Names[id1];
    fullname2 = Names[id2];

    prev.push([name1, name2, output, id1, id2]);
    if (prev.length > 25) prev.shift();

    updateUI();
}

function patchNotes() {
    if (showPatchNotes) {
        showPatchNotes = false;
        patchNotesText.innerHTML = "";
        notesButton.innerHTML = tt("showpatchnotes");
    }
    else {
        showPatchNotes = true;
        patchNotesText.innerHTML = '<br /> <div class="resultStyle" style="font-size: 24px; text-align: left;"> ' + notes + ' </div>';
        notesButton.innerHTML = tt("hide");
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
            break;
        case "uk":
            Names = names_uk.split("\n");
            break
        case "it":
            Names = names_it.split("\n");
            break;
        case "ru":
            Names = names_ru.split("\n");
            break
        case "fr":
            Names = names_en.split("\n");
            break;
        case "de":
            Names = names_en.split("\n");
            break;
    }
    currentLanguage.innerHTML = tt("currentlanguage") + tt("lang");

    // Remove the numbers (multis have to be removed manually)
    for (n = 0; n < Names.length; n++) {
        Names[n] = Names[n].replace(/^[^_]*: /, "")
    }

    updateFavorites();
    updateSettingsDisplay();
    updateUI();
}

function changePage(p) {
    if (p == 0) favoritesPage = 0;
    if (p == 999) favoritesPage = Math.floor((favorites.length - 1) / 25);
    else favoritesPage = Math.min(Math.max(0, favoritesPage + p), Math.floor((favorites.length - 1) / 25));
    updateFavorites();
}

function hideFavorites() {
    favoritesListFull.style.display = "none";
    favoritesListShowButton.style.display = "inline";
}

function showFavorites() {
    favoritesListFull.style.display = "block";
    favoritesListShowButton.style.display = "none";
}

function toggleCanvas() {
    if (settings.miximg == true) {
        settings.miximg = false;
    }
    else {
        settings.miximg = true;
    }
    updateSettingsDisplay();
    saveSave();
}

function toggleMixType() {
    settings.mixtype = ++settings.mixtype % 4;
    updateSettingsDisplay();
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
let loadedIDs = [];

for (let image in images) {
    let img = new Image();
    img.onload = () => {
        images[image] = img;
        loadedImages += 1;
        loadedIDs.push(image);

        if (image.substr(6) == id1 || image.substr(6) == id2) {
            updateUI();
        }

        //putout.innerHTML = "Loading images, please wait... " + loadedImages + "/" + BARRELS;
        if (loadedImages == BARRELS) {
            // All images loaded
            updateUI();
            updateFavorites();
        }
    }

    img.src = images[image];
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
function updateFavorites() {
    favoritesList.innerHTML = "<ul>";
    for (f = 0 + (favoritesPage * 25); f < 25 + (favoritesPage * 25); f++) {
        if (f > favorites.length - 1) continue;
        favoritesList.innerHTML = favoritesList.innerHTML + "<ul> #" + (f + 1) + "  " + favorites[f][0] + ' <button onclick="viewFavorite(' + f + '); " class="buttonStyle" style="font-size: 20px">' + tt("view") + '</button>                   <button onclick="removeFavorite(' + f + '); updateFavorites();" class="buttonStyle" style="font-size: 20px">' + tt("remove") + '</button></ul>';
    }
    favoritesList.innerHTML = favoritesList.innerHTML + "</ul>";
    favoritesCurrentPage.innerHTML = "(" + tt("page") + " " + (favoritesPage + 1) + "/" + (Math.floor((favorites.length - 1) / 25) + 1) + ")";
}

function updateSettingsDisplay() {
    if (!showPatchNotes) {
        patchNotesText.innerHTML = "";
        notesButton.innerHTML = tt("showpatchnotes");
    }
    else {
        patchNotesText.innerHTML = '<br /> <div class="resultStyle" style="font-size: 24px; text-align: left;"> ' + notes + ' </div>';
        notesButton.innerHTML = tt("hide");
    }

    setb1.innerHTML = tt("mixedimages") + ": " + (settings.miximg ? tt("ON") : tt("OFF"));
    setb2.innerHTML = tt("mixtype") + ": " + [tt("leftright"), tt("topbottom"), tt("fusion"), tt("random"), "???"][settings.mixtype];

    creditsText1.innerHTML = tt("madeby") + " (c)2023 <br /> " + tt("based") + " (c)2017 <br /> " + tt("idea") + "<br />" + tt("version") + " 1.5 (01/06/23)";
    creditsText2.innerHTML = "<br />" + tt("from") + ' <a href="https://official-scrap-2.fandom.com/wiki/Barrels">' + tt("wiki") + "</a>, " + tt("wikipedia") +
            "<br />" + tt("data") + "<br /><b>" + tt("howtouse") + "</b> <br />" + tt("justclick") + "<br />" + tt("explanation") + "<br />" + tt("usage");
}

function updateUI() {
    putout.innerHTML = output;

    barrel1.innerHTML = fullname1 + "  -->";
    barrel2.innerHTML = "<--  " + fullname2;

    barrel1.style.fontSize = fullname1.length < 16 ? "24px" : "" + Math.floor(32 - fullname1.length / 1.5) + "px";
    barrel2.style.fontSize = fullname2.length < 16 ? "24px" : "" + Math.floor(32 - fullname2.length / 1.5) + "px";

    // Image stuff
    clearCanvas();
    if (loadedIDs.includes("barrel" + id1) && loadedIDs.includes("barrel" + id2)) {
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

        pic1.style.display = "block";
        pic2.style.display = "block";

        pic1.src = getFile(id1);
        pic2.src = getFile(id2);
    }
    else {
        pic1.style.display = "none";
        pic2.style.display = "none";
    }

    mix.innerHTML = tt("mix");
    favoritehtml.innerHTML = tt("favorite");
    favoritehtml2.innerHTML = tt("favorites");
    favoritesListShowButton.innerHTML = tt("favorites");
    back.innerHTML = tt("back");

    firstpage.innerHTML = tt("firstpage");
    previouspage.innerHTML = tt("previouspage");
    nextpage.innerHTML = tt("nextpage");
    lastpage.innerHTML = tt("lastpage");

    updateSettingsDisplay();
}

loadSave();
preloadNames();
updateUI();
notesButton.innerHTML = tt("showpatchnotes");