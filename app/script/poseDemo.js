let video;
let poseNet;
let poses = [];
let color = [
    "yellow",
];
//set poses to 0

let noseX = 0,
    noseY = 0,
    eyelX = 0,
    eyelY = 0,
    lwristX = 0,
    lwristY = 0,
    rwristX = 0,
    rwristY = 0;

function setup() {
    createCanvas(640, 480);
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
}


const options = {
    imageScaleFactor: 0.3,
    outputStride: 16,
    flipHorizontal: false,
    minConfidence: 0.5,
    maxPoseDetections: 10,
    scoreThreshold: 0.5,
    nmsRadius: 20,
    detectionType: 'singlepose',
    multiplier: 1,
};

function draw() {
    image(video, 0, 0, width, height);

    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();
}

// A function to draw rectangle over the detected keypoints
function drawKeypoints()  {
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
        //poses.forEach(function callback( value, index) {



        // For each pose detected, loop through all the keypoints
        let pose = poses[i].pose,
            nX = poses[i].pose.keypoints[0].position.x,
            nY = poses[i].pose.keypoints[0].position.y,
            eX = poses[i].pose.keypoints[1].position.x,
            eY = poses[i].pose.keypoints[1].position.y;
        //lerp to position
        noseX = lerp(noseX, nX, 0.5);
        noseY = lerp(noseY, nY, 0.5);
        eyelX = lerp(eyelX, eX, 0.5);
        eyelY = lerp(eyelY, eY, 0.5);

        //define wrists
        let lwX = poses[i].pose.keypoints[9].position.x,
            lwY = poses[i].pose.keypoints[9].position.y,
            rwX = poses[i].pose.keypoints[10].position.x,
            rwY = poses[i].pose.keypoints[10].position.y;
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
                let d = Math.round(dist(noseX, noseY, eyelX, eyelY) * 3);
                //get middle area
                let w = noseX - (d/2);
                let h = noseY - (d/2);
                //draw

                fill(0, 0, 0, 0);
                ellipse(lwristX, lwristY , d);
                ellipse(rwristX, rwristY, d);
                rect(w, h, d, d);
                stroke(color[0]);
                text(("distance: " + d), w, (h - 5));

            }
        }
    }
}



//remap code
/*
function remap(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
let remapZ = remap(distance,0, 100, 0, 1);
*/
