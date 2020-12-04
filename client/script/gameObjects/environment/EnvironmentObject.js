class EnvironmentObject {
    size = 32;
    constructor(object) {
        this.envObject = object;
    }

    setPosition(x, y) {
        this.envObject.x = x;
        this.envObject.y = y;
    }

    setProps(x, y, size) {
        this.size = size;
        this.setPosition(x, y);
        this.envObject.width = size;
        this.envObject.height = size;
    }

    setHeight(size) {
        this.envObject.height = size;
    }

    getSprite() {
        return this.envObject;
    }

    getCollider() {
        return this.envObject.getBounds();
    }
}