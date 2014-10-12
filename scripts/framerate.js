
function Framerate(fps, loopHandler) {
    this.loopHandler = loopHandler;

    this.lastLoopTime = 0;
    this.interval = 1000/fps;

    this.wait();
}

Framerate.prototype.wait = function () {
    var currentTime = Date.now();
    var delta = currentTime - this.lastLoopTime;

    if (delta > this.interval) {
        this.lastLoopTime = currentTime - (delta % this.interval);
        this.loopHandler();
        this.wait();
    }
    else {
        var instance = this;
        window.requestAnimationFrame(function() {
            instance.wait();
        });
    }
}

