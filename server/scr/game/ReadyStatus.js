class ReadyStatus {
    waitForPlayers;

    constructor() {
        this.waitForPlayers = [{key: '0', isReady: false, isConnected: false}, {key: '1', isReady: false, isConnected: false}];
    }

    connect(key) {
        const toConnect = this.waitForPlayers.find(player => !player.isConnected);
        if (!toConnect) return false;
        toConnect.isConnected = true;
        toConnect.key = key;
        return true;
    }

    setReady(key) {
        const toReady = this.waitForPlayers.find(player => player.key === key);
        if (!toReady) return false;
        if (!toReady.isReady) toReady.isReady = true;
        return true;
    }

    isReady() {
        return this.waitForPlayers.every(player => player.isReady);
    }

    reload() {
        this.waitForPlayers = [{key: '0', isReady: false, isConnected: false}, {key: '1', isReady: false, isConnected: false}];
    }
}

exports.ReadyStatus = ReadyStatus;