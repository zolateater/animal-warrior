import Vector from "../Utils/Vector";
import CharacterInterface from "./CharacterInterface";

export default class Player implements CharacterInterface
{
  sprite: Phaser.Sprite;

  lookAt(vec: Vector): void
  {
    let angle = Vector.upVector().angleBetween(
      vec.subtract(new Vector(this.sprite.x, this.sprite.y))
    );

    if (vec.x - this.sprite.x < 0) {
        // Хитрый трюк, такой хитрый
        angle = 2 * Math.PI - angle;
    }

    this.sprite.rotation = angle;

  }
}
