export function checkIfObjectIsPopulated(object: object) {
  return object && Object.keys(object).length > 0;
}
