let app = new PIXI.Application({
    width: 800,
    height: 32 * 19,
    backgroundColor: 0x309D75,
    antialias: false,
    forceCanvas: true
});
document.querySelector('.game-window').appendChild(app.view);

let SPRITES = {
    CHARACTER: 'sprites/tiles.png',
    GRASS: 'sprites/grass.png',
    STONE: 'sprites/stone.png'
};
let PLAY_NUM = -1;
const gameProcess = new GameProcess(app);

async function setup() {
    let firstCharacter = new Character(1, 30, PIXI.TextureCache['sprites/character1.png'], createRects());
    firstCharacter.setPosition(map_1_800_608.firstPosition.x, map_1_800_608.firstPosition.y);

    let secondCharacter = new Character(1, 30, PIXI.TextureCache['sprites/character2.png'], createRects());
    secondCharacter.setPosition(map_1_800_608.secondPosition.x, map_1_800_608.secondPosition.y);

    await gameProcess.setup(PLAY_NUM, firstCharacter, secondCharacter, map_1_800_608);
}

function createRects() {
    return [
        new PIXI.Rectangle(0, 0, 32, 32),
        new PIXI.Rectangle(0, 32, 32, 32),
        new PIXI.Rectangle(0, 65, 32, 32),
        new PIXI.Rectangle(0, 98, 32, 32),
    ]
}

document.querySelector('#connect-button').addEventListener('click', async (e) => {
    e.preventDefault();

    const resp = await queries.connect();
    if (resp.message === 'connected') {
        gameProcess.setKey(resp.key);
        PLAY_NUM = resp.playerNum;
        await waitingReady();
    }
});

async function waitingReady() {
    const ready = await queries.ready(gameProcess.key);
    if (ready.gameStatus !== 2) {
        console.log('WAITING');
        setTimeout(waitingReady, 500);
    } else {
        PIXI.loader
            .add(SPRITES.CHARACTER)
            .add('sprites/character1.png')
            .add('sprites/character2.png')
            .add('sprites/grass0.png')
            .add('sprites/grass1.png')
            .add('sprites/grass2.png')
            .add('sprites/grass3.png')
            .add('sprites/treasure0.png')
            .add('sprites/treasure1.png')
            .add('sprites/treasure2.png')
            .add('sprites/treasure3.png')
            .add('sprites/treasure4.png')
            .add('sprites/treasure5.png')
            .add('sprites/treasure6.png')
            .add('sprites/potion_slow.png')
            .add('sprites/potion_transp.png')
            .add(SPRITES.STONE)
            .load(setup);
    }
}