var group_example = require('./docs/examples/sidebars.js');
var group_hardware = require('./docs/hardware/sidebars.js');
var group_systems = require('./docs/systems/sidebars.js');
var group_linux = require('./docs/linux/sidebars.js');
var group_productivity = require('./docs/productivity/sidebars.js');
var group_research = require('./docs/research/sidebars.js');

group_main = {
};


module.exports = {
  ...group_example,
  ...group_hardware,
  ...group_systems,
  ...group_linux,
  ...group_productivity,
  ...group_research,
  ...group_main,
};