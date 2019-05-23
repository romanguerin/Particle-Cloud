// Create a KNN classifier
const knnClassifier = ml5.KNNClassifier();

let video;
let poseNet;
let poses = [];
let options;

let curl = 0.015;
let parDead = 0.02;
let parSpeed = 1.0;
let sideEx = 0.0;
let att = -1.8;

let alertKey = true;
let naviPose = 0;


let w; //width
let h; //height
let d; //distance

let ti = 0; //time reset
//let numPer = 1; //check amount of people
let n = 0;
//let p = 0;

let remapX;
let remapY;
let remapD = 1000; //distance remap
let camDis = 1.8;  //Camera distance

let begin = false;

//set poses to 0
let noseX = 0,
    noseY = 0,
    eyelX = 0,
    eyelY = 0,
    lwristX = 0,
    lwristY = 0,
    rwristX = 0,
    rwristY = 0;

// distance X & Y axis
let rDx,
    lDx,
    rDy,
    lDy;

let soundBool = {
    doubleUp:   false,
    leftSide:   false,
    rightSide:  false,
    leftUp:     false,
    rightUp:    false,
    standStill: false,
    nothing:    false,
};


//window.setInterval(switcher, 3000);



function repeat() {
        setTimeout( function() {
    //repeat
    requestAnimationFrame(repeat);
        }, 1000 / 30 );
    // Do whatever
    position();
    outstand();
    switchPose();

}

options = {
    imageScaleFactor: 0.3,
    outputStride: 16,
    flipHorizontal: false,
    minConfidence: 0.5,
    maxPoseDetections: 5,
    scoreThreshold: 0.5,
    nmsRadius: 20,
    algorithm: 'single-pose',
    multiplier: 0.75,
    output: {
        showBoundingBox: true,
    }
};


function setup() {
    createCanvas(1024, 576);
    video = createCapture(VIDEO);
    video.size(width, height);

    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, options);
    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', function(results) {
        poses = results;
    });
    // Hide the video element, and just show the canvas
    video.hide();
    //
    requestAnimationFrame(repeat);
}


function draw() {
    image(video, 0, 0, width, height);

    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
    //only the first person he sees
    if (poses[n] !== undefined) {
        //console.log(n);
        // Loop through all the poses detected
        for (let i = 0; i < poses.length; i++) {
            // For each pose detected, loop through all the keypoints
            let pose = poses[n].pose,
                nX = poses[n].pose.keypoints[0].position.x,
                nY = poses[n].pose.keypoints[0].position.y,
                eX = poses[n].pose.keypoints[1].position.x,
                eY = poses[n].pose.keypoints[1].position.y;
            //lerp to position
            noseX = lerp(noseX, nX, 0.5);
            noseY = lerp(noseY, nY, 0.5);
            eyelX = lerp(eyelX, eX, 0.5);
            eyelY = lerp(eyelY, eY, 0.5);

            //define wrists
            let lwX = poses[n].pose.keypoints[9].position.x,
                lwY = poses[n].pose.keypoints[9].position.y,
                rwX = poses[n].pose.keypoints[10].position.x,
                rwY = poses[n].pose.keypoints[10].position.y;
            //lerp to positon
            lwristX = lerp(lwristX, lwX, 0.5);
            lwristY = lerp(lwristY, lwY, 0.5);
            rwristX = lerp(rwristX, rwX, 0.5);
            rwristY = lerp(rwristY, rwY, 0.5);

            for (let j = 0; j < pose.keypoints.length; j++) {
                // A keypoint is an object describing a body part (like rightArm or leftShoulder)
                let keypoint = pose.keypoints[j];
                // Only draw an ellipse is the pose probability is bigger than 0.2
                if (keypoint.score > 0.05) {
                    //distance math round
                    d = Math.round(dist(noseX, noseY, eyelX, eyelY) * 3);
                    //get middle area
                    w = noseX - (d / 2);
                    h = noseY - (d / 2);
                    //console.log(noseX - lwristX);
                }
            }
        }
        //console.log(n);
    }
}


//track position
    function position() {
        if (poses[0] === undefined) {
            ti += 1;
            // if ti = 400 start own animation
            if (ti === 400) {
                begin = false;
                ti = 0;
                //camDis = lerp(camDis, 1.7, 0.05);
            }
        }
        // if distance is bigger than 50 start tracing
        else if (d >= 55) {
            begin = true;
            //update
            remap();
            transform();
        }
    }


    function remap(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }


    function transform() {
        let xTran = w / 10.24;
        let yTran = h / 5.78;
        //console.log("transform:" + "  x:" + xTran + "  y:" + yTran);
        //remapx
        remapX = remap(xTran, 0, 100, 1, -1);
        //console.log("X: "+ remapX);
        //remapy
        remapY = remap(yTran, 0, 100, 1, -1);
        //console.log("Y: "+ remapY);
        remapD = remap(d, 50, 100, 0.2, 1.2);
        camDis = lerp(camDis, remapD, 0.05);
        camDis = Math.min(camDis, 1.2);
        camDis = Math.round(camDis * 100) / 100;
        //frame();
    }

    function parLerp(insSpeed, insDead, insSide, insRat, insCurl, insAtt) {
        parSpeed = lerp(parSpeed, insSpeed, 0.05); //particle speed
        parDead = lerp(parDead, insDead, 0.02); //particle dead
        sideEx = lerp(sideEx, insSide, 0.02); // L/R
        camDis = lerp(camDis, insRat, 0.05); //ratio size
        curl = lerp(curl, insCurl, 0.02); //curl size
        att = lerp(att, insAtt, 0.05); //attraction
    }

    function boolCheck() {
        soundBool.doubleUp = false;
        soundBool.leftUp = false;
        soundBool.leftSide = false;
        soundBool.rightUp = false;
        soundBool.rightSide = false;
        soundBool.standStill = false;
        soundBool.nothing = false;

    }

    function outstand() {
        lDx = lwristX - noseX;      //calc X left hand
        rDx = noseX - rwristX;      //calc X right hand
        lDy = noseY - lwristY;      //calc Y left hand
        rDy = noseY - rwristY;      //calc Y right hand

        if (alertKey === true) {
            let rHand = remap(rDx, -500, 500, 0.0, 3);
            let lHand = remap(lDx, -500, 500, 0.0, 3);
            let sideHand;
            if (rHand > lHand) {
                sideHand = rHand * -1;
            } else {
                sideHand = lHand;
            }
            if (sideHand < 2 && sideHand > -2) {
                sideHand = 0.0;
            }
            sideEx = lerp(sideEx, sideHand, 0.02); // L/R
        } else {
            sideEx = 0.0;
        }

        //const leftSide   = lDx > 25 && rDx < -25;  //detect when both arms are left
        //const rightSide  = lDx < -25 && rDx > 25;  //detect when both arms are right
        const doubleUp = lDy > 10 && rDy > 10;   //detect when both arms are up
        const leftUp = lDy > 10 && rDy < -5;   //detect when left is up
        const rightUp = rDy > 10 && lDy < -5;   //detect when right is up
        const standStill = rDy > -120 && lDy > -120 && lDx < 70 && rDx < 70 && lDx > 10 && rDx > 10;
        //both arms under the kin

        //motions
        if (begin === true) {

            if (alertKey === true) {

                //explosion??
                if (doubleUp) {
                    parSpeed = 1.2;
                    parDead = 0.005;
                    //sideEx = 0.0;
                    camDis = 2;
                    curl = 0.004;
                    att = -1.3;
                    boolCheck();
                    soundBool.doubleUp = true;
                }
                //left shoot
                /*else if (leftSide) {
                    parLerp(2.5,0.02,6.0,1.5,0.01,-0.5);
                    boolCheck();
                    soundBool.leftSide = true;
                    //remapX = remapX - 0.1;
                    }
                else if (rightSide) {
                    parLerp(1.5,0.02,-6.0,1.9,0.01,-0.5);
                    boolCheck();
                    soundBool.leftSide = true;
                    //remapX = remapX + 0.1;
                    }*/
                else if (leftUp) {
                    parLerp(2.5, 0.04, 0.0, 0.4, 0.01, 0.5);
                    boolCheck();
                    soundBool.leftUp = true;
                } else if (rightUp) {
                    parLerp(2.5, 0.01, 0.0, 2.9, 0.01, 0.5);
                    boolCheck();
                    soundBool.rightUp = true;
                } else if (standStill) {
                    parLerp(0.01, 0.02, 0.0, 1.5, 0.01, -0.5);
                    boolCheck();
                    soundBool.standStill = true;
                }
                //turn back
                else {
                    parLerp(0.6, 0.02, 0.0, 0.8, 0.025, 1);
                    boolCheck();
                    soundBool.nothing = true;
                }
            }
            //else alertKey
            else {
                parLerp(0.6, 0.02, 0.0, 0.8, 0.025, 1);
            }
        }
}

document.addEventListener('keydown', function(e) {
    if (e.keyCode === 32 || e.keyCode === 9){
        e.keypress = '1';
        if (alertKey === false) {
            alertKey = true;
            alert("Poses are activated");
        } else {
            alert("Poses are deactivated");
            alertKey = false;
        }
    }
    if (alertKey === false) {
        naviPose = e.which - 49;
   //console.log(e.which - 49);
    }
});

//color with sin
function switchPose(){
    //console.log(c);
    if (alertKey === false) {
        switch (naviPose) {
            case 0:
                parLerp(0.6, 0.02, 0.0, 0.8, 0.025, 1);
                break;
            case 1:
                parLerp(2.5, 0.04, 0.0, 0.4, 0.01, 0.5);
                break;
            case 2:
                parLerp(2.5, 0.01, 0.0, 2.9, 0.01, 0.5);
                break;
            case 3:
                parLerp(0.01, 0.02, 0.0, 1.5, 0.01, -0.5);
                break;
            case 4:
                parSpeed = 1.2;
                parDead = 0.005;
                //sideEx = 0.0;
                camDis = 2;
                curl = 0.004;
                att = -1.3;
                break;
            case 5:
                parLerp(0.0, 0.0, 0.0, 0.0, 0.0, -1);
                break;
        }
    }

    //cos(x)/2+0.5
    //blend1 = blendHexColors(color3, color1, p);
    //console.log(p);
}


/*
function test() {
    console.log("lDy: " + lDy);
    console.log("rDy: " + rDy);
    console.log("lDx: " + lDx);
    console.log("rDx: " + rDx);
}
*/
//////////////////////////////////KNN CLASSIFIER/////////////////////////////////////////////

/*
// Add the current frame from the video to the classifier
function addExample(label) {
    // Convert poses results to a 2d array [[score0, x0, y0],...,[score16, x16, y16]]
    const poseArray = poses[numPer - 1].pose.keypoints.map(p => [p.score, p.position.x, p.position.y]);

    // Add an example with a label to the classifier
    knnClassifier.addExample(poseArray, label);
}

// Predict the current frame.
function classify() {
        // Get the total number of labels from knnClassifier
        const numLabels = knnClassifier.getNumLabels();
        if (numLabels <= 0) {
            console.error('There is no examples in any label');
            return;
        }
        // Convert poses results to a 2d array [[score0, x0, y0],...,[score16, x16, y16]]
        const poseArray = poses[numPer - 1].pose.keypoints.map(p => [p.score, p.position.x, p.position.y]);

        // Use knnClassifier to classify which label do these features belong to
        // You can pass in a callback function `gotResults` to knnClassifier.classify function
        knnClassifier.classify(poseArray, gotResults);
}


function switcher() {
    if (numPer !== poses.length) {
        numPer = poses.length;
            switch (numPer) {
                default:
                    knnClassifier.clearAllLabels();
                    //addExample('A');
                    //console.log("nothing");
                    break;
                case 1:
                    addExample('A');
                    //console.log("Alpha");
                    classify();
                    break;
                case 2:
                    addExample('B');
                    //console.log("Bravo");
                    classify();
                    break;
                case 3:
                    addExample('C');
                    //console.log("Charlie");
                    classify();
                    break;
                case 4:
                    addExample('D');
                    //console.log("Delta");
                    classify();
                    break;
                case 5:
                    addExample('E');
                    //console.log("Echo");
                    classify();
                    break;
            }
        }
}

// Show the results
function gotResults(err, result) {
    // Display any error
    if (err) {
        console.error(err);
    }

    if (result.confidencesByLabel) {
        //const confidences = result.confidencesByLabel;
        // result.label is the label that has the highest confidence

        if (result.label) {
            //console.log(result.label);
             n = result.label.charCodeAt(0) - 65;
            //console.log(n);
            if (poses[n] !== undefined){
                n = 0;
            } else {
                n = result.label.charCodeAt(0) - 65;
            }
            //console.log()
        }
    }
}


/*
const leftSide   = lDx > 45 && rDx < -45;  //detect when both arms are left
const rightSide  = lDx < -45 && rDx > 45;  //detect when both arms are right
const doubleUp   = lDy > 20 && rDy > 20;   //detect when both arms are up
const leftUp     = lDy > 20 && rDy < -10;  //detect when left is up
const rightUp    = rDy > 20 && lDy < -10;  //detect when right is up
const standStill = rDy > -120 && lDy > -120 && lDx < 70 && rDx < 70 && lDx > 10 && rDx > 10;
//both arms under the kin
*/
