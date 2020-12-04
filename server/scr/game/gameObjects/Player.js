class Player {
    isFirst = false;
    status = 'first';
    speed = 0.5;
    richness = 0;
    isSlow = false;
    isTransparent = false;
    direction = {
        x: 0,
        y: 0
    };
    targetTexture = 0;
    position = {
        x: 0,
        y: 0
    };

    constructor(status, x = 0, y = 0, speed = 0.5) {
        this.status = status;
        this.position.x = x;
        this.position.y = y;
        this.speed = speed;
    }

    setInitial(x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    setParams(params) {
        this.speed = params.speed;
        this.richness = params.richness;
        this.position.x = params.position.x;
        this.position.y = params.position.y;
        this.isSlow = params.isSlow;
        this.isTransparent = params.isTransparent;
        this.direction.x = params.direction.x;
        this.direction.y = params.direction.y;
        this.targetTexture = params.targetTexture;
    }

    getParams() {
        return {
            status: this.status,
            richness: this.richness,
            position: this.position,
            direction: this.direction,
            isSlow: this.isSlow,
            isTransparent: this.isTransparent,
            speed: this.speed,
            targetTexture: this.targetTexture
        };
    }
}

exports.Player = Player;