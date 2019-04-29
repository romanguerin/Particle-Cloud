// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContext();

// get the audio element
const audioElement = document.querySelector('audio');

// pass it into the audio context
const track = audioContext.createMediaElementSource(audioElement);
const biquadFilter = audioContext.createBiquadFilter();

window.setTimeout(sound,100);

function repeatSound() {
    // Do whatever
    requestAnimationFrame(repeatSound);
    soundMap();
    moveSound();
}

function sound(){
    //console.log("can you here me?");
    audioElement.play();
    repeatSound();
}

//gain node
const gainNode = audioContext.createGain();

gainNode.gain.value = 1.5;
const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioContext, pannerOptions);

//volume
let gainVol = 0;
gainNode.gain.value = 0;


function soundMap(){
    if (begin === true){
        panner.pan.value = remapX.toFixed(2);
        gainVol = lerp(gainVol,1,0.02);
        gainNode.gain.value = gainVol.toFixed(2);
        }
    else {
            panner.pan.value = 0;
            gainVol = lerp(gainVol,0,0.05);
            gainNode.gain.value = gainVol.toFixed(2);
        }
}

function moveSound() {
    if(soundBool.doubleUp === true) {
        biquadFilter.type = "lowpass";
    }
    else if(soundBool.leftSide === true){
        biquadFilter.type = "highpass";
    }
    else if(soundBool.rightSide === true){
        biquadFilter.type = "bandpass";
    }
    else if(soundBool.leftUp === true){
        biquadFilter.type = "highshelf";
    }
    else if(soundBool.rightUp === true){
        biquadFilter.type = "peaking";
    }
    else if(soundBool.standStill === true){
        biquadFilter.type = "notch";
    }
    else if(soundBool.nothing === true){
        biquadFilter.type = "allpass";
    }
}

    biquadFilter.frequency.value = 1000;
//connect
track.connect(biquadFilter).connect(gainNode).connect(panner).connect(audioContext.destination);

// Manipulate the Biquad filter

//biquadFilter.type = "peaking";


