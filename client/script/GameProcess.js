class GameProcess {
    key = 'none';
    app = null;
    player = null;
    opponent = null;
    stones = [];
    potions = [];
    treasures = [];
    isEnd = false;
    collisionResolver = null;
    texts = null;

    constructor(app) {
        this.app = app;
        this.texts = new Map([
            ['first_coins', new PIXI.Text('your score: 0')],
            ['second_coins', new PIXI.Text("opponent's score: 0")],
            ['total', new PIXI.Text('STH')]
        ]);
    }

    setKey(key) {
        this.key = key;
    }

    async setup(number, first, second, map) {
        this.generateMap(map.mapWidth, map.mapHeight, map.tileSize, map);
        this.setCharacters(number, first, second);
        this.setController();

        this.app.stage.addChild(first.getSprite());
        this.app.stage.addChild(second.getSprite());

        const firstText = this.texts.get('first_coins');
        firstText.position.set(map.textFirst.x, map.textFirst.y);
        this.app.stage.addChild(firstText);

        const secondText = this.texts.get('second_coins');
        secondText.position.set(map.textSecond.x, map.textSecond.y);
        this.app.stage.addChild(secondText);

        const totalText = this.texts.get('total');
        totalText.position.set(map.mapWidth / 2 - 20, map.mapHeight / 2 - 5);
        this.app.stage.addChild(totalText);

        app.ticker.maxFramerate = 30;
        app.ticker.add(delta => this.localUpdate(delta));
        setInterval(() => this.networkUpdate(), 10);

        await queries.setInitial(this.key, this.player.getPosition(), this.createItems());
    }

    setCharacters(number, first, second) {
        if (number === 1) {
            this.player = first;
            this.opponent = second;
        }
        else {
            this.player = second;
            this.opponent = first;
        }
    }

    setController() {
        keyboard('ArrowRight').press = () => {
            this.player.setDirectionX(1);
            this.player.setDirectionY(0)
        }
        keyboard('ArrowLeft').press = () => {
            this.player.setDirectionX(-1);
            this.player.setDirectionY(0);
        }
        keyboard('ArrowUp').press = () => {
            this.player.setDirectionY(-1);
            this.player.setDirectionX(0);
        }
        keyboard('ArrowDown').press = () => {
            this.player.setDirectionY(1);
            this.player.setDirectionX(0);
        }
    }

    localUpdate(delta) {
        if (this.isEnd) {
            if (this.player.richness >= this.opponent.richness)
                this.texts.get('total').text = "you won";
            else
                this.texts.get('total').text = "you lost"
            return;
        }
        this.player.move();

        this.stones.forEach((stone) => {
            if (this.collisionResolver.isIntersected(this.player, stone))
                this.collisionResolver.resolveCollision(this.player, stone);
        });
        this.treasures.forEach((treasure) => {
            if (this.collisionResolver.isIntersected(this.player, treasure))
                this.collisionResolver.resolveCollision(this.player, treasure);
        });
        this.potions.forEach((potion) => {
            if (this.collisionResolver.isIntersected(this.player, potion))
                this.collisionResolver.resolveCollision(this.player, potion);
        });

        this.texts.get('first_coins').text = 'your score: ' + this.player.richness;
        this.texts.get('second_coins').text = "opponent's score: " + this.opponent.richness;

        if (this.treasures.every(treasure => treasure.size === 0)) this.isEnd = true;
    }

    createItems() {
        let items = [];
        this.potions.forEach((potion) => items.push({type: potion.type, size: potion.size}));
        this.treasures.forEach((treasure) => items.push({type: treasure.type, size: treasure.size}));
        return items;
    }

    getState() {
        return {
            key: this.key,
            position: this.player.getPosition(),
            items: this.createItems()
        };
    }

    createItemsAll() {
        let items = [];
        this.potions.forEach((potion) => items.push(potion));
        this.treasures.forEach((treasure) => items.push(treasure));
        return items;
    }

    async networkUpdate(delta) {
        //if (this.isEnd) return;

        const gameState = await queries.process(this.key, this.player, this.createItems());
        this.opponent.setAll(gameState.player);

        const items = this.createItemsAll();
        gameState.items.forEach((item, i) => {
           if (!item.isExist) {
               items[i].setProps(-100, -100, 0);
               this.app.stage.removeChild(items[i].getSprite());
           }
        });
    }

    generateMap(width, height, tileSize, pattern) {
        new MapGenerator(width, height, this.app.stage, tileSize, pattern).create(this.stones, this.treasures, this.potions);
        this.collisionResolver = new CollisionResolver(this.app, this.stones, this.treasures, this.potions);
    }
}