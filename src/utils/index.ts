export const randomString = (length: number, chars: string) => {
  let mask = '';
  if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
  if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (chars.indexOf('#') > -1) mask += '0123456789';
  if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
  let result = '';
  for (let i = length; i > 0; i -= 1) result += mask[Math.floor(Math.random() * mask.length)];
  return result;
};

export const transformText = (text: string, mode: 'capitalize' | 'firstUpper'): string => {
  switch (mode) {
    case 'firstUpper':
      return text.charAt(0).toUpperCase() + text.slice(1);
    case 'capitalize':
      return text.replace(/\b\w/g, (l) => l.toUpperCase());
    default:
      return text;
  }
};
