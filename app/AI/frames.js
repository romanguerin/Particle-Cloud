
let bool1 = true;
let bool2 = true;
//init color
let rgbaColor,
    rColor,
    gColor,
    bColor,
    aColor;

let att = -1.8;

let curl = 0.015;
let parDead = 0.02;
let parSpeed = 1;


colorize();
//init every frame
function repeatSelf() {
    // Do whatever
    detect();
    frameColor();
    requestAnimationFrame(repeatSelf);
}
//repeat
requestAnimationFrame(repeatSelf);



function colorize(){
    rColor = 1;
    gColor = 255;
    bColor = 255;
    aColor = 1;
    rgbaColor = 'rgba(' + rColor +","+ gColor +","+ bColor +","+ aColor + ')';
}

function detect(){
    if (begin === true) {
        if (bool2 === true){
        //rgbaColor = 'rgba(255,0,0,0)';
        rColor = 1; gColor = 1; bColor = 255; aColor = 1;
        rgbaColor = 'rgba(' + rColor +","+ gColor +","+ bColor +","+ aColor + ')';
        //console.log("true " + rgbaColor);
        bool2 = false;
        att = 1;
        curl = 0.025;
        parDead = 0.02;
        parSpeed = 1;
        }
    }
    else
    {
        if (bool2 === false){
        //rgbaColor = 'rgba(255,255,255,0)';
        rColor = 1; gColor = 255; bColor = 255; aColor = 1;
        rgbaColor = 'rgba(' + rColor +","+ gColor +","+ bColor +","+ aColor + ')';
        //console.log("false " + rgbaColor);
        bool2 = true;
        att = -1.8;
        curl = 0.015;
        parDead = 0.02;
        parSpeed = 1;
        }
    }
    //console.log(begin);
}

function frameColor(){
    if (bool1 === true){
        if (aColor >= 255){
         bool1 = false;
        }
        else {
            aColor ++;
            rColor ++;
        }
    }
    else {
        if (aColor <= 1){
            bool1 = true;}
        else {
            aColor --;
            rColor --;
        }
    }
    rgbaColor = 'rgba(' + rColor +","+ gColor +","+ bColor +","+ aColor + ')';
}


//detect outstanding



