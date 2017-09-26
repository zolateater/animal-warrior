// Phaser is not modular, so we need to import directly.
// https://github.com/photonstorm/phaser/blob/master/README.md#browserify--cjs
require('pixi');
require('p2');
require('phaser');

import './Styles/index.less'
import Vector from "./Utils/Vector";
import Player from './Characters/Player'
import DemoLevelState from './State/DemoLevelState';

const PLAYER_SPEED = 300;

/**
 * Запуск игры.
 */
class HelloWorldRunner
{
    private game: Phaser.Game;
    private width: number;
    private height: number;
    private state: Phaser.State;

    constructor(width: number, height: number, initialState: Phaser.State)
    {
        this.width = width;
        this.height = height;
        this.state = initialState;
    }

    // Starts the game!
    startGame(): void
    {
        this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, '', this.state);
    }
}

// Запускаем игру по загрузке
window.onload = () => {
    // TODO: Добавить авто resize
    new HelloWorldRunner(window.innerWidth, window.innerHeight, new DemoLevelState()).startGame();
};
