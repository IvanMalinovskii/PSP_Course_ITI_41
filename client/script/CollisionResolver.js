class CollisionResolver {
    app = null;
    stones = [];
    treasures = [];
    potions = [];

    constructor(app, stones, treasures, potions) {
        this.app = app;
        this.stones = stones;
        this.treasures = treasures;
        this.potions = potions;
    }

    isIntersected(left, right) {
        let leftBox = left.getCollider();
        let rightBox = right.getCollider();

        return leftBox.x + leftBox.width > rightBox.x &&
            leftBox.x < rightBox.x + rightBox.width &&
            leftBox.y + leftBox.height > rightBox.y &&
            leftBox.y < rightBox.y + rightBox.height;
    }

    resolveCollision(character, object) {
        if (object.type === 'stone' || object.type === 'wall') {
            if (character.isTransparent && object.type === 'stone') return;
            character.setDirectionX(-character.getDirection().x);
            character.setDirectionY(-character.getDirection().y);
            while (this.isIntersected(character, object)) {
                character.move(0.1);
            }
            //character.setIdle();
            character.setDirectionX(-character.getDirection().x);
            character.setDirectionY(-character.getDirection().y);
        } else if (object.type === 'treasure') {
            app.stage.removeChild(object.getSprite());
            this.treasures.find(treasure => treasure === object).setProps(-100, -100, 0);
            // if (treasures.every(treasure => treasure.getSprite().width === 0)) isEnd = true;
            character.giveTheCoin(object.currency);
            console.log(character.richness);
        } else if (object.type === 'potion') {
            app.stage.removeChild(object.getSprite());
            this.potions.find(potion => potion === object).setProps(-100, -100, 0);
            object.affectCharacter(character);
            console.log('POTION');
        }
    }
}