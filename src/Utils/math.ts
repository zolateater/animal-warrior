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

export {
  degreesToRadians
}
