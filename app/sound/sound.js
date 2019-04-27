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
//let gainVol = 0.01;

function soundMap(){
    //gain volume
    gainVol = THREE.Math.smootherstep((xTime),0,100);
    gainNode.gain.value = gainVol;

    if (begin === true){
        panner.pan.value = remapX.toFixed(2);
    }
    else{
        panner.pan.value = 0;
    }
}


//connect
track.connect(biquadFilter).connect(gainNode).connect(panner).connect(audioContext.destination);


// Manipulate the Biquad filter

biquadFilter.type = "peaking";
biquadFilter.frequency.value = 1000;