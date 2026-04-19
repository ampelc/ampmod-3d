import { useEffect, useRef } from 'react';
import * as Blockly from 'blockly/core';
import { registerContinuousToolbox, ContinuousFlyout } from '@blockly/continuous-toolbox';
import './BlocklyChanges.css';
import * as En from 'blockly/msg/en';
Blockly.setLocale(En);
import '../../lib/themes/skribu';
import '../../lib/themes/skribu-dark';

// 1. Import the renderer registration file
import {ScratchRenderer} from '../../lib/renderer/renderer'; 

import { CUSTOM_BLOCKS, TOOLBOX_CONFIG } from '../../lib/blocks';

class ConstantScaleFlyout extends ContinuousFlyout {
  getFlyoutScale() {
    return 0.85;
  }
}

Blockly.registry.register(
  Blockly.registry.Type.FLYOUTS_VERTICAL_TOOLBOX,
  'ConstantScaleFlyout',
  ConstantScaleFlyout,
  true 
);

registerContinuousToolbox();
Blockly.common.defineBlocks(CUSTOM_BLOCKS);
Blockly.ContextMenuRegistry.registry.unregister('blockInline');
Blockly.ContextMenuRegistry.registry.unregister('blockCollapseExpand');
Blockly.ContextMenuItems.registerCommentOptions();

Blockly.registry.register(
  Blockly.registry.Type.RENDERER,
  'scratch_classic',
  ScratchRenderer
);

interface BlocklyEditorProps {
  onReady: () => void;
}

const BlocklyEditor = ({ onReady }: BlocklyEditorProps) => {
  const blocklyDiv = useRef<HTMLDivElement>(null);
  const primaryWorkspace = useRef<Blockly.WorkspaceSvg | null>(null);

  useEffect(() => {
    if (!blocklyDiv.current) return;

    primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox: TOOLBOX_CONFIG,
      theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'skribuDark' : 'skribu',
      // 2. Use the registered name here
      renderer: 'scratch_classic', 
      grid: { spacing: 20, length: 3, colour: '#ccc', snap: true },
      trashcan: true,
      move: { scrollbars: true, drag: true, wheel: true },
      zoom: { controls: true, pinch: true, wheel: true, startScale: 0.85 },
      plugins: {
        flyoutsVerticalToolbox: 'ConstantScaleFlyout',
        metricsManager: 'ContinuousMetrics',
        toolbox: 'ContinuousToolbox',
      },
      comments: false,
      disable: false,
      collapse: false,
      media: '/media'
    });

    onReady();

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
    const newTheme = e.matches ? 'skribuDark' : 'skribu';
    primaryWorkspace.current?.setTheme(Blockly.registry.getClass(Blockly.registry.Type.THEME, newTheme));
  };

  // Start listening
  darkModeMediaQuery.addEventListener('change', handleThemeChange);
    const handleResize = () => {
      if (primaryWorkspace.current) Blockly.svgResize(primaryWorkspace.current);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (primaryWorkspace.current) primaryWorkspace.current.dispose();
    };
  }, [onReady]);

  return (
    <div style={{ flex: 1.5, position: 'relative' }}>
      <div ref={blocklyDiv} style={{ position: 'absolute', inset: 0 }} />
    </div>
  );
};

export default BlocklyEditor;