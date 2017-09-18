var width = window.innerWidth;
var height = window.innerHeight;

function update(activeAnchor) {
    var group = activeAnchor.getParent();
    var topLeft = group.get('.topLeft')[0];
    var topRight = group.get('.topRight')[0];
    var bottomRight = group.get('.bottomRight')[0];
    var bottomLeft = group.get('.bottomLeft')[0];
    var topMiddle = group.get('.topMiddle')[0];
    // topMiddle.setX(0);
    // topMiddle.setY(0);
    
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
        case 'topRight':
            rotateFlage=true;
            var diffx = (topRight.getX()-topLeft.getX());
            var diffy = (topRight.getY()-topLeft.getY());
            var dir=(diffx < 0) ? 
                180*Math.atan(diffy/diffx)/(Math.PI) - 180
                :
                180*Math.atan(diffy/diffx)/(Math.PI);
            break;
        case 'bottomRight':
            bottomLeft.setY(anchorY);
            topRight.setX(anchorX);
            break;
        case 'bottomLeft':
            bottomRight.setY(anchorY);
            topLeft.setX(anchorX);
            break;
        // case 'topMiddle':
        //     rotateFlage=true;
        //     var diffx = topMiddle.getX() - image.width() / 2;
        //     var diffy = image.height() / 2 - topMiddle.getY();
        //     // console.log('height!!!!!!!', diffy);
        //     console.log('angle', 180*Math.tan(diffx/diffy)/(Math.PI));
        //     var dir1 = 180*Math.tan(diffx/diffy)/(Math.PI);
        //     break;
        case 'topMiddle':
            rotateFlage=true;
            
            var diffx = (topMiddle.getX() - image.width() / 2);
            var diffy = (image.height() / 2 - topMiddle.getY());
            // console.log('height!!!!!!!', diffy);
            console.log('angle', 180*Math.tan(diffx/diffy)/(Math.PI));
            var dir1 = 180*Math.tan(diffx/diffy)/(Math.PI);
        break;
    }

    image.position(topLeft.position());

    var radius = image.height();
    
    if(rotateFlage){
        group.rotation(dir1);
// console.log('!!!! x', image.width() / 2 + radius * Math.cos(dir1));
// console.log('!!!! y', image.height() / 2 + radius * Math.sin(dir1));
        topMiddle.setX(image.width() / 2 + radius * Math.cos(dir1));
        topMiddle.setY(image.height() / 2 + radius * Math.sin(dir1));

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
  x: 180,
  y: 50,
  draggable: true
});
var yodaGroup = new Konva.Group({
  x: 20,
  y: 110,
  draggable: true
});


//adding group to layer
layer.add(darthVaderGroup);
layer.add(yodaGroup);

//adding shape&anchors to group 
darthVaderGroup.add(darthVaderImg);
addAnchor(darthVaderGroup, 0, 0, 'topLeft');
addAnchor(darthVaderGroup, 200, 0, 'topRight');
addAnchor(darthVaderGroup, 200, 138, 'bottomRight');
addAnchor(darthVaderGroup, 0, 138, 'bottomLeft');

addAnchor(darthVaderGroup, 100, -69, 'topMiddle');

yodaGroup.add(yodaImg);
addAnchor(yodaGroup, 0, 0, 'topLeft');
addAnchor(yodaGroup, 93, 0, 'topRight');
addAnchor(yodaGroup, 93, 104, 'bottomRight');
addAnchor(yodaGroup, 0, 104, 'bottomLeft');

addAnchor(yodaGroup, 93 / 2, -52, 'topMiddle');


var imageObj1 = new Image();
imageObj1.onload = function() {
    darthVaderImg.image(imageObj1);
    darthVaderImg.strokeEnabled(false);
    layer.draw();
};
imageObj1.src = '/files/darth-vader.jpg';

var imageObj2 = new Image();
imageObj2.onload = function() {
    yodaImg.image(imageObj2);
    yodaImg.strokeEnabled(false);
    layer.draw();
};
imageObj2.src = '/files/yoda.jpg';




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



//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL3NjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG52YXIgaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlKGFjdGl2ZUFuY2hvcikge1xyXG4gICAgdmFyIGdyb3VwID0gYWN0aXZlQW5jaG9yLmdldFBhcmVudCgpO1xyXG4gICAgdmFyIHRvcExlZnQgPSBncm91cC5nZXQoJy50b3BMZWZ0JylbMF07XHJcbiAgICB2YXIgdG9wUmlnaHQgPSBncm91cC5nZXQoJy50b3BSaWdodCcpWzBdO1xyXG4gICAgdmFyIGJvdHRvbVJpZ2h0ID0gZ3JvdXAuZ2V0KCcuYm90dG9tUmlnaHQnKVswXTtcclxuICAgIHZhciBib3R0b21MZWZ0ID0gZ3JvdXAuZ2V0KCcuYm90dG9tTGVmdCcpWzBdO1xyXG4gICAgdmFyIHRvcE1pZGRsZSA9IGdyb3VwLmdldCgnLnRvcE1pZGRsZScpWzBdO1xyXG4gICAgLy8gdG9wTWlkZGxlLnNldFgoMCk7XHJcbiAgICAvLyB0b3BNaWRkbGUuc2V0WSgwKTtcclxuICAgIFxyXG4gICAgdmFyIGltYWdlID0gZ3JvdXAuZ2V0KCdJbWFnZScpWzBdO1xyXG5cclxuICAgIHZhciBhbmNob3JYID0gYWN0aXZlQW5jaG9yLmdldFgoKTtcclxuICAgIHZhciBhbmNob3JZID0gYWN0aXZlQW5jaG9yLmdldFkoKTtcclxuICAgICAgICAgICAgXHJcbiAgICB2YXIgcm90YXRlRmxhZ2UgPSBmYWxzZTtcclxuICAgIHZhciBkaXIgPSAwO1xyXG5cclxuICAgIC8vIHVwZGF0ZSBhbmNob3IgcG9zaXRpb25zXHJcbiAgICBzd2l0Y2ggKGFjdGl2ZUFuY2hvci5nZXROYW1lKCkpIHtcclxuICAgICAgICBjYXNlICd0b3BMZWZ0JzpcclxuICAgICAgICAgICAgdG9wUmlnaHQuc2V0WShhbmNob3JZKTtcclxuICAgICAgICAgICAgYm90dG9tTGVmdC5zZXRYKGFuY2hvclgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd0b3BSaWdodCc6XHJcbiAgICAgICAgICAgIHJvdGF0ZUZsYWdlPXRydWU7XHJcbiAgICAgICAgICAgIHZhciBkaWZmeCA9ICh0b3BSaWdodC5nZXRYKCktdG9wTGVmdC5nZXRYKCkpO1xyXG4gICAgICAgICAgICB2YXIgZGlmZnkgPSAodG9wUmlnaHQuZ2V0WSgpLXRvcExlZnQuZ2V0WSgpKTtcclxuICAgICAgICAgICAgdmFyIGRpcj0oZGlmZnggPCAwKSA/IFxyXG4gICAgICAgICAgICAgICAgMTgwKk1hdGguYXRhbihkaWZmeS9kaWZmeCkvKE1hdGguUEkpIC0gMTgwXHJcbiAgICAgICAgICAgICAgICA6XHJcbiAgICAgICAgICAgICAgICAxODAqTWF0aC5hdGFuKGRpZmZ5L2RpZmZ4KS8oTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2JvdHRvbVJpZ2h0JzpcclxuICAgICAgICAgICAgYm90dG9tTGVmdC5zZXRZKGFuY2hvclkpO1xyXG4gICAgICAgICAgICB0b3BSaWdodC5zZXRYKGFuY2hvclgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdib3R0b21MZWZ0JzpcclxuICAgICAgICAgICAgYm90dG9tUmlnaHQuc2V0WShhbmNob3JZKTtcclxuICAgICAgICAgICAgdG9wTGVmdC5zZXRYKGFuY2hvclgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAvLyBjYXNlICd0b3BNaWRkbGUnOlxyXG4gICAgICAgIC8vICAgICByb3RhdGVGbGFnZT10cnVlO1xyXG4gICAgICAgIC8vICAgICB2YXIgZGlmZnggPSB0b3BNaWRkbGUuZ2V0WCgpIC0gaW1hZ2Uud2lkdGgoKSAvIDI7XHJcbiAgICAgICAgLy8gICAgIHZhciBkaWZmeSA9IGltYWdlLmhlaWdodCgpIC8gMiAtIHRvcE1pZGRsZS5nZXRZKCk7XHJcbiAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKCdoZWlnaHQhISEhISEhJywgZGlmZnkpO1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZygnYW5nbGUnLCAxODAqTWF0aC50YW4oZGlmZngvZGlmZnkpLyhNYXRoLlBJKSk7XHJcbiAgICAgICAgLy8gICAgIHZhciBkaXIxID0gMTgwKk1hdGgudGFuKGRpZmZ4L2RpZmZ5KS8oTWF0aC5QSSk7XHJcbiAgICAgICAgLy8gICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3RvcE1pZGRsZSc6XHJcbiAgICAgICAgICAgIHJvdGF0ZUZsYWdlPXRydWU7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIgZGlmZnggPSAodG9wTWlkZGxlLmdldFgoKSAtIGltYWdlLndpZHRoKCkgLyAyKTtcclxuICAgICAgICAgICAgdmFyIGRpZmZ5ID0gKGltYWdlLmhlaWdodCgpIC8gMiAtIHRvcE1pZGRsZS5nZXRZKCkpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnaGVpZ2h0ISEhISEhIScsIGRpZmZ5KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2FuZ2xlJywgMTgwKk1hdGgudGFuKGRpZmZ4L2RpZmZ5KS8oTWF0aC5QSSkpO1xyXG4gICAgICAgICAgICB2YXIgZGlyMSA9IDE4MCpNYXRoLnRhbihkaWZmeC9kaWZmeSkvKE1hdGguUEkpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG5cclxuICAgIGltYWdlLnBvc2l0aW9uKHRvcExlZnQucG9zaXRpb24oKSk7XHJcblxyXG4gICAgdmFyIHJhZGl1cyA9IGltYWdlLmhlaWdodCgpO1xyXG4gICAgXHJcbiAgICBpZihyb3RhdGVGbGFnZSl7XHJcbiAgICAgICAgZ3JvdXAucm90YXRpb24oZGlyMSk7XHJcbi8vIGNvbnNvbGUubG9nKCchISEhIHgnLCBpbWFnZS53aWR0aCgpIC8gMiArIHJhZGl1cyAqIE1hdGguY29zKGRpcjEpKTtcclxuLy8gY29uc29sZS5sb2coJyEhISEgeScsIGltYWdlLmhlaWdodCgpIC8gMiArIHJhZGl1cyAqIE1hdGguc2luKGRpcjEpKTtcclxuICAgICAgICB0b3BNaWRkbGUuc2V0WChpbWFnZS53aWR0aCgpIC8gMiArIHJhZGl1cyAqIE1hdGguY29zKGRpcjEpKTtcclxuICAgICAgICB0b3BNaWRkbGUuc2V0WShpbWFnZS5oZWlnaHQoKSAvIDIgKyByYWRpdXMgKiBNYXRoLnNpbihkaXIxKSk7XHJcblxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgdmFyIHdpZHRoID0gdG9wUmlnaHQuZ2V0WCgpIC0gdG9wTGVmdC5nZXRYKCk7XHJcbiAgICAgIHZhciBoZWlnaHQgPSBib3R0b21MZWZ0LmdldFkoKSAtIHRvcExlZnQuZ2V0WSgpO1xyXG4gICAgICAgIGlmKHdpZHRoICYmIGhlaWdodCkge1xyXG4gICAgICAgIGltYWdlLndpZHRoKHdpZHRoKTtcclxuICAgICAgICBpbWFnZS5oZWlnaHQoaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gYWRkQW5jaG9yKGdyb3VwLCB4LCB5LCBuYW1lKSB7XHJcbiAgICB2YXIgc3RhZ2UgPSBncm91cC5nZXRTdGFnZSgpO1xyXG4gICAgdmFyIGxheWVyID0gZ3JvdXAuZ2V0TGF5ZXIoKTtcclxuICAgIHZhciBhbmNob3IgPSBuZXcgS29udmEuQ2lyY2xlKHtcclxuICAgICAgICB4OiB4LFxyXG4gICAgICAgIHk6IHksXHJcbiAgICAgICAgc3Ryb2tlOiAnIzY2NicsXHJcbiAgICAgICAgZmlsbDogJyNkZGQnLFxyXG4gICAgICAgIHN0cm9rZVdpZHRoOiAyLFxyXG4gICAgICAgIHJhZGl1czogOCxcclxuICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgIGRyYWdnYWJsZTogdHJ1ZSxcclxuICAgICAgICBkcmFnT25Ub3A6IGZhbHNlLFxyXG4gICAgICAgIG9mZnNldDoge1xyXG4gICAgICAgICAgICB4OiAxMDAsXHJcbiAgICAgICAgICAgIHk6IDEzOCAvIDJcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGFuY2hvci5vbignZHJhZ21vdmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICB1cGRhdGUodGhpcyk7XHJcbiAgICAgICAgbGF5ZXIuZHJhdygpO1xyXG4gICAgfSk7XHJcbiAgICBhbmNob3Iub24oJ21vdXNlZG93biB0b3VjaHN0YXJ0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIGdyb3VwLnNldERyYWdnYWJsZShmYWxzZSk7XHJcbiAgICAgIHRoaXMubW92ZVRvVG9wKCk7XHJcbiAgICB9KTtcclxuICAgIGFuY2hvci5vbignZHJhZ2VuZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGdyb3VwLnNldERyYWdnYWJsZSh0cnVlKTtcclxuICAgICAgICBsYXllci5kcmF3KCk7XHJcbiAgICB9KTtcclxuICAgIC8vIGFkZCBob3ZlciBzdHlsaW5nXHJcbiAgICBhbmNob3Iub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcclxuICAgICAgICB0aGlzLnNldFN0cm9rZVdpZHRoKDQpO1xyXG4gICAgICAgIGxheWVyLmRyYXcoKTtcclxuICAgIH0pO1xyXG4gICAgYW5jaG9yLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmN1cnNvciA9ICdkZWZhdWx0JztcclxuICAgICAgICB0aGlzLnNldFN0cm9rZVdpZHRoKDIpO1xyXG4gICAgICAgIGxheWVyLmRyYXcoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGdyb3VwLmFkZChhbmNob3IpO1xyXG59XHJcblxyXG5cclxuLy9jcmVhdGluZyBzdGFnZVxyXG4vL2NvbnRhaW5lcjogY29udGFpbmVySURcclxudmFyIHN0YWdlID0gbmV3IEtvbnZhLlN0YWdlKHtcclxuICAgIGNvbnRhaW5lcjogJ2NvbnRhaW5lcicsXHJcbiAgICB3aWR0aDogd2lkdGgsXHJcbiAgICBoZWlnaHQ6IGhlaWdodFxyXG59KTtcclxuXHJcbi8vY3JlYXRpbmcgbGF5ZXJcclxudmFyIGxheWVyID0gbmV3IEtvbnZhLkxheWVyKCk7XHJcbi8vYWRkaW5nIGxheWVyIHRvIHRoZSBzdGFnZVxyXG5zdGFnZS5hZGQobGF5ZXIpO1xyXG5cclxuXHJcblxyXG4vL3d0ZiBjaGFwdGVyMVxyXG52YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbmNhbnZhcy53aWR0aCA9IHN0YWdlLndpZHRoKCk7XHJcbmNhbnZhcy5oZWlnaHQgPSBzdGFnZS5oZWlnaHQoKTtcclxuXHJcbnZhciBiYWNrZ3JvdW5kID0gbmV3IEtvbnZhLkltYWdlKHtcclxuICBpbWFnZTogY2FudmFzLFxyXG4gIHg6IDAsXHJcbiAgeTogMCxcclxuICBzdHJva2U6ICd0b21hdG8nXHJcbn0pO1xyXG5cclxubGF5ZXIuYWRkKGJhY2tncm91bmQpO1xyXG5zdGFnZS5kcmF3KCk7XHJcblxyXG5cclxuXHJcblxyXG4vLyBkYXJ0aCB2YWRlclxyXG52YXIgZGFydGhWYWRlckltZyA9IG5ldyBLb252YS5JbWFnZSh7XHJcbiAgICB3aWR0aDogMjAwLFxyXG4gICAgaGVpZ2h0OiAxMzgsXHJcbiAgICBzdHJva2U6ICdncmVlbicsXHJcbiAgICBzdHJva2VXaWR0aDogNSxcclxuICAgIG9mZnNldDoge1xyXG4gICAgICAgIHg6IDEwMCxcclxuICAgICAgICB5OiAxMzggLyAyXHJcbiAgICB9XHJcbn0pO1xyXG4vLyB5b2RhXHJcbnZhciB5b2RhSW1nID0gbmV3IEtvbnZhLkltYWdlKHtcclxuICAgIHdpZHRoOiA5MyxcclxuICAgIGhlaWdodDogMTA0LFxyXG4gICAgc3Ryb2tlOiAnZ3JlZW4nLFxyXG4gICAgc3Ryb2tlV2lkdGg6IDUsXHJcbiAgICBvZmZzZXQ6IHtcclxuICAgICAgICB4OiAxMDAsXHJcbiAgICAgICAgeTogMTM4IC8gMlxyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG52YXIgZGFydGhWYWRlckdyb3VwID0gbmV3IEtvbnZhLkdyb3VwKHtcclxuICB4OiAxODAsXHJcbiAgeTogNTAsXHJcbiAgZHJhZ2dhYmxlOiB0cnVlXHJcbn0pO1xyXG52YXIgeW9kYUdyb3VwID0gbmV3IEtvbnZhLkdyb3VwKHtcclxuICB4OiAyMCxcclxuICB5OiAxMTAsXHJcbiAgZHJhZ2dhYmxlOiB0cnVlXHJcbn0pO1xyXG5cclxuXHJcbi8vYWRkaW5nIGdyb3VwIHRvIGxheWVyXHJcbmxheWVyLmFkZChkYXJ0aFZhZGVyR3JvdXApO1xyXG5sYXllci5hZGQoeW9kYUdyb3VwKTtcclxuXHJcbi8vYWRkaW5nIHNoYXBlJmFuY2hvcnMgdG8gZ3JvdXAgXHJcbmRhcnRoVmFkZXJHcm91cC5hZGQoZGFydGhWYWRlckltZyk7XHJcbmFkZEFuY2hvcihkYXJ0aFZhZGVyR3JvdXAsIDAsIDAsICd0b3BMZWZ0Jyk7XHJcbmFkZEFuY2hvcihkYXJ0aFZhZGVyR3JvdXAsIDIwMCwgMCwgJ3RvcFJpZ2h0Jyk7XHJcbmFkZEFuY2hvcihkYXJ0aFZhZGVyR3JvdXAsIDIwMCwgMTM4LCAnYm90dG9tUmlnaHQnKTtcclxuYWRkQW5jaG9yKGRhcnRoVmFkZXJHcm91cCwgMCwgMTM4LCAnYm90dG9tTGVmdCcpO1xyXG5cclxuYWRkQW5jaG9yKGRhcnRoVmFkZXJHcm91cCwgMTAwLCAtNjksICd0b3BNaWRkbGUnKTtcclxuXHJcbnlvZGFHcm91cC5hZGQoeW9kYUltZyk7XHJcbmFkZEFuY2hvcih5b2RhR3JvdXAsIDAsIDAsICd0b3BMZWZ0Jyk7XHJcbmFkZEFuY2hvcih5b2RhR3JvdXAsIDkzLCAwLCAndG9wUmlnaHQnKTtcclxuYWRkQW5jaG9yKHlvZGFHcm91cCwgOTMsIDEwNCwgJ2JvdHRvbVJpZ2h0Jyk7XHJcbmFkZEFuY2hvcih5b2RhR3JvdXAsIDAsIDEwNCwgJ2JvdHRvbUxlZnQnKTtcclxuXHJcbmFkZEFuY2hvcih5b2RhR3JvdXAsIDkzIC8gMiwgLTUyLCAndG9wTWlkZGxlJyk7XHJcblxyXG5cclxudmFyIGltYWdlT2JqMSA9IG5ldyBJbWFnZSgpO1xyXG5pbWFnZU9iajEub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICBkYXJ0aFZhZGVySW1nLmltYWdlKGltYWdlT2JqMSk7XHJcbiAgICBkYXJ0aFZhZGVySW1nLnN0cm9rZUVuYWJsZWQoZmFsc2UpO1xyXG4gICAgbGF5ZXIuZHJhdygpO1xyXG59O1xyXG5pbWFnZU9iajEuc3JjID0gJy9maWxlcy9kYXJ0aC12YWRlci5qcGcnO1xyXG5cclxudmFyIGltYWdlT2JqMiA9IG5ldyBJbWFnZSgpO1xyXG5pbWFnZU9iajIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICB5b2RhSW1nLmltYWdlKGltYWdlT2JqMik7XHJcbiAgICB5b2RhSW1nLnN0cm9rZUVuYWJsZWQoZmFsc2UpO1xyXG4gICAgbGF5ZXIuZHJhdygpO1xyXG59O1xyXG5pbWFnZU9iajIuc3JjID0gJy9maWxlcy95b2RhLmpwZyc7XHJcblxyXG5cclxuXHJcblxyXG4vL3d0ZiBjaGFwdGVyMiBhZGRpbmcgbGlzdGVuZXJzXHJcblxyXG52YXIgc2hhcGVzID0gW10sXHJcbiAgICB0b2dnbGUgPSBmYWxzZTtcclxuXHJcbnNoYXBlcy5wdXNoKGRhcnRoVmFkZXJJbWcpO1xyXG5zaGFwZXMucHVzaCh5b2RhSW1nKTtcclxuXHJcbmZ1bmN0aW9uIGFkZExpc3RlbmVycyhzaGFwZSkge1xyXG4gICAgc2hhcGUub24oJ2NsaWNrIG1vdXNlZG93bicsIChlKSA9PiB7XHJcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICAgLy9yZW1vdmluZyBzZWxlY3Rpb25cclxuICAgIHNoYXBlcy5mb3JFYWNoKHNoYXBlID0+IHNoYXBlLnN0cm9rZUVuYWJsZWQoZmFsc2UpKTtcclxuICAgIFxyXG4gICAgdGFyZ2V0LnN0cm9rZUVuYWJsZWQodHJ1ZSk7XHJcbiAgICAvLyB0YXJnZXQubW92ZVRvVG9wKCk7XHJcbiAgICBsYXllci5kcmF3KCk7XHJcbiAgfSlcclxufVxyXG5cclxuc2hhcGVzLmZvckVhY2goc2hhcGUgPT4gYWRkTGlzdGVuZXJzKHNoYXBlKSk7XHJcblxyXG5iYWNrZ3JvdW5kLm9uKCdjbGljaycsIChlKSA9PiB7XHJcbiAgc2hhcGVzLmZvckVhY2goc2hhcGUgPT4gc2hhcGUuc3Ryb2tlRW5hYmxlZChmYWxzZSkpO1xyXG4gIGxheWVyLmRyYXcoKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQb2x5Z29uKGUpIHtcclxuICBjb29yZHMgPSB7XHJcbiAgICB4OiBlLmV2dC5vZmZzZXRYLFxyXG4gICAgeTogZS5ldnQub2Zmc2V0WVxyXG4gIH07XHJcbiAgXHJcbiAgd2lkdGggPSAtTWF0aC5hYnMoY29vcmRzU3RhcnQueCAtIGNvb3Jkcy54KTtcclxuICBoZWlnaHQgPSBNYXRoLmFicyhjb29yZHNTdGFydC55IC0gY29vcmRzLnkpO1xyXG5cclxuICB2YXIgcmVjdCA9IG5ldyBLb252YS5SZWN0KHtcclxuICAgIHg6IGNvb3Jkc1N0YXJ0LngsXHJcbiAgICB5OiBjb29yZHNTdGFydC55LFxyXG4gICAgd2lkdGgsXHJcbiAgICBoZWlnaHQsXHJcbiAgICBmaWxsOiAnZ3JlZW4nXHJcbiAgfSk7XHJcblxyXG4gIGxheWVyLmFkZChyZWN0KTtcclxuICBzdGFnZS5hZGQobGF5ZXIpO1xyXG59XHJcblxyXG5iYWNrZ3JvdW5kLm9uKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xyXG4gIGNvb3Jkc1N0YXJ0ID0ge1xyXG4gICAgeDogZS5ldnQub2Zmc2V0WCxcclxuICAgIHk6IGUuZXZ0Lm9mZnNldFlcclxuICB9O1xyXG5cclxuICB0b2dnbGUgPSAhdG9nZ2xlXHJcbn0pO1xyXG5cclxuYmFja2dyb3VuZC5vbignbW91c2V1cCcsICgpID0+IHRvZ2dsZSA9ICF0b2dnbGUpO1xyXG4vLyBiYWNrZ3JvdW5kLm9uKCdtb3VzZW1vdmUnLCAoZSkgPT4gdG9nZ2xlICYmIGNyZWF0ZVBvbHlnb24oZSkpO1xyXG5cclxuXHJcbi8vIGJhY2tncm91bmQub24oJ21vdXNldXAnLCAoZSkgPT4gY29uc29sZS5sb2coJ2V2ZW50JywgZSkpO1xyXG5cclxuXHJcbiJdfQ==
