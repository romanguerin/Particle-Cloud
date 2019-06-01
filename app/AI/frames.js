
let p;
let c = 0;
//set variables
let xTime = 0;

let colorOn = {
    colorA : "#5C8D89",
    colorB : "#4C8492",
    colorC : "#F7E0A3",
    colorD : "#ED9c67",
    colorE : "#35477D",
    colorF : "#6C5B7B",
    colorG : "#C06C84",
    colorH : "#F67280"
};

let color1 = "#F4F9F4",
    color2 = "#A7D7C5",
    color3 = "#74B49B",
    color4 = "#5C8D89",
    color5 = "#4C8492",
    color6 = "#FFFDE8",
    color7 = "#F7E0A3",
    color8 = "#ED9c67",
    color9 = "#35477D",
    color10 = "#6C5B7B",
    color11 = "#C06C84",
    color12 = "#F67280";


let blend1 ;
let blend2 ;
let blendB ;


function blendHexColors(c0, c1, p) {
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
}


//init every frame
function repeatSelf() {
    //set to 30 frames
    setTimeout( function() {
    requestAnimationFrame(repeatSelf);
    }, 1000 / 30 );

    //detect();
    frameColor();
    lid();
}
requestAnimationFrame(repeatSelf);




function lid() {
    xTime ++;
    p = xTime*0.001 - Math.floor(xTime*0.001);
    //console.log(b);
    //xTime = xTime * 0.1;
    //p = Math.sin(xTime*0.001)/2+0.5;
    //math.

    if (p > 0.99 ) {
        c ++;
        //two is the amount of colors you choose
        if (c > 2 ){
            c = 0;
        }
    }
}



//color with sin
function frameColor(){
    //console.log(c);
    if (alertKey === true) {
        switch (c) {
            case 0:
                blend1 = blendHexColors(color3, color9, p);
                break;
            case 1:
                blend1 = blendHexColors(color9, color12, p);
                break;
            case 2:
                blend1 = blendHexColors(color12, color3, p);
                break;
            case 3:
                blend1 = blendHexColors(color12, color2, p);
        }
    }
    else {
        console.log(naviPose);
        //let mc = colorOn[naviPose];
        //console.log(mc);


        switch (naviPose) {
            case 0:
                blend1 = color4;
                break;
            case 1:
                blend1 = color5;
                break;
            case 2:
                blend1 = color6;
                break;
            case 3:
                blend1 = color7;
                break;
            case 4:
                blend1 = color8;
                break;
            case 5:
                blend1 = color9;
        }


    }



    //cos(x)/2+0.5
    //blend1 = blendHexColors(color3, color1, p);
    //console.log(p);
}





//rColor1 = Math.round(Math.sin(xTime/128)*128+128);
//rColor2 = Math.round(Math.sin(xTime/128)*128+128);
//rColor1 = Math.round(Math.sin(xTime/128)*(Math.cos(xTime/32)*76+32)+128);
//rColor2 = Math.round(Math.cos(xTime/96)*(Math.sin(xTime/48-1)*76+32)+128);

