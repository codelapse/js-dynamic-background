

function Accelerometer(movementHandler) {

    this.movementHandler = movementHandler;

    this.lastGamma = null;
    this.lastBeta = null;

    this.dx = 0;
    this.dy = 0;

    this.vx = 0;
    this.vy = 0;

    if (window.DeviceOrientationEvent) {

        var instance = this;
        window.addEventListener('deviceorientation', function(eventData) {

            // set initial accelerometer position
            if(instance.lastGamma === null || instance.lastBeta === null) {
                instance.lastGamma = eventData.gamma;
                instance.lastBeta = eventData.beta;

            }
            instance.dx = eventData.gamma - instance.lastGamma;
            instance.dy = eventData.beta - instance.lastBeta;

            instance.lastGamma = eventData.gamma;
            instance.lastBeta = eventData.beta;


            instance.adjustDirectionForOrientation();
            instance.setSpeed();

            instance.movementHandler(instance.vx, instance.vy);

        }, false);
    }
}

Accelerometer.prototype.adjustDirectionForOrientation = function() {

    // landscape
    if(window.orientation === 90 || window.orientation === -90) {
        var originalDX = this.dx;
        this.dx = this.dy;
        this.dy = originalDX;

        // left
        if(window.orientation === -90) {
            this.dx *= -1;
        }

        // right
        else if(window.orientation === 90) {
            this.dy *= -1;
        }
    }

    // portrait : upside-down
    else if(window.orientation === 180) {
        this.dx *= -1;
        this.dy *= -1;
    }
}

Accelerometer.prototype.setSpeed = function() {

    var reducerFactor = 4;
    var maxSpeed = 1;
    var minSpeed = 0.2;

    this.vx = this.dx/reducerFactor;
    this.vy = this.dy/reducerFactor;

    this.vx = Math.min(this.vx, maxSpeed);
    this.vy = Math.min(this.vy, maxSpeed);
    this.vx = Math.max(this.vx, -maxSpeed);
    this.vy = Math.max(this.vy, -maxSpeed);

    if(Math.abs(this.vx) <= minSpeed) this.vx = 0;
    if(Math.abs(this.vy) <= minSpeed) this.vy = 0;
}