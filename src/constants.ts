const Constants = {
    EVENTS: {
        LIVES: 'changeLives',
        SCORE: 'changeScore',
        CLOCK: 'clock'
    },
    ENDLEVEL: {
        SCORE: 'SCORE: ',
        WIN: 'YOU WIN!!',
        GAMEOVER: 'GAME OVER!!'
    },
    MENU: {
        PLAY_GAME: 'PLAY GAME',
        TITLE: 'MEGA RANINJA',
        SETTINGS: 'SETTINGS',
        CREDITS: 'CREDITS',
    },
    HUD: {
        LIVES: 'LIVES:'
    },
    SCENES: {
        LOAD: 'Load',
        MENU: 'Menu',
        LEVEL1: 'LEVEL 1',
        LEVEL2: 'LEVEL 2',
        LEVEL3: 'LEVEL 3',
        HUD: 'HUD',
        SETTINGS: 'Settings',
        CREDITS: 'Credits',
        LEVELSELECTION: 'LevelSelection',
        FINALLEVEL: 'FinalLevel',
    },
    REGISTER: {
        LIVES: 'lives',
        SCORE: 'score',
        CLOCK: 'clock',
        MUSIC: 'music',
        EFFECTS: 'effects',
    },
    MAPS: {
        LAYERPLATFORM: 'Plataformas',
        LEVEL1: {
            TILEMAPJSON: 'mapLevel1'
        },
        LEVEL2: {
            TILEMAPJSON: 'mapLevel2'
        },
        LEVEL3: {
            TILEMAPJSON: 'mapLevel3'
        },
        TILESET: 'levelstileset',
        FINALPOSITION: 'finalposition',
        ENEMIES: 'enemies',
        MOBILEPLATFORMS: 'mobileplatforms',
        VERTICALPLATFORM: 'vertical',
        HORIZONTALPLATFORM: 'horizontal',
        HARVESTABLE: 'harvestable'
    },
    BACKGROUNDS: {
        LEVEL1: 'Brown',
        LEVEL2: 'Pink',
        LEVEL3: 'Blue',
        MENU: 'Green',
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
        },
        EXPLOSION: {
            ID: 'explosion',
            ANIM: 'explota'
        }
    },
    MOVILPLATFORM: {
        ID: 'movilplatform',
        SPEED: 60
    },
    SOUNDS: {
        EFFECTS: {
            JUMP: 'jump',
            FALLONENEMY: 'fallon',
            REMOVELIFE: 'removelife',
            COLLECT: 'collect'
        },
        SOUNDTRACK: 'soundtrack'
    },
    HARVESTABLE: {
        BANANA: {
            ID: 'banana',
            ANIM: 'bananaAnim'
        },
        PINEAPPLE: {
            ID: 'pineapple',
            ANIM: 'pineappleAnim'
        },
        CHERRY: {
            ID: 'cherry',
            ANIM: 'cherryAnim'
        }
    },
    SETTINGS: {
        BACK : 'BACK',
        MUSIC: 'MUSIC',
        EFFECTS: 'EFFECTS',
        SOUND_ON: 'sound_on',
        SOUND_OFF: 'sound_off',
    },
    CREDITS: {
        GAMEDEV: 'mariod90',
        CREATEBY: 'GAMEDEV: MARIOD90\n\nWITH PHASER 3.50 AND TYPESCRIPT',
        ASSETS: 'SPRITES : PIXEL ADVENTURE BY PIXELFROG\n\n\nMUSIC : FREE SOUND CARTOON THEME LOOP\n\nBY DANIEL NORONHA',
        BACK: 'BACK',
    }
};

export default Constants;
