function rgbStringToArray(rgbString) {
  // rgbString = 'rgb(200, 12, 53)';

  return rgbString
    .substring(4, rgbString.length - 1)
    .replace(/ /g, '')
    .split(',')
    .map(Number)
}

export { rgbStringToArray }
