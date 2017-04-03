export function calculateNextDistance({
  deltaX,
  startDragMillis,
  endDragMillis,
  resistanceCoeffiecent
}) {
  if(!endDragMillis) {
    throw new Error("endDragMillis is not set");
  }
  if(!startDragMillis) {
    throw new Error("startDragMillis is not set");
  }
  if(!resistanceCoeffiecent) {
    throw new Error("resistanceCoeffiecent is not set");
  }
  if(!deltaX) {
    throw new Error("deltaX is not set");
  }

  // Swipping distance
  const di = Math.abs(deltaX);
  // Swipping time
  const ti = endDragMillis - startDragMillis;
  // Gravity acceleration (constant)
  const g = 9.8;
  // Drag coefficient (constant)
  const u = 0.05;
  // Initial acceleration (from swipping)
  const ai = (2 * di) / (Math.pow(ti, 2));
  // Result acceleration by removing the resistive force
  // since F(resistive) = (drag coefficient) * F(norm)
  // since F(norm) = m * g
  const ar = Math.abs(ai - (g * u)) * -1;
  // Initial velocity (which is the final velocity from the swipping)
  const vi = (2 * di) / ti;
  // We can calculate distance from this equation
  // vf^2 = vi^2 + 2 * ar * distance
  // Now knowing the final velocity is equal to zero (vf = 0)
  const distance = (Math.pow(vi, 2) / (2 * ar)) * -1 * (1 / resistanceCoeffiecent);

  return deltaX > 0 ? distance : -1 * distance;  
}
