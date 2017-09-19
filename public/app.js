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

var midX = (dir1 < 180) ? 
    image.width() / 2 + radius * Math.sqrt(1 - Math.pow(cosA, 2))
    :
    image.width() / 2 - radius * Math.sqrt(1 - Math.pow(cosA, 2));
var midY = image.height() / 2 - radius * cosA;

topMiddle.setX(midX);
topMiddle.setY(midY);

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
            x: group.children[0].attrs.width / 2,
            y: group.children[0].attrs.height / 2
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
        x: 200 / 2,
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
        x: 93 / 2,
        y: 104 / 2
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
imageObj1.src = './files/darth-vader.jpg';

var imageObj2 = new Image();
imageObj2.onload = function() {
    yodaImg.image(imageObj2);
    yodaImg.strokeEnabled(false);
    layer.draw();
};
imageObj2.src = './files/yoda.jpg';




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



//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL3NjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxudmFyIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZShhY3RpdmVBbmNob3IpIHtcclxuICAgIHZhciBncm91cCA9IGFjdGl2ZUFuY2hvci5nZXRQYXJlbnQoKTtcclxuICAgIHZhciB0b3BMZWZ0ID0gZ3JvdXAuZ2V0KCcudG9wTGVmdCcpWzBdO1xyXG4gICAgdmFyIHRvcFJpZ2h0ID0gZ3JvdXAuZ2V0KCcudG9wUmlnaHQnKVswXTtcclxuICAgIHZhciBib3R0b21SaWdodCA9IGdyb3VwLmdldCgnLmJvdHRvbVJpZ2h0JylbMF07XHJcbiAgICB2YXIgYm90dG9tTGVmdCA9IGdyb3VwLmdldCgnLmJvdHRvbUxlZnQnKVswXTtcclxuICAgIHZhciB0b3BNaWRkbGUgPSBncm91cC5nZXQoJy50b3BNaWRkbGUnKVswXTtcclxuXHJcbiAgICB2YXIgaW1hZ2UgPSBncm91cC5nZXQoJ0ltYWdlJylbMF07XHJcblxyXG4gICAgdmFyIGFuY2hvclggPSBhY3RpdmVBbmNob3IuZ2V0WCgpO1xyXG4gICAgdmFyIGFuY2hvclkgPSBhY3RpdmVBbmNob3IuZ2V0WSgpO1xyXG4gICAgICAgICAgICBcclxuICAgIHZhciByb3RhdGVGbGFnZSA9IGZhbHNlO1xyXG4gICAgdmFyIGRpciA9IDA7XHJcblxyXG4gICAgLy8gdXBkYXRlIGFuY2hvciBwb3NpdGlvbnNcclxuICAgIHN3aXRjaCAoYWN0aXZlQW5jaG9yLmdldE5hbWUoKSkge1xyXG4gICAgICAgIGNhc2UgJ3RvcExlZnQnOlxyXG4gICAgICAgICAgICB0b3BSaWdodC5zZXRZKGFuY2hvclkpO1xyXG4gICAgICAgICAgICBib3R0b21MZWZ0LnNldFgoYW5jaG9yWCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vIGNhc2UgJ3RvcFJpZ2h0JzpcclxuICAgICAgICAvLyAgICAgcm90YXRlRmxhZ2U9dHJ1ZTtcclxuICAgICAgICAvLyAgICAgdmFyIGRpZmZ4ID0gKHRvcFJpZ2h0LmdldFgoKS10b3BMZWZ0LmdldFgoKSk7XHJcbiAgICAgICAgLy8gICAgIHZhciBkaWZmeSA9ICh0b3BSaWdodC5nZXRZKCktdG9wTGVmdC5nZXRZKCkpO1xyXG4gICAgICAgIC8vICAgICB2YXIgZGlyPShkaWZmeCA8IDApID8gXHJcbiAgICAgICAgLy8gICAgICAgICAxODAqTWF0aC5hdGFuKGRpZmZ5L2RpZmZ4KS8oTWF0aC5QSSkgLSAxODBcclxuICAgICAgICAvLyAgICAgICAgIDpcclxuICAgICAgICAvLyAgICAgICAgIDE4MCpNYXRoLmF0YW4oZGlmZnkvZGlmZngpLyhNYXRoLlBJKTtcclxuICAgICAgICAvLyAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndG9wUmlnaHQnOlxyXG4gICAgICAgICAgICB0b3BMZWZ0LnNldFkoYW5jaG9yWSk7XHJcbiAgICAgICAgICAgIGJvdHRvbVJpZ2h0LnNldFgoYW5jaG9yWCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2JvdHRvbVJpZ2h0JzpcclxuICAgICAgICAgICAgYm90dG9tTGVmdC5zZXRZKGFuY2hvclkpO1xyXG4gICAgICAgICAgICB0b3BSaWdodC5zZXRYKGFuY2hvclgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdib3R0b21MZWZ0JzpcclxuICAgICAgICAgICAgYm90dG9tUmlnaHQuc2V0WShhbmNob3JZKTtcclxuICAgICAgICAgICAgdG9wTGVmdC5zZXRYKGFuY2hvclgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd0b3BNaWRkbGUnOlxyXG4gICAgICAgICAgICByb3RhdGVGbGFnZT10cnVlO1xyXG5cclxudmFyIGNlbnRlciA9IHt4OiBpbWFnZS53aWR0aCgpIC8gMiwgeTogaW1hZ2UuaGVpZ2h0KCkgLyAyfTtcclxudmFyIHRvcCA9IHt4OiBpbWFnZS53aWR0aCgpIC8gMiwgeTogLSBpbWFnZS5oZWlnaHQoKSAvIDJ9O1xyXG52YXIgY3VycmVudCA9IHt4OiB0b3BNaWRkbGUuZ2V0WCgpLCB5OiB0b3BNaWRkbGUuZ2V0WSgpfTtcclxuXHJcbnZhciB2ZWN0MSA9IHtcclxuICAgIHg6IHRvcC54IC0gY2VudGVyLngsXHJcbiAgICB5OiB0b3AueSAtIGNlbnRlci55XHJcbn07XHJcbnZhciB2ZWN0MiA9IHtcclxuICAgIHg6IGN1cnJlbnQueCAtIGNlbnRlci54LFxyXG4gICAgeTogY3VycmVudC55IC0gY2VudGVyLnlcclxufTtcclxudmFyIGNvc0EgPSAodmVjdDIueCAqIHZlY3QxLnggKyB2ZWN0Mi55ICogdmVjdDEueSkgLyBcclxuICAgIChNYXRoLnNxcnQoTWF0aC5wb3codmVjdDEueCwyKSArIE1hdGgucG93KHZlY3QxLnksMikpKlxyXG4gICAgKE1hdGguc3FydChNYXRoLnBvdyh2ZWN0Mi54LDIpICsgTWF0aC5wb3codmVjdDIueSwyKSkpKTtcclxudmFyIGFuZ2xlID0gMTgwKk1hdGguYWNvcyhjb3NBKS9NYXRoLlBJO1xyXG52YXIgZGlyMSA9IChjdXJyZW50LnggPiBpbWFnZS53aWR0aCgpIC8gMikgPyBhbmdsZSA6IDM2MCAtIGFuZ2xlO1xyXG5cclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBpbWFnZS5wb3NpdGlvbih7IHg6MCwgeTowfSk7XHJcblxyXG4gICAgdmFyIHJhZGl1cyA9IGltYWdlLmhlaWdodCgpO1xyXG5cclxudmFyIG1pZFggPSAoZGlyMSA8IDE4MCkgPyBcclxuICAgIGltYWdlLndpZHRoKCkgLyAyICsgcmFkaXVzICogTWF0aC5zcXJ0KDEgLSBNYXRoLnBvdyhjb3NBLCAyKSlcclxuICAgIDpcclxuICAgIGltYWdlLndpZHRoKCkgLyAyIC0gcmFkaXVzICogTWF0aC5zcXJ0KDEgLSBNYXRoLnBvdyhjb3NBLCAyKSk7XHJcbnZhciBtaWRZID0gaW1hZ2UuaGVpZ2h0KCkgLyAyIC0gcmFkaXVzICogY29zQTtcclxuXHJcbnRvcE1pZGRsZS5zZXRYKG1pZFgpO1xyXG50b3BNaWRkbGUuc2V0WShtaWRZKTtcclxuXHJcbiAgICBpZihyb3RhdGVGbGFnZSl7XHJcbiAgICAgICAgaW1hZ2Uucm90YXRpb24oZGlyMSk7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIHZhciB3aWR0aCA9IHRvcFJpZ2h0LmdldFgoKSAtIHRvcExlZnQuZ2V0WCgpO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSBib3R0b21MZWZ0LmdldFkoKSAtIHRvcExlZnQuZ2V0WSgpO1xyXG4gICAgICAgIGlmKHdpZHRoICYmIGhlaWdodCkge1xyXG4gICAgICAgICAgICBpbWFnZS53aWR0aCh3aWR0aCk7XHJcbiAgICAgICAgICAgIGltYWdlLmhlaWdodChoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBhZGRBbmNob3IoZ3JvdXAsIHgsIHksIG5hbWUpIHtcclxuICAgIHZhciBzdGFnZSA9IGdyb3VwLmdldFN0YWdlKCk7XHJcbiAgICB2YXIgbGF5ZXIgPSBncm91cC5nZXRMYXllcigpO1xyXG4gICAgdmFyIGFuY2hvciA9IG5ldyBLb252YS5DaXJjbGUoe1xyXG4gICAgICAgIHg6IHgsXHJcbiAgICAgICAgeTogeSxcclxuICAgICAgICBzdHJva2U6ICcjNjY2JyxcclxuICAgICAgICBmaWxsOiAnI2RkZCcsXHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAgICAgcmFkaXVzOiA4LFxyXG4gICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxyXG4gICAgICAgIGRyYWdPblRvcDogZmFsc2UsXHJcbiAgICAgICAgb2Zmc2V0OiB7XHJcbiAgICAgICAgICAgIHg6IGdyb3VwLmNoaWxkcmVuWzBdLmF0dHJzLndpZHRoIC8gMixcclxuICAgICAgICAgICAgeTogZ3JvdXAuY2hpbGRyZW5bMF0uYXR0cnMuaGVpZ2h0IC8gMlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgYW5jaG9yLm9uKCdkcmFnbW92ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHVwZGF0ZSh0aGlzKTtcclxuICAgICAgICBsYXllci5kcmF3KCk7XHJcbiAgICB9KTtcclxuICAgIGFuY2hvci5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgZ3JvdXAuc2V0RHJhZ2dhYmxlKGZhbHNlKTtcclxuICAgICAgdGhpcy5tb3ZlVG9Ub3AoKTtcclxuICAgIH0pO1xyXG4gICAgYW5jaG9yLm9uKCdkcmFnZW5kJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZ3JvdXAuc2V0RHJhZ2dhYmxlKHRydWUpO1xyXG4gICAgICAgIGxheWVyLmRyYXcoKTtcclxuICAgIH0pO1xyXG4gICAgLy8gYWRkIGhvdmVyIHN0eWxpbmdcclxuICAgIGFuY2hvci5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xyXG4gICAgICAgIHRoaXMuc2V0U3Ryb2tlV2lkdGgoNCk7XHJcbiAgICAgICAgbGF5ZXIuZHJhdygpO1xyXG4gICAgfSk7XHJcbiAgICBhbmNob3Iub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xyXG4gICAgICAgIHRoaXMuc2V0U3Ryb2tlV2lkdGgoMik7XHJcbiAgICAgICAgbGF5ZXIuZHJhdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZ3JvdXAuYWRkKGFuY2hvcik7XHJcbn1cclxuXHJcblxyXG4vL2NyZWF0aW5nIHN0YWdlXHJcbi8vY29udGFpbmVyOiBjb250YWluZXJJRFxyXG52YXIgc3RhZ2UgPSBuZXcgS29udmEuU3RhZ2Uoe1xyXG4gICAgY29udGFpbmVyOiAnY29udGFpbmVyJyxcclxuICAgIHdpZHRoOiB3aWR0aCxcclxuICAgIGhlaWdodDogaGVpZ2h0XHJcbn0pO1xyXG5cclxuLy9jcmVhdGluZyBsYXllclxyXG52YXIgbGF5ZXIgPSBuZXcgS29udmEuTGF5ZXIoKTtcclxuLy9hZGRpbmcgbGF5ZXIgdG8gdGhlIHN0YWdlXHJcbnN0YWdlLmFkZChsYXllcik7XHJcblxyXG5cclxuXHJcbi8vd3RmIGNoYXB0ZXIxXHJcbnZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuY2FudmFzLndpZHRoID0gc3RhZ2Uud2lkdGgoKTtcclxuY2FudmFzLmhlaWdodCA9IHN0YWdlLmhlaWdodCgpO1xyXG5cclxudmFyIGJhY2tncm91bmQgPSBuZXcgS29udmEuSW1hZ2Uoe1xyXG4gIGltYWdlOiBjYW52YXMsXHJcbiAgeDogMCxcclxuICB5OiAwLFxyXG4gIHN0cm9rZTogJ3RvbWF0bydcclxufSk7XHJcblxyXG5sYXllci5hZGQoYmFja2dyb3VuZCk7XHJcbnN0YWdlLmRyYXcoKTtcclxuXHJcblxyXG5cclxuXHJcbi8vIGRhcnRoIHZhZGVyXHJcbnZhciBkYXJ0aFZhZGVySW1nID0gbmV3IEtvbnZhLkltYWdlKHtcclxuICAgIHdpZHRoOiAyMDAsXHJcbiAgICBoZWlnaHQ6IDEzOCxcclxuICAgIHN0cm9rZTogJ2dyZWVuJyxcclxuICAgIHN0cm9rZVdpZHRoOiA1LFxyXG4gICAgb2Zmc2V0OiB7XHJcbiAgICAgICAgeDogMjAwIC8gMixcclxuICAgICAgICB5OiAxMzggLyAyXHJcbiAgICB9XHJcbn0pO1xyXG4vLyB5b2RhXHJcbnZhciB5b2RhSW1nID0gbmV3IEtvbnZhLkltYWdlKHtcclxuICAgIHdpZHRoOiA5MyxcclxuICAgIGhlaWdodDogMTA0LFxyXG4gICAgc3Ryb2tlOiAnZ3JlZW4nLFxyXG4gICAgc3Ryb2tlV2lkdGg6IDUsXHJcbiAgICBvZmZzZXQ6IHtcclxuICAgICAgICB4OiA5MyAvIDIsXHJcbiAgICAgICAgeTogMTA0IC8gMlxyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG52YXIgZGFydGhWYWRlckdyb3VwID0gbmV3IEtvbnZhLkdyb3VwKHtcclxuICB4OiAzNjAsXHJcbiAgeTogMzAwLFxyXG4gIGRyYWdnYWJsZTogdHJ1ZVxyXG59KTtcclxudmFyIHlvZGFHcm91cCA9IG5ldyBLb252YS5Hcm91cCh7XHJcbiAgeDogMjAwLFxyXG4gIHk6IDE5MCxcclxuICBkcmFnZ2FibGU6IHRydWVcclxufSk7XHJcblxyXG5cclxuLy9hZGRpbmcgZ3JvdXAgdG8gbGF5ZXJcclxubGF5ZXIuYWRkKGRhcnRoVmFkZXJHcm91cCk7XHJcbmxheWVyLmFkZCh5b2RhR3JvdXApO1xyXG5cclxuLy9hZGRpbmcgc2hhcGUmYW5jaG9ycyB0byBncm91cCBcclxuZGFydGhWYWRlckdyb3VwLmFkZChkYXJ0aFZhZGVySW1nKTtcclxuLy8gYWRkQW5jaG9yKGRhcnRoVmFkZXJHcm91cCwgMCwgMCwgJ3RvcExlZnQnKTtcclxuLy8gYWRkQW5jaG9yKGRhcnRoVmFkZXJHcm91cCwgMjAwLCAwLCAndG9wUmlnaHQnKTtcclxuLy8gYWRkQW5jaG9yKGRhcnRoVmFkZXJHcm91cCwgMjAwLCAxMzgsICdib3R0b21SaWdodCcpO1xyXG4vLyBhZGRBbmNob3IoZGFydGhWYWRlckdyb3VwLCAwLCAxMzgsICdib3R0b21MZWZ0Jyk7XHJcblxyXG5hZGRBbmNob3IoZGFydGhWYWRlckdyb3VwLCAxMDAsIC02OSwgJ3RvcE1pZGRsZScpO1xyXG5cclxueW9kYUdyb3VwLmFkZCh5b2RhSW1nKTtcclxuLy8gYWRkQW5jaG9yKHlvZGFHcm91cCwgMCwgMCwgJ3RvcExlZnQnKTtcclxuLy8gYWRkQW5jaG9yKHlvZGFHcm91cCwgOTMsIDAsICd0b3BSaWdodCcpO1xyXG4vLyBhZGRBbmNob3IoeW9kYUdyb3VwLCA5MywgMTA0LCAnYm90dG9tUmlnaHQnKTtcclxuLy8gYWRkQW5jaG9yKHlvZGFHcm91cCwgMCwgMTA0LCAnYm90dG9tTGVmdCcpO1xyXG5cclxuYWRkQW5jaG9yKHlvZGFHcm91cCwgOTMgLyAyLCAtNTIsICd0b3BNaWRkbGUnKTtcclxuXHJcblxyXG52YXIgaW1hZ2VPYmoxID0gbmV3IEltYWdlKCk7XHJcbmltYWdlT2JqMS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgIGRhcnRoVmFkZXJJbWcuaW1hZ2UoaW1hZ2VPYmoxKTtcclxuICAgIGRhcnRoVmFkZXJJbWcuc3Ryb2tlRW5hYmxlZChmYWxzZSk7XHJcbiAgICBsYXllci5kcmF3KCk7XHJcbn07XHJcbmltYWdlT2JqMS5zcmMgPSAnLi9maWxlcy9kYXJ0aC12YWRlci5qcGcnO1xyXG5cclxudmFyIGltYWdlT2JqMiA9IG5ldyBJbWFnZSgpO1xyXG5pbWFnZU9iajIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICB5b2RhSW1nLmltYWdlKGltYWdlT2JqMik7XHJcbiAgICB5b2RhSW1nLnN0cm9rZUVuYWJsZWQoZmFsc2UpO1xyXG4gICAgbGF5ZXIuZHJhdygpO1xyXG59O1xyXG5pbWFnZU9iajIuc3JjID0gJy4vZmlsZXMveW9kYS5qcGcnO1xyXG5cclxuXHJcblxyXG5cclxuLy93dGYgY2hhcHRlcjIgYWRkaW5nIGxpc3RlbmVyc1xyXG5cclxudmFyIHNoYXBlcyA9IFtdLFxyXG4gICAgdG9nZ2xlID0gZmFsc2U7XHJcblxyXG5zaGFwZXMucHVzaChkYXJ0aFZhZGVySW1nKTtcclxuc2hhcGVzLnB1c2goeW9kYUltZyk7XHJcblxyXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcnMoc2hhcGUpIHtcclxuICAgIHNoYXBlLm9uKCdjbGljayBtb3VzZWRvd24nLCAoZSkgPT4ge1xyXG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgIC8vcmVtb3Zpbmcgc2VsZWN0aW9uXHJcbiAgICBzaGFwZXMuZm9yRWFjaChzaGFwZSA9PiBzaGFwZS5zdHJva2VFbmFibGVkKGZhbHNlKSk7XHJcbiAgICBcclxuICAgIHRhcmdldC5zdHJva2VFbmFibGVkKHRydWUpO1xyXG4gICAgLy8gdGFyZ2V0Lm1vdmVUb1RvcCgpO1xyXG4gICAgbGF5ZXIuZHJhdygpO1xyXG4gIH0pXHJcbn1cclxuXHJcbnNoYXBlcy5mb3JFYWNoKHNoYXBlID0+IGFkZExpc3RlbmVycyhzaGFwZSkpO1xyXG5cclxuYmFja2dyb3VuZC5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gIHNoYXBlcy5mb3JFYWNoKHNoYXBlID0+IHNoYXBlLnN0cm9rZUVuYWJsZWQoZmFsc2UpKTtcclxuICBsYXllci5kcmF3KCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlUG9seWdvbihlKSB7XHJcbiAgY29vcmRzID0ge1xyXG4gICAgeDogZS5ldnQub2Zmc2V0WCxcclxuICAgIHk6IGUuZXZ0Lm9mZnNldFlcclxuICB9O1xyXG4gIFxyXG4gIHdpZHRoID0gLU1hdGguYWJzKGNvb3Jkc1N0YXJ0LnggLSBjb29yZHMueCk7XHJcbiAgaGVpZ2h0ID0gTWF0aC5hYnMoY29vcmRzU3RhcnQueSAtIGNvb3Jkcy55KTtcclxuXHJcbiAgdmFyIHJlY3QgPSBuZXcgS29udmEuUmVjdCh7XHJcbiAgICB4OiBjb29yZHNTdGFydC54LFxyXG4gICAgeTogY29vcmRzU3RhcnQueSxcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgZmlsbDogJ2dyZWVuJ1xyXG4gIH0pO1xyXG5cclxuICBsYXllci5hZGQocmVjdCk7XHJcbiAgc3RhZ2UuYWRkKGxheWVyKTtcclxufVxyXG5cclxuYmFja2dyb3VuZC5vbignbW91c2Vkb3duJywgKGUpID0+IHtcclxuICBjb29yZHNTdGFydCA9IHtcclxuICAgIHg6IGUuZXZ0Lm9mZnNldFgsXHJcbiAgICB5OiBlLmV2dC5vZmZzZXRZXHJcbiAgfTtcclxuXHJcbiAgdG9nZ2xlID0gIXRvZ2dsZVxyXG59KTtcclxuXHJcbmJhY2tncm91bmQub24oJ21vdXNldXAnLCAoKSA9PiB0b2dnbGUgPSAhdG9nZ2xlKTtcclxuLy8gYmFja2dyb3VuZC5vbignbW91c2Vtb3ZlJywgKGUpID0+IHRvZ2dsZSAmJiBjcmVhdGVQb2x5Z29uKGUpKTtcclxuXHJcblxyXG4vLyBiYWNrZ3JvdW5kLm9uKCdtb3VzZXVwJywgKGUpID0+IGNvbnNvbGUubG9nKCdldmVudCcsIGUpKTtcclxuXHJcblxyXG4iXX0=
