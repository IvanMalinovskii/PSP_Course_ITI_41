class Wall extends EnvironmentObject {
    type = 'wall';
    constructor(texture) {
        super(new PIXI.Sprite(texture));
        super.setProps(0, 0, 32);
    }

    // setProps(x, y, sizeX, sizeY) {
    //     super.setProps(x, y, sizeX);
    //     super.setHeight(sizeY);
    // }
}