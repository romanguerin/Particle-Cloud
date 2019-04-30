//detect
let colorBool = true;
//init color
let rgbaColor1,
    rgbaColor2,
    rColor1,
    rColor2,
    gColor,
    bColor,
    aColor;

//set variables
let att = -1.8;
let xTime = 0;
let curl = 0.015;
let parDead = 0.02;
let parSpeed = 1;


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
    gColor = 255;
    bColor = 255;
    aColor = 1;
    rgbaColor1 = 'rgba(' + rColor1 +","+ gColor +","+ bColor +","+ aColor + ')';
    rgbaColor2 = 'rgba(' + rColor2 +","+ gColor +","+ bColor +","+ aColor + ')';
}

function detect(){
    if (begin === true) {
        if (colorBool === true){
        rColor1 = 1; rColor2 = 1; gColor = 1; bColor = 255; aColor = 1;
        rgbaColor1 = 'rgba(' + rColor1 +","+ gColor +","+ bColor +","+ aColor + ')';
        colorBool = false;
        //set attributes
        att = 1; curl = 0.025; parDead = 0.02; parSpeed = 1;
       }
    }
    else {
        if (colorBool === false){
        rColor1 = 1; rColor2 = 1; gColor = 255; bColor = 255; aColor = 1;
        rgbaColor1 = 'rgba(' + rColor1 +","+ gColor +","+ bColor +","+ aColor + ')';
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
    rColor1 =
    xTime ++;
    rColor1 = Math.round(Math.sin(xTime/128)*128+128);
    rColor2 = Math.round(Math.sin(xTime/128-1)*128+128);
    rgbaColor1 = 'rgba(' + rColor1 +","+ gColor +","+ bColor +","+ aColor + ')';
    rgbaColor2 = 'rgba(' + rColor2 +","+ gColor +","+ bColor +","+ aColor + ')';
}




