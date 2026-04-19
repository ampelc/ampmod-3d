import * as Blockly from 'blockly/core';
import FlagIcon from '../assets/flag.svg';

/**
 * TYPE HELPERS
 */
type BlockDefinition = {
  init: (this: Blockly.Block) => void;
};

/**
 * BLOCK DEFINITIONS
 */
export const CUSTOM_BLOCKS: { [key: string]: BlockDefinition } = {
  // --- SHADOW BLOCKS ---
  'math_number': {
    init: function(this: Blockly.Block) {
      this.appendDummyInput().appendField(new Blockly.FieldTextInput("0"), "NUM");
      this.setOutput(true, "Number");
      this.setColour("#FFFFFF");
      this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
      this.setInputsInline(true);
    }
  },
  'text_input': {
    init: function(this: Blockly.Block) {
      this.appendDummyInput().appendField(new Blockly.FieldTextInput(""), "TEXT");
      this.setOutput(true, "String");
      this.setColour("#FFFFFF");
      this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
      this.setInputsInline(true);
    }
  },

  // --- EVENTS ---
  'event_whenflagclicked': {
    init: function(this: Blockly.Block) {
      this.appendDummyInput().appendField("when").appendField(new Blockly.FieldImage(FlagIcon, 18, 18, "flag")).appendField("clicked");
      this.setNextStatement(true);
      this.setColour("#FFBF00");
    }
  },

  // --- MOTION & TRANSFORM ---
  'motion_3d_move': {
    init: function(this: Blockly.Block) {
      this.appendValueInput("STEPS").setCheck("Number").appendField("move");
      this.appendDummyInput().appendField("steps");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("#4C97FF");
      this.setInputsInline(true);
    }
  },
  'motion_3d_set_pos': {
    init: function(this: Blockly.Block) {
      this.appendDummyInput().appendField("go to x:");
      this.appendValueInput("X").setCheck("Number");
      this.appendDummyInput().appendField("y:");
      this.appendValueInput("Y").setCheck("Number");
      this.appendDummyInput().appendField("z:");
      this.appendValueInput("Z").setCheck("Number");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("#4C97FF");
      this.setInputsInline(true);
    }
  },
  'motion_3d_point_towards': {
    init: function(this: Blockly.Block) {
      this.appendDummyInput().appendField("point towards")
        .appendField(new Blockly.FieldDropdown([["mouse-pointer", "MOUSE"], ["camera", "CAMERA"], ["random position", "RANDOM"]]), "TARGET");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("#4C97FF");
    }
  },

  // --- CAMERA ---
  'camera_set_active': {
    init: function(this: Blockly.Block) {
      this.appendDummyInput().appendField("set camera")
        .appendField(new Blockly.FieldDropdown([["Perspective", "PERSP"], ["Orthographic", "ORTHO"]]), "TYPE");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("#0FBD8C");
    }
  },
  'camera_follow': {
    init: function(this: Blockly.Block) {
      this.appendDummyInput().appendField("camera follow this object");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("#0FBD8C");
    }
  },

  // --- MODELS (LOOKS) ---
  'model_set_mesh': {
    init: function(this: Blockly.Block) {
      this.appendDummyInput().appendField("set model to").appendField(new Blockly.FieldDropdown([["cube", "CUBE"], ["sphere", "SPHERE"]]), "MODEL");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("#9966FF");
    }
  },

  // --- CONTROL ---
  'control_repeat': {
    init: function(this: Blockly.Block) {
      this.appendValueInput("TIMES").setCheck("Number").appendField("repeat");
      this.appendStatementInput("SUBSTACK");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("#FFAB19");
    }
  },
  'control_if': {
    init: function(this: Blockly.Block) {
      this.appendValueInput("CONDITION").setCheck("Boolean").appendField("if");
      this.appendStatementInput("SUBSTACK");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("#FFAB19");
    }
  },
  'control_if_else': {
    init: function(this: Blockly.Block) {
      this.appendValueInput("CONDITION").setCheck("Boolean").appendField("if");
      this.appendStatementInput("SUBSTACK");
      this.appendDummyInput().appendField("else");
      this.appendStatementInput("ELSE");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("#FFAB19");
    }
  },

  // --- OPERATORS ---
  'operator_arithmetic': {
    init: function(this: Blockly.Block) {
      this.appendValueInput("A").setCheck("Number");
      this.appendDummyInput().appendField(new Blockly.FieldDropdown([["+", "ADD"], ["-", "SUB"], ["*", "MUL"], ["/", "DIV"], ["^", "POW"]]), "OP");
      this.appendValueInput("B").setCheck("Number");
      this.setOutput(true, "Number");
      this.setColour("#40BF4A");
      this.setInputsInline(true);
    }
  },
  'operator_compare': {
    init: function(this: Blockly.Block) {
      this.appendValueInput("A").setCheck(["Number", "String"]);
      this.appendDummyInput().appendField(new Blockly.FieldDropdown([["=", "EQ"], [">", "GT"], ["<", "LT"]]), "OP");
      this.appendValueInput("B").setCheck(["Number", "String"]);
      this.setOutput(true, "Boolean");
      this.setColour("#40BF4A");
      this.setInputsInline(true);
    }
  },

  // --- PHYSICS ---
  'physics_set_velocity': {
    init: function(this: Blockly.Block) {
      this.appendDummyInput().appendField("set velocity x:");
      this.appendValueInput("X").setCheck("Number");
      this.appendDummyInput().appendField("y:");
      this.appendValueInput("Y").setCheck("Number");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour("#FF661A");
      this.setInputsInline(true);
    }
  }
};

/**
 * TOOLBOX CONFIGURATION
 */
export const TOOLBOX_CONFIG = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Motion',
      colour: '#4C97FF',
      contents: [
        { kind: 'block', type: 'motion_3d_move', inputs: { STEPS: { shadow: { type: 'math_number', fields: { NUM: 10 } } } } },
        { kind: 'block', type: 'motion_3d_set_pos', inputs: { 
            X: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            Y: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            Z: { shadow: { type: 'math_number', fields: { NUM: 0 } } }
        } },
        { kind: 'block', type: 'motion_3d_point_towards' }
      ]
    },
    {
      kind: 'category',
      name: 'Camera',
      colour: '#0FBD8C',
      contents: [
        { kind: 'block', type: 'camera_set_active' },
        { kind: 'block', type: 'camera_follow' }
      ]
    },
    {
      kind: 'category',
      name: 'Models',
      colour: '#9966FF',
      contents: [
        { kind: 'block', type: 'model_set_mesh' }
      ]
    },
    {
      kind: 'category',
      name: 'Events',
      colour: '#FFBF00',
      contents: [{ kind: 'block', type: 'event_whenflagclicked' }]
    },
    {
      kind: 'category',
      name: 'Control',
      colour: '#FFAB19',
      contents: [
        { kind: 'block', type: 'control_repeat', inputs: { TIMES: { shadow: { type: 'math_number', fields: { NUM: 10 } } } } },
        { kind: 'block', type: 'control_if' },
        { kind: 'block', type: 'control_if_else' },
      ]
    },
    {
      kind: 'category',
      name: 'Operators',
      colour: '#40BF4A',
      contents: [
        { kind: 'block', type: 'operator_arithmetic', inputs: { 
            A: { shadow: { type: 'math_number', fields: { NUM: 0 } } },
            B: { shadow: { type: 'math_number', fields: { NUM: 0 } } }
        } },
        { kind: 'block', type: 'operator_compare' }
      ]
    },
    {
      kind: 'category',
      name: 'Physics',
      colour: '#FF661A',
      contents: [
        { kind: 'block', type: 'physics_set_velocity' }
      ]
    }
  ]
};