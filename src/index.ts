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
    private earth: Phaser.Sprite;
    private player: Phaser.Sprite;
    private playerIsWalking: boolean = false;

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
        this.game.load.image('earth', 'texture/earth.png');
        this.game.load.spritesheet('player.walk', 'texture/player_walks.png', 128, 128, 20);
    }

    create(): void
    {
        this.earth = this.game.add.sprite(100, 100, 'earth');
        this.player = this.game.add.sprite(64, 64, 'player.walk');
        this.player.animations.add('player.walk');
        this.player.anchor.set(0.5, 0.5);
        this.earth.anchor.set(0.5, 0.5);

        this.player.animations.play('player.walk', 20, true);

        // TODO: добавить отдельный класс реализующий прослойку между управлением и Phaser.Input
        this.game.input.addMoveCallback((pointer, x, y) => {
            // Направление взгляда игрока
            let lookAtVector = new Vector(x - this.player.x, y - this.player.y);

            // Начальная позиция вектора
            let initialVector = Vector.upVector();
            let angle = MathFunctions.getAngleBetween(lookAtVector, initialVector);

            if (lookAtVector.x < 0) {
                // Хитрый трюк, такой хитрый
                angle = 2 * Math.PI - angle;
            }
            this.player.rotation = angle;

            // console.log(lookAtVector.x, lookAtVector.y);
            console.log(Math.round(MathFunctions.radiansToDegrees(this.player.rotation)));
        }, null);
    }

    update(): void
    {
        this.earth.rotation += 0.01;
        let playerIsWalking = false;

        // TODO: вынести в отдельную прослойку
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.W))
        {
            this.player.y -= 2;
            playerIsWalking = true;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S))
        {
            this.player.y += 2;
            playerIsWalking = true;
        }
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.D))
        {
            this.player.x += 2;
            playerIsWalking = true;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            this.player.x -= 2;
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
