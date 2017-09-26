import Player from "../Characters/Player";
import Vector from "../Utils/Vector";

export default class DemoLevelState extends Phaser.State
{
    private grass: Phaser.Sprite;
    private box: Phaser.Sprite;
    private player: Player;
    private boxes: Phaser.Group;

    preload()
    {
      this.game.load.image('grass', 'texture/grass.png');
      this.game.load.image('box', 'texture/box.png');
      this.game.load.spritesheet('player.walk', 'texture/player_walks.png', 92, 128, 20);
    }

    create()
    {
      this.game.add.tileSprite(0, 0, 4*window.innerWidth,4*window.innerHeight, 'grass');
      this.game.world.setBounds(0, 0, 4*window.innerWidth,4*window.innerHeight);

      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      this.boxes = this.game.add.group();
      this.boxes.enableBody = true;

      this.player = new Player();
      this.player.sprite = this.game.add.sprite(64, 64, 'player.walk');
      this.player.sprite.animations.add('player.walk');
      this.player.sprite.anchor.set(0.5, 0.5);

      this.game.physics.arcade.enable(this.player.sprite);
      this.player.sprite.body.collideWorldBounds = true;

      this.game.physics.arcade.enable(this.boxes);

      for (let i = 0; i < 350; i++)
      {
          let box = this.boxes.create(this.game.world.randomX, this.game.world.randomY, 'box');
          this.game.physics.arcade.enable(box);
          box.body.immovable = true;
          box.enableBody = true;
      }

      this.game.camera.follow(this.player.sprite);

      // TODO: добавить отдельный класс реализующий прослойку между управлением и Phaser.Input
      this.game.input.addMoveCallback((pointer, x, y) => {
          // Cursor position in world coordinates
          let worldPointerPosition = new Vector(
              this.game.camera.x + x,
              this.game.camera.y + y
          );

          this.player.lookAt(worldPointerPosition);
      }, null);
    }

    update()
    {
      // Check collisions between player and boxes
      this.game.physics.arcade.collide(this.player.sprite, this.boxes);

      let playerIsWalking = false;
      this.player.sprite.body.velocity.y = 0;
      this.player.sprite.body.velocity.x = 0;

      // TODO: вынести в отдельную прослойку
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.W))
      {
          this.player.sprite.body.velocity.y -= Player.MOVE_SPEED;
          playerIsWalking = true;
      }
      else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
      {
          this.player.sprite.body.velocity.y += Player.MOVE_SPEED;
          playerIsWalking = true;
      }
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
      {
          this.player.sprite.body.velocity.x += Player.MOVE_SPEED;
          playerIsWalking = true;
      }
      else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
      {
          this.player.sprite.body.velocity.x -= Player.MOVE_SPEED;
          playerIsWalking = true;
      }

      if (playerIsWalking) {
          this.player.sprite.animations.play('player.walk', 30, true);
      }
      else {
          this.player.sprite.animations.stop('player.walk', true);
      }
    }
}
