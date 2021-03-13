export function mapToArray<T>(map: Map<number,T>): T[]{
  const array: T[] = [];
  map.forEach( value => {
    array.push(value);
  })
  return array;
}