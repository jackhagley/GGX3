//global arrays
const nodeSpaces = [];
const workSpaces = [];

let nodeSpace_l0;
let workSpace_l0;

function init() {
  console.log("Init Started");

  // Initialize nodeSpace_l0
  addNodeSpace(true);//


  // this is TODO
  // Initialize workSpace_l0
  // workSpace_l0 = new Space(document.getElementById('workSpace_l0'));

}

function addNodeSpace(first=false)
{
  if(first)//the base level. Level 0
  {
    nodeSpace_l0 = new Space(document.getElementById('nodeSpace_l0'));
    console.log("L0 nodeSpace added");

    ///add it to the global node
    nodeSpaces.push(nodeSpace_l0);

    //a test draggable
    drag = new Draggable(nodeSpace_l0)
  }

  
}
