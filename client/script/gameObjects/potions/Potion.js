class Potion extends EnvironmentObject {
    type = 'potion';
    constructor(texture, power = 1) {
        super(new PIXI.Sprite(texture));
        super.setProps(0, 0, 32);
        this.power = power;
    }

    affectCharacter(character) {
        character.giveTheCoin(this.power);
    }
}