var Text = {
  text1 : function(){
    $canvas1.drawText({
      fillStyle: "#000000",   fontSize:(1/4)*canvas1.height,    fontFamily:"Arial", layer:true,
     x:(3/20)*canvas1.width, y:(1/2)*canvas1.height,
      text:" Select ",
      name : "text1",
    });
  },
  text2 : function(){
    $canvas1.drawText({
      fillStyle: "#000000",   fontSize:(1/4)*canvas1.height,    fontFamily:"Arial", layer:true,
     x:(3/20)*canvas1.width, y:(1/2)*canvas1.height,
      text:" Touch",
      name : "text2",
    });
  },
  text3 : function(x,y){
    $canvas1.drawText({
      fillStyle: "#000000",   fontSize:(1/4)*canvas1.height,    fontFamily:"Arial", layer:true,
     x: x, y:y,
      text:" Thickness ",
      name : "text3",
    });
  },
  text4 : function(x,y){
    $canvas1.drawText({
      fillStyle: "#000000",   fontSize:(1/4)*canvas1.height,    fontFamily:"Arial", layer:true,
     x: x, y:y,
      text:" Colors ",
      name : "text4",
    });
  },
}
/*  Circle.thickness(10,cirArrayX[8],(1/2)*canvas1.height,10);
  Circle.thickness(20,cirArrayX[9],(1/2)*canvas1.height,20);
  Circle.thickness(30,cirArrayX[10],(1/2)*canvas1.height,30);
*/
$(function(){

  sizing();
  function sizing() {
    canvas1.height = (4/30)*container.offsetHeight;
    canvas1.width = container.offsetWidth;
    $canvas1.drawLayers();
  }

  window.addEventListener('resize', function() {
    sizing();
  });

  Text.text1();
  $canvas1.moveLayer("text1" ,0);
});