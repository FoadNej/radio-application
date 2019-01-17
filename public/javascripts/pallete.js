var Circle = {
  paint : function(x,y,color){
    $canvas = $canvas1;
    canvas = canvas1;
    $canvas.drawArc({
      draggable: false, layer : true,
      fillStyle: color,
      x: x, y: y,
      radius: (1/4)*canvas.height,
      click : function(){
        Sound.play(0);
        ClickCount++;
        console.log("ClickCount : " + ClickCount)
        drColor = color;
        Drawing["Color"] = drColor;

          writeLog(4,COLORS[drColor]);

      },
      touchend : function(){
        Sound.play(0);
        ClickCount++;
        console.log("ClickCount : " + ClickCount)
        drColor = color;
        Drawing["Color"] = drColor;

          writeLog(4,COLORS[drColor]);
      },
    });
  },
  thickness : function(size,x,y,rad){
    $canvas = $canvas1;
    canvas = canvas1;
    var groupName = 'thickness' + size;

    $canvas.drawArc({
      groups: ['thickness' + size],
      fillStyle: '#FFF',
      strokeStyle: '#000',
      strokeWidth: size/10,
      x: x, y: y,
      radius: rad,
      layer:true,
    }).drawText({
      groups: ['thickness' + size],
      fillStyle: '#9cf',
      strokeStyle: '#25a',
      strokeWidth: 2,
      x: x, y: y,
      fontSize: rad-5,
      fontFamily: 'Verdana, sans-serif',
      text: '' +size,
      layer:true,
    }).setLayerGroup('thickness' + size,{
      click : function(){
        Sound.play(0);
        ClickCount++;
        console.log("ClickCount : " + ClickCount)
        drSize = size;
        Drawing["Size"] = drSize;
        writeLog(5, drSize);
      },
      touchend : function(){
        Sound.play(0);
        ClickCount++;
        console.log("ClickCount : " + ClickCount)
        drSize = size;
        Drawing["Size"] = drSize;
        writeLog(5, drSize);
      },
    });
  },
  undo : function(x,y){
    $canvas = $canvas1;
    canvas = canvas1;

    $canvas.drawImage({
      source: 'images/UNDO.png',  layer:true,
      x: x, y: y,
      width:(1/2)*canvas.height, height: (1/2)*canvas.height,
      fromCenter: true,  draggable:false,
      click : function(){
        Sound.play(0);
        ClickCount++;
        console.log("ClickCount : " + ClickCount)
        Canvasclear.group(2,undoArray[undoArray.length - 1]);
        undoArray.pop();
        var A = tempData.split("E/");
        A.pop();
        tempData = A.join("E/");

          writeLog(6);
      },
      touchend : function(){
        Sound.play(0);
        ClickCount++;
        console.log("ClickCount : " + ClickCount)
        Canvasclear.group(2,undoArray[undoArray.length - 1]);
        undoArray.pop();

        var A = tempData.split("E/");
        A.pop();
        tempData = A.join("E/");

          writeLog(6);
      },
    });
  },
  save : function(x,y){
    $canvas = $canvas1;
    canvas = canvas1;

    $canvas.drawImage({
      source: 'images/SAVE.png',  layer:true,
      x: x, y: y,
      width:(1/2)*canvas.height, height: (1/2)*canvas.height,
      fromCenter: true,  draggable:false,
      click : function(){
        Sound.play(0);
        imgArray[galleryNumber].onload = function(){
          imgArray[galleryNumber].width = $gallery.width()*(3/4);
          picture[galleryNumber].appendChild(imgArray[galleryNumber]);
          memoryCanvasArray[galleryNumber] = tempData;

          var D = new Date();
          var name =  Math.floor(new Date().getTime()/1000) + "-pic" + (galleryNumber+1) + ".png";
          var address = "picture/" + userName + "/" + name;

          Send_Data(userName,galleryNumber+1, memoryCanvasArray[galleryNumber], imgArray[galleryNumber].src, address);
          writeLog(7, address);
          galleryNumber += 1;
          if(galleryNumber==5)  galleryNumber=0;
        }
        imgArray[galleryNumber].src = canvas2.toDataURL('image/png');

        if(ClickCount>=3){
          console.log("You got coin!!");
          $.get( "http://192.168.42.1:8082/command?action=dispense&coinNo=1", function( data ) {
          //$( ".result" ).html( data );
          });
          console.log("The sum of ClickCount is " + ClickCount);
          ClickCount=0;
        }
      },
      touchend : function(){
        Sound.play(0);
        // var img = new Image();
        imgArray[galleryNumber].onload = function(){
          imgArray[galleryNumber].width = $gallery.width()*(3/4);
          picture[galleryNumber].appendChild(imgArray[galleryNumber]);
          memoryCanvasArray[galleryNumber] = tempData;

          var D = new Date();
          var name =  Math.floor(new Date().getTime()/1000) + "-pic" + (galleryNumber+1) + ".png";
          var address = "picture/" + userName + "/" + name;

          Send_Data(userName,galleryNumber+1, memoryCanvasArray[galleryNumber], imgArray[galleryNumber].src, address);
          writeLog(7, address);
          galleryNumber += 1;
          if(galleryNumber==5)  galleryNumber=0;
        }
        imgArray[galleryNumber].src = canvas2.toDataURL('image/png');
        if(ClickCount>=3){
          console.log("You've got coin!!");
          $.get( "http://192.168.42.1:8082/command?action=dispense&coinNo=1", function( data ) {
          //$( ".result" ).html( data );
          });
          console.log("The sum of ClickCount is " + ClickCount);
          ClickCount=0;
        }
      },
    });
  },
  back: function(x,y){
    $canvas =$canvas1;
    canvas = canvas1;
    $canvas.drawImage({
      source: 'images/back2.png',  layer:true,
      x: x, y: y,
      width:(1/30)*canvas.width, height: canvas.height,
      fromCenter: false,  draggable:false,
      click : function(){
        Sound.play(0);
        writeLog(8);
        window.location.href = "/";
      },
      touchend : function(){
        Sound.play(0);
        writeLog(8);
        window.location.href= "/";
      },
    });
  }
}

var requestAnimationFrame = ( function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function( callback ){
                window.setTimeout( callback, 1000.0 / 60.0 );
            };
} )();

  var cirArrayX = Array();
  var stArrayX =  Array();
  var bgArrayX = Array();
  var st_distance = 0;
  var bg_distance = 0;

  function update(){
    Canvasclear.group(3,'palleteComponent');

    for(var i=0;i<NUMofBACKGROUND;i++){
      view(i+1,3,i,bgArrayX[i],(3/4)*canvas3.height);
      if(bgArrayX[i] > canvas3.width){
        bgArrayX[i] = bg_distance;
      } else {
        bgArrayX[i]+=1;
      }
    }


    for(i=0;i<NUMofSTAMP;i++){
      stamps(i+1,3,i,stArrayX[i],(1/4)*canvas3.height);
      if(stArrayX[i] > canvas3.width){
        stArrayX[i] = st_distance;
      } else {
        stArrayX[i] +=1;
      }
    }
    if(stIndex==0){
      requestAnimationFrame( update );
    }
  }


function initPositionForCanvas3(){
  var i = 0;
  Canvasclear.all(3);

  if((canvas3.width/NUMofSTAMP) > (1/2)*canvas3.height){
    for(i=0; i < NUMofSTAMP; i++){
        stArrayX[i] =  ((canvas3.width/NUMofSTAMP) * (i+(1/2)));
        if(!shouldAnimate)        stamps(i+1,3,i,stArrayX[i],(1/4)*canvas3.height);
    }
  }else{
    st_distance = canvas3.width - (NUMofSTAMP * (2/3) * canvas3.height);
    for(i=0; i < NUMofSTAMP; i++){
        stArrayX[i] =  (((2/3)*canvas3.height) * (i+1/2));
        if(!shouldAnimate)        stamps(i+1,3,i,stArrayX[i],(1/4)*canvas3.height);
    }
  }

  if((canvas3.width/NUMofBACKGROUND) > (1/2)*canvas3.height){
    for(i=0; i < NUMofBACKGROUND; i++){
        bgArrayX[i] = ((canvas3.width/NUMofBACKGROUND) * (i+1/2));
        if(!shouldAnimate)        view(i+1,3,i,bgArrayX[i],(3/4)*canvas3.height);
    }
  }else{
    bg_distance = canvas3.width - (NUMofBACKGROUND * (2/3) * canvas3.height);
    for(i=0; i < NUMofBACKGROUND; i++){
        bgArrayX[i] = (((2/3)*canvas3.height) * (i+1/2));
        if(!shouldAnimate)        view(i+1,3,i,bgArrayX[i],(3/4)*canvas3.height);
    }
  }
        if(shouldAnimate)  requestAnimationFrame( update );
}



$(function(){

  sizing();

  function sizing() {
    canvas3.height = (6/30)*container.offsetHeight;
    canvas3.width = container.offsetWidth;
    initPositionForCanvas3();

    for(var i=0; i<5;i++){
      $picture[i].css("left", $gallery.width()*(0/6));
      $picture[i].css("top", $gallery.height()*(((15*i)+3)/80));
      $picture[i].css("width", $gallery.width()*(3/4)+ 'px');
      $picture[i].css("height", $gallery.height()*(1/7)+ 'px');
      if(imgArray[i] != null){
        imgArray[i].width = $gallery.width()*(3/4);
      }
    }
  }

  window.addEventListener('resize', function() {
    sizing();
  });

  picture[0].addEventListener('touchend',function(e){loadCanvas(memoryCanvasArray[0]);},false);
  picture[1].addEventListener('touchend',function(e){loadCanvas(memoryCanvasArray[1]);},false);
  picture[2].addEventListener('touchend',function(e){loadCanvas(memoryCanvasArray[2]);},false);
  picture[3].addEventListener('touchend',function(e){loadCanvas(memoryCanvasArray[3]);},false);
  picture[4].addEventListener('touchend',function(e){loadCanvas(memoryCanvasArray[4]);},false);

  picture[0].addEventListener('click',function(e){loadCanvas(memoryCanvasArray[0]);},false);
  picture[1].addEventListener('click',function(e){loadCanvas(memoryCanvasArray[1]);},false);
  picture[2].addEventListener('click',function(e){loadCanvas(memoryCanvasArray[2]);},false);
  picture[3].addEventListener('click',function(e){loadCanvas(memoryCanvasArray[3]);},false);
  picture[4].addEventListener('click',function(e){loadCanvas(memoryCanvasArray[4]);},false);

  stArray = ["stamp1_0","stamp2_1","stamp3_2","stamp4_3","stamp5_4",];
  bgArray = ["view1_0","view2_1","view3_2","view4_3","view5_4","view6_5","view7_6","view8_7","view9_8","view10_9"];

 // initPosition();

});

