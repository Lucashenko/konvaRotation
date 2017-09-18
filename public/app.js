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
        case 'topMiddle':
            rotateFlage=true;
            var diffx = topMiddle.getX() - image.width() / 2;
            var diffy = image.height() / 2 - topMiddle.getY();
            // console.log('height!!!!!!!', diffy);
            // console.log('angle', 180*Math.tan(diffx/diffy)/(Math.PI));
            var dir1 = 180*Math.tan(diffx/diffy)/(Math.PI);
            break;
    }
(dir) ? 
console.log('dir', dir)
:
console.log('dir1', dir1);

    image.position(topLeft.position());
            
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
            y: 137 / 2
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
    height: 137,
    stroke: 'green',
    strokeWidth: 5,
    offset: {
        x: 100,
        y: 137 / 2
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
        y: 137 / 2
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
  
  console.log(coords);
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
background.on('mousemove', (e) => toggle && createPolygon(e));


// background.on('mouseup', (e) => console.log('event', e));



//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL3NjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbnZhciBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGUoYWN0aXZlQW5jaG9yKSB7XHJcbiAgICB2YXIgZ3JvdXAgPSBhY3RpdmVBbmNob3IuZ2V0UGFyZW50KCk7XHJcblxyXG4gICAgdmFyIHRvcExlZnQgPSBncm91cC5nZXQoJy50b3BMZWZ0JylbMF07XHJcbiAgICB2YXIgdG9wUmlnaHQgPSBncm91cC5nZXQoJy50b3BSaWdodCcpWzBdO1xyXG4gICAgdmFyIGJvdHRvbVJpZ2h0ID0gZ3JvdXAuZ2V0KCcuYm90dG9tUmlnaHQnKVswXTtcclxuICAgIHZhciBib3R0b21MZWZ0ID0gZ3JvdXAuZ2V0KCcuYm90dG9tTGVmdCcpWzBdO1xyXG4gICAgdmFyIHRvcE1pZGRsZSA9IGdyb3VwLmdldCgnLnRvcE1pZGRsZScpWzBdO1xyXG5cclxuICAgIHZhciBpbWFnZSA9IGdyb3VwLmdldCgnSW1hZ2UnKVswXTtcclxuXHJcbiAgICB2YXIgYW5jaG9yWCA9IGFjdGl2ZUFuY2hvci5nZXRYKCk7XHJcbiAgICB2YXIgYW5jaG9yWSA9IGFjdGl2ZUFuY2hvci5nZXRZKCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgdmFyIHJvdGF0ZUZsYWdlID0gZmFsc2U7XHJcbiAgICB2YXIgZGlyID0gMDtcclxuICAgIC8vIHVwZGF0ZSBhbmNob3IgcG9zaXRpb25zXHJcbiAgICBzd2l0Y2ggKGFjdGl2ZUFuY2hvci5nZXROYW1lKCkpIHtcclxuICAgICAgICBjYXNlICd0b3BMZWZ0JzpcclxuICAgICAgICAgICAgdG9wUmlnaHQuc2V0WShhbmNob3JZKTtcclxuICAgICAgICAgICAgYm90dG9tTGVmdC5zZXRYKGFuY2hvclgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd0b3BSaWdodCc6XHJcbiAgICAgICAgICAgIHJvdGF0ZUZsYWdlPXRydWU7XHJcbiAgICAgICAgICAgIHZhciBkaWZmeCA9ICh0b3BSaWdodC5nZXRYKCktdG9wTGVmdC5nZXRYKCkpO1xyXG4gICAgICAgICAgICB2YXIgZGlmZnkgPSAodG9wUmlnaHQuZ2V0WSgpLXRvcExlZnQuZ2V0WSgpKTtcclxuICAgICAgICAgICAgdmFyIGRpcj0oZGlmZnggPCAwKSA/IFxyXG4gICAgICAgICAgICAgICAgMTgwKk1hdGguYXRhbihkaWZmeS9kaWZmeCkvKE1hdGguUEkpIC0gMTgwXHJcbiAgICAgICAgICAgICAgICA6XHJcbiAgICAgICAgICAgICAgICAxODAqTWF0aC5hdGFuKGRpZmZ5L2RpZmZ4KS8oTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2JvdHRvbVJpZ2h0JzpcclxuICAgICAgICAgICAgYm90dG9tTGVmdC5zZXRZKGFuY2hvclkpO1xyXG4gICAgICAgICAgICB0b3BSaWdodC5zZXRYKGFuY2hvclgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdib3R0b21MZWZ0JzpcclxuICAgICAgICAgICAgYm90dG9tUmlnaHQuc2V0WShhbmNob3JZKTtcclxuICAgICAgICAgICAgdG9wTGVmdC5zZXRYKGFuY2hvclgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICd0b3BNaWRkbGUnOlxyXG4gICAgICAgICAgICByb3RhdGVGbGFnZT10cnVlO1xyXG4gICAgICAgICAgICB2YXIgZGlmZnggPSB0b3BNaWRkbGUuZ2V0WCgpIC0gaW1hZ2Uud2lkdGgoKSAvIDI7XHJcbiAgICAgICAgICAgIHZhciBkaWZmeSA9IGltYWdlLmhlaWdodCgpIC8gMiAtIHRvcE1pZGRsZS5nZXRZKCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoZWlnaHQhISEhISEhJywgZGlmZnkpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnYW5nbGUnLCAxODAqTWF0aC50YW4oZGlmZngvZGlmZnkpLyhNYXRoLlBJKSk7XHJcbiAgICAgICAgICAgIHZhciBkaXIxID0gMTgwKk1hdGgudGFuKGRpZmZ4L2RpZmZ5KS8oTWF0aC5QSSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4oZGlyKSA/IFxyXG5jb25zb2xlLmxvZygnZGlyJywgZGlyKVxyXG46XHJcbmNvbnNvbGUubG9nKCdkaXIxJywgZGlyMSk7XHJcblxyXG4gICAgaW1hZ2UucG9zaXRpb24odG9wTGVmdC5wb3NpdGlvbigpKTtcclxuICAgICAgICAgICAgXHJcbiAgICBpZihyb3RhdGVGbGFnZSl7XHJcbiAgICAgICAgaW1hZ2Uucm90YXRpb24oZGlyMSk7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICB2YXIgd2lkdGggPSB0b3BSaWdodC5nZXRYKCkgLSB0b3BMZWZ0LmdldFgoKTtcclxuICAgICAgdmFyIGhlaWdodCA9IGJvdHRvbUxlZnQuZ2V0WSgpIC0gdG9wTGVmdC5nZXRZKCk7XHJcbiAgICAgICAgaWYod2lkdGggJiYgaGVpZ2h0KSB7XHJcbiAgICAgICAgaW1hZ2Uud2lkdGgod2lkdGgpO1xyXG4gICAgICAgIGltYWdlLmhlaWdodChoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBhZGRBbmNob3IoZ3JvdXAsIHgsIHksIG5hbWUpIHtcclxuICAgIHZhciBzdGFnZSA9IGdyb3VwLmdldFN0YWdlKCk7XHJcbiAgICB2YXIgbGF5ZXIgPSBncm91cC5nZXRMYXllcigpO1xyXG4gICAgdmFyIGFuY2hvciA9IG5ldyBLb252YS5DaXJjbGUoe1xyXG4gICAgICAgIHg6IHgsXHJcbiAgICAgICAgeTogeSxcclxuICAgICAgICBzdHJva2U6ICcjNjY2JyxcclxuICAgICAgICBmaWxsOiAnI2RkZCcsXHJcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDIsXHJcbiAgICAgICAgcmFkaXVzOiA4LFxyXG4gICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxyXG4gICAgICAgIGRyYWdPblRvcDogZmFsc2UsXHJcbiAgICAgICAgb2Zmc2V0OiB7XHJcbiAgICAgICAgICAgIHg6IDEwMCxcclxuICAgICAgICAgICAgeTogMTM3IC8gMlxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgYW5jaG9yLm9uKCdkcmFnbW92ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHVwZGF0ZSh0aGlzKTtcclxuICAgICAgICBsYXllci5kcmF3KCk7XHJcbiAgICB9KTtcclxuICAgIGFuY2hvci5vbignbW91c2Vkb3duIHRvdWNoc3RhcnQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgZ3JvdXAuc2V0RHJhZ2dhYmxlKGZhbHNlKTtcclxuICAgICAgdGhpcy5tb3ZlVG9Ub3AoKTtcclxuICAgIH0pO1xyXG4gICAgYW5jaG9yLm9uKCdkcmFnZW5kJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgZ3JvdXAuc2V0RHJhZ2dhYmxlKHRydWUpO1xyXG4gICAgICAgIGxheWVyLmRyYXcoKTtcclxuICAgIH0pO1xyXG4gICAgLy8gYWRkIGhvdmVyIHN0eWxpbmdcclxuICAgIGFuY2hvci5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xyXG4gICAgICAgIHRoaXMuc2V0U3Ryb2tlV2lkdGgoNCk7XHJcbiAgICAgICAgbGF5ZXIuZHJhdygpO1xyXG4gICAgfSk7XHJcbiAgICBhbmNob3Iub24oJ21vdXNlb3V0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5nZXRMYXllcigpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gJ2RlZmF1bHQnO1xyXG4gICAgICAgIHRoaXMuc2V0U3Ryb2tlV2lkdGgoMik7XHJcbiAgICAgICAgbGF5ZXIuZHJhdygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZ3JvdXAuYWRkKGFuY2hvcik7XHJcbn1cclxuXHJcblxyXG4vL2NyZWF0aW5nIHN0YWdlXHJcbi8vY29udGFpbmVyOiBjb250YWluZXJJRFxyXG52YXIgc3RhZ2UgPSBuZXcgS29udmEuU3RhZ2Uoe1xyXG4gICAgY29udGFpbmVyOiAnY29udGFpbmVyJyxcclxuICAgIHdpZHRoOiB3aWR0aCxcclxuICAgIGhlaWdodDogaGVpZ2h0XHJcbn0pO1xyXG5cclxuLy9jcmVhdGluZyBsYXllclxyXG52YXIgbGF5ZXIgPSBuZXcgS29udmEuTGF5ZXIoKTtcclxuLy9hZGRpbmcgbGF5ZXIgdG8gdGhlIHN0YWdlXHJcbnN0YWdlLmFkZChsYXllcik7XHJcblxyXG5cclxuXHJcbi8vd3RmIGNoYXB0ZXIxXHJcbnZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuY2FudmFzLndpZHRoID0gc3RhZ2Uud2lkdGgoKTtcclxuY2FudmFzLmhlaWdodCA9IHN0YWdlLmhlaWdodCgpO1xyXG5cclxudmFyIGJhY2tncm91bmQgPSBuZXcgS29udmEuSW1hZ2Uoe1xyXG4gIGltYWdlOiBjYW52YXMsXHJcbiAgeDogMCxcclxuICB5OiAwLFxyXG4gIHN0cm9rZTogJ3RvbWF0bydcclxufSk7XHJcblxyXG5sYXllci5hZGQoYmFja2dyb3VuZCk7XHJcbnN0YWdlLmRyYXcoKTtcclxuXHJcblxyXG5cclxuXHJcbi8vIGRhcnRoIHZhZGVyXHJcbnZhciBkYXJ0aFZhZGVySW1nID0gbmV3IEtvbnZhLkltYWdlKHtcclxuICAgIHdpZHRoOiAyMDAsXHJcbiAgICBoZWlnaHQ6IDEzNyxcclxuICAgIHN0cm9rZTogJ2dyZWVuJyxcclxuICAgIHN0cm9rZVdpZHRoOiA1LFxyXG4gICAgb2Zmc2V0OiB7XHJcbiAgICAgICAgeDogMTAwLFxyXG4gICAgICAgIHk6IDEzNyAvIDJcclxuICAgIH1cclxufSk7XHJcbi8vIHlvZGFcclxudmFyIHlvZGFJbWcgPSBuZXcgS29udmEuSW1hZ2Uoe1xyXG4gICAgd2lkdGg6IDkzLFxyXG4gICAgaGVpZ2h0OiAxMDQsXHJcbiAgICBzdHJva2U6ICdncmVlbicsXHJcbiAgICBzdHJva2VXaWR0aDogNSxcclxuICAgIG9mZnNldDoge1xyXG4gICAgICAgIHg6IDEwMCxcclxuICAgICAgICB5OiAxMzcgLyAyXHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbnZhciBkYXJ0aFZhZGVyR3JvdXAgPSBuZXcgS29udmEuR3JvdXAoe1xyXG4gIHg6IDE4MCxcclxuICB5OiA1MCxcclxuICBkcmFnZ2FibGU6IHRydWVcclxufSk7XHJcbnZhciB5b2RhR3JvdXAgPSBuZXcgS29udmEuR3JvdXAoe1xyXG4gIHg6IDIwLFxyXG4gIHk6IDExMCxcclxuICBkcmFnZ2FibGU6IHRydWVcclxufSk7XHJcblxyXG5cclxuLy9hZGRpbmcgZ3JvdXAgdG8gbGF5ZXJcclxubGF5ZXIuYWRkKGRhcnRoVmFkZXJHcm91cCk7XHJcbmxheWVyLmFkZCh5b2RhR3JvdXApO1xyXG5cclxuLy9hZGRpbmcgc2hhcGUmYW5jaG9ycyB0byBncm91cCBcclxuZGFydGhWYWRlckdyb3VwLmFkZChkYXJ0aFZhZGVySW1nKTtcclxuYWRkQW5jaG9yKGRhcnRoVmFkZXJHcm91cCwgMCwgMCwgJ3RvcExlZnQnKTtcclxuYWRkQW5jaG9yKGRhcnRoVmFkZXJHcm91cCwgMjAwLCAwLCAndG9wUmlnaHQnKTtcclxuYWRkQW5jaG9yKGRhcnRoVmFkZXJHcm91cCwgMjAwLCAxMzgsICdib3R0b21SaWdodCcpO1xyXG5hZGRBbmNob3IoZGFydGhWYWRlckdyb3VwLCAwLCAxMzgsICdib3R0b21MZWZ0Jyk7XHJcblxyXG5hZGRBbmNob3IoZGFydGhWYWRlckdyb3VwLCAxMDAsIC02OSwgJ3RvcE1pZGRsZScpO1xyXG5cclxueW9kYUdyb3VwLmFkZCh5b2RhSW1nKTtcclxuYWRkQW5jaG9yKHlvZGFHcm91cCwgMCwgMCwgJ3RvcExlZnQnKTtcclxuYWRkQW5jaG9yKHlvZGFHcm91cCwgOTMsIDAsICd0b3BSaWdodCcpO1xyXG5hZGRBbmNob3IoeW9kYUdyb3VwLCA5MywgMTA0LCAnYm90dG9tUmlnaHQnKTtcclxuYWRkQW5jaG9yKHlvZGFHcm91cCwgMCwgMTA0LCAnYm90dG9tTGVmdCcpO1xyXG5cclxuYWRkQW5jaG9yKHlvZGFHcm91cCwgOTMgLyAyLCAtNTIsICd0b3BNaWRkbGUnKTtcclxuXHJcblxyXG52YXIgaW1hZ2VPYmoxID0gbmV3IEltYWdlKCk7XHJcbmltYWdlT2JqMS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgIGRhcnRoVmFkZXJJbWcuaW1hZ2UoaW1hZ2VPYmoxKTtcclxuICAgIGRhcnRoVmFkZXJJbWcuc3Ryb2tlRW5hYmxlZChmYWxzZSk7XHJcbiAgICBsYXllci5kcmF3KCk7XHJcbn07XHJcbmltYWdlT2JqMS5zcmMgPSAnL2ZpbGVzL2RhcnRoLXZhZGVyLmpwZyc7XHJcblxyXG52YXIgaW1hZ2VPYmoyID0gbmV3IEltYWdlKCk7XHJcbmltYWdlT2JqMi5vbmxvYWQgPSBmdW5jdGlvbigpIHtcclxuICAgIHlvZGFJbWcuaW1hZ2UoaW1hZ2VPYmoyKTtcclxuICAgIHlvZGFJbWcuc3Ryb2tlRW5hYmxlZChmYWxzZSk7XHJcbiAgICBsYXllci5kcmF3KCk7XHJcbn07XHJcbmltYWdlT2JqMi5zcmMgPSAnL2ZpbGVzL3lvZGEuanBnJztcclxuXHJcblxyXG5cclxuXHJcbi8vd3RmIGNoYXB0ZXIyIGFkZGluZyBsaXN0ZW5lcnNcclxuXHJcbnZhciBzaGFwZXMgPSBbXSxcclxuICAgIHRvZ2dsZSA9IGZhbHNlO1xyXG5cclxuc2hhcGVzLnB1c2goZGFydGhWYWRlckltZyk7XHJcbnNoYXBlcy5wdXNoKHlvZGFJbWcpO1xyXG5cclxuZnVuY3Rpb24gYWRkTGlzdGVuZXJzKHNoYXBlKSB7XHJcbiAgc2hhcGUub24oJ2NsaWNrIG1vdXNlZG93bicsIChlKSA9PiB7XHJcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcblxyXG4gICAgLy9yZW1vdmluZyBzZWxlY3Rpb25cclxuICAgIHNoYXBlcy5mb3JFYWNoKHNoYXBlID0+IHNoYXBlLnN0cm9rZUVuYWJsZWQoZmFsc2UpKTtcclxuICAgIFxyXG4gICAgdGFyZ2V0LnN0cm9rZUVuYWJsZWQodHJ1ZSk7XHJcbiAgICBsYXllci5kcmF3KCk7XHJcbiAgfSlcclxufVxyXG5cclxuc2hhcGVzLmZvckVhY2goc2hhcGUgPT4gYWRkTGlzdGVuZXJzKHNoYXBlKSk7XHJcblxyXG5iYWNrZ3JvdW5kLm9uKCdjbGljaycsIChlKSA9PiB7XHJcbiAgc2hhcGVzLmZvckVhY2goc2hhcGUgPT4gc2hhcGUuc3Ryb2tlRW5hYmxlZChmYWxzZSkpO1xyXG4gIGxheWVyLmRyYXcoKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVQb2x5Z29uKGUpIHtcclxuICBjb29yZHMgPSB7XHJcbiAgICB4OiBlLmV2dC5vZmZzZXRYLFxyXG4gICAgeTogZS5ldnQub2Zmc2V0WVxyXG4gIH07XHJcbiAgXHJcbiAgY29uc29sZS5sb2coY29vcmRzKTtcclxuICB3aWR0aCA9IC1NYXRoLmFicyhjb29yZHNTdGFydC54IC0gY29vcmRzLngpO1xyXG4gIGhlaWdodCA9IE1hdGguYWJzKGNvb3Jkc1N0YXJ0LnkgLSBjb29yZHMueSk7XHJcblxyXG4gIHZhciByZWN0ID0gbmV3IEtvbnZhLlJlY3Qoe1xyXG4gICAgeDogY29vcmRzU3RhcnQueCxcclxuICAgIHk6IGNvb3Jkc1N0YXJ0LnksXHJcbiAgICB3aWR0aCxcclxuICAgIGhlaWdodCxcclxuICAgIGZpbGw6ICdncmVlbidcclxuICB9KTtcclxuXHJcbiAgbGF5ZXIuYWRkKHJlY3QpO1xyXG4gIHN0YWdlLmFkZChsYXllcik7XHJcbn1cclxuXHJcbmJhY2tncm91bmQub24oJ21vdXNlZG93bicsIChlKSA9PiB7XHJcbiAgY29vcmRzU3RhcnQgPSB7XHJcbiAgICB4OiBlLmV2dC5vZmZzZXRYLFxyXG4gICAgeTogZS5ldnQub2Zmc2V0WVxyXG4gIH07XHJcblxyXG4gIHRvZ2dsZSA9ICF0b2dnbGVcclxufSk7XHJcblxyXG5iYWNrZ3JvdW5kLm9uKCdtb3VzZXVwJywgKCkgPT4gdG9nZ2xlID0gIXRvZ2dsZSk7XHJcbmJhY2tncm91bmQub24oJ21vdXNlbW92ZScsIChlKSA9PiB0b2dnbGUgJiYgY3JlYXRlUG9seWdvbihlKSk7XHJcblxyXG5cclxuLy8gYmFja2dyb3VuZC5vbignbW91c2V1cCcsIChlKSA9PiBjb25zb2xlLmxvZygnZXZlbnQnLCBlKSk7XHJcblxyXG5cclxuIl19
