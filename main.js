//
// This work is copyrighted. Copying, cloning or stealing is prohibited.
//

const notes = `New in Update 1.7:`
    + `<br>- Added barrels 667-714 (updates 11.3 & 11.4)`
    + `<br>- New mix type: frame!`
    + `<br>- Added Terms of Service`
    + `<br>- Changed button outline`
    + `<br>- Other minor design improvements`
//    + `<br>- `
    ;

var canvas = document.getElementById("canvie");
var ctx = canvas.getContext("2d");

const SX = 256;
const SY = 256;

const BARRELS = 714; // Amount of barrels

var Names;
var output = "";

var ui = {
    putout: document.getElementById("output"),
    barrel1: document.getElementById("barrel1"),
    barrel2: document.getElementById("barrel2"),
    favoritesList: document.getElementById("favoritesList"),
    favoritesListFull: document.getElementById("favoritesListFull"),
    favoritesListShowButton: document.getElementById("favoritesListShowButton"),
    pic1: document.getElementById("pic1"),
    pic2: document.getElementById("pic2"),
    patchNotesText: document.getElementById("patchNotesText"),
    notesButton: document.getElementById("notesButton"),
    favoritesCurrentPage: document.getElementById("favoritesCurrentPage"),
    currentLanguage: document.getElementById("currentLanguage"),
    creditsText1: document.getElementById("creditsText1"),
    creditsText2: document.getElementById("creditsText2"),
    mix: document.getElementById("mix"),
    favoritehtml: document.getElementById("favorite"),
    favoritehtml2: document.getElementById("favoriteshidden"),
    backButton: document.getElementById("backButton"),

    firstPageButton: document.getElementById("firstPageButton"),
    previousPageButton: document.getElementById("previousPageButton"),
    nextPageButton: document.getElementById("nextPageButton"),
    lastPageButton: document.getElementById("lastPageButton"),

    setb1: document.getElementById("setb1"),
    setb2: document.getElementById("setb2"),
}



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
        ui.patchNotesText.innerHTML = "";
        ui.notesButton.innerHTML = tt("showpatchnotes");
    }
    else {
        showPatchNotes = true;
        ui.patchNotesText.innerHTML = '<br /> <div class="resultStyle" style="font-size: 24px; text-align: left;"> ' + notes + ' </div>';
        ui.notesButton.innerHTML = tt("hide");
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
    ui.currentLanguage.innerHTML = tt("currentLanguage") + tt("lang");

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
    ui.favoritesListFull.style.display = "none";
    ui.favoritesListShowButton.style.display = "inline";
}

function showFavorites() {
    ui.favoritesListFull.style.display = "block";
    ui.favoritesListShowButton.style.display = "none";
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
    settings.mixtype = ++settings.mixtype % 5;
    updateSettingsDisplay();
    saveSave();
}

function loadSave(save = "") {
    let temp = "";
    if (save == "") temp = JSON.parse(localStorage.getItem("NameMixer"));
    else temp = JSON.parse(save);

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

function importSave() {
    let toImport = prompt("Insert import code...");
    if (toImport == "" || toImport == undefined || toImport == false) return false;
    else {
        loadSave(decodeURIComponent(escape(window.atob(toImport))));

        updateUI();
        updateFavorites();
        saveSave();
    }
}

function exportSave() {
    let toExport = JSON.stringify({
        "fav": favorites,
        "set": settings
    });
    toExport = btoa(unescape(encodeURIComponent(toExport)));
    navigator.clipboard.writeText(toExport);
}

function getFile(num) {
    return "barrels/" + (num > 177 ? "B" : "b") + "arrel_" + Math.max(1, num) + ".png";
}

// Canvas stuff
for (i = 1; i < BARRELS + 1; i++) {
    images[i] = getFile(i);
}

let loadedImages = 0;
let loadedIDs = [];

function loadImage(id) {
    // Do not load this barrel image if it is already loaded
    if (loadedIDs.includes(id)) return false;

    //console.log("New: " + id);
    let img = new Image();

    img.onload = () => {
        images[id] = img;
        loadedImages += 1;
        loadedIDs.push(id);

        //console.log("Loaded: " + id);
        updateUI();

        /* ui.putout.innerHTML = "Loading images, please wait... " + loadedImages + "/" + BARRELS;
        if (loadedImages == BARRELS) {
            // All images loaded
            updateUI();
            updateFavorites();
        } */
    }

    img.src = images[id];
}

function clearCanvas() {
    ctx.clearRect(0, 0, SX, SY);
}

function drawSides(b1, b2) {
    let p1 = images[b1];
    let p2 = images[b2];

    ctx.drawImage(p1, 0, 0, p1.width / 2, SY, 128 - p1.width / 2, 0, p1.width / 2, SY);
    ctx.drawImage(p2, p2.width / 2, 0, p1.width / 2, SY, 128, 0, p2.width / 2, SY);
    //ctx.fillRect(128, 0, 1, 256);
}

function drawStacked(b1, b2) {
    let p1 = images[b1];
    let p2 = images[b2];

    ctx.drawImage(p1, 0, 0, SX, p1.height / 2, 128 - p1.width / 2, 128 - p1.height / 2, SX, p1.height / 2);
    ctx.drawImage(p2, 0, p2.height / 2, SX, p1.height / 2, 128 - p2.width / 2, 128, SX, p2.height / 2);
}

function drawBlend(b1, b2) {
    let p1 = images[b1];
    let p2 = images[b2];

    ctx.globalAlpha = 1;
    ctx.drawImage(p1, 0, 0, p1.width, p1.height, 128 - p1.width / 2, 0, p1.width, SY);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(p2, 0, 0, p2.width, p2.height, 128 - p2.width / 2, 0, p2.width, SY);
    ctx.globalAlpha = 1;
}

function drawFrame(b1, b2) {
    let p1 = images[b1];
    let p2 = images[b2];

    ctx.drawImage(p1, 0, 0, p1.width, p1.height, 128 - p1.width / 2, 0, p1.width, SY);
    ctx.drawImage(p2, 128 - (p2.height / 5.6), 128 - 64, p2.height / 2.8, 128);
}

// Update UI
function updateFavorites() {
    ui.favoritesList.innerHTML = "<ul>";
    for (f = 0 + (favoritesPage * 25); f < 25 + (favoritesPage * 25); f++) {
        if (f > favorites.length - 1) continue;
        ui.favoritesList.innerHTML = ui.favoritesList.innerHTML + "<ul> #" + (f + 1) + "  " + favorites[f][0] + ' <button onclick="viewFavorite(' + f + '); " class="buttonStyle" style="font-size: 20px">' + tt("view") + '</button>                   <button onclick="removeFavorite(' + f + '); updateFavorites();" class="buttonStyle" style="font-size: 20px">' + tt("remove") + '</button></ul>';
    }
    ui.favoritesList.innerHTML = ui.favoritesList.innerHTML + "</ul>";
    ui.favoritesCurrentPage.innerHTML = "(" + tt("page") + " " + (favoritesPage + 1) + "/" + (Math.floor((favorites.length - 1) / 25) + 1) + ")";
}

function updateSettingsDisplay() {
    if (!showPatchNotes) {
        ui.patchNotesText.innerHTML = "";
        ui.notesButton.innerHTML = tt("showpatchnotes");
    }
    else {
        ui.patchNotesText.innerHTML = '<br /> <div class="resultStyle" style="font-size: 24px; text-align: left;"> ' + notes + ' </div>';
        ui.notesButton.innerHTML = tt("hide");
    }

    ui.setb1.innerHTML = tt("mixedimages") + ": " + (settings.miximg ? tt("ON") : tt("OFF"));
    ui.setb2.innerHTML = tt("mixtype") + ": " + [tt("leftright"), tt("topbottom"), tt("fusion"), tt("random"), tt("frame"), "???"][settings.mixtype];

    ui.creditsText1.innerHTML = "<a href='https://schrottii.github.io/'>" + tt("madeby") + "</a> ©️2022-2024 <br /> " + tt("based") + " ©️2017 <br /> " + tt("idea") + "<br /><br />" + tt("version")
        + " 1.7 (2024-06-15)<br />";
    ui.creditsText2.innerHTML = "<br /><br />" + tt("from") + ' <a href="https://official-scrap-2.fandom.com/wiki/Barrels">' + tt("wiki") + "</a>, " + tt("wikipedia") +
        "<br />" + tt("data") + "<br /><a href='https://schrottii.github.io/'>Click here to see my other projects!</a><br /><br /><b>" + tt("howtouse") + "</b> <br />" + tt("justclick") + "<br />" + tt("explanation") + "<br />" + tt("usage");
}

function updateUI() {
    ui.putout.innerHTML = output;

    ui.barrel1.innerHTML = fullname1 + "  →";
    ui.barrel2.innerHTML = "←  " + fullname2;

    ui.barrel1.style.fontSize = fullname1.length < 16 ? "24px" : "" + Math.floor(32 - fullname1.length / 1.5) + "px";
    ui.barrel2.style.fontSize = fullname2.length < 16 ? "24px" : "" + Math.floor(32 - fullname2.length / 1.5) + "px";

    if (id1 != 0) {
        loadImage(id1);
        loadImage(id2);
    }

    // Image stuff
    clearCanvas();
    if (loadedIDs.includes(id1) && loadedIDs.includes(id2)) {
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
                    let rand = Math.floor(Math.random() * 4);

                    switch (rand) {
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
                            drawFrame(id1, id2);
                            break;
                        default:
                            drawBlend(id1, id2);
                            break;
                    }
                    break;
                case 4:
                    drawFrame(id1, id2);
                    break;
            }
        }

        ui.pic1.style.display = "block";
        ui.pic2.style.display = "block";

        ui.pic1.src = getFile(id1);
        ui.pic2.src = getFile(id2);
    }
    else {
        ui.pic1.style.display = "none";
        ui.pic2.style.display = "none";
    }

    ui.mix.innerHTML = tt("mix");
    ui.favoritehtml.innerHTML = tt("favorite");
    ui.favoritehtml2.innerHTML = tt("favorites");
    ui.favoritesListShowButton.innerHTML = tt("favorites");
    ui.backButton.innerHTML = tt("backButton");

    ui.firstPageButton.innerHTML = tt("firstPageButton");
    ui.previousPageButton.innerHTML = tt("previousPageButton");
    ui.nextPageButton.innerHTML = tt("nextPageButton");
    ui.lastPageButton.innerHTML = tt("lastPageButton");

    updateSettingsDisplay();
}

loadSave();
preloadNames();
updateUI();
updateFavorites();
ui.notesButton.innerHTML = tt("showpatchnotes");