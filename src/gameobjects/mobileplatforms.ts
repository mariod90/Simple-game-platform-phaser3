import Level1 from '../scenes/level1';
import Constants from '../constants';

// @ts-ignore
export default class MobilePlatforms extends Phaser.Physics.Arcade.Group {
    private scene: Level1;
    private speed: number;
    private horizontal: boolean;

    constructor(scene: Level1, nameObject: string, objectId: string, speed: number, horizontal: boolean) {
        super(scene.physics.world, scene);

        this.scene = scene;
        this.speed = 60;
        this.horizontal = horizontal;

        let nameObjectPlatform: string = this.horizontal
            ? Constants.MAPS.HORIZONTALPLATFORM
            : Constants.MAPS.VERTICALPLATFORM;

        // añade los objetos de las plataformas desde el array de sprites obtenidos del mapa al grupo
        this.addMultiple(
            this.scene.levelMap.createFromObjects(nameObject, { name: nameObjectPlatform, key: objectId })
        );

        this.children.entries.map((platform: any) => {
            platform.setTexture(objectId);
            platform.body.setCollideWorldBounds(true);
            platform.body.setAllowGravity(false);
            platform.body.setImmovable(true);
            if (this.horizontal) {
                platform.body.setFriction(1);
                platform.body.setVelocityX(this.speed);
                this.movePlatformHorizontal(Phaser.Math.Between(0, 1) ? 'left' : 'right', platform);
            } else {
                platform.body.setFriction(1);
                platform.body.setVelocityY(this.speed);
                this.movePlatformVertical(Phaser.Math.Between(0, 1) ? 'up' : 'down', platform);
            }
        });
    }

    movePlatformHorizontal(direction: string, platform: any): void {
        direction === 'left' ? platform.body.setVelocityX(this.speed * -1) : platform.body.setVelocityX(this.speed);
    }

    movePlatformVertical(direction: string, platform: any): void {
        direction === 'up' ? platform.body.setVelocityY(this.speed * -1) : platform.body.setVelocityY(this.speed);
    }

    public update(): void {
        this.children.entries.map((platform: any) => {
            if (this.horizontal) {
                if (platform.body.velocity.x === 0) {
                    this.movePlatformHorizontal(Phaser.Math.Between(0, 1) ? 'left' : 'right', platform);
                }
                if (platform.body.blocked.right) {
                    this.movePlatformHorizontal('left', platform);
                }
                if (platform.body.blocked.left) {
                    this.movePlatformHorizontal('right', platform);
                }
            } else {
                if (platform.body.velocity.y === 0) {
                    this.movePlatformVertical(Phaser.Math.Between(0, 1) ? 'up' : 'down', platform);
                }
                if (platform.body.blocked.top) {
                    this.movePlatformVertical('up', platform);
                }
                if (platform.body.blocked.bottom) {
                    this.movePlatformVertical('down', platform);
                }
            }
        });
    }
}
