const Constants = {
    EVENTS: {
        LIVES: 'changeLives',
        SCORE: 'changeScore',
        CLOCK: 'clock'
    },
    MENU: {
        PLAY_GAME: 'PLAY GAME'
    },
    HUD: {
        LIVES: 'Lives:'
    },
    SCENES: {
        LOAD: 'Load',
        MENU: 'Menu',
        LEVEL1: 'Level1',
        HUD: 'HUD'
    },
    REGISTER: {
        LIVES: 'lives',
        SCORE: 'score',
        CLOCK: 'clock'
    },
    MAPS: {
        LEVEL1: {
            TILEMAPJSON: 'mapLevel1',
            LAYERPLATFORM: 'Plataformas'
        },
        TILESET: 'levelstileset',
        FINALPOSITION: 'finalposition',
        ENEMIES: 'enemies'

    },
    BACKGROUNDS: {
        LEVEL1: 'Brown'
    },
    FONTS: {
        JSON: 'fuenteJSON',
        IMAGE: 'imagenFuente',
        BITMAP: 'fuentePixel'
    },
    PLAYER: {
        ID: 'player',
        ANIMATION: {
            IDLE: 'idle',
            RUN: 'run',
            JUMP: 'jump-0'
        }
    },
    OBJECTS: {
        FINAL: 'final'
    },
    ENEMIES: {
        BUNNY: {
            ID: 'bunny',
            ANIM: 'bunnyRun',
            SPEED: 75
        },
        CHICKEN: {
            ID: 'chicken',
            ANIM: 'chickenRun',
            SPEED: 100
        },
        MUSHROOM: {
            ID: 'mushroom',
            ANIM: 'mushroomRun',
            SPEED: 100
        },
        RADISH: {
            ID: 'radish',
            ANIM: 'radishRun',
            SPEED: 100
        }
    }
};

export default Constants;
