export default class Colors {
  static NONE    = 'transparent';
  static WHITE   = 'white';
  static BLACK   = 'black';

  static PRIMARY = '#66F';

  static DEFAULT_TEXT     = '#666';
  static LIGHT_TEXT       = '#CCC';
  static EXTRA_LIGHT_TEXT = '#EFEFEF';

  static random = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let char = 0; char < 6; char++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
};