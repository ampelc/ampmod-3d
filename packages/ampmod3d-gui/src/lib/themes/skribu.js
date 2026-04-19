import * as Blockly from 'blockly';

// Skribu theme taken from an older version of Skribu
export default Blockly.Theme.defineTheme(
  'skribu',
  {
    base: Blockly.Themes.Zelos,
    startHats: true,
    fontStyle: {
      'family': '"Geist Variable", "Helvetica Neue", Helvetica, Arial, sans-serif',
      'weight': '550',
      'size': 11
    }
  }
);