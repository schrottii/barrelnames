//
// This work is copyrighted. Copying, cloning or stealing is prohibited.
//

// all the favorites you collect along the way
var favorites = [];

// settings
var favoritesPage = 0;
var showPatchNotes = false;

var settings = {
    lang: "en",
    barrellang: "en",
    miximg: true,
    mixtype: 0,
    autogenerate: false,
    autogenspeed: 1000,
    togglefavorites: true,
    togglebook: true
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

        barrelbook = temp.bbk;
    }

    console.log("loaded");
}

function saveSave() {
    let strn = JSON.stringify({
        "fav": favorites,
        "set": settings,
        "bbk": barrelbook
    });
    localStorage.setItem("NameMixer", strn);
    console.log("saved");
}

function importSave() {
    let toImport = prompt("Insert import code...");
    if (toImport == "" || toImport == undefined || toImport == false) return false;
    else {
        loadSave(decodeURIComponent(escape(window.atob(toImport))));

        updateUI();
        updateFavorites();
        autoGenerate();
        saveSave();
    }
}

function exportSave() {
    let toExport = JSON.stringify({
        "fav": favorites,
        "set": settings,
        "bbk": barrelbook
    });
    toExport = btoa(unescape(encodeURIComponent(toExport)));
    navigator.clipboard.writeText(toExport);
}

setInterval("saveSave()", 5000);