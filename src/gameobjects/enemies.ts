import HandlerLevels from '../scenes/handlerLevels';

export default // @ts-ignore
class Enemies extends Phaser.Physics.Arcade.Group {
    private scene: HandlerLevels;
    private speed: number;

    constructor(scene: HandlerLevels, objectName: string, objectId: string, objectAnim: string, speed: number) {
        super(scene.physics.world, scene);
        this.scene = scene;
        this.speed = speed;

        // añadir objetos de los enemigos desde el array de sprites obtenidos del mapa al grupo
        this.addMultiple(this.scene.levelMap.createFromObjects(objectName, { name: objectId }));

        // añade fisica a todos los objetos del grupo
        this.scene.physics.world.enable(this.children.entries);

        // crear animaciones de enemigos
        this.scene.anims.create({
            key: objectAnim,
            frames: objectId,
            frameRate: 20,
            repeat: -1
        });

        this.children.entries.map((enemy: any) => {
            enemy.body.setCollideWorldBounds(true);
            enemy.play(objectAnim);
            this.moveEnemy(Phaser.Math.Between(0, 1) ? 'left' : 'right', enemy);
        });
    }

    moveEnemy(direction: string, enemy: any) {
        if (direction === 'left') {
            enemy.body.setVelocityX(this.speed * -1);
            enemy.flipX = false;
        } else if (direction === 'right') {
            enemy.body.setVelocityX(this.speed);
            enemy.flipX = true;
        }
    }

    public update(): void {
        this.children.entries.map((enemy: any) => {
            if (enemy.body.velocity.x === 0) {
                this.moveEnemy(Phaser.Math.Between(0, 1) ? 'left' : 'right', enemy);
            }
            if (enemy.body.blocked.right) {
                this.moveEnemy('left', enemy);
            }
            if (enemy.body.blocked.left) {
                this.moveEnemy('right', enemy);
            }
        });
    }
}
