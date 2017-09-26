import Vector from "../Utils/Vector";

/**
 * This interface describes what do we want from out charachters.
 */
export default interface CharacterInterface
{
    // Rotates a charachter, so it should watch on some point at the world
    lookAt(vector: Vector): void;

    // Ortogonal phaser sprite
    sprite: Phaser.Sprite;
}
