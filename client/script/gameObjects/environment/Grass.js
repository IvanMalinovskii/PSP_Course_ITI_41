class Grass extends EnvironmentObject{
    type = 'grass';
    constructor(texture) {
        super(new PIXI.Sprite(texture));
        this.setProps(0, 0, 32);
    }
}