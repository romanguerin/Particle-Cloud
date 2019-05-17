//detect
let colorBool = true;
//init color
let rgbaColor,
    bColor,
    gColor,
    rColor,
    aColor;

//set variables
let att = -1.8;
let xTime = 0;
let curl = 0.015;
let parDead = 0.02;
let parSpeed = 1.0;
let sideEx = 0.0;


colorize();
//init every frame
function repeatSelf() {
    //detect();
    frameColor();
    requestAnimationFrame(repeatSelf);

}
requestAnimationFrame(repeatSelf);


//set colora
function colorize(){
    rColor = 255;
    bColor = 255;
    gColor = 255;
    aColor = 1;
    rgbaColor = 'rgba(' + rColor +","+ gColor +","+ bColor +","+ aColor + ')';
}

//color with sin
function frameColor(){
    xTime ++;
    //xTime = xTime * 0.1;
    rColor = Math.round(Math.sin(xTime*0.001)*62 + 128);
    gColor = Math.round(Math.sin(xTime*0.01)*59 + 196);
    bColor = Math.round(Math.sin(xTime*0.01)*24 + 230);
    rgbaColor = 'rgba(' + rColor +","+ gColor +","+ bColor +","+ aColor + ')';
}


//rColor1 = Math.round(Math.sin(xTime/128)*128+128);
//rColor2 = Math.round(Math.sin(xTime/128)*128+128);
//rColor1 = Math.round(Math.sin(xTime/128)*(Math.cos(xTime/32)*76+32)+128);
//rColor2 = Math.round(Math.cos(xTime/96)*(Math.sin(xTime/48-1)*76+32)+128);

