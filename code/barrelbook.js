var barrelbook = {};
var bookSel = -1;
var bookSel2 = -1;
var bookPage = 0;
var bookFilter = false;

function toggleBarrelBook(){
    settings.togglebook = !settings.togglebook;
    updateToggleAreas();
}

function awardBook(barrel1, barrel2){
    //console.log(barrel1, barrel2);

    // Add barrel B to A
    if (barrelbook[barrel1] == undefined) barrelbook[barrel1] = {};
    if (barrelbook[barrel1][barrel2] == undefined) barrelbook[barrel1][barrel2] = 0;
    barrelbook[barrel1][barrel2] += 1;

    // Add barrel A to B
    if (barrelbook[barrel2] == undefined) barrelbook[barrel2] = {};
    if (barrelbook[barrel2][barrel1] == undefined) barrelbook[barrel2][barrel1] = 0;
    barrelbook[barrel2][barrel1] += 1;

    updateBarrelBook();
}

function clickBookBarrel(b) {
    if (bookSel != -1 && barrelbook[bookSel] != undefined/* && barrelbook[bookSel][b] != undefined*/) {
        // this is second (un)select, you got the combination
        if (bookSel2 == b) bookSel2 = -1;
        else bookSel2 = b;
    }
    else if (barrelbook[b] != undefined) {
        // first (un)select
        if (bookSel == b) unselectBookBarrel();
        else bookSel = b;
        if (bookFilter) bookPage = 0;
    }
    updateBarrelBook();
}

function unselectBookBarrel(){
    bookSel = -1;
    bookSel2 = -1;
    updateBarrelBook();
}

function swapBookBarrel(){
    if (bookSel2 != -1) [bookSel, bookSel2] = [bookSel2, bookSel];
    updateBarrelBook();
}

function toggleBookFilter(){
    bookFilter = !bookFilter;
    updateBarrelBook();
}

function bookPagePrev(){
    if (bookPage > 0) bookPage--;
    updateBarrelBook();
}

function bookPageNext(){
    if ((bookPage + 1) * 25 < BARRELS) bookPage++;
    updateBarrelBook();
}

function bookPageFirst(){
    bookPage = 0;
    updateBarrelBook();
}

function bookPageLast(){
    bookPage = Math.floor((BARRELS - 1) / 25);
    updateBarrelBook();
}

function bookPageJump(){
    let id = prompt("Barrel number? (1 - " + BARRELS + ")");
    if (id < 1 || id > BARRELS) return false;

    bookPage = Math.floor((id - 1) / 25);
    clickBookBarrel(id);
}

function force(side, which){
    // forces a barrel to be in the mix
    // side: 0: left 1: right
    // which: 1: bookSel 2: bookSel2

    let changeTo = which == 1 ? bookSel : bookSel2;
    if (changeTo == -1) return false;

    mix.real = false;

    if (side == 0) {
        mix.id1 = changeTo;
        generateFrontName(changeTo);
    }
    if (side == 1) {
        mix.id2 = changeTo;
        generateBackName(changeTo);
    }

    generateName();
    updateUI();
}

function forcemix(){
    mix.id1 = bookSel;
    mix.id2 = bookSel2;
    mix.real = false;

    generateName();
    updateUI();
}

function updateBarrelBook(){
    let render = "";

    // simply listy for goody kitty
    /*
    for (let b in barrelbook) {
        for (let b2 in barrelbook[b]) {
            console.log(b, b2)
            render = render + "<br />Barrel " + b + ": " + b2;
        }
    }
    */

    // list on the left
    render = render + "<div style='float: left; margin-left: 3%; width: 30%; background-color: brown'>";
    render = render + "<h2>Barrels:</h2>";

    // filter
    render = render + "<button style='font-size: 16px; width: 10%; background-color: white' onclick='bookPageFirst()'>|<</button>";
    render = render + "<button style='font-size: 16px; width: 60%; background-color: white' onclick='toggleBookFilter()'>Filter (" + (bookFilter ? "ON" : "OFF") + ")</button>";
    render = render + "<button style='font-size: 16px; width: 10%; background-color: white' onclick='bookPageJump()'>_</button>";
    render = render + "<button style='font-size: 16px; width: 10%; background-color: white' onclick='bookPageLast()'>>|</button>";

    render = render + "<button style='font-size: 20px; width: 45%; background-color: white' onclick='bookPagePrev()'>←</button>";
    render = render + "<button style='font-size: 20px; width: 45%; background-color: white' onclick='bookPageNext()'>→</button>";

    let color;
    let b2 = 0;
    for (let b = 1 + (bookPage * 25); b <= b2 + Math.min(25 + bookPage * 25, BARRELS); b++) {
        if (barrelbook[b] == undefined && b != bookSel2) color = "gray"; // locked
        else if (bookSel == b || bookSel2 == b) color = "yellow"; // selected
        else if (bookSel == -1) color = "white"; // no sel, unlocked
        else if (bookSel != -1 && barrelbook[bookSel] != undefined && barrelbook[bookSel][b] != undefined) color = "red"; // sel, still unlocked
        else color = "gray"; // ???

        if (bookFilter && color == "gray") {
            if (b < BARRELS) b2++;
            continue;
        }

        render = render + "<button style='font-size: 24px; width: 90%; background-color: " + color
        + "' onclick='clickBookBarrel(" + b + ")'>"
        + b + ": " + Names[b] + "</button>";
    }
    
    render = render + "<button style='font-size: 20px; width: 45%; background-color: white' onclick='bookPagePrev()'>←</button>";
    render = render + "<button style='font-size: 20px; width: 45%; background-color: white' onclick='bookPageNext()'>→</button>";

    render = render + "</div>";

    // content on the right
    render = render + "<div style='float: right; margin-right: 3%; width: 60%; background-color: brown'>";

    if (bookSel == -1) {
        render = render + "<h2>Select a barrel you unlocked</h2>";
    }
    else {
        render = render + "<button style='font-size: 24px; width: 40%; background-color: white' onclick='unselectBookBarrel()'>Unselect</button>";
        render = render + "<button style='font-size: 24px; width: 40%; background-color: white' onclick='swapBookBarrel()'>Swap</button>";

        // barrel 1
        if (bookSel != -1) {
            render = render + "<div style='float: left; width: 50%'>"
            render = render + "<h2>" + ("#" + bookSel + ": " + Names[bookSel]) + "</h2>";
            render = render + "<img src='" + getFile(bookSel) + "'/>";
            if (barrelbook[bookSel] != undefined) render = render + "<br /><h2>" + Object.keys(barrelbook[bookSel]).length + "/" + BARRELS + "</h2>";
        
            render = render + "<br /><button style='font-size: 20px; width: 40%; background-color: " + (mix.id1 == bookSel ? "yellow" : "white") + "' onclick='force(0, 1)'>Left</button>";
            render = render + "<button style='font-size: 20px; width: 40%; background-color: " + (mix.id2 == bookSel ? "yellow" : "white") + "' onclick='force(1, 1)'>Right</button>";

            render = render + "</div><br />";
        }

        // barrel 2
        if (bookSel != -1 && bookSel2 != -1) {
            render = render + "<div style='float: left; width: 50%'>"
            render = render + "<h2>" + ("#" + bookSel2 + ": " + Names[bookSel2]) + "</h2>";
            render = render + "<img src='" + getFile(bookSel2) + "'/>";
            if (barrelbook[bookSel] != undefined) {
                let mixes = barrelbook[bookSel][bookSel2] != undefined ? barrelbook[bookSel][bookSel2] : 0;
                render = render + "<br /><h2>Mixed " + mixes + " time" + (mixes == 1 ? "" : "s") + "</h2>";
            }

            render = render + "<br /><button style='font-size: 20px; width: 40%; background-color: " + (mix.id1 == bookSel2 ? "yellow" : "white") + "' onclick='force(0, 2)'>Left</button>";
            render = render + "<button style='font-size: 20px; width: 40%; background-color: " + (mix.id2 == bookSel2 ? "yellow" : "white") + "' onclick='force(1, 2)'>Right</button>";

            render = render + "</div><br />";



            // both
            render = render + "<hr style='clear:both'>";
            render = render + "<button style='font-size: 24px; width: 40%; background-color: white;' onclick='forcemix()'>Mix these!</button>";
        }

    }

    render = render + "</div>";

    // finish
    render = render + `<div id="clear" style="clear:both;"></div>`;
    ui.barrelBook.innerHTML = render;
}