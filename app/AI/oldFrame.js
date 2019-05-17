/*
//detect
let colorBool = true;
//init color
let rgbaColor1,
    rgbaColor2,
    bColor1,
    bColor2,
    gColor1,
    gColor2,
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
    bColor1 = 255;
    bColor2 = 255;
    gColor1 = 255;
    gColor2 = 255;
    rColor = 255;
    //bColor = 255;
    aColor = 1;
    //rgbaColor1 = 'rgba(' + rColor +","+ gColor1 +","+ bColor1 +","+ aColor + ')';
    rgbaColor2 = 'rgba(' + rColor +","+ gColor2 +","+ bColor2 +","+ aColor + ')';
}

//detection
function detect(){
    if (begin === true) {
        if (colorBool === true){
            bColor1 = 50; bColor2 = 50; gColor1 = 1; bColor1 = 212; aColor = 1;
            rgbaColor1 = 'rgba(' + rColor +","+ gColor1 +","+ bColor2 +","+ aColor + ')';
            colorBool = false;
            //set attributes
            att = 1; curl = 0.025; parDead = 0.02; parSpeed = 1;
        }
    }
    else {
        if (colorBool === false){
            bColor1 = 50; bColor2 = 50; gColor1 = 255; rColor = 212; aColor = 1;
            rgbaColor1 = 'rgba(' + rColor +","+ gColor1 +","+ bColor1 +","+ aColor + ')';
            colorBool = true;
            //set attributes
            att = -1.8; curl = 0.015; parDead = 0.02; parSpeed = 1;
        }
    }
}


//noise(x/108)*208+128
//noise(x/108)*208+128

//color with sin
function frameColor(){
    xTime ++;
    //xTime = xTime * 0.1;

    gColor1 = Math.round(Math.cos(xTime/96)*(Math.sin(xTime/48)*32+32)+128);
    gColor2 = Math.round(Math.sin(xTime/128)*(Math.cos(xTime/32)*24+32)+128);
    rgbaColor1 = 'rgba(' + rColor +","+ gColor1 +","+ bColor1 +","+ aColor + ')';
    rgbaColor2 = 'rgba(' + rColor +","+ gColor2 +","+ bColor2 +","+ aColor + ')';
}


//rColor1 = Math.round(Math.sin(xTime/128)*128+128);
//rColor2 = Math.round(Math.sin(xTime/128)*128+128);
//rColor1 = Math.round(Math.sin(xTime/128)*(Math.cos(xTime/32)*76+32)+128);
//rColor2 = Math.round(Math.cos(xTime/96)*(Math.sin(xTime/48-1)*76+32)+128);
*/
