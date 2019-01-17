$(document).ready(function()
{



var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.strokeStyle = "Orange";


var posX = 130;
const lineStart = 90;
const lineLength = 30;
const counterValue = 20;
const posSpeed = 1;
const negSpeed = -1 * posSpeed;
const activeTime = 1000;
const audioPauseTime = 500;
var counter = counterValue;
var speed = posSpeed;
var active = true;
var randCompare = 0;
var trackNo = 0;

function drawLine() {
  ctx.beginPath();
  ctx.moveTo(posX,lineStart);
  ctx.lineTo(posX, lineStart + lineLength);
  ctx.stroke();
}

function moveLine () {
  posX += speed;
  
 /* if (posX < 0 || posX > canvas.width) {
    speed = speed * -1;
  }*/
}

function loop() {
  // clear old frame;
  counter --
  ctx.clearRect(0,0,canvas.width, canvas.height);
  moveLine();
  drawLine();
  if (counter >0){
    requestAnimationFrame(loop);
  }
  
}

function activate() {

  active = true;
}
drawLine();
//requestAnimationFrame(loop);



 /* (function(window, videojs) {
      //var player = window.player = videojs('videojs-vr-player');
     
    
  
    }(window, window.videojs));*/


     var socket = io();
        socket.connect('http://127.0.0.1:3000');
        

        socket.emit('wheel start', {chatroom: 'wheel'});
        socket.on('wheel left', function(msg){
           if (active){
            active = false;
            speed = negSpeed;
            counter = counterValue;
            requestAnimationFrame(loop);
            setTimeout(PlayNewAudio, audioPauseTime);
            //PlayNewAudio();
            setTimeout(activate, activeTime);
          }
         console.log("left");
        });

        socket.on('wheel right', function(msg){

          if (active){
            active = false;
            speed = posSpeed;
            counter = counterValue;
            requestAnimationFrame(loop);
            setTimeout(PlayNewAudio, audioPauseTime);
            setTimeout(activate, activeTime);
          }
          
          console.log("right");
          
        });



        function playNewLandmark(landmark){

            var vrVidContainer = document.getElementById("vr-vid-container");
            while (vrVidContainer.hasChildNodes()) {
              vrVidContainer.removeChild(vrVidContainer.firstChild);
            }

            var playImg = document.getElementsByTagName("img");
            for(var i = playImg.length - 1; 0 <= i; i--) {
              if(playImg[i] && playImg[i].parentElement){
                playImg[i].parentElement.removeChild(playImg[i]);
              }
            }
            
            console.log(playImg);
            /*playImg.outerHTML = "";
            delete playImg;*/
            //playImg.parentNode.removeChild(playImg);
            var source = document.createElement('source');
            var landmarkVidName = '/videos/vr/'+ landmark +'.mp4';
            source.setAttribute('src', landmarkVidName);
            var video = document.createElement('video');
            randomID = landmark + Date.now();
            console.log(randomID);
            video.id = randomID;
            video.controls = true;
            video.loop = true;
            video.muted = true;
            video.crossOrigin = "anonymous";
            source.setAttribute('type', 'video/mp4');
            video.classList.add("video-full");
            video.appendChild(source);
            vrVidContainer.appendChild(video);
            //window.videojs.players = {};
            //delete window.videojs.players;
            /*try { 
              delete window.player; 
            } 
            catch(e) 
            { 
              window["player"] = undefined; 
            }*/
            //window.player.delete;
            var playe = window.player = window.videojs(randomID);
            playe.mediainfo = playe.mediainfo || {};
            playe.mediainfo.projection = '360';
            playe.vr({projection: 'AUTO', debug: false, forceCardboard: false});
            playe.play();
            //setTimeout(function(){ playe.play(); }, 5000);
        }
        function PlayNewAudio(){

         /* var rand = Math.floor((Math.random() * 5));
          while (randCompare === rand){
            rand = Math.floor((Math.random() * 5));

          }
          randCompare = rand;*/
          var initialAudioPlayer = document.getElementsByTagName("audio")[0];
          //initialAudioPlayer.pause();
          //audio.pause();
          var allTracks = ['police','journey','girls','living','eclipse'];

          
          var audioTrack = allTracks[trackNo];
          trackNo++
          if (trackNo===5){
            trackNo=0
          }
          console.log(audioTrack);
          var aduioName = '/sounds/vr/'+ audioTrack +'.mp3';
          initialAudioPlayer.src = aduioName;
          //var audio = new Audio(aduioName);
          initialAudioPlayer.play();
        }

        socket.emit('RFID start', {chatroom: 'RFID'});
        socket.on('RFID detection', function(msg){
          console.log(msg.landmark);

          if (msg.landmark === 'venezuela'){

            playNewLandmark(msg.landmark);
            PlayNewAudio('Energy');
            
           /* //var pak = document.getElementById("videojs-vr-player");
            var vrVidContainer = document.getElementById("vr-vid-container");
            console.log(vrVidContainer.lastChild);
            while (vrVidContainer.hasChildNodes()) {
              vrVidContainer.removeChild(vrVidContainer.firstChild);
            }
            //vrVidContainer.removeChild(vrVidContainer.childNodes[0]);
            var source = document.createElement('source');
            source.setAttribute('src', '/videos/vr/venezuela.mp4');
            var video = document.createElement('video');
            video.id = 'videojs-vr-playe';
            video.appendChild(source);
            vrVidContainer.appendChild(video);




            //var video = document.getElementsByTagName("video")[0];
            //var source = document.getElementsByTagName("source")[0];
            //console.log(document.getElementsByTagName("source")[0].src);

            //document.getElementsByTagName("source")[0].src = "http://127.0.0.1:3000/videos/vr/venezuela.mp4"
            //var pooh = document.getElementsByTagName("source")[0]
            //document.getElementById('videojs-vr-player').src = "/videos/vr/venezuela.mp4" ;
            //pooh.setAttribute("src", "http://127.0.0.1:3000/videos/vr/venezuela.mp4");
            
            //source.src = "http://127.0.0.1:3000/videos/vr/venezuela.mp4";
            var playe = window.player = window.videojs('videojs-vr-playe');
            //playe.pause();
            //source.src = "http://127.0.0.1:3000/videos/vr/venezuela.mp4";
            //playe.children_[0].src = "http://127.0.0.1:3000/videos/vr/venezuela.mp4";
            //console.log(player.mediainfo);
            playe.mediainfo = playe.mediainfo || {};
            playe.mediainfo.projection = '360';
            //console.log(player.mediainfo);

            //console.log(playe);
            //console.log(player.vr());
            playe.vr({projection: 'AUTO', debug: false, forceCardboard: false});
            //playe.load();
            playe.play();
            //video.load();
            //video.play();
            //window.player.load();
            //window.player.play();*/
          }
          else if (msg.landmark === 'colos'){
            playNewLandmark(msg.landmark);
            PlayNewAudio('Tina');
          }
          else if (msg.landmark === 'venice'){
            playNewLandmark(msg.landmark);
            PlayNewAudio('Gondola');
          }

          else if (msg.landmark === 'newyork'){
            playNewLandmark(msg.landmark);
            PlayNewAudio('newyork');
          }

          else if (msg.landmark === 'dolphins'){
            playNewLandmark(msg.landmark);
            PlayNewAudio('Summer');
          }
          else if (msg.landmark === 'brain'){
            //playNewLandmark('puppies');
            PlayNewAudio('brain');
          } else {
            playNewLandmark(msg.landmark);
          }
           
        });
          
       


});
