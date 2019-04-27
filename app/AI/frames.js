
let bool1 = true;
let bool2 = true;
//init color
let rgbaColor,
    rColor,
    gColor,
    bColor,
    aColor;

let att = -1.8;
let xTime = 0;
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
    //soundMap();
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
}


function frameColor(){
    xTime ++;
    rColor = Math.round(Math.sin(xTime/128)*128+128);
    rgbaColor = 'rgba(' + rColor +","+ gColor +","+ bColor +","+ aColor + ')';
}


//detect outstanding



