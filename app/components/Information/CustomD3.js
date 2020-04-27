import { hierarchy, stratify, tree, treemap } from "d3-hierarchy";
import { event, select, selectAll, behavior } from "d3-selection";
import { interpolate } from 'd3-interpolate';
import { transition } from 'd3-transition';
import { drag } from 'd3-drag';

console.log("-----event, select, selectAll, behavior-------", event, select, selectAll, behavior);



export default {
  hierarchy,
  stratify,
  tree,
  treemap,
  select,
  selectAll,
  event,
  interpolate,
  transition,
  drag,
  behavior
};