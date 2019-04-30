// for legacy browsers
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
// get the audio element
//const audioElement = document.querySelector('audio');
const mainAudioElement = document.getElementById("main");
const ambAudioElement = document.getElementById("amb");
const trackAudioElement = document.getElementById("track");
// pass it into the audio context
const mainTrack = audioContext.createMediaElementSource(mainAudioElement);
const ambTrack = audioContext.createMediaElementSource(ambAudioElement);
const trackTrack = audioContext.createMediaElementSource(trackAudioElement);
const biquadFilter = audioContext.createBiquadFilter();
const audioTime = audioContext.currentTime;
const gainNode = audioContext.createGain();
//panner
const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioContext, pannerOptions);


window.setTimeout(sound,100);


function repeatSound() {
    requestAnimationFrame(repeatSound);
    soundMap();
}

//activate sound only after a while
function sound(){
    mainAudioElement.play();
    trackAudioElement.play();
    ambAudioElement.play();
    //gainNode.gain.value = 0;
    gainNode.gain.setValueAtTime(0, audioTime);
    repeatSound();
}


function soundMap(){
        if (begin === true) {
            panner.pan.value = remapX.toFixed(2);
            gainNode.gain.linearRampToValueAtTime(1.0, audioTime + 80.0);
            ambAudioElement.pause();
        }
        else {
            panner.pan.value = 0;
            gainNode.gain.linearRampToValueAtTime(0.0, audioTime + 80.0);
            //gainNode.gain.linearRampToValueAtTime(0.0, audioTime + 8.0);
            //gainNode.gain.setValueAtTime(1, audioTime);
            //gainNode.gain.linearRampToValueAtTime(0.0, audioTime + 8.0);
            ambAudioElement.play();
        }
}

//detect wich movement you make and manipulate
function moveSound() {
    if(soundBool.doubleUp === true) {
        biquadFilter.type = "allpass";
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
        biquadFilter.type = "lowpass";
    }
}

//frequence
//biquadFilter.frequency.value = 1000;
//.connect(biquadFilter)

//connect
mainTrack.connect(gainNode).connect(panner).connect(audioContext.destination);
ambTrack.connect(audioContext.destination);
trackTrack.connect(gainNode).connect(audioContext.destination);
