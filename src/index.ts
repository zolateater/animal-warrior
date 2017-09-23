// Phaser не модульный, поэтому он импортируется глобально вместе с зависимостями
// https://github.com/photonstorm/phaser/blob/master/README.md#browserify--cjs
require('pixi');
require('p2');
require('phaser');

import './Styles/index.less'

/**
 * Запуск игры.
 */
class HelloWorldRunner
{
    private game: Phaser.Game;
    private width: number;
    private height: number;

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
    }

    create(): void
    {
        this.game.add.sprite(0, 0, 'earth');
    }

    update(): void
    {

    }
}

// Запускаем игру по загрузке
window.onload = () => {
    new HelloWorldRunner(window.innerWidth, window.innerHeight).startGame();
};
