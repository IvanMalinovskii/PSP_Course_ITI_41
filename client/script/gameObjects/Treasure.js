class Treasure extends EnvironmentObject {
    type = 'treasure';
    constructor(texture, currency = 1) {
        super(new PIXI.Sprite(texture));
        super.setProps(0, 0, 32);
        this.currency = currency;
    }
}