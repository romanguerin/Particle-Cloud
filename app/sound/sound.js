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
//biQuad
const biquadFilter = audioContext.createBiquadFilter();
//gain
//const audioTime = audioContext.currentTime;
const gainNode = audioContext.createGain();
//const gainAmb = audioContext.createGain();
//panner
const pannerOptions = { pan: 0 };
const panner = new StereoPannerNode(audioContext, pannerOptions);
// distortion
//const distortion = audioContext.createWaveShaper();
//compressor
//const compressor = audioContext.createDynamicsCompressor();

//let threshold = -36;
let freqFill = 350;
let gainVol = 1;
gainNode.gain.value = 1;


window.setTimeout(sound,400);


function repeatSound() {
    requestAnimationFrame(repeatSound);
    //soundMap();
    //moveSound();
    //compress();
}

//activate sound only after a while
function sound(){
    //play
    mainAudioElement.play();
    trackAudioElement.pause();
    ambAudioElement.pause();
    biquadFilter.type = "lowpass";
    //repeat
    //repeatSound();
}
/*
function compress(){
    compressor.threshold.setValueAtTime(threshold, audioContext.currentTime);
    compressor.knee.setValueAtTime(20, audioContext.currentTime);
    compressor.ratio.setValueAtTime(12, audioContext.currentTime);
    compressor.attack.setValueAtTime(0.3, audioContext.currentTime);
    compressor.release.setValueAtTime(0.0, audioContext.currentTime);
}
*/

function soundMap(){
        if (begin === true) {
            panner.pan.value = remapX.toFixed(2);
            //gainVol = lerp(gainVol,1,0.02);
            gainNode.gain.value = gainVol;
            ambAudioElement.pause();
            trackAudioElement.play();
            mainAudioElement.play();
        }
        else {
            panner.pan.value = 0;
            gainVol = lerp(gainVol,0,0.1);
            gainNode.gain.value = gainVol;
            ambAudioElement.play();
            trackAudioElement.pause();
        }
}

function frequence(hertz){
freqFill = lerp(freqFill,hertz,0.1);
biquadFilter.frequency.value = freqFill;
}

//detect which movement you make and manipulate
function moveSound() {
    if(soundBool.doubleUp === true) {
        frequence(1000)
        //threshold = lerp(threshold,0.0,1.0);
    }
    else if(soundBool.leftSide === true){
        //biquadFilter.type = "highpass";
    }
    else if(soundBool.rightSide === true){
        //biquadFilter.type = "bandpass";
    }
    else if(soundBool.leftUp === true){
        //biquadFilter.type = "highshelf";
    }
    else if(soundBool.rightUp === true){
        //biquadFilter.type = "peaking";
    }
    else if(soundBool.standStill === true){
        //biquadFilter.type = "notch";
    }
    else if(soundBool.nothing === true){
        frequence(350);
        //biquadFilter.frequency.value = 350;
        //threshold = lerp(threshold,-36.0,1.0);
        //biquadFilter.type = "lowpass";
    }
}

//frequence
//biquadFilter.frequency.value = 1000;
//.connect(biquadFilter)
/*
function makeDistortionCurve(amount) {
    let k = typeof amount === 'number' ? amount : 50,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        deg = Math.PI / 180,
        i = 0,
        x;
    for ( ; i < n_samples; ++i ) {
        x = i * 2 / n_samples - 1;
        curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
    }
    return curve;
}
*/
//distortion.curve = makeDistortionCurve(400);
//distortion.oversample = '4x';

//connect
mainTrack
    .connect(biquadFilter)
    //.connect(compressor)
    .connect(gainNode)
    .connect(panner)
    .connect(audioContext.destination);

ambTrack.connect(audioContext.destination);
trackTrack.connect(audioContext.destination);
