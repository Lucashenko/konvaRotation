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
var emptyGroup = new Konva.Group()
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
            var dir1 = 90;
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



//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL3NjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbnZhciBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGUoYWN0aXZlQW5jaG9yKSB7XHJcbiAgICB2YXIgZ3JvdXAgPSBhY3RpdmVBbmNob3IuZ2V0UGFyZW50KCk7XHJcbiAgICB2YXIgdG9wTGVmdCA9IGdyb3VwLmdldCgnLnRvcExlZnQnKVswXTtcclxuICAgIHZhciB0b3BSaWdodCA9IGdyb3VwLmdldCgnLnRvcFJpZ2h0JylbMF07XHJcbiAgICB2YXIgYm90dG9tUmlnaHQgPSBncm91cC5nZXQoJy5ib3R0b21SaWdodCcpWzBdO1xyXG4gICAgdmFyIGJvdHRvbUxlZnQgPSBncm91cC5nZXQoJy5ib3R0b21MZWZ0JylbMF07XHJcbiAgICB2YXIgdG9wTWlkZGxlID0gZ3JvdXAuZ2V0KCcudG9wTWlkZGxlJylbMF07XHJcbiAgICAvLyB0b3BNaWRkbGUuc2V0WCgwKTtcclxuICAgIC8vIHRvcE1pZGRsZS5zZXRZKDApO1xyXG52YXIgZW1wdHlHcm91cCA9IG5ldyBLb252YS5Hcm91cCgpXHJcbiAgICB2YXIgaW1hZ2UgPSBncm91cC5nZXQoJ0ltYWdlJylbMF07XHJcblxyXG4gICAgdmFyIGFuY2hvclggPSBhY3RpdmVBbmNob3IuZ2V0WCgpO1xyXG4gICAgdmFyIGFuY2hvclkgPSBhY3RpdmVBbmNob3IuZ2V0WSgpO1xyXG4gICAgICAgICAgICBcclxuICAgIHZhciByb3RhdGVGbGFnZSA9IGZhbHNlO1xyXG4gICAgdmFyIGRpciA9IDA7XHJcblxyXG4gICAgLy8gdXBkYXRlIGFuY2hvciBwb3NpdGlvbnNcclxuICAgIHN3aXRjaCAoYWN0aXZlQW5jaG9yLmdldE5hbWUoKSkge1xyXG4gICAgICAgIGNhc2UgJ3RvcExlZnQnOlxyXG4gICAgICAgICAgICB0b3BSaWdodC5zZXRZKGFuY2hvclkpO1xyXG4gICAgICAgICAgICBib3R0b21MZWZ0LnNldFgoYW5jaG9yWCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3RvcFJpZ2h0JzpcclxuICAgICAgICAgICAgcm90YXRlRmxhZ2U9dHJ1ZTtcclxuICAgICAgICAgICAgdmFyIGRpZmZ4ID0gKHRvcFJpZ2h0LmdldFgoKS10b3BMZWZ0LmdldFgoKSk7XHJcbiAgICAgICAgICAgIHZhciBkaWZmeSA9ICh0b3BSaWdodC5nZXRZKCktdG9wTGVmdC5nZXRZKCkpO1xyXG4gICAgICAgICAgICB2YXIgZGlyPShkaWZmeCA8IDApID8gXHJcbiAgICAgICAgICAgICAgICAxODAqTWF0aC5hdGFuKGRpZmZ5L2RpZmZ4KS8oTWF0aC5QSSkgLSAxODBcclxuICAgICAgICAgICAgICAgIDpcclxuICAgICAgICAgICAgICAgIDE4MCpNYXRoLmF0YW4oZGlmZnkvZGlmZngpLyhNYXRoLlBJKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAnYm90dG9tUmlnaHQnOlxyXG4gICAgICAgICAgICBib3R0b21MZWZ0LnNldFkoYW5jaG9yWSk7XHJcbiAgICAgICAgICAgIHRvcFJpZ2h0LnNldFgoYW5jaG9yWCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2JvdHRvbUxlZnQnOlxyXG4gICAgICAgICAgICBib3R0b21SaWdodC5zZXRZKGFuY2hvclkpO1xyXG4gICAgICAgICAgICB0b3BMZWZ0LnNldFgoYW5jaG9yWCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIC8vIGNhc2UgJ3RvcE1pZGRsZSc6XHJcbiAgICAgICAgLy8gICAgIHJvdGF0ZUZsYWdlPXRydWU7XHJcbiAgICAgICAgLy8gICAgIHZhciBkaWZmeCA9IHRvcE1pZGRsZS5nZXRYKCkgLSBpbWFnZS53aWR0aCgpIC8gMjtcclxuICAgICAgICAvLyAgICAgdmFyIGRpZmZ5ID0gaW1hZ2UuaGVpZ2h0KCkgLyAyIC0gdG9wTWlkZGxlLmdldFkoKTtcclxuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJ2hlaWdodCEhISEhISEnLCBkaWZmeSk7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdhbmdsZScsIDE4MCpNYXRoLnRhbihkaWZmeC9kaWZmeSkvKE1hdGguUEkpKTtcclxuICAgICAgICAvLyAgICAgdmFyIGRpcjEgPSAxODAqTWF0aC50YW4oZGlmZngvZGlmZnkpLyhNYXRoLlBJKTtcclxuICAgICAgICAvLyAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSAndG9wTWlkZGxlJzpcclxuICAgICAgICAgICAgcm90YXRlRmxhZ2U9dHJ1ZTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciBkaWZmeCA9ICh0b3BNaWRkbGUuZ2V0WCgpIC0gaW1hZ2Uud2lkdGgoKSAvIDIpO1xyXG4gICAgICAgICAgICB2YXIgZGlmZnkgPSAoaW1hZ2UuaGVpZ2h0KCkgLyAyIC0gdG9wTWlkZGxlLmdldFkoKSk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoZWlnaHQhISEhISEhJywgZGlmZnkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnYW5nbGUnLCAxODAqTWF0aC50YW4oZGlmZngvZGlmZnkpLyhNYXRoLlBJKSk7XHJcbiAgICAgICAgICAgIHZhciBkaXIxID0gMTgwKk1hdGgudGFuKGRpZmZ4L2RpZmZ5KS8oTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIHZhciBkaXIxID0gOTA7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaW1hZ2UucG9zaXRpb24odG9wTGVmdC5wb3NpdGlvbigpKTtcclxuXHJcbiAgICB2YXIgcmFkaXVzID0gaW1hZ2UuaGVpZ2h0KCk7XHJcbiAgICBcclxuICAgIGlmKHJvdGF0ZUZsYWdlKXtcclxuICAgICAgICBncm91cC5yb3RhdGlvbihkaXIxKTtcclxuLy8gY29uc29sZS5sb2coJyEhISEgeCcsIGltYWdlLndpZHRoKCkgLyAyICsgcmFkaXVzICogTWF0aC5jb3MoZGlyMSkpO1xyXG4vLyBjb25zb2xlLmxvZygnISEhISB5JywgaW1hZ2UuaGVpZ2h0KCkgLyAyICsgcmFkaXVzICogTWF0aC5zaW4oZGlyMSkpO1xyXG4gICAgICAgIHRvcE1pZGRsZS5zZXRYKGltYWdlLndpZHRoKCkgLyAyICsgcmFkaXVzICogTWF0aC5jb3MoZGlyMSkpO1xyXG4gICAgICAgIHRvcE1pZGRsZS5zZXRZKGltYWdlLmhlaWdodCgpIC8gMiArIHJhZGl1cyAqIE1hdGguc2luKGRpcjEpKTtcclxuXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICB2YXIgd2lkdGggPSB0b3BSaWdodC5nZXRYKCkgLSB0b3BMZWZ0LmdldFgoKTtcclxuICAgICAgdmFyIGhlaWdodCA9IGJvdHRvbUxlZnQuZ2V0WSgpIC0gdG9wTGVmdC5nZXRZKCk7XHJcbiAgICAgICAgaWYod2lkdGggJiYgaGVpZ2h0KSB7XHJcbiAgICAgICAgaW1hZ2Uud2lkdGgod2lkdGgpO1xyXG4gICAgICAgIGltYWdlLmhlaWdodChoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBhZGRBbmNob3IoZ3JvdXAsIHgsIHksIG5hbWUpIHtcclxuICAgIHZhciBzdGFnZSA9IGdyb3VwLmdldFN0YWdlKCk7XHJcbiAgICB2YXIgbGF5ZXIgPSBncm91cC5nZXRMYXllcigpO1xyXG4gICAgdmFyIGFuY2hvciA9IG5ldyBLb252YS5DaXJjbGUoe1xyXG4gICAgICAgIHg6IHgsXHJcbiAgICAgICAgeTogeSxcclxuICAgICAgICBzdHJva2U6ICcjNjY2JyxcclxuICAgICAgICBmaWxsOiAnI2RkZCcsXHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAgICAgcmFkaXVzOiA4LFxyXG4gICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxyXG4gICAgICAgIGRyYWdPblRvcDogZmFsc2UsXHJcbiAgICAgICAgb2Zmc2V0OiB7XHJcbiAgICAgICAgICAgIHg6IDEwMCxcclxuICAgICAgICAgICAgeTogMTM4IC8gMlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgYW5jaG9yLm9uKCdkcmFnbW92ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHVwZGF0ZSh0aGlzKTtcclxuICAgICAgICBsYXllci5kcmF3KCk7XHJcbiAgICB9KTtcclxuICAgIGFuY2hvci5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgZ3JvdXAuc2V0RHJhZ2dhYmxlKGZhbHNlKTtcclxuICAgICAgdGhpcy5tb3ZlVG9Ub3AoKTtcclxuICAgIH0pO1xyXG4gICAgYW5jaG9yLm9uKCdkcmFnZW5kJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZ3JvdXAuc2V0RHJhZ2dhYmxlKHRydWUpO1xyXG4gICAgICAgIGxheWVyLmRyYXcoKTtcclxuICAgIH0pO1xyXG4gICAgLy8gYWRkIGhvdmVyIHN0eWxpbmdcclxuICAgIGFuY2hvci5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xyXG4gICAgICAgIHRoaXMuc2V0U3Ryb2tlV2lkdGgoNCk7XHJcbiAgICAgICAgbGF5ZXIuZHJhdygpO1xyXG4gICAgfSk7XHJcbiAgICBhbmNob3Iub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xyXG4gICAgICAgIHRoaXMuc2V0U3Ryb2tlV2lkdGgoMik7XHJcbiAgICAgICAgbGF5ZXIuZHJhdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZ3JvdXAuYWRkKGFuY2hvcik7XHJcbn1cclxuXHJcblxyXG4vL2NyZWF0aW5nIHN0YWdlXHJcbi8vY29udGFpbmVyOiBjb250YWluZXJJRFxyXG52YXIgc3RhZ2UgPSBuZXcgS29udmEuU3RhZ2Uoe1xyXG4gICAgY29udGFpbmVyOiAnY29udGFpbmVyJyxcclxuICAgIHdpZHRoOiB3aWR0aCxcclxuICAgIGhlaWdodDogaGVpZ2h0XHJcbn0pO1xyXG5cclxuLy9jcmVhdGluZyBsYXllclxyXG52YXIgbGF5ZXIgPSBuZXcgS29udmEuTGF5ZXIoKTtcclxuLy9hZGRpbmcgbGF5ZXIgdG8gdGhlIHN0YWdlXHJcbnN0YWdlLmFkZChsYXllcik7XHJcblxyXG5cclxuXHJcbi8vd3RmIGNoYXB0ZXIxXHJcbnZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuY2FudmFzLndpZHRoID0gc3RhZ2Uud2lkdGgoKTtcclxuY2FudmFzLmhlaWdodCA9IHN0YWdlLmhlaWdodCgpO1xyXG5cclxudmFyIGJhY2tncm91bmQgPSBuZXcgS29udmEuSW1hZ2Uoe1xyXG4gIGltYWdlOiBjYW52YXMsXHJcbiAgeDogMCxcclxuICB5OiAwLFxyXG4gIHN0cm9rZTogJ3RvbWF0bydcclxufSk7XHJcblxyXG5sYXllci5hZGQoYmFja2dyb3VuZCk7XHJcbnN0YWdlLmRyYXcoKTtcclxuXHJcblxyXG5cclxuXHJcbi8vIGRhcnRoIHZhZGVyXHJcbnZhciBkYXJ0aFZhZGVySW1nID0gbmV3IEtvbnZhLkltYWdlKHtcclxuICAgIHdpZHRoOiAyMDAsXHJcbiAgICBoZWlnaHQ6IDEzOCxcclxuICAgIHN0cm9rZTogJ2dyZWVuJyxcclxuICAgIHN0cm9rZVdpZHRoOiA1LFxyXG4gICAgb2Zmc2V0OiB7XHJcbiAgICAgICAgeDogMTAwLFxyXG4gICAgICAgIHk6IDEzOCAvIDJcclxuICAgIH1cclxufSk7XHJcbi8vIHlvZGFcclxudmFyIHlvZGFJbWcgPSBuZXcgS29udmEuSW1hZ2Uoe1xyXG4gICAgd2lkdGg6IDkzLFxyXG4gICAgaGVpZ2h0OiAxMDQsXHJcbiAgICBzdHJva2U6ICdncmVlbicsXHJcbiAgICBzdHJva2VXaWR0aDogNSxcclxuICAgIG9mZnNldDoge1xyXG4gICAgICAgIHg6IDEwMCxcclxuICAgICAgICB5OiAxMzggLyAyXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbnZhciBkYXJ0aFZhZGVyR3JvdXAgPSBuZXcgS29udmEuR3JvdXAoe1xyXG4gIHg6IDM2MCxcclxuICB5OiAzMDAsXHJcbiAgZHJhZ2dhYmxlOiB0cnVlXHJcbn0pO1xyXG52YXIgeW9kYUdyb3VwID0gbmV3IEtvbnZhLkdyb3VwKHtcclxuICB4OiAyMDAsXHJcbiAgeTogMTkwLFxyXG4gIGRyYWdnYWJsZTogdHJ1ZVxyXG59KTtcclxuXHJcblxyXG4vL2FkZGluZyBncm91cCB0byBsYXllclxyXG5sYXllci5hZGQoZGFydGhWYWRlckdyb3VwKTtcclxubGF5ZXIuYWRkKHlvZGFHcm91cCk7XHJcblxyXG4vL2FkZGluZyBzaGFwZSZhbmNob3JzIHRvIGdyb3VwIFxyXG5kYXJ0aFZhZGVyR3JvdXAuYWRkKGRhcnRoVmFkZXJJbWcpO1xyXG5hZGRBbmNob3IoZGFydGhWYWRlckdyb3VwLCAwLCAwLCAndG9wTGVmdCcpO1xyXG5hZGRBbmNob3IoZGFydGhWYWRlckdyb3VwLCAyMDAsIDAsICd0b3BSaWdodCcpO1xyXG5hZGRBbmNob3IoZGFydGhWYWRlckdyb3VwLCAyMDAsIDEzOCwgJ2JvdHRvbVJpZ2h0Jyk7XHJcbmFkZEFuY2hvcihkYXJ0aFZhZGVyR3JvdXAsIDAsIDEzOCwgJ2JvdHRvbUxlZnQnKTtcclxuXHJcbmFkZEFuY2hvcihkYXJ0aFZhZGVyR3JvdXAsIDEwMCwgLTY5LCAndG9wTWlkZGxlJyk7XHJcblxyXG55b2RhR3JvdXAuYWRkKHlvZGFJbWcpO1xyXG5hZGRBbmNob3IoeW9kYUdyb3VwLCAwLCAwLCAndG9wTGVmdCcpO1xyXG5hZGRBbmNob3IoeW9kYUdyb3VwLCA5MywgMCwgJ3RvcFJpZ2h0Jyk7XHJcbmFkZEFuY2hvcih5b2RhR3JvdXAsIDkzLCAxMDQsICdib3R0b21SaWdodCcpO1xyXG5hZGRBbmNob3IoeW9kYUdyb3VwLCAwLCAxMDQsICdib3R0b21MZWZ0Jyk7XHJcblxyXG5hZGRBbmNob3IoeW9kYUdyb3VwLCA5MyAvIDIsIC01MiwgJ3RvcE1pZGRsZScpO1xyXG5cclxuXHJcbnZhciBpbWFnZU9iajEgPSBuZXcgSW1hZ2UoKTtcclxuaW1hZ2VPYmoxLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgZGFydGhWYWRlckltZy5pbWFnZShpbWFnZU9iajEpO1xyXG4gICAgZGFydGhWYWRlckltZy5zdHJva2VFbmFibGVkKGZhbHNlKTtcclxuICAgIGxheWVyLmRyYXcoKTtcclxufTtcclxuaW1hZ2VPYmoxLnNyYyA9ICcvZmlsZXMvZGFydGgtdmFkZXIuanBnJztcclxuXHJcbnZhciBpbWFnZU9iajIgPSBuZXcgSW1hZ2UoKTtcclxuaW1hZ2VPYmoyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgeW9kYUltZy5pbWFnZShpbWFnZU9iajIpO1xyXG4gICAgeW9kYUltZy5zdHJva2VFbmFibGVkKGZhbHNlKTtcclxuICAgIGxheWVyLmRyYXcoKTtcclxufTtcclxuaW1hZ2VPYmoyLnNyYyA9ICcvZmlsZXMveW9kYS5qcGcnO1xyXG5cclxuXHJcblxyXG5cclxuLy93dGYgY2hhcHRlcjIgYWRkaW5nIGxpc3RlbmVyc1xyXG5cclxudmFyIHNoYXBlcyA9IFtdLFxyXG4gICAgdG9nZ2xlID0gZmFsc2U7XHJcblxyXG5zaGFwZXMucHVzaChkYXJ0aFZhZGVySW1nKTtcclxuc2hhcGVzLnB1c2goeW9kYUltZyk7XHJcblxyXG5mdW5jdGlvbiBhZGRMaXN0ZW5lcnMoc2hhcGUpIHtcclxuICAgIHNoYXBlLm9uKCdjbGljayBtb3VzZWRvd24nLCAoZSkgPT4ge1xyXG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xyXG5cclxuICAgIC8vcmVtb3Zpbmcgc2VsZWN0aW9uXHJcbiAgICBzaGFwZXMuZm9yRWFjaChzaGFwZSA9PiBzaGFwZS5zdHJva2VFbmFibGVkKGZhbHNlKSk7XHJcbiAgICBcclxuICAgIHRhcmdldC5zdHJva2VFbmFibGVkKHRydWUpO1xyXG4gICAgLy8gdGFyZ2V0Lm1vdmVUb1RvcCgpO1xyXG4gICAgbGF5ZXIuZHJhdygpO1xyXG4gIH0pXHJcbn1cclxuXHJcbnNoYXBlcy5mb3JFYWNoKHNoYXBlID0+IGFkZExpc3RlbmVycyhzaGFwZSkpO1xyXG5cclxuYmFja2dyb3VuZC5vbignY2xpY2snLCAoZSkgPT4ge1xyXG4gIHNoYXBlcy5mb3JFYWNoKHNoYXBlID0+IHNoYXBlLnN0cm9rZUVuYWJsZWQoZmFsc2UpKTtcclxuICBsYXllci5kcmF3KCk7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlUG9seWdvbihlKSB7XHJcbiAgY29vcmRzID0ge1xyXG4gICAgeDogZS5ldnQub2Zmc2V0WCxcclxuICAgIHk6IGUuZXZ0Lm9mZnNldFlcclxuICB9O1xyXG4gIFxyXG4gIHdpZHRoID0gLU1hdGguYWJzKGNvb3Jkc1N0YXJ0LnggLSBjb29yZHMueCk7XHJcbiAgaGVpZ2h0ID0gTWF0aC5hYnMoY29vcmRzU3RhcnQueSAtIGNvb3Jkcy55KTtcclxuXHJcbiAgdmFyIHJlY3QgPSBuZXcgS29udmEuUmVjdCh7XHJcbiAgICB4OiBjb29yZHNTdGFydC54LFxyXG4gICAgeTogY29vcmRzU3RhcnQueSxcclxuICAgIHdpZHRoLFxyXG4gICAgaGVpZ2h0LFxyXG4gICAgZmlsbDogJ2dyZWVuJ1xyXG4gIH0pO1xyXG5cclxuICBsYXllci5hZGQocmVjdCk7XHJcbiAgc3RhZ2UuYWRkKGxheWVyKTtcclxufVxyXG5cclxuYmFja2dyb3VuZC5vbignbW91c2Vkb3duJywgKGUpID0+IHtcclxuICBjb29yZHNTdGFydCA9IHtcclxuICAgIHg6IGUuZXZ0Lm9mZnNldFgsXHJcbiAgICB5OiBlLmV2dC5vZmZzZXRZXHJcbiAgfTtcclxuXHJcbiAgdG9nZ2xlID0gIXRvZ2dsZVxyXG59KTtcclxuXHJcbmJhY2tncm91bmQub24oJ21vdXNldXAnLCAoKSA9PiB0b2dnbGUgPSAhdG9nZ2xlKTtcclxuLy8gYmFja2dyb3VuZC5vbignbW91c2Vtb3ZlJywgKGUpID0+IHRvZ2dsZSAmJiBjcmVhdGVQb2x5Z29uKGUpKTtcclxuXHJcblxyXG4vLyBiYWNrZ3JvdW5kLm9uKCdtb3VzZXVwJywgKGUpID0+IGNvbnNvbGUubG9nKCdldmVudCcsIGUpKTtcclxuXHJcblxyXG4iXX0=
