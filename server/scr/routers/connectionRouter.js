const express = require('express');
const router = express.Router();
const STATUS = require('../game/GameProcess').GAME_STATUS;
const Player = require('../game/gameObjects/Player').Player;
const crypto = require('crypto');
let readyStatus = null;
let gameProcess = null;

exports.setProps = (ready, game) => {
    readyStatus = ready;
    gameProcess = game;
}

router.get('/connect', (req, resp) => {
    console.log('/CONNECT');
    const key = crypto.randomBytes(20).toString('hex');
    gameProcess.addPlayer(new Player(key));
    readyStatus.connect(key);
    const player = gameProcess.getLast();
    return resp.status(200).json({
        message: 'connected',
        playerNum: player.number,
        player: player.player,
        key: key
    });
})

router.get('/ready', (req, resp) => {
    const playerObject = gameProcess.findByKey(req.query['key']);
    if (playerObject && readyStatus.setReady(req.query['key'])) {
        if (readyStatus.isReady()) gameProcess.status = STATUS.GAMING;
    }
    return resp.status(200).json({
        message: 'status set',
        gameStatus: gameProcess.status
    });
});

router.get('/reload', (req, resp) => {
    gameProcess.reload();
    readyStatus.reload();
    return resp.status(200).json({ message: 'reloaded' });
});

exports.router = router;