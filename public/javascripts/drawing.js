var repeatFlag=0;
var repeat;
// for drawing object : Drawing
var Drawing= {
  Size : drSize, Color : drColor, Alpha : 1.0,
  mouseX : "",  mouseY : "",
  touchX : "",  touchY : "",
  drawLine1 : function(X,Y){
        $canvas2.drawLine({
          strokeStyle: this.Color, strokeWidth:this.Size,
          layer : true,  rounded: true,
          x1: X, y1: Y,   x2: X, y2: Y,
          groups: ['drawing' + drFlag + '_' + groupNameNumber],
        });
    this.touchX=X;
    this.touchY=Y;
  },
  drawLine2 : function(X,Y){
      tempData += "/D." + this.Size +"." + drColor +"." + this.touchX + "." + this.touchY + "." + X + "." + Y ;
      $canvas2.drawLine({
        strokeStyle: this.Color, strokeWidth:this.Size,
        layer : true,  rounded: true,
        x1: this.touchX, y1: this.touchY,   x2: X, y2: Y,
        groups: ['drawing' + drFlag + '_' + groupNameNumber],
      });
    this.touchX=X;
    this.touchY=Y;
  },
  tonMove : function(e) {
    e.preventDefault();
    if(stIndex==0){
      if(drFlag==0 || drFlag==1 || drFlag==2){
          var rect = e.target.getBoundingClientRect();
          var X = ~~(e.changedTouches[0].pageX - rect.left);
          var Y = ~~(e.changedTouches[0].pageY - rect.top);
          if( Drawing.touchX === ""){
            Drawing.drawLine1(X,Y);
          } else {
            Drawing.drawLine2(X,Y);
          }
      };
    };
  },
  tonClick : function(e) {
    ClickCount++;
    console.log("ClickCount : " + ClickCount);
    tempData+=".E/";

    var rect = e.target.getBoundingClientRect();
    var X = ~~(e.changedTouches[0].pageX - rect.left);
    var Y = ~~(e.changedTouches[0].pageY - rect.top);
    if(drFlag==0 && stIndex == 0){
        if( Drawing.touchX === ""){
          Drawing.drawLine1(X,Y);
        } else {
          Drawing.drawLine2(X,Y);
        };
      }else if(stIndex!=0){
        stamps(stIndex,2,stArray.length,X,Y);
        Canvasclear.part(1,$canvas1.getLayer(0).name);
        Text.text1();
        $canvas1.moveLayer("text1" ,0);
        switch(stIndex){
          case 3 :
            Sound.play(4);
            break;
          case 4 :
            Sound.play(5);
            break;
          case 5 :
            if(currentBg == 5){
              $canvas2.setLayer(bgArray[NUMofBACKGROUND],{
                  source:  'images/background/effel_sunny.jpg',
                  layer :true,
              }).drawLayers();
            Sound.play(2);
            }
            break;
          case 7 :
            if(currentBg == 5){
              $canvas2.setLayer(bgArray[NUMofBACKGROUND],{
                  source:  'images/background/effel_rain.jpg',
                  layer :true,
              }).drawLayers();
              Sound.play(1);
              if(repeatFlag != 7){
                clearInterval(repeat);
                repeat = setInterval("rain_animation()",500);
                repeatFlag=stIndex;
              }
            }
            break;
          case 8 :
            if(currentBg == 5){
              $canvas2.setLayer(bgArray[NUMofBACKGROUND],{
                  source:  'images/background/effel-snow.jpg',
                  layer :true,
              }).drawLayers();
              Sound.play(3);
              if(repeatFlag != 8){
                clearInterval(repeat);
                repeat = setInterval("snow_animation()",500);
                repeatFlag=stIndex;
              }
            }
            break;
          default:
            Sound.play(0);
            break;
        };
      }
      else{
      }
    },
    drawEnd : function() {
      Drawing.touchX = "";
      Drawing.touchY = "";
      undoArray.push("drawing" + drFlag + "_" + groupNameNumber);
      groupNameNumber +=1;
      if(stIndex==0)   writeLog(3,COLORS[Drawing.Color],Drawing.Size);
      else{
        setTimeout(function(){
          stIndex=0;
          if(shouldAnimate) update();
        },300);
      }
    },
  onMove : function(e) {
    e.preventDefault();
    if(stIndex==0){
      if(drFlag==0 || drFlag==1 || drFlag==2){
        if (e.buttons === 1 || e.which === 1) {
          var rect = e.target.getBoundingClientRect();
          var X = ~~(e.clientX - rect.left);
          var Y = ~~(e.clientY - rect.top);
          if( Drawing.touchX === ""){
            Drawing.drawLine1(X,Y);
          } else {
            Drawing.drawLine2(X,Y);
          }
        };
      };
    };
  },
  onClick : function(e) {
    if (e.button === 0) {
    ClickCount++;
    console.log("ClickCount : " + ClickCount);
    tempData+=".E/";
    var rect = e.target.getBoundingClientRect();
    var X = ~~(e.clientX - rect.left);
    var Y = ~~(e.clientY - rect.top);
    if(drFlag==0 && stIndex == 0){
        if( Drawing.touchX === ""){
          Drawing.drawLine1(X,Y);
        } else {
          Drawing.drawLine2(X,Y);
        };
      }else if(stIndex!=0){
        stamps(stIndex,2,stArray.length,X,Y);
        Canvasclear.part(1,$canvas1.getLayer(0).name);
        Text.text1();
        $canvas1.moveLayer("text1" ,0);
        switch(stIndex){
          case 1 :
            Sound.play(0);
          break;
          case 2 :
            Sound.play(0);
          break;
          case 3 :
            Sound.play(4);
            break;
          case 4 :
            Sound.play(5);
            break;
          case 5 :
            if(currentBg == 5)  Sound.play(2);
            else Sound.play(0);
            break;
          case 6 :
            Sound.play(0);
          break;
          case 7 :
            if(currentBg == 5)  Sound.play(1);
            else Sound.play(0);
            break;
          case 8 :
            if(currentBg == 5) Sound.play(3);
            else Sound.play(0);
            break;
          case 9 :
            Sound.play(0);
          break;
          case 10 :
            Sound.play(0);
          break;
          default:
            break;
        };
      }
      else{}
    }
    },
  };

function loadCanvas(data){
    ClickCount++;
    console.log("ClickCount : " + ClickCount);

    if(repeatFlag!=0){
        clearInterval(repeat);
        repeatFlag=0;
      }

    var splitedData = data.split("/");
    var i = 0;
    Canvasclear.all(2);
    for(i=0;i<splitedData.length;i++){
      if(splitedData[i].match(/S/)){
        var A = splitedData[i].split(".");
        stamps(A[1],2,stArray.length,~~A[2],~~A[3]);
        tempData += ".E/";
      }
      else if(splitedData[i].match(/V/)){
        var A = splitedData[i].split(".");
        view(A[1],2,NUMofBACKGROUND);
        $canvas2.moveLayer("view" + A[1] + "_" + NUMofBACKGROUND,0);
        currentBg = A[1]; bgIndex=A[1];
      }
      else if(splitedData[i].match(/D/)){
        var A = splitedData[i].split(".");
        tempData += "/D." + A[1] +"." + A[2] +"." + A[3] + "." + A[4] + "." + A[5] + "." + A[6] ;
        $canvas2.drawLine({
          strokeStyle: A[2], strokeWidth: ~~A[1],
          layer : true,  rounded: true,
          x1: ~~A[3], y1: ~~A[4],   x2: ~~A[5], y2: ~~A[6],
          groups: ['drawing0_' + groupNameNumber],
        });
        if(A[7] == "E"){
          undoArray.push("drawing0_" + groupNameNumber);
          groupNameNumber++;
          tempData += ".E/";
        }
      }
      else{
          console.log("error 001");
        }
      }
  }


var positionX = [ [1/3 , 7/12, 10/12],  [1/4, 1/2, 3/4],  [1/6, 5/12, 8/12]];
var positionY = [ 1/12, 1/2, 11/12, 1/12, 1/2, 11/12];
var count = 0;

function snow_animation(){
  Canvasclear.group(2,'snowing');
  var rand = Math.floor( Math.random() * 6 ) ;
  count+=1;

  if(count>2) count=0;
  if(rand==0) rand++;

  $canvas2.drawImage({
    source: 'images/background/snow/img0' + rand + ".png",  layer:false,
    x: positionX[count][0]*canvas2.width, y: positionY[count]*canvas2.height,
    width:(1/10)*canvas2.height, height: (1/10)*canvas2.height,
    fromCenter: true,  draggable:false,    name: 'snow1',
    groups: ['snowing'],
  });
  rand++;
  if(rand>5)  rand=1;
  $canvas2.drawImage({
    source: 'images/background/snow/img0' + rand + ".png",  layer:false,
    x: positionX[count][1]*canvas2.width, y: positionY[count+1]*canvas2.height,
    width:(1/10)*canvas2.height, height: (1/10)*canvas2.height,
    fromCenter: true,  draggable:false,    name: 'snow2',
    groups: ['snowing'],
  });
  rand++;
  if(rand>5)  rand=1;
  $canvas2.drawImage({
    source: 'images/background/snow/img0' + rand + ".png",  layer:false,
    x: positionX[count][2]*canvas2.width, y: positionY[count+2]*canvas2.height,
    width:(1/10)*canvas2.height, height: (1/10)*canvas2.height,
    fromCenter: true,  draggable:false,    name: 'snow3',
    groups: ['snowing'],
  });
};

function rain_animation(){
  Canvasclear.group(2,'raining');
  var rand = Math.floor( Math.random() * 6 ) ;
  count+=1;

  if(count>2) count=0;
  if(rand==0) rand++;

  $canvas2.drawImage({
    source: 'images/background/rain/img0' + rand + ".png",  layer:false,
    x: positionX[count][0]*canvas2.width, y: positionY[count]*canvas2.height,
    width:(1/10)*canvas2.height, height: (1/10)*canvas2.height,
    fromCenter: true,  draggable:false,    name: 'rain1',
    groups: ['raining'],
  });
  rand++;
  if(rand>5)  rand=1;
  $canvas2.drawImage({
    source: 'images/background/rain/img0' + rand + ".png",  layer:false,
    x: positionX[count][1]*canvas2.width, y: positionY[count+1]*canvas2.height,
    width:(1/10)*canvas2.height, height: (1/10)*canvas2.height,
    fromCenter: true,  draggable:false,    name: 'rain2',
    groups: ['raining'],
  });
  rand++;
  if(rand>5)  rand=1;
  $canvas2.drawImage({
    source: 'images/background/rain/img0' + rand + ".png",  layer:false,
    x: positionX[count][2]*canvas2.width, y: positionY[count+2]*canvas2.height,
    width:(1/10)*canvas2.height, height: (1/10)*canvas2.height,
    fromCenter: true,  draggable:false,    name: 'rain3',
    groups: ['raining'],
  });
};



$(function(){
  function sizing() {
    canvas2.height = (2/3)*container.offsetHeight;
    canvas2.width = container.offsetWidth;
    $canvas2.drawLayers();
  };

  //　add the event listner
  window.addEventListener('resize', function() {
    sizing();
  });
//  if(shouldTouch){
    canvas2.addEventListener('touchmove', Drawing.tonMove, false);
    canvas2.addEventListener('touchstart', Drawing.tonClick, false);
    canvas2.addEventListener('touchend', Drawing.drawEnd, false);
    canvas2.addEventListener('touchleave', Drawing.drawEnd, false);
//  }else{
    canvas2.addEventListener('mousemove', Drawing.onMove, false);
    canvas2.addEventListener('mousedown', Drawing.onClick, false);
    canvas2.addEventListener('mouseup', Drawing.drawEnd, false);
    canvas2.addEventListener('mouseout', Drawing.drawEnd, false);
//  }

  sizing();
  Canvasclear.all(2);
  view(currentBg,2,NUMofBACKGROUND);
  $canvas2.moveLayer("view1_5",0);
});

