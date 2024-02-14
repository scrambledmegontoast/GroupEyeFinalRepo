let pg;
function setupShare (){
    createCanvas(940,  1050);
    pg = createGraphics(940, 1050, WEBGL);
    pg.background(0);
}

function drawShare(){
    background(0);
    image(pg, 0, 0);


}