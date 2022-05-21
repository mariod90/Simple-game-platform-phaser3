import Constants from '../constants';
import HandlerLevels from './handlerLevels';

export default class Level3 extends HandlerLevels {
    constructor() {
        super(Constants.SCENES.LEVEL3);
    }

    create(): void {
        this.createSceneLevel(Constants.MAPS.LEVEL3.TILEMAPJSON, Constants.BACKGROUNDS.LEVEL3);
        this.createEnemies([Constants.ENEMIES.BUNNY, Constants.ENEMIES.CHICKEN]);
        this.createHarvestables([Constants.HARVESTABLE.BANANA, Constants.HARVESTABLE.PINEAPPLE, Constants.HARVESTABLE.CHERRY]);
    }
}
