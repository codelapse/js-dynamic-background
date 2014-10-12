

function DynamicBackground(canvasId) {
    this.canvas = document.querySelector(canvasId);
    this.particles = [];

    if(this.canvas) {
        this.observeWindowSize();
        this.observeAccelerometer();
        this.addParticules();
        this.runLoop();
    }
}



DynamicBackground.prototype.observeWindowSize = function() {
    var instance = this;
    window.addEventListener('resize', function () {
        instance.resizeCanvas();
    }, false);

    this.resizeCanvas();
}

DynamicBackground.prototype.resizeCanvas = function() {
    var parent = this.canvas.parentNode;


    this.canvas.width = parent.offsetWidth;
    this.canvas.height = parent.offsetHeight;

}



DynamicBackground.prototype.observeAccelerometer = function() {
    var instance = this;
    new Accelerometer(function(vx, vy) {
        for (var i = 0; i < instance.particles.length; i++) {
            var particle = instance.particles[i];
            particle.currentSpeed.x += vx;
            particle.currentSpeed.y += vy;
        }
    });
}



DynamicBackground.prototype.addParticules = function() {
    var i;
    for (i = 0; i < 5; i++) this.particles.push(new Particle(1, this.canvas));
    for (i = 0; i < 4; i++) this.particles.push(new Particle(2, this.canvas));
    for (i = 0; i < 2; i++) this.particles.push(new Particle(3, this.canvas));
}



DynamicBackground.prototype.runLoop = function() {
    var instance = this;
    new Framerate(30, function() {
        instance.update();
        instance.draw();
    });
}

DynamicBackground.prototype.update = function() {
    for (var i = 0; i < this.particles.length; i++) {
        var particle = this.particles[i];
        particle.move();
    }
}

DynamicBackground.prototype.draw = function() {
    var context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (var i = 0; i < this.particles.length; i++) {
        var particle = this.particles[i];
        particle.draw(context);
    }
}
