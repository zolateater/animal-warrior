import Vector from "../Utils/Vector";
import CharacterInterface from "./CharacterInterface";

// TODO: create default charachter class and set action handling
export default class Player implements CharacterInterface
{
  // TODO: make
  public static MOVE_SPEED: number = 300;

  sprite: Phaser.Sprite;

  lookAt(vec: Vector): void
  {
    this.sprite.rotation = Vector.upVector().angleBetweenClockwords(
      vec.subtract(new Vector(this.sprite.x, this.sprite.y))
    );
  }
}
