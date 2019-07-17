/** Simple utility to sort array of object by an object prop (string or number)
 *  @param {array} array - Array to be sorted
 *  @param {string} prop - property name to sort by
 * @param {string} order - order: 'asc' default, 'desc'
 * @returns {array} - Returns sorted array
 */
export default (array, prop, order = 'asc') => {

  if (!array.length || !array[0] || !array[0][prop]) return array;
  const sorted = array.sort((a, b) => {
    let comparison = 0;
    if (a[prop] < b[prop]) comparison = -1;
    if (a[prop] > b[prop]) comparison = 1;
    if (a[prop] === b[prop]) comparison = 0;
    return order === 'desc' ? comparison * -1 : comparison;
  })
  return sorted;
}