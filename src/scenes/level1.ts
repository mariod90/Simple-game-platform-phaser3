import Constants from '../constants';
import HandlerLevels from './handlerLevels';

export default class Level1 extends HandlerLevels {
    constructor() {
        super(Constants.SCENES.LEVEL1);
    }

    create(): void {
        this.createSceneLevel(Constants.MAPS.LEVEL1.TILEMAPJSON, Constants.BACKGROUNDS.LEVEL1);
        this.createEnemies([Constants.ENEMIES.BUNNY, Constants.ENEMIES.CHICKEN]);
        this.createHarvestables([Constants.HARVESTABLE.BANANA, Constants.HARVESTABLE.PINEAPPLE, Constants.HARVESTABLE.CHERRY]);
    }
}
