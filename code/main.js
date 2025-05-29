//
// This work is copyrighted. Copying, cloning or stealing is prohibited.
//

const gameVersion = "2.0";
const updateDate = "2025-05-29";
const notes = "New in Update " + gameVersion + ":<br />" + 
    `
-> Barrel Book:
- New feature, suggested by snekrot
- Unlocked by default and found below favorites
- Has a list of all barrels, 25/page, with filter to hide locked barrels, page buttons and search button
- Barrels you have seen are unlocked and can be selected, and then you see what mixes you have found
- Select a second barrel (it doesn't have to be unlocked) and you can see how often you had this exact mix, and directly mix the two
- Selected barrels can be easily unselected or swapped

-> Custom Mix:
- The most requested feature is finally here: choosing what you want to mix!
- In the Barrel Book, you can put a Barrel on the left or right side
- Or you select two barrels and press "Mix these!" (second barrel does not need to be unlocked)
- This way you can choose what barrels to mix, even if you never had the mix before
- Custom mixes are marked with a * and don't contribute to the Book, but can be added as favorites and shared as usual!

-> Other:
- New Mix Type: Super Fusion
- New Mix Type: Multi Merge
- Favorites and Book now stay hidden after reloading
- Added auto save every 5 seconds
- Smaller improvements
`.replaceAll("\n", "<br />");

var canvas = document.getElementById("canvie");
var ctx = canvas.getContext("2d");

const SX = 256;
const SY = 256;

const BARRELS = 792; // Amount of barrels

var Names;

var ui = {
    output: document.getElementById("output"),
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
    favoritesCurrentPage2: document.getElementById("favoritesCurrentPage2"),
    creditsText1: document.getElementById("creditsText1"),
    creditsText2: document.getElementById("creditsText2"),
    creditsText3: document.getElementById("creditsText3"),
    creditsText4: document.getElementById("creditsText4"),
    mix: document.getElementById("mix"),
    favoritehtml: document.getElementById("favorite"),
    favoritehtml2: document.getElementById("favoriteshidden"),
    backButton: document.getElementById("backButton"),

    setb1: document.getElementById("setb1"),
    setb2: document.getElementById("setb2"),

    currentLanguage: document.getElementById("currentLanguage"),
    currentLanguage2: document.getElementById("currentLanguage2"),
    donateText: document.getElementById("donateText"),
    languageSetting1Header: document.getElementById("languageSetting1Header"),
    languageSetting2Header: document.getElementById("languageSetting2Header"),
    languageSetting1Description: document.getElementById("languageSetting1Description"),
    languageSetting2Description: document.getElementById("languageSetting2Description"),
    otherSettings: document.getElementById("otherSettings"),
    autogen: document.getElementById("autogen"),
    autogenspeed: document.getElementById("autogenspeed"),
    
    barrelBook: document.getElementById("barrelBook"),
}



// your current barrel mix goes here
var mix = {
    name: "",
    full1: "",
    full2: "",
    id1: 0,
    id2: 0,
    real: true
}

// other stuff
var images = {};
var prev = [];
var prefull = [0, 0];

for (i = 1; i < BARRELS + 1; i++) {
    images[i] = getFile(i);
}

// translations
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

// previous
function updatePrev() {
    prev.push([mix.name, mix.id1, mix.id2]);
    if (prev.length > 25) prev.shift();
}

function goBack() {
    if (prev.length < 2) return false;

    prev.pop();

    mix.name = prev[prev.length - 1][0];
    mix.name.replace("  ", " ");

    if (prev[prev.length - 1][1] != undefined) {
        mix.id1 = prev[prev.length - 1][1];
        mix.id2 = prev[prev.length - 1][2];
        mix.real = mix.name.substr(mix.name.length - 1, 1) == "*" ? false : true;

        mix.full1 = Names[mix.id1];
        mix.full2 = Names[mix.id2];
    }
    updateUI();
}

// favorites
function addFavorite() {
    if (mix.name == "" || (favorites.length > 0 && favorites[favorites.length - 1][0] == mix.name)) return false; // don't add when no mix is there, or you already favorited it

    favorites.push([mix.name, mix.id1, mix.id2]);
}

function removeFavorite(f) {
    favorites.splice(f, 1);
    updateFavorites();
}

function viewFavorite(f) {
    let fav = favorites[f];

    mix.name = fav[0];
    mix.id1 = fav[1];
    mix.id2 = fav[2];
    mix.real = mix.name.substr(mix.name.length - 1, 1) == "*" ? false : true;

    mix.full1 = Names[mix.id1];
    mix.full2 = Names[mix.id2];

    updatePrev();
    updateUI();
}

function changePage(p) {
    if (p == 0) favoritesPage = 0;
    if (p == 999) favoritesPage = Math.floor((favorites.length - 1) / 25);
    else favoritesPage = Math.min(Math.max(0, favoritesPage + p), Math.floor((favorites.length - 1) / 25));
    updateFavorites();
}

function hideFavorites() {
    settings.togglefavorites = false;
    updateToggleAreas();
}

function showFavorites() {
    settings.togglefavorites = true;
    updateToggleAreas();
}

// patch notes
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

// languages and names
function changeLanguage(langTo) {
    settings.lang = langTo;
    updateFavorites();
    updateSettingsDisplay();
    updateUI();
    saveSave();
}

function changeBarrelLanguage(langTo) {
    settings.barrellang = langTo;
    ui.currentLanguage.innerHTML = tt("currentLanguage") + tt("lang");

    preloadNames();
    saveSave();
}

function preloadNames() {
    switch (settings.barrellang) {
        case "en":
            Names = names_en.split("\n");
            ui.currentLanguage2.innerHTML = tt("currentLanguage") + "English";
            break;
        case "uk":
            Names = names_uk.split("\n");
            ui.currentLanguage2.innerHTML = tt("currentLanguage") + "Ukrainian";
            break
        case "it":
            Names = names_it.split("\n");
            ui.currentLanguage2.innerHTML = tt("currentLanguage") + "Italian";
            break;
        case "ru":
            Names = names_ru.split("\n");
            ui.currentLanguage2.innerHTML = tt("currentLanguage") + "Russian";
            break
        case "fr":
            Names = names_en.split("\n");
            ui.currentLanguage2.innerHTML = tt("currentLanguage") + "French";
            break;
        case "de":
            Names = names_en.split("\n");
            ui.currentLanguage2.innerHTML = tt("currentLanguage") + "German";
            break;
    }

    // Remove the numbers (multis have to be removed manually)
    // Note: seems like barrels don't have the numbers anymore past 666, this does make it easier, cool
    for (n = 0; n < Names.length; n++) {
        Names[n] = Names[n].replace(/^[^_]*: /, "")
    }

    updateFavorites();
    updateSettingsDisplay();
    updateUI();
}

// settings
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
    settings.mixtype = ++settings.mixtype % 7;
    updateSettingsDisplay();
    saveSave();
}

// Canvas stuff
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

        /* ui.output.innerHTML = "Loading images, please wait... " + loadedImages + "/" + BARRELS;
        if (loadedImages == BARRELS) {
            // All images loaded
            updateUI();
            updateFavorites();
        } */
    }

    img.src = images[id];
}

// Update UI
function updateFavorites() {
    ui.favoritesList.innerHTML = "<ul>";
    for (f = 0 + (favoritesPage * 25); f < 25 + (favoritesPage * 25); f++) {
        if (f > favorites.length - 1) continue;
        ui.favoritesList.innerHTML = ui.favoritesList.innerHTML + "<ul> #" + (f + 1) + "  " + favorites[f][0] + ' <button onclick="viewFavorite(' + f + '); " class="buttonStyle" style="font-size: 20px">' + tt("view") + '</button>                   <button onclick="removeFavorite(' + f + '); updateFavorites();" class="buttonStyle" style="font-size: 20px">' + tt("remove") + '</button></ul>';
    }
    ui.favoritesList.innerHTML = ui.favoritesList.innerHTML + "</ul>";
    ui.favoritesCurrentPage.innerHTML = ui.favoritesCurrentPage2.innerHTML = "(" + tt("page") + " " + (favoritesPage + 1) + "/" + (Math.max(Math.ceil(favorites.length / 25), 1)) + ")";

    ui.favoritehtml2.innerHTML = tt("favorites");
    ui.favoritesListShowButton.innerHTML = tt("favorites");
    if (mix.name == "" || (favorites.length > 0 && favorites[favorites.length - 1][0] == mix.name)) ui.favoritehtml.classList.add("grayed");
    else ui.favoritehtml.classList.remove("grayed");
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

    ui.setb1.innerHTML = tt("mixedimages") + ": "
        + (settings.miximg ? tt("ON") : tt("OFF"));

    ui.setb2.innerHTML = tt("mixtype") + ": "
        + [tt("leftright"), tt("topbottom"), tt("fusion"), tt("random"), tt("frame"), tt("superfusion"), tt("multimerge"), "???"][settings.mixtype];

    ui.autogen.innerHTML = "Auto Generate: " + (settings.autogenerate ? tt("ON") : tt("OFF"));
    ui.autogenspeed.innerHTML = "Speed: " + settings.autogenspeed;

    ui.creditsText1.innerHTML = "<a href='https://schrottii.github.io/'>"
        + tt("madeby")
        + "</a> ©️2022-2025 <br /> "
        + tt("based")
        + " ©️2017 <br /> "
        + tt("idea");

    ui.creditsText2.innerHTML = tt("from")
        + ' <a href="https://official-scrap-2.fandom.com/wiki/Barrels">'
        + tt("wiki")
        + "</a>, " + tt("wikipedia")
        + "<br />" + tt("data");

    ui.creditsText3.innerHTML = tt("howtouse")
        + "<br />" + tt("justclick")
        + "<br />" + tt("explanation")
        + "<br />" + tt("usage");

    ui.creditsText4.innerHTML = tt("version")
        + " " + gameVersion
        + " (" + updateDate + ")";

    ui.languageSetting1Header.innerHTML = tt("languageSetting1Header");
    ui.languageSetting2Header.innerHTML = tt("languageSetting2Header");
    ui.languageSetting1Description.innerHTML = tt("languageSetting1Description");
    ui.languageSetting2Description.innerHTML = tt("languageSetting2Description");
    ui.otherSettings.innerHTML = tt("otherSettings");
}

function updateToggleAreas(){
    // favorites
    if (settings.togglefavorites){
        ui.favoritesListFull.style.display = "block";
        ui.favoritesListShowButton.style.display = "none";
    }
    else {
        ui.favoritesListFull.style.display = "none";
        ui.favoritesListShowButton.style.display = "inline";
    }
    
    // book
    if (settings.togglebook) {
        ui.barrelBook.style.display = "";
    }
    else {
        ui.barrelBook.style.display = "none";
    }
}

function updateUI() {
    ui.output.innerHTML = mix.name;

    ui.barrel1.innerHTML = mix.full1 + "  →";
    ui.barrel2.innerHTML = "←  " + mix.full2;

    ui.barrel1.style.fontSize = mix.full1.length < 16 ? "24px" : "" + Math.floor(32 - mix.full1.length / 1.5) + "px";
    ui.barrel2.style.fontSize = mix.full2.length < 16 ? "24px" : "" + Math.floor(32 - mix.full2.length / 1.5) + "px";

    if (mix.id1 != 0) {
        loadImage(mix.id1);
        loadImage(mix.id2);
    }

    updateCanvas();
    updateFavorites();
    updateBarrelBook();

    if (prev.length < 2) ui.backButton.classList.add("grayed");
    else ui.backButton.classList.remove("grayed");

    ui.mix.innerHTML = tt("mix");
    ui.donateText.innerHTML = tt("donateText");

    updateToggleAreas();

    updateSettingsDisplay();
}

loadSave();
preloadNames();
updateUI();
updateFavorites();
autoGenerate();
ui.notesButton.innerHTML = tt("showpatchnotes");