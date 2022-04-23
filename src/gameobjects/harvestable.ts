import Level1 from '../scenes/level1';

export default // @ts-ignore
class Harvestable extends Phaser.Physics.Arcade.Group {
    private scene: Level1;

    constructor(scene: Level1, nameObject: string, objectId: string, objectAnim: string) {
        super(scene.physics.world, scene);

        // añade los objetos de los recolectables desde el array de sprites obtenidos del mapa al grupo
        this.addMultiple(this.scene.levelMap.createFromObjects(nameObject, { name: objectId, key: objectId }));

        // añadir fisicas
        this.scene.physics.world.enable(this.children.entries);

        // crear animacion de recolectables
        this.scene.anims.create({
            key: objectAnim,
            frames: objectId,
            frameRate: 20,
            repeat: -1
        });

        this.children.entries.map((recolectable: any) => {
            recolectable.body.setAllowGravity(false);
            recolectable.body.setImmovable(true);
            recolectable.play(objectAnim);
        });
    }
}
