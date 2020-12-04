const Item = require('./gameObjects/Item').Item;

const GAME_STATUS = {
    WAITING: 0,
    READY: 1,
    GAMING: 2
};

class GameProcess {
    status = GAME_STATUS.WAITING;
    players = [];
    items = []
    constructor() {
    }

    get status() {
        return this.status;
    }

    addPlayer(player) {
        this.players.push(player);
        if (this.players.length === 2) this.status = GAME_STATUS.READY;
    }

    addItems(items) {
        items.forEach(() => this.items.push(new Item()));
    }

    changeItems(items) {
        this.items.forEach((item, i) => {
            if (items[i].size === 0) item.isExist = false;
        });
    }

    reload() {
        this.status = GAME_STATUS.WAITING;
        this.players = [];
        this.items = [];
    }

    getLast() {
        return {
            number: this.players.length,
            player: this.players[this.players.length - 1]
        };
    }

    findByKey(key) {
        return this.players.find(player => player.status === key);
    }
}

exports.GAME_STATUS = GAME_STATUS;
exports.GameProcess = GameProcess;