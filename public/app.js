var width = window.innerWidth;
var height = window.innerHeight;

function update(activeAnchor) {
    var group = activeAnchor.getParent();
    var topLeft = group.get('.topLeft')[0];
    var topRight = group.get('.topRight')[0];
    var bottomRight = group.get('.bottomRight')[0];
    var bottomLeft = group.get('.bottomLeft')[0];
    var topMiddle = group.get('.topMiddle')[0];

    var image = group.get('Image')[0];

    var anchorX = activeAnchor.getX();
    var anchorY = activeAnchor.getY();
            
    var rotateFlage = false;
    var dir = 0;

    // update anchor positions
    switch (activeAnchor.getName()) {
        case 'topLeft':
            topRight.setY(anchorY);
            bottomLeft.setX(anchorX);
            break;
        // case 'topRight':
        //     rotateFlage=true;
        //     var diffx = (topRight.getX()-topLeft.getX());
        //     var diffy = (topRight.getY()-topLeft.getY());
        //     var dir=(diffx < 0) ? 
        //         180*Math.atan(diffy/diffx)/(Math.PI) - 180
        //         :
        //         180*Math.atan(diffy/diffx)/(Math.PI);
        //     break;
        case 'topRight':
            topLeft.setY(anchorY);
            bottomRight.setX(anchorX);
            break;
        case 'bottomRight':
            bottomLeft.setY(anchorY);
            topRight.setX(anchorX);
            break;
        case 'bottomLeft':
            bottomRight.setY(anchorY);
            topLeft.setX(anchorX);
            break;
        case 'topMiddle':
            rotateFlage=true;

var center = {x: image.width() / 2, y: image.height() / 2};
var top = {x: image.width() / 2, y: - image.height() / 2};
var current = {x: topMiddle.getX(), y: topMiddle.getY()};

var vect1 = {
    x: top.x - center.x,
    y: top.y - center.y
};
var vect2 = {
    x: current.x - center.x,
    y: current.y - center.y
};
var cosA = (vect2.x * vect1.x + vect2.y * vect1.y) / 
    (Math.sqrt(Math.pow(vect1.x,2) + Math.pow(vect1.y,2))*
    (Math.sqrt(Math.pow(vect2.x,2) + Math.pow(vect2.y,2))));
var angle = 180*Math.acos(cosA)/Math.PI;
var dir1 = (current.x > image.width() / 2) ? angle : 360 - angle;

        break;
    }

    image.position({ x:0, y:0});

    var radius = image.height();
console.log({x: radius * cosA, y: radius * Math.sqrt(1 - Math.pow(cosA, 2))});
    if(rotateFlage){
        image.rotation(dir1);
    }
    else{
        var width = topRight.getX() - topLeft.getX();
        var height = bottomLeft.getY() - topLeft.getY();
        if(width && height) {
            image.width(width);
            image.height(height);
        }
    }
}
function addAnchor(group, x, y, name) {
    var stage = group.getStage();
    var layer = group.getLayer();
    var anchor = new Konva.Circle({
        x: x,
        y: y,
        stroke: '#666',
        fill: '#ddd',
        strokeWidth: 2,
        radius: 8,
        name: name,
        draggable: true,
        dragOnTop: false,
        offset: {
            x: 100,
            y: 138 / 2
        }
    });
    anchor.on('dragmove', function() {
        update(this);
        layer.draw();
    });
    anchor.on('mousedown touchstart', function() {
      group.setDraggable(false);
      this.moveToTop();
    });
    anchor.on('dragend', function() {
        group.setDraggable(true);
        layer.draw();
    });
    // add hover styling
    anchor.on('mouseover', function() {
        var layer = this.getLayer();
        document.body.style.cursor = 'pointer';
        this.setStrokeWidth(4);
        layer.draw();
    });
    anchor.on('mouseout', function() {
        var layer = this.getLayer();
        document.body.style.cursor = 'default';
        this.setStrokeWidth(2);
        layer.draw();
    });

    group.add(anchor);
}


//creating stage
//container: containerID
var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});

//creating layer
var layer = new Konva.Layer();
//adding layer to the stage
stage.add(layer);



//wtf chapter1
var canvas = document.createElement('canvas');
canvas.width = stage.width();
canvas.height = stage.height();

var background = new Konva.Image({
  image: canvas,
  x: 0,
  y: 0,
  stroke: 'tomato'
});

layer.add(background);
stage.draw();




// darth vader
var darthVaderImg = new Konva.Image({
    width: 200,
    height: 138,
    stroke: 'green',
    strokeWidth: 5,
    offset: {
        x: 100,
        y: 138 / 2
    }
});
// yoda
var yodaImg = new Konva.Image({
    width: 93,
    height: 104,
    stroke: 'green',
    strokeWidth: 5,
    offset: {
        x: 100,
        y: 138 / 2
    }
});


var darthVaderGroup = new Konva.Group({
  x: 360,
  y: 300,
  draggable: true
});
var yodaGroup = new Konva.Group({
  x: 200,
  y: 190,
  draggable: true
});


//adding group to layer
layer.add(darthVaderGroup);
layer.add(yodaGroup);

//adding shape&anchors to group 
darthVaderGroup.add(darthVaderImg);
// addAnchor(darthVaderGroup, 0, 0, 'topLeft');
// addAnchor(darthVaderGroup, 200, 0, 'topRight');
// addAnchor(darthVaderGroup, 200, 138, 'bottomRight');
// addAnchor(darthVaderGroup, 0, 138, 'bottomLeft');

addAnchor(darthVaderGroup, 100, -69, 'topMiddle');

yodaGroup.add(yodaImg);
// addAnchor(yodaGroup, 0, 0, 'topLeft');
// addAnchor(yodaGroup, 93, 0, 'topRight');
// addAnchor(yodaGroup, 93, 104, 'bottomRight');
// addAnchor(yodaGroup, 0, 104, 'bottomLeft');

addAnchor(yodaGroup, 93 / 2, -52, 'topMiddle');


var imageObj1 = new Image();
imageObj1.onload = function() {
    darthVaderImg.image(imageObj1);
    darthVaderImg.strokeEnabled(false);
    layer.draw();
};
imageObj1.src = '/konvaRotation/files/darth-vader.jpg';

var imageObj2 = new Image();
imageObj2.onload = function() {
    yodaImg.image(imageObj2);
    yodaImg.strokeEnabled(false);
    layer.draw();
};
imageObj2.src = '/konvaRotation/files/yoda.jpg';




//wtf chapter2 adding listeners

var shapes = [],
    toggle = false;

shapes.push(darthVaderImg);
shapes.push(yodaImg);

function addListeners(shape) {
    shape.on('click mousedown', (e) => {
    var target = e.target;

    //removing selection
    shapes.forEach(shape => shape.strokeEnabled(false));
    
    target.strokeEnabled(true);
    // target.moveToTop();
    layer.draw();
  })
}

shapes.forEach(shape => addListeners(shape));

background.on('click', (e) => {
  shapes.forEach(shape => shape.strokeEnabled(false));
  layer.draw();
});

function createPolygon(e) {
  coords = {
    x: e.evt.offsetX,
    y: e.evt.offsetY
  };
  
  width = -Math.abs(coordsStart.x - coords.x);
  height = Math.abs(coordsStart.y - coords.y);

  var rect = new Konva.Rect({
    x: coordsStart.x,
    y: coordsStart.y,
    width,
    height,
    fill: 'green'
  });

  layer.add(rect);
  stage.add(layer);
}

background.on('mousedown', (e) => {
  coordsStart = {
    x: e.evt.offsetX,
    y: e.evt.offsetY
  };

  toggle = !toggle
});

background.on('mouseup', () => toggle = !toggle);
// background.on('mousemove', (e) => toggle && createPolygon(e));


// background.on('mouseup', (e) => console.log('event', e));



//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL3NjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxudmFyIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZShhY3RpdmVBbmNob3IpIHtcclxuICAgIHZhciBncm91cCA9IGFjdGl2ZUFuY2hvci5nZXRQYXJlbnQoKTtcclxuICAgIHZhciB0b3BMZWZ0ID0gZ3JvdXAuZ2V0KCcudG9wTGVmdCcpWzBdO1xyXG4gICAgdmFyIHRvcFJpZ2h0ID0gZ3JvdXAuZ2V0KCcudG9wUmlnaHQnKVswXTtcclxuICAgIHZhciBib3R0b21SaWdodCA9IGdyb3VwLmdldCgnLmJvdHRvbVJpZ2h0JylbMF07XHJcbiAgICB2YXIgYm90dG9tTGVmdCA9IGdyb3VwLmdldCgnLmJvdHRvbUxlZnQnKVswXTtcclxuICAgIHZhciB0b3BNaWRkbGUgPSBncm91cC5nZXQoJy50b3BNaWRkbGUnKVswXTtcclxuXHJcbiAgICB2YXIgaW1hZ2UgPSBncm91cC5nZXQoJ0ltYWdlJylbMF07XHJcblxyXG4gICAgdmFyIGFuY2hvclggPSBhY3RpdmVBbmNob3IuZ2V0WCgpO1xyXG4gICAgdmFyIGFuY2hvclkgPSBhY3RpdmVBbmNob3IuZ2V0WSgpO1xyXG4gICAgICAgICAgICBcclxuICAgIHZhciByb3RhdGVGbGFnZSA9IGZhbHNlO1xyXG4gICAgdmFyIGRpciA9IDA7XHJcblxyXG4gICAgLy8gdXBkYXRlIGFuY2hvciBwb3NpdGlvbnNcclxuICAgIHN3aXRjaCAoYWN0aXZlQW5jaG9yLmdldE5hbWUoKSkge1xyXG4gICAgICAgIGNhc2UgJ3RvcExlZnQnOlxyXG4gICAgICAgICAgICB0b3BSaWdodC5zZXRZKGFuY2hvclkpO1xyXG4gICAgICAgICAgICBib3R0b21MZWZ0LnNldFgoYW5jaG9yWCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vIGNhc2UgJ3RvcFJpZ2h0JzpcclxuICAgICAgICAvLyAgICAgcm90YXRlRmxhZ2U9dHJ1ZTtcclxuICAgICAgICAvLyAgICAgdmFyIGRpZmZ4ID0gKHRvcFJpZ2h0LmdldFgoKS10b3BMZWZ0LmdldFgoKSk7XHJcbiAgICAgICAgLy8gICAgIHZhciBkaWZmeSA9ICh0b3BSaWdodC5nZXRZKCktdG9wTGVmdC5nZXRZKCkpO1xyXG4gICAgICAgIC8vICAgICB2YXIgZGlyPShkaWZmeCA8IDApID8gXHJcbiAgICAgICAgLy8gICAgICAgICAxODAqTWF0aC5hdGFuKGRpZmZ5L2RpZmZ4KS8oTWF0aC5QSSkgLSAxODBcclxuICAgICAgICAvLyAgICAgICAgIDpcclxuICAgICAgICAvLyAgICAgICAgIDE4MCpNYXRoLmF0YW4oZGlmZnkvZGlmZngpLyhNYXRoLlBJKTtcclxuICAgICAgICAvLyAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndG9wUmlnaHQnOlxyXG4gICAgICAgICAgICB0b3BMZWZ0LnNldFkoYW5jaG9yWSk7XHJcbiAgICAgICAgICAgIGJvdHRvbVJpZ2h0LnNldFgoYW5jaG9yWCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2JvdHRvbVJpZ2h0JzpcclxuICAgICAgICAgICAgYm90dG9tTGVmdC5zZXRZKGFuY2hvclkpO1xyXG4gICAgICAgICAgICB0b3BSaWdodC5zZXRYKGFuY2hvclgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdib3R0b21MZWZ0JzpcclxuICAgICAgICAgICAgYm90dG9tUmlnaHQuc2V0WShhbmNob3JZKTtcclxuICAgICAgICAgICAgdG9wTGVmdC5zZXRYKGFuY2hvclgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd0b3BNaWRkbGUnOlxyXG4gICAgICAgICAgICByb3RhdGVGbGFnZT10cnVlO1xyXG5cclxudmFyIGNlbnRlciA9IHt4OiBpbWFnZS53aWR0aCgpIC8gMiwgeTogaW1hZ2UuaGVpZ2h0KCkgLyAyfTtcclxudmFyIHRvcCA9IHt4OiBpbWFnZS53aWR0aCgpIC8gMiwgeTogLSBpbWFnZS5oZWlnaHQoKSAvIDJ9O1xyXG52YXIgY3VycmVudCA9IHt4OiB0b3BNaWRkbGUuZ2V0WCgpLCB5OiB0b3BNaWRkbGUuZ2V0WSgpfTtcclxuXHJcbnZhciB2ZWN0MSA9IHtcclxuICAgIHg6IHRvcC54IC0gY2VudGVyLngsXHJcbiAgICB5OiB0b3AueSAtIGNlbnRlci55XHJcbn07XHJcbnZhciB2ZWN0MiA9IHtcclxuICAgIHg6IGN1cnJlbnQueCAtIGNlbnRlci54LFxyXG4gICAgeTogY3VycmVudC55IC0gY2VudGVyLnlcclxufTtcclxudmFyIGNvc0EgPSAodmVjdDIueCAqIHZlY3QxLnggKyB2ZWN0Mi55ICogdmVjdDEueSkgLyBcclxuICAgIChNYXRoLnNxcnQoTWF0aC5wb3codmVjdDEueCwyKSArIE1hdGgucG93KHZlY3QxLnksMikpKlxyXG4gICAgKE1hdGguc3FydChNYXRoLnBvdyh2ZWN0Mi54LDIpICsgTWF0aC5wb3codmVjdDIueSwyKSkpKTtcclxudmFyIGFuZ2xlID0gMTgwKk1hdGguYWNvcyhjb3NBKS9NYXRoLlBJO1xyXG52YXIgZGlyMSA9IChjdXJyZW50LnggPiBpbWFnZS53aWR0aCgpIC8gMikgPyBhbmdsZSA6IDM2MCAtIGFuZ2xlO1xyXG5cclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBpbWFnZS5wb3NpdGlvbih7IHg6MCwgeTowfSk7XHJcblxyXG4gICAgdmFyIHJhZGl1cyA9IGltYWdlLmhlaWdodCgpO1xyXG5jb25zb2xlLmxvZyh7eDogcmFkaXVzICogY29zQSwgeTogcmFkaXVzICogTWF0aC5zcXJ0KDEgLSBNYXRoLnBvdyhjb3NBLCAyKSl9KTtcclxuICAgIGlmKHJvdGF0ZUZsYWdlKXtcclxuICAgICAgICBpbWFnZS5yb3RhdGlvbihkaXIxKTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgdmFyIHdpZHRoID0gdG9wUmlnaHQuZ2V0WCgpIC0gdG9wTGVmdC5nZXRYKCk7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IGJvdHRvbUxlZnQuZ2V0WSgpIC0gdG9wTGVmdC5nZXRZKCk7XHJcbiAgICAgICAgaWYod2lkdGggJiYgaGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIGltYWdlLndpZHRoKHdpZHRoKTtcclxuICAgICAgICAgICAgaW1hZ2UuaGVpZ2h0KGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGFkZEFuY2hvcihncm91cCwgeCwgeSwgbmFtZSkge1xyXG4gICAgdmFyIHN0YWdlID0gZ3JvdXAuZ2V0U3RhZ2UoKTtcclxuICAgIHZhciBsYXllciA9IGdyb3VwLmdldExheWVyKCk7XHJcbiAgICB2YXIgYW5jaG9yID0gbmV3IEtvbnZhLkNpcmNsZSh7XHJcbiAgICAgICAgeDogeCxcclxuICAgICAgICB5OiB5LFxyXG4gICAgICAgIHN0cm9rZTogJyM2NjYnLFxyXG4gICAgICAgIGZpbGw6ICcjZGRkJyxcclxuICAgICAgICBzdHJva2VXaWR0aDogMixcclxuICAgICAgICByYWRpdXM6IDgsXHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBkcmFnZ2FibGU6IHRydWUsXHJcbiAgICAgICAgZHJhZ09uVG9wOiBmYWxzZSxcclxuICAgICAgICBvZmZzZXQ6IHtcclxuICAgICAgICAgICAgeDogMTAwLFxyXG4gICAgICAgICAgICB5OiAxMzggLyAyXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBhbmNob3Iub24oJ2RyYWdtb3ZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdXBkYXRlKHRoaXMpO1xyXG4gICAgICAgIGxheWVyLmRyYXcoKTtcclxuICAgIH0pO1xyXG4gICAgYW5jaG9yLm9uKCdtb3VzZWRvd24gdG91Y2hzdGFydCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICBncm91cC5zZXREcmFnZ2FibGUoZmFsc2UpO1xyXG4gICAgICB0aGlzLm1vdmVUb1RvcCgpO1xyXG4gICAgfSk7XHJcbiAgICBhbmNob3Iub24oJ2RyYWdlbmQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBncm91cC5zZXREcmFnZ2FibGUodHJ1ZSk7XHJcbiAgICAgICAgbGF5ZXIuZHJhdygpO1xyXG4gICAgfSk7XHJcbiAgICAvLyBhZGQgaG92ZXIgc3R5bGluZ1xyXG4gICAgYW5jaG9yLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XHJcbiAgICAgICAgdGhpcy5zZXRTdHJva2VXaWR0aCg0KTtcclxuICAgICAgICBsYXllci5kcmF3KCk7XHJcbiAgICB9KTtcclxuICAgIGFuY2hvci5vbignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLmdldExheWVyKCk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5jdXJzb3IgPSAnZGVmYXVsdCc7XHJcbiAgICAgICAgdGhpcy5zZXRTdHJva2VXaWR0aCgyKTtcclxuICAgICAgICBsYXllci5kcmF3KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBncm91cC5hZGQoYW5jaG9yKTtcclxufVxyXG5cclxuXHJcbi8vY3JlYXRpbmcgc3RhZ2VcclxuLy9jb250YWluZXI6IGNvbnRhaW5lcklEXHJcbnZhciBzdGFnZSA9IG5ldyBLb252YS5TdGFnZSh7XHJcbiAgICBjb250YWluZXI6ICdjb250YWluZXInLFxyXG4gICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgaGVpZ2h0OiBoZWlnaHRcclxufSk7XHJcblxyXG4vL2NyZWF0aW5nIGxheWVyXHJcbnZhciBsYXllciA9IG5ldyBLb252YS5MYXllcigpO1xyXG4vL2FkZGluZyBsYXllciB0byB0aGUgc3RhZ2Vcclxuc3RhZ2UuYWRkKGxheWVyKTtcclxuXHJcblxyXG5cclxuLy93dGYgY2hhcHRlcjFcclxudmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG5jYW52YXMud2lkdGggPSBzdGFnZS53aWR0aCgpO1xyXG5jYW52YXMuaGVpZ2h0ID0gc3RhZ2UuaGVpZ2h0KCk7XHJcblxyXG52YXIgYmFja2dyb3VuZCA9IG5ldyBLb252YS5JbWFnZSh7XHJcbiAgaW1hZ2U6IGNhbnZhcyxcclxuICB4OiAwLFxyXG4gIHk6IDAsXHJcbiAgc3Ryb2tlOiAndG9tYXRvJ1xyXG59KTtcclxuXHJcbmxheWVyLmFkZChiYWNrZ3JvdW5kKTtcclxuc3RhZ2UuZHJhdygpO1xyXG5cclxuXHJcblxyXG5cclxuLy8gZGFydGggdmFkZXJcclxudmFyIGRhcnRoVmFkZXJJbWcgPSBuZXcgS29udmEuSW1hZ2Uoe1xyXG4gICAgd2lkdGg6IDIwMCxcclxuICAgIGhlaWdodDogMTM4LFxyXG4gICAgc3Ryb2tlOiAnZ3JlZW4nLFxyXG4gICAgc3Ryb2tlV2lkdGg6IDUsXHJcbiAgICBvZmZzZXQ6IHtcclxuICAgICAgICB4OiAxMDAsXHJcbiAgICAgICAgeTogMTM4IC8gMlxyXG4gICAgfVxyXG59KTtcclxuLy8geW9kYVxyXG52YXIgeW9kYUltZyA9IG5ldyBLb252YS5JbWFnZSh7XHJcbiAgICB3aWR0aDogOTMsXHJcbiAgICBoZWlnaHQ6IDEwNCxcclxuICAgIHN0cm9rZTogJ2dyZWVuJyxcclxuICAgIHN0cm9rZVdpZHRoOiA1LFxyXG4gICAgb2Zmc2V0OiB7XHJcbiAgICAgICAgeDogMTAwLFxyXG4gICAgICAgIHk6IDEzOCAvIDJcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxudmFyIGRhcnRoVmFkZXJHcm91cCA9IG5ldyBLb252YS5Hcm91cCh7XHJcbiAgeDogMzYwLFxyXG4gIHk6IDMwMCxcclxuICBkcmFnZ2FibGU6IHRydWVcclxufSk7XHJcbnZhciB5b2RhR3JvdXAgPSBuZXcgS29udmEuR3JvdXAoe1xyXG4gIHg6IDIwMCxcclxuICB5OiAxOTAsXHJcbiAgZHJhZ2dhYmxlOiB0cnVlXHJcbn0pO1xyXG5cclxuXHJcbi8vYWRkaW5nIGdyb3VwIHRvIGxheWVyXHJcbmxheWVyLmFkZChkYXJ0aFZhZGVyR3JvdXApO1xyXG5sYXllci5hZGQoeW9kYUdyb3VwKTtcclxuXHJcbi8vYWRkaW5nIHNoYXBlJmFuY2hvcnMgdG8gZ3JvdXAgXHJcbmRhcnRoVmFkZXJHcm91cC5hZGQoZGFydGhWYWRlckltZyk7XHJcbi8vIGFkZEFuY2hvcihkYXJ0aFZhZGVyR3JvdXAsIDAsIDAsICd0b3BMZWZ0Jyk7XHJcbi8vIGFkZEFuY2hvcihkYXJ0aFZhZGVyR3JvdXAsIDIwMCwgMCwgJ3RvcFJpZ2h0Jyk7XHJcbi8vIGFkZEFuY2hvcihkYXJ0aFZhZGVyR3JvdXAsIDIwMCwgMTM4LCAnYm90dG9tUmlnaHQnKTtcclxuLy8gYWRkQW5jaG9yKGRhcnRoVmFkZXJHcm91cCwgMCwgMTM4LCAnYm90dG9tTGVmdCcpO1xyXG5cclxuYWRkQW5jaG9yKGRhcnRoVmFkZXJHcm91cCwgMTAwLCAtNjksICd0b3BNaWRkbGUnKTtcclxuXHJcbnlvZGFHcm91cC5hZGQoeW9kYUltZyk7XHJcbi8vIGFkZEFuY2hvcih5b2RhR3JvdXAsIDAsIDAsICd0b3BMZWZ0Jyk7XHJcbi8vIGFkZEFuY2hvcih5b2RhR3JvdXAsIDkzLCAwLCAndG9wUmlnaHQnKTtcclxuLy8gYWRkQW5jaG9yKHlvZGFHcm91cCwgOTMsIDEwNCwgJ2JvdHRvbVJpZ2h0Jyk7XHJcbi8vIGFkZEFuY2hvcih5b2RhR3JvdXAsIDAsIDEwNCwgJ2JvdHRvbUxlZnQnKTtcclxuXHJcbmFkZEFuY2hvcih5b2RhR3JvdXAsIDkzIC8gMiwgLTUyLCAndG9wTWlkZGxlJyk7XHJcblxyXG5cclxudmFyIGltYWdlT2JqMSA9IG5ldyBJbWFnZSgpO1xyXG5pbWFnZU9iajEub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICBkYXJ0aFZhZGVySW1nLmltYWdlKGltYWdlT2JqMSk7XHJcbiAgICBkYXJ0aFZhZGVySW1nLnN0cm9rZUVuYWJsZWQoZmFsc2UpO1xyXG4gICAgbGF5ZXIuZHJhdygpO1xyXG59O1xyXG5pbWFnZU9iajEuc3JjID0gJy9rb252YVJvdGF0aW9uL2ZpbGVzL2RhcnRoLXZhZGVyLmpwZyc7XHJcblxyXG52YXIgaW1hZ2VPYmoyID0gbmV3IEltYWdlKCk7XHJcbmltYWdlT2JqMi5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHlvZGFJbWcuaW1hZ2UoaW1hZ2VPYmoyKTtcclxuICAgIHlvZGFJbWcuc3Ryb2tlRW5hYmxlZChmYWxzZSk7XHJcbiAgICBsYXllci5kcmF3KCk7XHJcbn07XHJcbmltYWdlT2JqMi5zcmMgPSAnL2tvbnZhUm90YXRpb24vZmlsZXMveW9kYS5qcGcnO1xyXG5cclxuXHJcblxyXG5cclxuLy93dGYgY2hhcHRlcjIgYWRkaW5nIGxpc3RlbmVyc1xyXG5cclxudmFyIHNoYXBlcyA9IFtdLFxyXG4gICAgdG9nZ2xlID0gZmFsc2U7XHJcblxyXG5zaGFwZXMucHVzaChkYXJ0aFZhZGVySW1nKTtcclxuc2hhcGVzLnB1c2goeW9kYUltZyk7XHJcblxyXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcnMoc2hhcGUpIHtcclxuICAgIHNoYXBlLm9uKCdjbGljayBtb3VzZWRvd24nLCAoZSkgPT4ge1xyXG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgIC8vcmVtb3Zpbmcgc2VsZWN0aW9uXHJcbiAgICBzaGFwZXMuZm9yRWFjaChzaGFwZSA9PiBzaGFwZS5zdHJva2VFbmFibGVkKGZhbHNlKSk7XHJcbiAgICBcclxuICAgIHRhcmdldC5zdHJva2VFbmFibGVkKHRydWUpO1xyXG4gICAgLy8gdGFyZ2V0Lm1vdmVUb1RvcCgpO1xyXG4gICAgbGF5ZXIuZHJhdygpO1xyXG4gIH0pXHJcbn1cclxuXHJcbnNoYXBlcy5mb3JFYWNoKHNoYXBlID0+IGFkZExpc3RlbmVycyhzaGFwZSkpO1xyXG5cclxuYmFja2dyb3VuZC5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gIHNoYXBlcy5mb3JFYWNoKHNoYXBlID0+IHNoYXBlLnN0cm9rZUVuYWJsZWQoZmFsc2UpKTtcclxuICBsYXllci5kcmF3KCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlUG9seWdvbihlKSB7XHJcbiAgY29vcmRzID0ge1xyXG4gICAgeDogZS5ldnQub2Zmc2V0WCxcclxuICAgIHk6IGUuZXZ0Lm9mZnNldFlcclxuICB9O1xyXG4gIFxyXG4gIHdpZHRoID0gLU1hdGguYWJzKGNvb3Jkc1N0YXJ0LnggLSBjb29yZHMueCk7XHJcbiAgaGVpZ2h0ID0gTWF0aC5hYnMoY29vcmRzU3RhcnQueSAtIGNvb3Jkcy55KTtcclxuXHJcbiAgdmFyIHJlY3QgPSBuZXcgS29udmEuUmVjdCh7XHJcbiAgICB4OiBjb29yZHNTdGFydC54LFxyXG4gICAgeTogY29vcmRzU3RhcnQueSxcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgZmlsbDogJ2dyZWVuJ1xyXG4gIH0pO1xyXG5cclxuICBsYXllci5hZGQocmVjdCk7XHJcbiAgc3RhZ2UuYWRkKGxheWVyKTtcclxufVxyXG5cclxuYmFja2dyb3VuZC5vbignbW91c2Vkb3duJywgKGUpID0+IHtcclxuICBjb29yZHNTdGFydCA9IHtcclxuICAgIHg6IGUuZXZ0Lm9mZnNldFgsXHJcbiAgICB5OiBlLmV2dC5vZmZzZXRZXHJcbiAgfTtcclxuXHJcbiAgdG9nZ2xlID0gIXRvZ2dsZVxyXG59KTtcclxuXHJcbmJhY2tncm91bmQub24oJ21vdXNldXAnLCAoKSA9PiB0b2dnbGUgPSAhdG9nZ2xlKTtcclxuLy8gYmFja2dyb3VuZC5vbignbW91c2Vtb3ZlJywgKGUpID0+IHRvZ2dsZSAmJiBjcmVhdGVQb2x5Z29uKGUpKTtcclxuXHJcblxyXG4vLyBiYWNrZ3JvdW5kLm9uKCdtb3VzZXVwJywgKGUpID0+IGNvbnNvbGUubG9nKCdldmVudCcsIGUpKTtcclxuXHJcblxyXG4iXX0=
