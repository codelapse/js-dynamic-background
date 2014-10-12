
function Particle(layer, canvas) {

    this.canvas = canvas;

    this.image = null;
    this.size = 0;
    this.position = new Vector();

    this.initialSpeed = new Vector();
    this.currentSpeed = new Vector();


    this.setImage(layer);
    this.setSize(layer);
    this.setInitialPosition();
    this.setInitialSpeed();
}



Particle.prototype.setImage = function(layer) {
    this.image = new Image();
    this.image.src = 'images/particle_' + layer + '.png';
}

Particle.prototype.setSize = function(layer) {
    var factorSize = 1;
    if(window.screen.width <= 480) factorSize = 0.5;

    switch(layer) {
        case 1: this.size = getRandomInt(200*factorSize, 300*factorSize); break;
        case 2: this.size = getRandomInt(80*factorSize, 130*factorSize); break;
        case 3: this.size = getRandomInt(20, 40); break;
    }
}

Particle.prototype.setInitialPosition = function() {
    this.position.x = getRandomInt(0, this.canvas.width);
    this.position.y = getRandomInt(0, this.canvas.height);
}

Particle.prototype.setInitialSpeed = function() {
    var xDirection = (getRandomInt(0, 1) === 0) ? -1 : 1;
    var yDirection = (getRandomInt(0, 1) === 0) ? -1 : 1;

    this.initialSpeed.x = Math.random();
    this.initialSpeed.y = Math.random();

    this.currentSpeed.x = this.initialSpeed.x * xDirection;
    this.currentSpeed.y = this.initialSpeed.y * yDirection;
}



Particle.prototype.move = function () {
    
    this.position.add(this.currentSpeed);

    this.currentSpeed.x = this.boundColision(this.position.x, this.currentSpeed.x, this.canvas.width);
    this.currentSpeed.y = this.boundColision(this.position.y, this.currentSpeed.y, this.canvas.height);

    this.currentSpeed.x = this.decelerate(this.currentSpeed.x, this.initialSpeed.x);
    this.currentSpeed.y = this.decelerate(this.currentSpeed.y, this.initialSpeed.y);
};

Particle.prototype.boundColision = function(position, speed, maxBound) {
    var newSpeed = speed;

    if(((position + this.size > maxBound) && speed > 0) ||
        (position < 0 && speed < 0)) {
        newSpeed *= -1;
    }

    return newSpeed;
}

Particle.prototype.decelerate = function(speed, initialSpeed) {

    var decelerationFactor = 0.05;
    var decelerationThreshold = initialSpeed + decelerationFactor*2;

    var direction = (speed > 0)?1:-1;
    var absSpeed = Math.abs(speed);

    var newSpeed = absSpeed - (absSpeed * decelerationFactor);
    if(newSpeed < decelerationThreshold) newSpeed = initialSpeed;

    return newSpeed * direction;
}



Particle.prototype.draw = function(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
}



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}