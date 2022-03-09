// declarations

var called  = false;

const FIRST = "first";
const SECOND = "second";

var isPlaying = [false,false];

var files = [1,1];

var allClicks = [[],[]];

var crossfaderValue =[1,1];

var audio = [1,1];

var audioContext = [1,1];

var scratchAudioContext = [1,1];

var scratchOscillator = [1,1];

var scratchFilter = [1,1];

var tremoloOsc = [1,1];

var tremoloGain = [1,1];

var frequencyPassNode = [1,1];

var diskAngle =[0,0];

var audioSource = [1,1];

var track = [1,1];

var gainNode = [1,1];

var analyserNode = [1,1];

var bassFilterNode = [1,1];

var trebleFilterNode = [1,1];

var compressorNode = [1,1];

var rotDuration = [5,5];

var audioElement = [document.getElementById("audio1"),document.getElementById("audio2")];

var fileInput = [document.getElementById("file-input1"), document.getElementById("file-input2")];

var disk = [document.getElementById("disk1"), document.getElementById("disk2")];

var bar = [document.getElementById("bar1"),document.getElementById("bar2")];

var playButton = [document.getElementById("play1"),document.getElementById("play2")];

var stopButton = [document.getElementById("stop1"),document.getElementById("stop2")];

var compressionButton = [document.getElementById("compressor1"), document.getElementById("compressor2")];

var pitchSlider = [document.getElementById("pitch1"), document.getElementById("pitch2")];

var gainSlider = [document.getElementById("gain1"), document.getElementById("gain2")];

var bassSlider = [document.getElementById("bass1"), document.getElementById("bass2")];

var middleSlider = [document.getElementById("middle1"), document.getElementById("middle2")];

var trebleSlider = [document.getElementById("treble1"), document.getElementById("treble2")];

var tremoloSlider = [document.getElementById("tremolo1"), document.getElementById("tremolo2")];

var frequencyPassSlider = [document.getElementById("freqpass1"), document.getElementById("freqpass2")];

var middleFilterNode = [1,1];

var loopBox = [document.getElementById("loop1"),document.getElementById("loop2")];

var crossfaderSlider = document.getElementById("crossfader");

var songsList = [document.getElementById("list1"), document.getElementById("list2")];

var songsLinks = [[],[]];

var songsArray = [[],[]];

var source;

//echo variables

var echoButton = [document.getElementById("echo1"), document.getElementById("echo2")];

var echo = [1,1];

var feedbackE = [1,1];

var echo_disabled = [true, true];

var tempEcho = [1,1];

var tempEchoF = [1,1];

//periodic wave variables

var PeriodicWaveButton = [document.getElementById("PW1"), document.getElementById("PW2")];

var PWaveDisabled = [true, true];

var osc = [1,1];

var real = [1,1];

var imag = [1,1];

var wave = [1,1];

//delay variables

var delayButton = [document.getElementById("delay1"), document.getElementById("delay2")];

var delay = [1,1];

var feedback = [1,1];

var delay_disabled = [true, true];

//cut variables

var cutButton = [document.getElementById("cut1"), document.getElementById("cut2")];

var cut_disabled = [true, true];

var mute_disabled = [true, true];

var tempCut = [1,1];

var tempCut2 = [1,1];

var tempFirstTimeCut = [1,1];

//distortion variables

var distortionButton = [document.getElementById("distortion1"), document.getElementById("distortion2")];

var distortionDisabled = [true, true];

var distortion = [1,1];

//biquad variables

var biquadButton = [document.getElementById("bquad1"), document.getElementById("bquad2")];

var filter_disabled = [true, true];

var filter = [1,1];

// calls

window.onload = function() {
    inputLoad(0);
    inputLoad(1);
};

songsListHandler(0);

songsListHandler(1);

//loop checkbox handlers
audioElement[0].addEventListener("ended", function() {
    if(loopBox[0].checked){
        audioElement[0].play();
    }else{
        stopScratch(0);
    }
});

audioElement[1].addEventListener("ended", function() {
    if(loopBox[1].checked){
        audioElement[1].play();
    }else{
        stopScratch(1);
    }
});

playButton[0].addEventListener('click', function(e){
    isPlaying[0] = !isPlaying[0];
    if(isPlaying[0]){
        rotateScratch(0);
        audioElement[0].play();
    }else{
        pauseScratch(0);
        audioElement[0].pause();
    }
});

playButton[1].addEventListener('click', function(e){
    isPlaying[1] = !isPlaying[1];
    if(isPlaying[1]){
        rotateScratch(1);
        audioElement[1].play();
    }else{
        pauseScratch(1);
        audioElement[1].pause();
    }
});

stopButton[0].addEventListener('click', function(e){
    stopScratch(0);
    audioElement[0].pause();
    audioElement[0].currentTime = 0;
});

stopButton[1].addEventListener('click', function(e){
    stopScratch(1);
    audioElement[1].pause();
    audioElement[1].currentTime = 0;
});

gainSlider[0].addEventListener('input', function(e){
    gainNode[0].gain.value = parseFloat(this.value)*parseFloat(crossfaderValue[0]);
});

gainSlider[1].addEventListener('input', function(e){
    gainNode[1].gain.value = parseFloat(this.value)*parseFloat(crossfaderValue[1]);
});

bassSlider[0].addEventListener('input', function(e){
    // bassFilterNode[0].type = "lowshelf"; 
    // bassFilterNode[0].frequency.value = 200;
    bassFilterNode[0].gain.value = this.value;
});

bassSlider[1].addEventListener('input', function(e){
    //bassFilterNode[1].type = "lowshelf"; 
    //bassFilterNode[1].frequency.value = 200;
    bassFilterNode[1].gain.value = this.value;
});

middleSlider[0].addEventListener('input', function(e){
    // middleFilterNode[1].type = "peaking"; 
    // middleFilterNode[1].frequency.value = 1000;
    // middleFilterNode[1].Q.value = 1;
    middleFilterNode[0].gain.value = this.value;
});

middleSlider[1].addEventListener('input', function(e){
    // middleFilterNode[1].type = "peaking"; 
    // middleFilterNode[1].frequency.value = 1000;
    // middleFilterNode[1].Q.value = 1;
    middleFilterNode[1].gain.value = this.value;
});

trebleSlider[0].addEventListener('input', function(e){
    // trebleFilterNode[0].type = "highshelf"; 
    // trebleFilterNode[0].frequency.value = 2000;
    trebleFilterNode[0].gain.value = this.value;
});

trebleSlider[1].addEventListener('input', function(e){
    // trebleFilterNode[1].type = "highshelf"; 
    // trebleFilterNode[1].frequency.value = 2000;
    trebleFilterNode[1].gain.value = this.value;
});

tremoloSlider[0].addEventListener('input', function(e){
    tremoloOsc[0].frequency.value = this.value;
});

tremoloSlider[1].addEventListener('input', function(e){
    tremoloOsc[1].frequency.value = this.value;
});

//(see below)
frequencyPassSliderHandler(0);
frequencyPassSliderHandler(1);

//(see below)
compressionButtonHandler(0);
compressionButtonHandler(1);

pitchSlider[0].addEventListener('input', function(e){
    audioElement[0].preservesPitch = true;
    audioElement[0].playbackRate = this.value;
    rotDuration[0] = 5 / this.value;
    startRotating(0);
});

pitchSlider[1].addEventListener('input', function(e){
    audioElement[1].preservesPitch = true;
    audioElement[1].playbackRate = this.value;
    rotDuration[1] = 5 / this.value;
    startRotating(1);
});

//handles the crossfader interaction
crossfaderSlider.addEventListener('input', function(e){

    //apply trigonometric smoothness on deck mixing
    var temp1 = parseFloat(this.value);
    var temp2 = 1 - parseFloat(this.value);
    try{
        crossfaderValue[0] = (Math.cos(temp1 * Math.PI/2));
    }catch(err){
        console.log(err);
    }
    try{
        crossfaderValue[1] = (Math.cos(temp2 * Math.PI/2));
    }catch(err){
        console.log(err);
    }

    //adjust gain values 
    gainNode[0].gain.value = parseFloat(gainSlider[0].value)*parseFloat(crossfaderValue[0]);
    gainNode[1].gain.value = parseFloat(gainSlider[1].value)*parseFloat(crossfaderValue[1]);
});

//(see below)
applyEchofilter(0);
applyEchofilter(1);

//--------------handles the echo button---------------------
function applyEchofilter(deckIndex) {
    echoButton[deckIndex].addEventListener('click', function (e){

        if(echo_disabled[deckIndex]) {
            //enable echo

            //connecting echo
            //SOURCE ---> TRACK ---> DELAY ---> GAIN ---> ECHO ---> DESTINATION
            //track[deckIndex].connect(echo[deckIndex]).connect(gainNode[deckIndex]);
            //gainNode[deckIndex].connect(echo[deckIndex])/*.connect(analyserNode[deckIndex])*/.connect(audioContext[deckIndex].destination);

            echo_disabled[deckIndex] = !echo_disabled[deckIndex];
            turnRed(echoButton[deckIndex].id);

            //SOURCE ---> TRACK ---> DELAY ---> GAIN ---> ECHO ---> DESTINATION
            echo[deckIndex].delayTime.value = 1;		
            feedbackE[deckIndex].gain.value = gainNode[deckIndex].gain.value;
            
            if(gainNode[deckIndex]) {
                //song keeps on playing till the delayed sound comes on
                tempEcho[deckIndex] = setInterval(muteGain, 1000);
                function muteGain() {	
                    if(!echo_disabled[deckIndex]) {
                        gainNode[deckIndex].gain.value = 0;//feedbackE[deckIndex].gain.value;
                    }
                    clearInterval(tempEcho[deckIndex]);
                }
            }

        } else {
            //disable echo 

            echo_disabled[deckIndex] = !echo_disabled[deckIndex];
            turnGrey(echoButton[deckIndex].id);

            feedbackE[deckIndex].gain.value = 0.6;
            gainNode[deckIndex].gain.value = parseFloat(gainSlider[deckIndex].value)*parseFloat(crossfaderValue[deckIndex]);

            //keep the echoed sound fading for 3 seconds
            tempEchoF[deckIndex] = setInterval(fadeGain, 3000);
            function fadeGain() {	
                if(echo_disabled[deckIndex]){
                    echo[deckIndex].delayTime.value = 0;
                    feedbackE[deckIndex].gain.value = 0;
                }
                clearInterval(tempEchoF[deckIndex]);
            }

            //gainNode[deckIndex].disconnect(echo[deckIndex]);
            //echo[deckIndex].disconnect(analyserNode[deckIndex]);
            //analyserNode[deckIndex].disconnect(audioContext[deckIndex].destination);
            //track[deckIndex].disconnect(echo[deckIndex]);
            //echo[deckIndex].disconnect(audioContext[deckIndex].destination);
        }
        
    });
}

//(see below)
applyPeriodicWave(0);
applyPeriodicWave(1);

//--------------handles the periodic wave button---------------------
function applyPeriodicWave(deckIndex){
    PeriodicWaveButton[deckIndex].addEventListener('click', function(e){
        if(PWaveDisabled[deckIndex]) {
            //enable periodic wave
            PWaveDisabled[deckIndex] = !PWaveDisabled[deckIndex];
            turnRed(PeriodicWaveButton[deckIndex].id);

            osc[deckIndex].connect(gainNode[deckIndex]);
            //osc[deckIndex].start();
        }else {
            //disable periodic wave
            PWaveDisabled[deckIndex] = !PWaveDisabled[deckIndex];
            turnGrey(PeriodicWaveButton[deckIndex].id);

            //osc[deckIndex].stop(0);
            osc[deckIndex].disconnect(gainNode[deckIndex]);
        }
    });
}

//(see below)
applyDistortionfilter(0);
applyDistortionfilter(1);

//--------------handles the distortion button---------------------
function applyDistortionfilter(deckIndex){
    distortionButton[deckIndex].addEventListener('click', function(e){
        if(distortionDisabled[deckIndex]) {
            //enable filter
            distortionDisabled[deckIndex] = !distortionDisabled[deckIndex];
            turnRed(distortionButton[deckIndex].id);
            //SOURCE ---> TRACK ---> DELAY ---> DISTORTION ---> GAIN ---> ANALYSER ---> DESTINATION
            //distortion[deckIndex] = audioContext[deckIndex].createWaveShaper();
            //distortion[deckIndex].curve = makeDistortionCurve(400);
            //distortion[deckIndex].oversample = 'none';
            //delay[deckIndex].connect(distortion[deckIndex]).connect(gainNode[deckIndex]);
            gainNode[deckIndex].connect(distortion[deckIndex]).connect(analyserNode[deckIndex]).connect(audioContext[deckIndex].destination);
        } else {
            //disable filter 
            distortionDisabled[deckIndex] = !distortionDisabled[deckIndex];
            turnGrey(distortionButton[deckIndex].id);
            //SOURCE ---> TRACK ---> DELAY ---> GAIN ---> ANALYSER ---> DESTINATION
            gainNode[deckIndex].disconnect(distortion[deckIndex]);
            //delay[deckIndex].connect(gainNode[deckIndex]);
        } 
    })
}

//--------------creates the distortion curve---------------------
function makeDistortionCurve(amount) {

	var k = typeof amount === 'number' ? amount : 50,
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

//(see below)
//applyBquadfilter(0);
//applyBquadfilter(1);

//--------------handles the bquad button---------------------
/*function applyBquadfilter(deckIndex){
    biquadButton[deckIndex].addEventListener('click', function(e){
        if(filter_disabled[deckIndex]) {
            //enable filter
            filter_disabled[deckIndex] = !filter_disabled[deckIndex];
            turnRed(biquadButton[deckIndex].id);
            //SOURCE ----> TRACK ---> BQUAD FILTER ---> DELAY ---> GAIN ---> ANALYSER ---> DESTINATION
            //track[deckIndex].disconnect(delay[deckIndex]);
            //filter[deckIndex] = audioContext[deckIndex].createBiquadFilter();
            //track[deckIndex].connect(filter[deckIndex]);
            //filter[deckIndex].connect(audioContext[deckIndex].destination)
            track[deckIndex].disconnect(gainNode[deckIndex]);
            track[deckIndex].connect(filter[deckIndex]).connect(gainNode[deckIndex]);
            //filter[deckIndex].connect(delay[deckIndex]);
        } else {
            //disable filter 
            filter_disabled[deckIndex] = !filter_disabled[deckIndex];
            turnGrey(biquadButton[deckIndex].id);
            //SOURCE ---> TRACK ---> DELAY ---> GAIN ---> ANALYSER ---> DESTINATION
            filter[deckIndex].disconnect(gainNode[deckIndex]);
            track[deckIndex].connect(gainNode[deckIndex]);
        }
    });
}*/


//(see below)
applyDelayfilter(0);
applyDelayfilter(1);

//--------------handles the delay button---------------------
function applyDelayfilter(deckIndex){
    delayButton[deckIndex].addEventListener('click', function(e){
        if(delay_disabled[deckIndex]) {
            //enable delay
            delay_disabled[deckIndex] = !delay_disabled[deckIndex];
            turnRed(delayButton[deckIndex].id);
            
            delay[deckIndex].delayTime.value = 0.5;
            feedback[deckIndex].gain.value = 0.7;

            track[deckIndex].connect(delay[deckIndex]).connect(gainNode[deckIndex]);
        } else {
            //disable delay 
            delay_disabled[deckIndex] = !delay_disabled[deckIndex];
            turnGrey(delayButton[deckIndex].id);

            delay[deckIndex].delayTime.value = 0;
            feedback[deckIndex].gain.value = 0;

            track[deckIndex].disconnect(delay[deckIndex]);
            delay[deckIndex].disconnect(gainNode[deckIndex]);
        }
    });
}

//(see below)
applyCut(0);
applyCut(1);

//--------------handles the cut button---------------------
function applyCut(deckIndex){
    cutButton[deckIndex].addEventListener('click', function(e){
        if(cut_disabled[deckIndex]){
            //enable cut
            cut_disabled[deckIndex] = !cut_disabled[deckIndex];
            turnRed(cutButton[deckIndex].id);

            //---------------------------------------------------
            //for some reason the first time executed this filter does not run correctly as 
            //tempCut interval does not repeat cut function properly. however after that 
            //every time tested the button works perfectly
            //---------------------------------------------------

            //every 300ms of song playing...
            tempCut[deckIndex] = setInterval(cut, 300);
            if(!called){
                tempFirstTimeCut[deckIndex] = setInterval(cut, 300);
            }
            function cut() {

                mute_disabled[deckIndex] = true;
                clearInterval(tempCut2[deckIndex]);
                //...there are 60ms of silence
                tempCut2[deckIndex] = setInterval(cut2, 60);
                function cut2() {
                    if(mute_disabled[deckIndex]) {
                        mute_disabled[deckIndex] = !mute_disabled[deckIndex];
                        gainNode[deckIndex].gain.value = 0;
                    }else {
                        gainNode[deckIndex].gain.value = parseFloat(gainSlider[deckIndex].value)*parseFloat(crossfaderValue[deckIndex]);
                    }
                }	
            }
        }else {
            clearInterval(tempCut2[deckIndex]);
            clearInterval(tempCut[deckIndex]);
            if(!called){
                clearInterval(tempFirstTimeCut[deckIndex]);
                called = true;
            }
            //disable cut
            cut_disabled[deckIndex] = !cut_disabled[deckIndex];
            turnGrey(cutButton[deckIndex].id);
            //restore gain value
            gainNode[deckIndex].gain.value = parseFloat(gainSlider[deckIndex].value)*parseFloat(crossfaderValue[deckIndex]);
        }
    });
}

//switch the colors of the buttons when activated/disabled
function turnRed(target){
    document.getElementById(target).style.background = "red";
    return;
}
function turnGrey(target){
    document.getElementById(target).style.background = "#666666";
    return;
}

//(see below)
onScratchInteraction.call(this, 0);
onScratchInteraction.call(this, 1);

var disko = document.getElementById("disk");

// functions

function initEverything(deckIndex){

}

function songsListHandler(deckIndex){//handles the songs list item interaction
    songsList[deckIndex].addEventListener('click', function(e){
        var thisId = e.target.id;

        //if user clicks everywhere at list but not on an item, do nothing..
        if (deckIndex===0 && thisId === "list1"){
            return;
        }
        if (deckIndex===1 && thisId === "list2"){
            return;
        }

        //if another songs plays and user selects another song, pause the previous audio element
        if (typeof audioElement[deckIndex] != "undefined") {
            if(!audioElement[deckIndex].paused){
                audioElement[deckIndex].pause();
                pauseScratch(deckIndex);
            }
        }

        //get selected item and declare it as the only selected
        var elementClicked = document.getElementById(thisId);
        allClicks[deckIndex].push(elementClicked);
        alert("Song " + elementClicked.innerHTML + " has been loaded to deck"+(deckIndex+1)+".");
        var j;
        for(j = 0;j < allClicks[deckIndex].length-1;j++){
            allClicks[deckIndex][j].classList.remove("active");
        }
        elementClicked.classList.add("active");

        //get file id number
        if(deckIndex === 0){
            var fileNumber = parseInt(thisId.substring(4))-1;
        }else{
            var fileNumber = parseInt(thisId.substring(4))-1001;
        }

        //init audio element based on user selection
        audioElement[deckIndex].src = URL.createObjectURL(files[deckIndex][fileNumber]);
        audioContext[deckIndex] = new AudioContext();
        track[deckIndex] = audioContext[deckIndex].createMediaElementSource(audioElement[deckIndex]);

        //init crossfader
        if(deckIndex === 0){
            var temp = parseFloat(crossfaderSlider.value);
        }else{
            var temp = 1 - parseFloat(crossfaderSlider.value);
        }
        crossfaderValue[deckIndex] = (Math.cos(temp * Math.PI/2));

        //init gain
        gainNode[deckIndex] = audioContext[deckIndex].createGain();
        track[deckIndex].connect(gainNode[deckIndex]);

        //init analyser
        analyserNode[deckIndex] = audioContext[deckIndex].createAnalyser();
        analyserNode[deckIndex].fftSize = 256;
        const bufferLength = analyserNode[deckIndex].frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.globalAlpha = 1;
        var c2 = document.getElementById("myCanvas2");
        var ctx2 = c2.getContext("2d");
        ctx2.globalAlpha = 0.5;
        const WIDTH = c.width; //1000
        const HEIGHT = c.height; //150

        let offset = 4; //space between bars, change with caution because high numbers will push the bars to the right and wont be shown (visualization data loss)
        
        let bars = analyserNode[deckIndex].fftSize / 2; //the fftSize from above determines the number of bars (if fftSize = 512, we have 256 bars.)
        let bar_width = WIDTH / (bars);
        //let bar_width = WIDTH / (bars) - offset; //to not lose any data, but it looks uglier

        if(deckIndex==0){
            
            function visualize0() {
                requestAnimationFrame(visualize0);
                analyserNode[deckIndex].getByteFrequencyData(dataArray);
                //ctx.fillStyle = "#54986f";
                ctx.fillRect(0, 0, WIDTH, HEIGHT);
                ctx.clearRect(0,0,WIDTH,HEIGHT);
                x = 0;
                for(let i = 0; i < dataArray.length; i = i + 1) {
                    ctx.fillStyle = 'rgb(' + (dataArray[i]+100) + ',50,50)';
                    ctx.fillRect(x, (HEIGHT - dataArray[i]), bar_width, dataArray[i]);
                    x += (bar_width + offset); 
                }
            }
    
            visualize0();
        }
        else if(deckIndex==1){
            function visualize1() {
                requestAnimationFrame(visualize1);
                analyserNode[deckIndex].getByteFrequencyData(dataArray);
                //ctx2.fillStyle = "#54986f";
                ctx2.fillRect(0, 0, WIDTH, HEIGHT);
                ctx2.clearRect(0,0,WIDTH,HEIGHT);
                x = 0;
                for(let i = 0; i < dataArray.length; i = i + 1) {
                    console.log("test");
                    color = "#00000";
                    ctx2.fillStyle = color;
                    ctx2.fillRect(x, (HEIGHT - dataArray[i]), bar_width, dataArray[i]);
                    x += (bar_width + offset); 
                }
            }
    
            visualize1();
        }

        var bufferLength1 = analyserNode[deckIndex].frequencyBinCount;
        var dataArray1 = new Uint8Array(bufferLength1);


        


        var canva1 = document.getElementById("canva1");
        var ctx1 = canva1.getContext("2d");

        var canva2 = document.getElementById("canva2");
        var ctx3 = canva2.getContext("2d");
        


        ctx1.clearRect(0, 0, canva1.width, canva1.height);
        
        if(deckIndex==0){
            function draw1() {
                requestAnimationFrame(draw1);
                analyserNode[deckIndex].getByteTimeDomainData(dataArray1);
                ctx1.fillStyle = 'rgb(200, 200, 200)';
                ctx1.fillRect(0, 0, canva1.width, canva1.height);

                ctx1.lineWidth = 2;
                ctx1.strokeStyle = 'rgb(0, 0, 0)';
                ctx1.beginPath();

                var sliceWidth = canva1.width * 1.0 / bufferLength1;
                var x = 0;

                for(var i = 0; i < bufferLength1; i++) {

                    var v = dataArray1[i] / 128.0;
                    var y = v * canva1.height/2;
            
                    if(i === 0) {
                        ctx1.moveTo(x, y);
                    } else {
                        ctx1.lineTo(x, y);
                    }
            
                    x += sliceWidth;
                }
                ctx1.lineTo(canva1.width, canva1.height/2);
                ctx1.stroke();
                
            }
            draw1();
        }
        else if(deckIndex==1){
            function draw2() {
                requestAnimationFrame(draw2);
                analyserNode[deckIndex].getByteTimeDomainData(dataArray1);
                ctx3.fillStyle = 'rgb(200, 200, 200)';
                ctx3.fillRect(0, 0, canva2.width, canva2.height);
    
                ctx3.lineWidth = 2;
                ctx3.strokeStyle = 'rgb(0, 0, 0)';
                ctx3.beginPath();
    
                var sliceWidth = canva2.width * 1.0 / bufferLength1;
                var x = 0;
    
                for(var i = 0; i < bufferLength1; i++) {
    
                    var v = dataArray1[i] / 128.0;
                    var y = v * canva2.height/2;
            
                    if(i === 0) {
                        ctx3.moveTo(x, y);
                    } else {
                        ctx3.lineTo(x, y);
                    }
            
                    x += sliceWidth;
                    }
                    ctx3.lineTo(canva2.width, canva2.height/2);
                    ctx3.stroke();
            }
            draw2();
        }

        gainNode[deckIndex].connect(analyserNode[deckIndex]).connect(audioContext[deckIndex].destination);
        gainNode[deckIndex].gain.value = parseFloat(gainSlider[deckIndex].value)*parseFloat(crossfaderValue[deckIndex]);


        //init bass filter
        bassFilterNode[deckIndex] = audioContext[deckIndex].createBiquadFilter();
        bassFilterNode[deckIndex].type = "lowshelf"; 
        bassFilterNode[deckIndex].frequency.value = 200;
        bassFilterNode[deckIndex].gain.value = bassSlider[deckIndex].value;
        gainNode[deckIndex].connect(bassFilterNode[deckIndex]).connect(analyserNode[deckIndex]).connect(audioContext[deckIndex].destination);

        //init treble filter
        trebleFilterNode[deckIndex] = audioContext[deckIndex].createBiquadFilter();
        trebleFilterNode[deckIndex].type = "highshelf"; 
        trebleFilterNode[deckIndex].frequency.value = 2000;
        trebleFilterNode[deckIndex].gain.value = trebleSlider[deckIndex].value;
        gainNode[deckIndex].connect(trebleFilterNode[deckIndex]).connect(analyserNode[deckIndex]).connect(audioContext[deckIndex].destination);

        //init dynamics compression filter
        compressorNode[deckIndex] = audioContext[deckIndex].createDynamicsCompressor();
        compressorNode[deckIndex].threshold.value = -50;
        compressorNode[deckIndex].knee.value = 40;
        compressorNode[deckIndex].ratio.value = 12;
        compressorNode[deckIndex].attack.value = 0;
        compressorNode[deckIndex].release.value = 0.25;

        //init middle filter
        middleFilterNode[deckIndex] = audioContext[deckIndex].createBiquadFilter();
        middleFilterNode[deckIndex].type = "peaking"; 
        middleFilterNode[deckIndex].frequency.value = 1000;
        middleFilterNode[deckIndex].Q.value = 1;
        middleFilterNode[deckIndex].gain.value = middleSlider[deckIndex].value;
        gainNode[deckIndex].connect(middleFilterNode[deckIndex]).connect(analyserNode[deckIndex]).connect(audioContext[deckIndex].destination);

        //init tremolo filter
        tremoloOsc[deckIndex] = audioContext[deckIndex].createOscillator();
        tremoloOsc[deckIndex].frequency.value = tremoloSlider[deckIndex].value;
        tremoloGain[deckIndex] = audioContext[deckIndex].createGain();
        tremoloOsc[deckIndex].connect(tremoloGain[deckIndex].gain);
        tremoloOsc[deckIndex].start(0);
        gainNode[deckIndex].connect(tremoloGain[deckIndex]).connect(analyserNode[deckIndex]).connect(audioContext[deckIndex].destination);

        //init frequency pass filter
        frequencyPassNode[deckIndex] = audioContext[deckIndex].createBiquadFilter();
        frequencyPassNode[deckIndex].type = "highpass";
        frequencyPassNode[deckIndex].frequency.value = 20;
        track[deckIndex].disconnect(gainNode[deckIndex]);
        track[deckIndex].connect(frequencyPassNode[deckIndex]).connect(gainNode[deckIndex]);

        //init distortion filter
        distortion[deckIndex] = audioContext[deckIndex].createWaveShaper();
        distortion[deckIndex].curve = makeDistortionCurve(400);
        distortion[deckIndex].oversample = 'none';
        
        //init periodic wave filter
        real[deckIndex] = new Float32Array(2);
        imag[deckIndex] = new Float32Array(2);
        osc[deckIndex] = audioContext[deckIndex].createOscillator();
        real[deckIndex][0] = 1;
        imag[deckIndex][0] = 1;
        real[deckIndex][1] = 0;
        imag[deckIndex][1] = 1;
        wave[deckIndex] = audioContext[deckIndex].createPeriodicWave(real[deckIndex], imag[deckIndex]);
        osc[deckIndex].setPeriodicWave(wave[deckIndex]);
        osc[deckIndex].start();

        //init Delay filter
        delay[deckIndex] = audioContext[deckIndex].createDelay();
        delay[deckIndex].delayTime.value = 0;
        feedback[deckIndex] = audioContext[deckIndex].createGain();
        feedback[deckIndex].gain.value = 0;
        //DELAY -> FEEDBACK -> DELAY
        delay[deckIndex].connect(feedback[deckIndex]);
        feedback[deckIndex].connect(delay[deckIndex]);
        //connecting delay
        //SOURCE ---> TRACK ---> DELAY ---> GAIN ---> ECHO ---> DESTINATION
        //track[deckIndex].connect(delay[deckIndex]).connect(gainNode[deckIndex]);


        //init Echo filter
		echo[deckIndex] = audioContext[deckIndex].createDelay();
		echo[deckIndex].delayTime.value = 0;		
		feedbackE[deckIndex] = audioContext[deckIndex].createGain();
		feedbackE[deckIndex].gain.value = 0;
		//ECHO -> FEEDBACK -> ECHO
		echo[deckIndex].connect(feedbackE[deckIndex]);
		feedbackE[deckIndex].connect(echo[deckIndex]);
        //connecting echo
        //SOURCE ---> TRACK ---> DELAY ---> GAIN ---> ECHO ---> DESTINATION
		gainNode[deckIndex].connect(echo[deckIndex]).connect(analyserNode[deckIndex]).connect(audioContext[deckIndex].destination);

        //add vinyl disk image to deck
        disk[deckIndex].src = "img/disk.png";
    });
}

function compressionButtonHandler(deckIndex){//handles compression button interaction
    compressionButton[deckIndex].addEventListener('click', function(e){

        //learn if button was activated or not
        var active = compressionButton[deckIndex].getAttribute('data-active');
        if(active == 'false'){//if not

            //activate compressor
            compressionButton[deckIndex].setAttribute('data-active', 'true');
            compressionButton[deckIndex].setAttribute('src', "img/compression-button-enabled.jpg");
            gainNode[deckIndex].connect(compressorNode[deckIndex]);
            compressorNode[deckIndex].connect(analyserNode[deckIndex]).connect(audioContext[deckIndex].destination);

        }else if(active == 'true'){//if it was
            
            //deactivate compressor
            compressionButton[deckIndex].setAttribute('data-active', 'false');
            compressionButton[deckIndex].setAttribute('src', "img/compression-button-disabled.jpg");
            gainNode[deckIndex].disconnect(compressorNode[deckIndex]);
            //compressorNode[deckIndex].disconnect(audioContext[1].destination);

        }
    });
}

function frequencyPassSliderHandler(deckIndex){//handles the frequency pass slider interaction
    frequencyPassSlider[deckIndex].addEventListener('input', function(e){

        var passVolume = 0;

        //given the slider position, declare if filter cuts off low or high frequencies
        if(this.value >= 10){
            frequencyPassNode[deckIndex].type = "highpass";
            passVolume = parseInt(this.value) - 10;
        }else{
            frequencyPassNode[deckIndex].type = "lowpass";
            passVolume = parseInt(this.value);
        }

        //adjust filter frequency by passing input value through an exponential function to get frequency value
        var volumeToFreq = 20*Math.pow(2, passVolume);
        if(volumeToFreq > 15000){
            volumeToFreq = 15000;
        }
        frequencyPassNode[deckIndex].frequency.value = volumeToFreq;

    });
}

//handles (play) button scratch rotation
function rotateScratch(deckIndex){

    isPlaying[deckIndex] = true;
    playButton[deckIndex].src = 'img/pause-button.png'
    transformBar(bar[deckIndex]);

    startRotating(deckIndex);

}

//handles (pause) button scratch rotation
function pauseScratch(deckIndex){

    isPlaying[deckIndex] = false;
    playButton[deckIndex].src = 'img/play-button.png'
    pauseRotating(deckIndex);

}

//handles (stop) button scratch rotation
function stopScratch(deckIndex){

    isPlaying[deckIndex] = false;
    playButton[deckIndex].src = 'img/play-button.png'
    restoreBar(bar[deckIndex]);

    //ideally we would like to use a function stopRotating() to restore disk initial position
    pauseRotating(deckIndex);

}

//needle from active to inactive
function restoreBar(thisBar){//top 20px, left 250px
    // must bring the bar back to initial position
    thisBar.style.transform = "rotate(0deg)"; 
    thisBar.style.left = "250px";
    thisBar.style.top = "20px";
}

//needle from inactive to active
function transformBar(thisBar){
    // must move the bar as to be in vinyl disk
    thisBar.style.transform = "rotate(30deg)"; 
    thisBar.style.left = "215px";
    thisBar.style.top = "05px";
}

//handles input song folder
function inputLoad(deckIndex){
    fileInput[deckIndex].onchange = function() {
        files[deckIndex] = this.files;

        //clears list from old items
        for(var i = 0; i < songsLinks[deckIndex].length; i++){
            songsLinks[deckIndex][i].remove();
        }
        songsLinks[deckIndex] = [];

        //accepts and shows only .mp3 files
        for (var i = 0; i < files[deckIndex].length; i++) {
            if (!files[deckIndex][i].name.endsWith(".mp3")){
                files[deckIndex].splice(i, 1);
            }
        }

        //loads all mp3 files to the list of the selected deck
        for (var i = 0; i < files[deckIndex].length; i++) {
            file = files[deckIndex][i];
            //songsArray[deckIndex].push(file.name);
            var a = document.createElement('a');
            songsLinks[deckIndex].push(a);
            if ( deckIndex === 0){
                a.id = "song" + (i+1);
            }else{
                a.id = "song" + (i+1001);
            }
            a.href = "#";
            a.innerHTML += file.name;
            songsList[deckIndex].appendChild(songsLinks[deckIndex][songsLinks[deckIndex].length - 1]);
        }

    };
}


///////////////////////////////
// -------  rotate  -------- //
///////////////////////////////

// special tribute https://codepen.io/hqy5345/pen/WNbeYYG

//handles mouse scratch interaction
function onScratchInteraction(deckIndex) {
  var init, rotate, start, stop, onPressStill,
    active = false,
    velocity = 0,
    angle = 0,
    rotation = 0,
    startAngle = 0,
    center = {
      x: 0,
      y: 0
    },
    R2D = 180 / Math.PI,
    rot = disk[deckIndex];

  //handles mouse listeners
  init = function() {
    rot = disk[deckIndex];

    rot.addEventListener("mousedown", start, false);
    $(document).bind('mousemove', function(event) {
      if (active === true) {
        event.preventDefault();
        rotate(event);
        $(rot).css("animation-play-state", "running");
      }
    });
    $(document).bind('mouseup', function(event) {
      if(active === true){
        event.preventDefault();
        stop(event);
      }
    });
  };

  onPressStill = function(){
    audioElement[deckIndex].playbackRate = 0;
  }

  //mouse pressed
  start = function(e) {

    // must stop animation in order to rotation throw mouse
    $(rot).css("animation-play-state", "paused");

    e.preventDefault();
    var bb = this.getBoundingClientRect(),
      t = bb.top,
      l = bb.left,
      h = bb.height,
      w = bb.width,
      x, y;
    center = {
      x: l + (w / 2),
      y: t + (h / 2)
    };``
    x = e.clientX - center.x;
    y = e.clientY - center.y;
    startAngle = R2D * Math.atan2(y, x);
    audioElement[deckIndex].preservesPitch = false;
    audioElement[deckIndex].playbackRate = 0;
    audioElement[deckIndex].play();
    // scratchOscillator[deckIndex].connect(scratchGrain[deckIndex]);
    // scratchGrain[deckIndex].connect(scratchFilter[deckIndex]);
    // scratchFilter[deckIndex].connect(scratchAudioContext[deckIndex].destination);

    return active = true;
  };

  //mouse moves when pressed
  rotate = function(e) {//SCRATCH EFFECT ONLY WORKS FOR FORWARD SCRATCH
    prevRotation = rotation;
    e.preventDefault();
    var x = e.clientX - center.x,
      y = e.clientY - center.y,
      d = R2D * Math.atan2(y, x);
    rotation = d - startAngle;
    rot.style.transform = "rotate(" + (angle + rotation) + "deg)";
    rot.style.animation = "paused";
    velocity = rotation - prevRotation;
    if(velocity < 0){
        velocity = 0;
    }
    //console.log(velocity);
    audioElement[deckIndex].playbackRate = velocity;

    // scratchOscillator[deckIndex].frequency.value = e.clientX;
    // scratchGrain[deckIndex].gain.value = e.clientY / window.innerHeight * 10;

    $(rot).css("animation-play-state", "running");
  };

  //mouse released
  stop = function() {
    angle += rotation;
    audioElement[deckIndex].playbackRate = 1;
    audioElement[deckIndex].preservesPitch = true;
    diskAngle[deckIndex] = angle;
    if(!isPlaying[deckIndex]){
        audioElement[deckIndex].pause();
    }
    // scratchOscillator[deckIndex].disconnect(scratchGrain[deckIndex]);
    // scratchGrain[deckIndex].disconnect(scratchFilter[deckIndex]);
    // scratchFilter[deckIndex].disconnect(scratchAudioContext[deckIndex].destination);

    // when we stop moving the disk it must start rotating again
    startRotating(deckIndex);

    return active = false;
  };

  init();

}

// disk starts rotating by animation, when user presses (play)
function startRotating(deckIndex){

    if(isPlaying[deckIndex] === true){
        disk[deckIndex].style.transform = "rotate(" + diskAngle[deckIndex] + "deg)";
        disk[deckIndex].style.animation = "rotation linear "+ rotDuration[deckIndex] +"s infinite";
    }

}

// disk is paused when user presses (pause/stop)
function pauseRotating(deckIndex){
        
    if(isPlaying[deckIndex] === false){
        //diskAngle[deckIndex] = disk[deckIndex].transform.animVal.getItem(0).angle;
        disk[deckIndex].style.animation = "paused";
    }
}