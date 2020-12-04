class Item {
    type = 'none';
    isExist = true;

    constructor(type = 'treasure') {
        this.type = type;
    }
}

exports.Item = Item;