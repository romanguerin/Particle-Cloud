//detect
let colorBool = true;
//init color
let rgbaColor1,
    rgbaColor2,
    rColor1,
    rColor2,
    gColor1,
    gColor2,
    bColor,
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
    detect();
    frameColor();
    requestAnimationFrame(repeatSelf);

}
requestAnimationFrame(repeatSelf);


//set colora
function colorize(){
    rColor1 = 1;
    rColor2 = 1;
    gColor1 = 255;
    gColor2 = 255;
    bColor = 152;
    //bColor = 255;
    aColor = 1;
    rgbaColor1 = 'rgba(' + rColor1 +","+ gColor1 +","+ bColor +","+ aColor + ')';
    rgbaColor2 = 'rgba(' + rColor2 +","+ gColor2 +","+ bColor +","+ aColor + ')';
}

function detect(){
    if (begin === true) {
        if (colorBool === true){
        rColor1 = 1; rColor2 = 1; gColor1 = 1; bColor = 255; aColor = 1;
        rgbaColor1 = 'rgba(' + rColor1 +","+ gColor1 +","+ bColor +","+ aColor + ')';
        colorBool = false;
        //set attributes
        att = 1; curl = 0.025; parDead = 0.02; parSpeed = 1;
       }
    }
    else {
        if (colorBool === false){
        rColor1 = 1; rColor2 = 1; gColor1 = 255; bColor = 255; aColor = 1;
        rgbaColor1 = 'rgba(' + rColor1 +","+ gColor1 +","+ bColor +","+ aColor + ')';
        colorBool = true;
        //set attributes
        att = -1.8; curl = 0.015; parDead = 0.02; parSpeed = 1;
       }
    }
}



//math random?
//noise(x/108)*208+128
//noise(x/108)*208+128

//color with sin
function frameColor(){
    xTime ++;
    //rColor1 = Math.round(Math.sin(xTime/128)*128+128);
    //rColor2 = Math.round(Math.sin(xTime/128-1)*128+128);
    rColor1 = Math.round(Math.sin(xTime/128)*(Math.cos(xTime/32)*76+32)+128);
    rColor2 = Math.round(Math.cos(xTime/96)*(Math.sin(xTime/48-1)*76+32)+128);
    gColor1 = Math.round(Math.cos(xTime/96)*(Math.sin(xTime/48)*76+32)+128);
    gColor2 = Math.round(Math.sin(xTime/128)*(Math.cos(xTime/32)*76+32)+128);
    rgbaColor1 = 'rgba(' + rColor1 +","+ gColor1 +","+ bColor +","+ aColor + ')';
    rgbaColor2 = 'rgba(' + rColor2 +","+ gColor2 +","+ bColor +","+ aColor + ')';
}




