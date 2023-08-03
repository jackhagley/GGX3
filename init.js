//global arrays
const nodeSpaces = [];
const workSpaces = [];

let nodeSpace_l0;
let workSpace_l0;

function init() {
  console.log("Init Started");

  // Initialize nodeSpace_l0
  addNodeSpace(true);//
}

function addNodeSpace(first=false)
{
  if(first)//the base level. Level 0
  {
    nodeSpace_l0 = new NodeSpace(document.getElementById('nodeSpace_l0'));
    nodeSpaces.push(nodeSpace_l0);

    
    console.log("L0 nodeSpace added");

    ///add it to the global node
    

    // nodeSpace_l0.addNode()
  }

  
}
