/**
 * Point уже реализует необходимую функциональность,
 * мы просто добавим определение некоторых величин вектора
 */
export default class Vector extends PIXI.Point
{
    getLength(): number
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Vector subtraction
     *
     * @param {Vector} vec
     * @returns {Vector}
     */
    subtract(vec: Vector): Vector
    {
        return new Vector(
            this.x - vec.x,
            this.y - vec.y,
        );
    }

    /**
     * Vector addition
     *
     * @param {Vector} vec
     * @returns {Vector}
     */
    add(vec: Vector): Vector
    {
        return new Vector(
            this.x + vec.x,
            this.y + vec.y,
        );
    }

    /**
     * Normalized vector looking down below
     *
     * @returns {Vector}
     */
    static downVector(): Vector
    {
        return new Vector(0, 1);
    }

    /**
     * Нормализованный вектор, смотрящий вверх
     *
     * @returns {Vector}
     */
    static upVector(): Vector
    {
        return new Vector(0, -1);
    }

    scalarProduct(vec: Vector): number
    {
        return this.x * vec.x + this.y * vec.y;
    }

    // Angle between two vectors in radians.
    // It is always less than Math.PI
    angleBetween(vec: Vector): number
    {
        return Math.acos(this.scalarProduct(vec) / (this.getLength() * vec.getLength()));
    }

    // Returns angle betweed vectors counting from clockwords
    // in radians
    angleBetweenClockwords(vec: Vector): number
    {
      let angle = this.angleBetween(vec);

      if (vec.x - this.x < 0) {
        angle = 2 * Math.PI - angle;
      }

      return angle;
    }
}
