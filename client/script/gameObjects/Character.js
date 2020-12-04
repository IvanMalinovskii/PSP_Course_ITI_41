class Character {
    constructor(speed, size, texture, rects) {
        this.texture = texture;
        this.isSlow = false;
        this.isTransparent = false;
        this.richness = 0;
        this.speed = speed;
        this.rects = rects;
        this.texture.frame = rects[0];
        this.character = new PIXI.Sprite(texture);
        this.character.width = size;
        this.character.height = size;

        this.character.vx = 0;
        this.character.vy = 0;
    }

    setAll(params) {
        this.speed = params.speed;
        this.isSlow = params.isSlow;
        this.isTransparent = params.isTransparent;
        this.character.x = params.position.x;
        this.character.y = params.position.y;
        this.character.vx = params.direction.x;
        this.character.vy = params.direction.y;
        this.character.texture.frame = this.rects[params.targetTexture];
        this.richness = params.richness;
    }

    setSlow(flag = true) {
        this.isSlow = flag;
    }

    setTransparent(flag = true) {
        this.isTransparent = flag;
    }

    giveTheCoin(amount = 1) {
        this.richness += amount;
    }

    takeTheCoin(amount = 1) {
        this.richness -= amount;
    }

    setPosition(x, y) {
        this.character.x = x;
        this.character.y = y;
    }

    setDirectionX(x) {
        this.character.vx = x;
    }

    getPosition() {
        return {
            x: this.character.x,
            y: this.character.y
        };
    }

    setDirectionY(y) {
        this.character.vy = y;
    }

    getDirection() {
        return {x: this.character.vx, y: this.character.vy};
    }

    setIdle() {
        this.character.vx = 0;
        this.character.vy = 0;
        this.texture.frame = this.rects[0];
    }

    move(speed = this.speed) {
        if (this.character.vx === 1) this.texture.frame = this.rects[2];
        else if (this.character.vx === -1) this.texture.frame = this.rects[1];
        else if (this.character.vy === -1) this.texture.frame = this.rects[3];
        else this.texture.frame = this.rects[0];
        if (this.isSlow) speed /= 2;
        this.character.x += this.character.vx * speed;
        this.character.y += this.character.vy * speed;
    }

    getSprite() {
        return this.character;
    }

    getCollider() {
        return this.character.getBounds();
    }
}