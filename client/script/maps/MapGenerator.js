class MapGenerator {
    constructor(width, heigth, stage, tileSize = 32, pattern = null) {
        this.width = width;
        this.height = heigth;
        this.stage = stage;
        this.tileSize = tileSize;
        this.pattern = pattern;
    }

    create(stones, treasures, potions) {
        if (this.pattern) {
            this._createFromPattern(stones, treasures, potions);
            return;
        }
        for (let wIndex = 0; wIndex < this.width / this.tileSize; wIndex++) {
            for (let hIndex = 0; hIndex < this.height / this.tileSize; hIndex++) {
                let tile = this.getTile(this.getInt(3));
                tile.setProps(wIndex * this.tileSize, hIndex * this.tileSize, this.tileSize);

                if (tile.type === 'stone') {
                    stones.push(tile);
                }
                if (tile.type === 'treasure') {
                    treasures.push(tile);
                    console.log('TREASURE');
                }
                if (tile.type === 'potion') {
                    potions.push(tile);
                }

                this.stage.addChild(tile.getSprite());
            }
        }
    }

    _createWalls(stones) {
        let upWall = new Wall(PIXI.TextureCache['sprites/stone.png']);
        upWall.setProps(0, -32, this.width, 32);
        stones.push(upWall);

        let downWall = new Wall(PIXI.TextureCache['sprites/stone.png']);
        downWall.setProps(0, this.height, this.width, 32);
        stones.push(downWall);

        // let leftWall = new Wall(PIXI.TextureCache['sprites/stone.png']);
        // leftWall.setProps(-32, 0, 32, this.height);
        // stones.push(leftWall);
        //
        // let rightWall = new Wall(PIXI.TextureCache['sprites/stone.png']);
        // leftWall.setProps(this.width, 0, 32, this.height);
        // stones.push(rightWall);
    }

    _createFromPattern(stones, treasures, potions) {
        //this._createWalls(stones);
        for (let wIndex = 0; wIndex < this.pattern.width; wIndex++) {
            for (let hIndex = 0; hIndex < this.pattern.height; hIndex++) {
                this.stage.addChild(this._createGrass(wIndex * this.tileSize, hIndex * this.tileSize));
                let tile = this.getTile(this.pattern.mesh[hIndex][wIndex]);
                tile.setProps(wIndex * this.tileSize, hIndex * this.tileSize, this.tileSize);

                if (tile.type === 'stone' || tile.type === 'wall') {
                    stones.push(tile);
                }
                else if (tile.type === 'treasure') {
                    tile.setProps(wIndex * this.tileSize + this.tileSize / 4, hIndex * this.tileSize + this.tileSize / 4, this.tileSize / 2);
                    treasures.push(tile);
                }
                else if (tile.type === 'potion') {
                    potions.push(tile);
                }

                this.stage.addChild(tile.getSprite());
            }
        }
    }

    _createGrass(x, y) {
        let grass = new PIXI.Sprite(PIXI.TextureCache[`sprites/grass${this.getInt(4)}.png`]);
        grass.width = this.tileSize;
        grass.height = this.tileSize;
        grass.x = x;
        grass.y = y;

        return grass;
    }

    getTile(tileType) {

        if (tileType === 1) {
            return new Stone(PIXI.TextureCache['sprites/stone.png']);
        }
        else if (tileType === 0) {
            return new Grass(PIXI.TextureCache[`sprites/grass${this.getInt(4)}.png`]);
        }
        else if (tileType === 2) {
            return new Treasure(PIXI.TextureCache[`sprites/treasure${this.getInt(7)}.png`]);
        }
        else if (tileType === 3) {
            return new PotionSlowness(PIXI.TextureCache['sprites/potion_slow.png']);
        }
        else if (tileType === 4) {
            return new PotionTransparency(PIXI.TextureCache['sprites/potion_transp.png']);
        }
        else if (tileType === 9) {
            return new Wall(PIXI.TextureCache['sprites/stone.png']);
        }
    }

    getInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
}