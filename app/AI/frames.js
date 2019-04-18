
let bool = true;
//init color
let rgbaColor,
    rColor,
    gColor,
    bColor,
    aColor;

colorize();
//init every frame
function repeatSelf() {
    // Do whatever
    frameColor();
    requestAnimationFrame(repeatSelf);
}
//repeat
requestAnimationFrame(repeatSelf);


function colorize(){
    rColor = 1;
    gColor = 255;
    bColor = 255;
    aColor = 0;
    rgbaColor = 'rgba(' + rColor +","+ gColor +","+ bColor +","+ aColor + ')';
}

function frameColor(){
    if (bool === true){
        if (aColor >= 255){
         bool = false;
        }
        else {
            aColor ++;
            rColor ++;
        }
    }
    else {
        if (aColor <= 1){
            bool = true;}
        else {
            aColor --;
            rColor --;
        }
    }
    rgbaColor = 'rgba(' + rColor +","+ gColor +","+ bColor +","+ aColor + ')';
}
