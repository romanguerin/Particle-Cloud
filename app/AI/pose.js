let video;
let poseNet;
let poses = [];
let options;


let w; //width
let h; //height
let d; //distance

let ti = 0; //time reset

let remapX;
let remapY;
let remapD = 1000;

let camDis = 1.8;

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


//window.setInterval(position, 25);

function repeat() {
    // Do whatever
    position();
    requestAnimationFrame(repeat);
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
function drawKeypoints()  {
    //only the first person he sees
    if (poses[0]){

        // Loop through all the poses detected
        for (let i = 0; i < poses.length; i++) {

            // For each pose detected, loop through all the keypoints
            let pose = poses[0].pose,
                nX = poses[0].pose.keypoints[0].position.x,
                nY = poses[0].pose.keypoints[0].position.y,
                eX = poses[0].pose.keypoints[1].position.x,
                eY = poses[0].pose.keypoints[1].position.y;
            //lerp to position
            noseX = lerp(noseX, nX, 0.5);
            noseY = lerp(noseY, nY, 0.5);
            eyelX = lerp(eyelX, eX, 0.5);
            eyelY = lerp(eyelY, eY, 0.5);

            //define wrists
            let lwX = poses[0].pose.keypoints[9].position.x,
                lwY = poses[0].pose.keypoints[9].position.y,
                rwX = poses[0].pose.keypoints[10].position.x,
                rwY = poses[0].pose.keypoints[10].position.y;
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
                     w = noseX - (d/2);
                     h = noseY - (d/2);
                }
            }
        }
    }
}

//track position
function position(){
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
    else if (d >= 50){
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
    remapX = remap(xTran,0,100,1,-1);
    //console.log("X: "+ remapX);
    //remapy
    remapY = remap(yTran,0,100,1,-1);
    //console.log("Y: "+ remapY);
    remapD = remap(d,50,100, 0.2, 3);
    camDis = lerp(camDis, remapD, 0.05);
    camDis = Math.min(camDis, 3);
    camDis = Math.round(camDis * 100)/100 ;
    //frame();
}





