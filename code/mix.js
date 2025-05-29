//
// This work is copyrighted. Copying, cloning or stealing is prohibited.
//

// this file is for stuff directly related to creating mixes
// favorites and go back are in main.js

function getFile(num) {
    // gets the file name of a barrel
    return "images/barrels/" + (num > 177 ? "B" : "b") + "arrel_" + Math.max(1, num) + ".png";
}

function randomBarrel(){
    return Math.floor(Math.random() * (Names.length - 2)) + 1;
}

function getName(id) {
    return Names[id];
}

function generateFrontName(id) {
    // generates the left side of the name
    let name = getName(id);
    prefull[0] = mix.full1;
    mix.full1 = name;

    let splittedName = name.split(" ");
    name = splittedName[0];

    for (i = 1; i < splittedName.length; i++) {
        if (Math.random() > 0.25) name = name + " " + splittedName[i];
        else return name;
    }
    return name;
}

function generateBackName(id) {
    // generates the right side of the name
    let name = getName(id);
    prefull[1] = mix.full2;
    mix.full2 = name;

    let splittedName = name.split(" ");
    name = splittedName[splittedName.length - 1];

    for (i = splittedName.length - 2; i > -1; i--) {
        if (Math.random() > 0.25) name = splittedName[i] + " " + name;
        else return name;
    }
    return name;
}

function generateName(){
    let newName = "";
    newName = generateFrontName(mix.id1);
    newName = newName + " " + generateBackName(mix.id2);
    newName.replace("  ", " ");

    if (!mix.real) newName = newName + "*";

    mix.name = newName;
}

function generateCombination() {
    // the main mix function
    // mixes the barrels, the display part is done with update / UI functions
    mix.real = true;
    mix.id1 = randomBarrel();
    mix.id2 = randomBarrel();
    
    generateName();

    awardBook(mix.id1, mix.id2);
    updatePrev();
}

// AUTO GENERATE
var autoGenID = -1;
var autoGenChanged = false;
function toggleAutoGenerate() {
    settings.autogenerate = !settings.autogenerate;

    autoGenerate();

    saveSave();
    updateUI();
}

function changeAutoGenerateSpeed() {
    switch (settings.autogenspeed) {
        case 100:
            settings.autogenspeed = 500;
            break;
        case 500:
            settings.autogenspeed = 1000;
            break;
        case 1000: // default
            settings.autogenspeed = 2000;
            break;
        case 2000:
            settings.autogenspeed = 5000;
            break;
        case 5000:
            settings.autogenspeed = 10000;
            break;
        case 10000:
            settings.autogenspeed = 30000;
            break;
        default:
            settings.autogenspeed = 100;
            break;
    }

    autoGenChanged = true;
    autoGenerate();
    autoGenerate();

    saveSave();
    updateUI();
}

function autoGenerate() {
    if (autoGenID == -1 && settings.autogenerate == true && !autoGenChanged) {
        autoGenID = setInterval(() => { generateCombination(); updateUI(); }, settings.autogenspeed);
    }
    else if (autoGenID != -1) {
        clearInterval(autoGenID);
        autoGenID = -1;
        autoGenChanged = false;
    }
}