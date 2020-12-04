let URL = 'https://evening-garden-12984.herokuapp.com/';
URL = 'http://localhost:5000/';

const queries = {
    async connect() {
        const resp = await fetch(`${URL}connect`);
        return await resp.json();
    },
    async setInitial(key, position, items) {
        const resp = await fetch(`${URL}set`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                key,
                position,
                items: items,
                sth: 'STH'
            })
        });
        return await resp.json();
    },
    async ready(key) {
        const resp = await fetch(`${URL}ready?key=${key}`);
        return await resp.json();
    },
    async process(key, player, items) {
        const body = {
            key,
            speed: player.speed,
            richness: player.richness,
            isSlow: player.isSlow,
            isTransparent: player.isTransparent,
            position: { x: player.character.x, y: player.character.y },
            direction: { x: player.character.vx, y: player.character.vy },
            targetTexture: 0,
            items: items
        };
        const resp = await fetch(`${URL}process`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        });
        return await resp.json();
    }
}