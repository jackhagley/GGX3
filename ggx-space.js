function generateUniqueId(prefix) {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substr(2, 8); // 8 characters long
    return `${prefix}-${timestamp}-${randomString}`;
}

class ggx_Draggable {
  /// base class for any draggable object that resides in a Space
  constructor() {
    this.id = generateUniqueId('drag');
    this.width = 100;
    this.height = 66;
    this.x = 20;
    this.y = 30;
    this.color = 'black';
    this.isHovered = false;
    this.isClicked = false;
    this.dragStart = null;
    this.fx;
    this.fy;

    this.main_group = null;///main group
  }

  init(container) {
    ///main group
    this.main_group = container.append("g")
    .attr("id", this.id + "-group")//? maybe keep
    
    // Append the rectangle to the group
    this.body = this.main_group.append("rect")
    .attr("id", this.id)
    .attr("width", this.width)
    .attr("height", this.height)
    .style("fill", this.color);

      /// add interactives
      this.body.call(
      d3
          .drag()
          .on("start", (event, d) => this.dragstarted(event, d))
          .on("drag", (event, d) => this.dragged(event, d))
          .on("end", (event, d) => this.dragended(event, d))
      );

    this.updatePosition();

  }

  dragstarted(event) {
    ///bring it to the top of the stack
    this.main_group.raise();
    //set the offset
    this.fx = this.x - d3.pointer(event, this)[0];
    this.fy = this.y - d3.pointer(event, this)[1];
  }

  dragged(event) {
    this.x = parseInt(this.fx) + parseInt(d3.pointer(event, this)[0]);
    this.y = parseInt(this.fy) + parseInt(d3.pointer(event, this)[1])
    this.updatePosition();
    }
  
  dragended(event) {
      ///reset offset
      this.fx = 0;
      this.fy = 0;
    }

  updatePosition() {
    //this gets called on drag
    this.main_group.attr("transform", `translate(${this.x},${this.y})`);
  }
}

class ggx_Port
{
  
  constructor(draggable)
  {
    ///add Ports to a draggable
    this.draggable = draggable;
    this.connectedTo = null;
    this.id = generateUniqueId('port');
    this.value = null; // this is what it passes on

  }

  init(container) {
    

    container
      .append("circle")
      .attr("cx", this.width/2)
      .attr("cy", this.height)
      .attr("class", "port")
      .attr("r", 10)
      .style("fill", "green")
      .call(d3.drag()
        .on("start", (event, d) => this.dragPortStart(event, d))
        .on("drag", (event, d) => this.dragPort(event, d))
        .on("end", (event, d) => this.dragPortEnd(event, d))
      );
  }

  dragPortStart()
  {
  
  }

  dragPort()
  {
  
  }

  dragPortEnd()
  {
  
  }


}

class InPort extends ggx_Port
{
  constructor(draggable)
  {
    super(draggable)
  }

  init(container)
  {
    super.init(container);
  }

}

// class OutPort extends ggx_Port
// {
//   constructor(dragg)
//   {
//     super()
//   } 

//   init()
//     {
//       super.init();
//     }
// }


class ggx_Portable extends ggx_Draggable
{
  ///Portable is a Draggable with Ports
  ///Portable is a Node without functions
  
  constructor() {
    super();
    this.inPorts = []; // InPort Array
    ///don’t try to build anything into 
    ///svg until init is run!


    
  }

  init(container)
  {
    super.init(container);

    this.id = generateUniqueId('portable');
    this.body.style("fill", "snow");
    this.ports = this.main_group.append("g");
    this.addInPort();  // add InPort Test
    this.updatePosition();
  }

  addInPort()
  {
    var inPort = new InPort(this.main_group)
    inPort.init(this.ports)
  }

  updatePosition()
  {
    super.updatePosition()

  }

}

class NodeSpaceHierarchy {
  constructor() {
      this.root = null; // Root NodeSpace
      this.activeNodeSpace = null; // Currently active NodeSpace
      this.activeWorkSpace = null; // Currently active WorkSpace
  }

  setActiveNodeSpace(nodeSpace) { // Set the active NodeSpace and clear the previous active NodeSpace
      if (this.activeNodeSpace) {
          this.activeNodeSpace.isActive = false;
      }
      this.activeNodeSpace = nodeSpace;
      nodeSpace.isActive = true;
  }

  setActiveWorkSpace(workSpace) { 
    if (this.activeWorkSpace) {
      this.activeWorkSpace.isActive = false;
  }
  this.activeWorkSpace = workSpace;
  workSpace.isActive = true;
}

  }//ns-hierarchy





class Space{
  constructor(){
  
  }
  create(container, depth = 0) { // Create the SVG representation of the Space and its content
    // console.log("creating a Space")
    if (container.empty()) {
      console.error("Container not found.");
      return;
    }
      this.svg = container.append('svg')
      .attr('id', this.id)
      .attr('width', container.node().clientWidth )
      .attr('height', container.node().clientHeight)
      // .style('background-color', 'PapayaWhip');

      // Depth label
      this.svg.append('text')
      .attr('x', 10) 
      .attr('y', 20) 
      .style('fill', 'white').style('font-size', '10px')
      .text(`Depth: ${depth}`);
      
      this.addDraggable();//test 
  }

  addDraggable()
  {
      const draggable = new ggx_Draggable();
      draggable.init(this.svg); //
      ///add to array TODO 

  }

 

}

class NodeSpace extends Space{
  constructor() {
     super()
      this.id = generateUniqueId('ns'); // generate a unique one with prefix 'ns'
      // this.data = data; // NodeSpace data
      this.children = []; // Array to hold child NodeSpaces
      this.isActive = false; // Flag to track whether the NodeSpace is active
      // console.log(this.id)
      
      // this.nodeColour = var("--nodeSpace-draggable"); TODO
      
  }

  addPortable()
  {
    var portable = new ggx_Portable();
    portable.init(this.svg); // 
    ///add to array TODO
  }

  addChild(childNodeSpaceData) {
      ///This is when we start adding stacking ggx-nodes
      const child = new NodeSpace('child' + this.children.length, childNodeSpaceData);
      child.depth = this.depth + 1; // Set the child's depth to parent's depth + 1
      this.children.push(child);
      return child;
  }

  update(newData) { // Update the NodeSpace and its content with new data
      this.data = newData;

      // Run through all of the nodes inside the space

      // Recursively update child NodeSpaces
      this.children.forEach(child => child.update(newData));
  }


}///NodeSpace

class WorkSpace extends Space{
  constructor()
  {
super()
    
  }
}
