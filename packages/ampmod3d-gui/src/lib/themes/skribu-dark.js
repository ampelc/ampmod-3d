import * as Blockly from 'blockly';
import DarkTheme from '@blockly/theme-dark';
import SkribuTheme from './skribu';

export default Blockly.Theme.defineTheme(
  'skribuDark',
  {
    base: SkribuTheme,
    componentStyles: {
      workspaceBackgroundColour: DarkTheme.componentStyles.workspaceBackgroundColour,
      toolboxBackgroundColour: DarkTheme.componentStyles.toolboxBackgroundColour,
      toolboxForegroundColour: DarkTheme.componentStyles.toolboxForegroundColour,
      flyoutBackgroundColour: DarkTheme.componentStyles.flyoutBackgroundColour,
      flyoutForegroundColour: DarkTheme.componentStyles.flyoutForegroundColour,
      insertionMarker: DarkTheme.componentStyles.insertionMarker,
      insertionMarkerOpacity: DarkTheme.componentStyles.insertionMarkerOpacity,
      scrollbarColour: DarkTheme.componentStyles.scrollbarColour,
      scrollbarOpacity: DarkTheme.componentStyles.scrollbarOpacity,
      flyoutOpacity: DarkTheme.componentStyles.flyoutOpacity,
      insertionMarkerColour: DarkTheme.componentStyles.insertionMarkerColour,
      cursorColour: DarkTheme.componentStyles.cursorColour,
      blackBackground: DarkTheme.componentStyles.blackBackground,
    },
    startHats: true,
  }
);