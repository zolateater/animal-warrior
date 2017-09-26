// Phaser не модульный, поэтому он импортируется глобально вместе с зависимостями
// https://github.com/photonstorm/phaser/blob/master/README.md#browserify--cjs
require('pixi');
require('p2');
require('phaser');

import './Styles/index.less'
import Vector from "./Utils/Vector";
import Player from './Characters/Player'

/**
 * Запуск игры.
 */
class HelloWorldRunner
{
    private game: Phaser.Game;
    private width: number;
    private height: number;
    private grass: Phaser.Sprite;
    private box: Phaser.Sprite;
    private player: Player;
    private boxes: Phaser.Group;

    /**
     * @param {number} width
     * @param {number} height
     */
    constructor(width: number, height: number)
    {
        this.width = width;
        this.height = height;
    }

    startGame(): void
    {
        this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, '', {
            preload: this.preload,
            create: this.create,
            update: this.update
        });
    }

    preload(): void
    {
        this.game.load.image('grass', 'texture/grass.png');
        this.game.load.image('box', 'texture/box.png');
        this.game.load.spritesheet('player.walk', 'texture/player_walks.png', 128, 128, 20);
    }

    create(): void
    {
        this.game.add.tileSprite(0, 0, 4*window.innerWidth,4*window.innerHeight, 'grass');
        this.game.world.setBounds(0, 0, 4*window.innerWidth,4*window.innerHeight);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.boxes = this.game.add.group();
        this.boxes.enableBody = true;

        for (let i = 0; i < 350; i++)
        {
          let box = this.boxes.create(this.game.world.randomX, this.game.world.randomY, 'box');
          box.body.immovable = true;
        }

        this.player = new Player();
        this.player.sprite = this.game.add.sprite(64, 64, 'player.walk');
        this.player.sprite.animations.add('player.walk');
        this.player.sprite.anchor.set(0.5, 0.5);

        this.game.physics.arcade.enable(this.player.sprite);
        this.player.sprite.body.collideWorldBounds = true;

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

    update(): void
    {
        this.game.physics.arcade.collide(this.player, this.boxes);
        //this.earth.rotation += 0.01;
        let playerIsWalking = false;

        // TODO: вынести в отдельную прослойку
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.W))
        {
            this.player.sprite.y -= 10;
            playerIsWalking = true;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
        {
            this.player.sprite.y += 10;
            playerIsWalking = true;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            this.player.sprite.x += 10;
            playerIsWalking = true;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            this.player.sprite.x -= 10;
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

// Запускаем игру по загрузке
window.onload = () => {
    // TODO: Добавить авто resize
    new HelloWorldRunner(window.innerWidth, window.innerHeight).startGame();
};
