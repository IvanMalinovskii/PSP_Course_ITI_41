const express = require('express');
const router = express.Router();
const STATUS = require('../game/GameProcess').GAME_STATUS;

let gameProcess = null;

exports.setProps = (game) => {
    gameProcess = game;
}

router.post('/set', (req, resp) => {
    const player = gameProcess.players.find(player => player.status === req.body.key);
    player.setInitial(req.body.position.x, req.body.position.y);
    if (player === gameProcess.players[0]) {
        gameProcess.addItems(req.body.items);
    }
    return resp.status(200).json({message: 'position set', player: player});
});

router.post('/process', (req, resp) => {
    if (gameProcess.status !== STATUS.GAMING) return resp.status(400).json({message: 'not a game'});
    const requestPlayer = gameProcess.players.find(player => player.status === req.body.key);
    const anotherPlayer = gameProcess.players.find(player => player.status !== req.body.key);

    requestPlayer.setParams(req.body);
    gameProcess.changeItems(req.body.items);
    return resp.status(200).json({
        player: anotherPlayer.getParams(),
        items: gameProcess.items
    });
});

exports.router = router;