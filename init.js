let nodeSpace_l0;
let workSpace_l0;

function init() {
  console.log("Init Started");

  // Initialize nodeSpace_l0
  nodeSpace_l0 = new Space(document.getElementById('nodeSpace_l0'));

  // Initialize workSpace_l0
  workSpace_l0 = new Space(document.getElementById('workSpace_l0'));

  // Rest of your initialization code here
}
