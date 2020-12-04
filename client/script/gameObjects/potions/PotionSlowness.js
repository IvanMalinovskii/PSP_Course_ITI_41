class PotionSlowness extends Potion {
    constructor(texture) {
        super(texture);
    }

    affectCharacter(character) {
        character.setSlow();
        setTimeout(() => character.setSlow(false), 5000);
    }
}