class Stone extends EnvironmentObject {
    type = 'stone';
    constructor(texture) {
        super(new PIXI.Sprite(texture));
        super.setProps(0, 0, 32);
    }

}