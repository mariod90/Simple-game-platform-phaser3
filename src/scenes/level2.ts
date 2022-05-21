import Constants from '../constants';
import HandlerLevels from './handlerLevels';

export default class Level2 extends HandlerLevels {
    constructor() {
        super(Constants.SCENES.LEVEL2);
    }

    create(): void {
        this.createSceneLevel(Constants.MAPS.LEVEL1.TILEMAPJSON, Constants.BACKGROUNDS.LEVEL2);
        this.createEnemies([Constants.ENEMIES.BUNNY, Constants.ENEMIES.CHICKEN]);
        this.createHarvestables([Constants.HARVESTABLE.BANANA, Constants.HARVESTABLE.PINEAPPLE, Constants.HARVESTABLE.CHERRY]);
    }
}
