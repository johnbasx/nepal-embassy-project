// Capitalize First characters in array
export function capitalizeFirst(arr: Array<string>) {
  const result = [];
  for (const word of arr) {
    result.push(word.charAt(0).toUpperCase() + word.slice(1));
  }
  return result.join(' ');
}

export function humanizeWord(str: string) {
  const arr = str.split('_');
  return capitalizeFirst(arr);
}

export function removeHyphen(str: string) {
  const arr = str.split('-');
  return capitalizeFirst(arr);
}

export function trimAndCap(str: string) {
  const capWord = humanizeWord(str);
  return capWord.slice(0, 6);
}
