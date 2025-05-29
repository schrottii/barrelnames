function updateCanvas() {
    // Image stuff
    clearCanvas();
    if (loadedIDs.includes(mix.id1) && loadedIDs.includes(mix.id2)) {
        if (mix.id1 > 0 && mix.id2 > 0 && settings.miximg) {
            drawMix(settings.mixtype);
        }

        ui.pic1.style.display = "block";
        ui.pic2.style.display = "block";

        ui.pic1.src = getFile(mix.id1);
        ui.pic2.src = getFile(mix.id2);
    }
    else {
        ui.pic1.style.display = "none";
        ui.pic2.style.display = "none";
    }
}

function drawMix(which) {
    switch (which) {
        case 0:
            drawSides(mix.id1, mix.id2);
            break;
        case 1:
            drawStacked(mix.id1, mix.id2);
            break;
        case 2:
            drawFusion(mix.id1, mix.id2);
            break;
        case 3:
            drawRandom(mix.id1, mix.id2);
            break;
        case 4:
            drawFrame(mix.id1, mix.id2);
            break;
        case 5:
            drawSuperFusion(mix.id1, mix.id2);
            break;
        case 6:
            drawMultiMerge(mix.id1, mix.id2);
            break;
    }
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

function drawFusion(b1, b2) {
    let p1 = images[b1];
    let p2 = images[b2];

    ctx.globalAlpha = 1;
    ctx.drawImage(p1, 0, 0, p1.width, p1.height, 128 - p1.width / 2, 0, p1.width, SY);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(p2, 0, 0, p2.width, p2.height, 128 - p2.width / 2, 0, p2.width, SY);
    ctx.globalAlpha = 1;
}

function drawRandom(){
    let rand = 3;

    while (rand == 3){ // avoid another random
        rand = Math.floor(Math.random() * 6);
    }

    drawMix(rand);
}

function drawFrame(b1, b2) {
    let p1 = images[b1];
    let p2 = images[b2];

    ctx.drawImage(p1, 0, 0, p1.width, p1.height, 128 - p1.width / 2, 0, p1.width, SY);
    ctx.drawImage(p2, 128 - (p2.height / 5.6), 128 - 64, p2.height / 2.8, 128);
}

function drawSuperFusion(b1, b2) {
    let p1 = images[b1];
    let p2 = images[b2];

    ctx.drawImage(p1, 0, 0, p1.width, p1.height, 128 - p1.width / 2, 0, p1.width, SY);
    ctx.globalCompositeOperation = "destination-atop";
    ctx.globalAlpha = 0.75;
    ctx.drawImage(p2, 0, 0, p2.width, p2.height, 128 - p2.width / 2, 0, p2.width, SY);
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
}

function drawMultiMerge(b1, b2) {
    let p1 = images[b1];
    let p2 = images[b2];

    ctx.drawImage(p1, 0, 0, p1.width, p1.height, 128 - p1.width / 2, 0, p1.width, SY);
    ctx.globalCompositeOperation = "destination-atop";
    ctx.drawImage(p2, 0, 0, p2.width, p2.height, 128 - p2.width / 2, 0, p2.width, SY);
    ctx.globalCompositeOperation = "multiply";
    ctx.drawImage(p2, 0, 0, p2.width, p2.height, 128 - p2.width / 2, 0, p2.width, SY);
    ctx.globalCompositeOperation = "source-over";
}