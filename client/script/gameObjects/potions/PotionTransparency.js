class PotionTransparency extends Potion {
    constructor(texture) {
        super(texture);
    }

    affectCharacter(character) {
        super.affectCharacter(character);
        character.setTransparent();
        setTimeout(() => character.setTransparent(false), 5000);
    }
}