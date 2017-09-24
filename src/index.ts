// Phaser не модульный, поэтому он импортируется глобально вместе с зависимостями
// https://github.com/photonstorm/phaser/blob/master/README.md#browserify--cjs
require('pixi');
require('p2');
require('phaser');

import './Styles/index.less'
import * as MathFunctions from './Utils/mathFunctions'
import {Vector} from "./Utils/mathFunctions";

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
    private player: Phaser.Sprite;

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
        //this.game.load.image('earth', 'texture/earth.png');
        this.game.load.image('grass', 'texture/grass.png');
        this.game.load.image('box', 'texture/box.png');
        this.game.load.spritesheet('player.walk', 'texture/player_walks.png', 128, 128, 20);
    }

    create(): void
    {
        this.game.add.tileSprite(0, 0, 4*window.innerWidth,4*window.innerHeight, 'grass');
        this.game.world.setBounds(0, 0, 4*window.innerWidth,4*window.innerHeight);
        for (let i = 0; i < 350; i++)
        {
            this.game.add.sprite(this.game.world.randomX, this.game.world.randomY, 'box');
        }

        this.player = this.game.add.sprite(64, 64, 'player.walk');
        this.player.animations.add('player.walk');
        this.player.anchor.set(0.5, 0.5);

        this.player.animations.play('player.walk', 20, true);
        this.game.camera.follow(this.player);

        // TODO: добавить отдельный класс реализующий прослойку между управлением и Phaser.Input
        this.game.input.addMoveCallback((pointer, x, y) => {
            // Player position relatively to camera
            let playerInsideCameraPosition = new Vector(
                this.player.x - this.game.camera.x,
                this.player.y - this.game.camera.y
            );

            let lookAtVector = new Vector(x, y).subtract(playerInsideCameraPosition);

            // Initial texture orientation
            let initialVector = Vector.upVector();
            // TODO: this is pretty common, should be included into vector
            let angle = MathFunctions.getAngleBetween(lookAtVector, initialVector);

            if (lookAtVector.x < 0) {
                // Хитрый трюк, такой хитрый
                angle = 2 * Math.PI - angle;
            }
            this.player.rotation = angle;
        }, null);
    }

    update(): void
    {
        //this.earth.rotation += 0.01;
        let playerIsWalking = false;

        // TODO: вынести в отдельную прослойку
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.W))
        {
            this.player.y -= 10;
            playerIsWalking = true;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
        {
            this.player.y += 10;
            playerIsWalking = true;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            this.player.x += 10;
            playerIsWalking = true;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            this.player.x -= 10;
            playerIsWalking = true;
        }

        if (playerIsWalking) {
            this.player.animations.play('player.walk', 30, true);
        }
        else {
            this.player.animations.stop('player.walk', true);
        }
    }
}

// Запускаем игру по загрузке
window.onload = () => {
    // TODO: Добавить авто resize
    new HelloWorldRunner(window.innerWidth, window.innerHeight).startGame();
};
