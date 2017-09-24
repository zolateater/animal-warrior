/**
 * Point уже реализует необходимую функциональность,
 * мы просто добавим определение длины вектора.
 */
class Vector extends PIXI.Point
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
}

/**
 * Преобразует градусы в радианы.
 * Rotation считается в радианах.
 *
 * @param {number} degrees
 * @returns {number}
 */
function degreesToRadians(degrees: number): number
{
    return (degrees * Math.PI) / 180;
}

/**
 * Преобразует градусы в радианы.
 * Rotation считается в радианах.
 *
 * @param {number} radians
 * @returns {number}
 */
function radiansToDegrees(radians: number): number
{
    return radians * 180 / Math.PI;
}


/**
 * Вычисляет скалярное произведение векторов.
 *
 * @param {Vector} vec1
 * @param {Vector} vec2
 * @returns {number}
 */
function getScalarProduct(vec1: Vector, vec2: Vector): number
{
    return vec1.x * vec2.x + vec1.y * vec2.y;
}

/**
 * Рассчитывает угол между двумя векторами в радианах
 *
 * @param {Vector} vector1
 * @param {Vector} vector2
 * @returns {number}
 */
function getAngleBetween(vector1: Vector, vector2: Vector): number
{
    return Math.acos(
        getScalarProduct(vector1, vector2) / (vector1.getLength() * vector2.getLength())
    );
}

export {
    degreesToRadians,
    getScalarProduct,
    getAngleBetween,
    radiansToDegrees,
    Vector
}