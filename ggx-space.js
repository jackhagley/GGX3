function generateUniqueId(prefix) {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substr(2, 8); // 8 characters long
    return `${prefix}-${timestamp}-${randomString}`;
}

class ggx_Draggable {
  /// base class for any draggable object that resides in a Space
  constructor() {
    this.id = generateUniqueId('node');
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
  }

  init(container) {
    this.svg = container
      .append('rect')
      .attr('id', this.id)
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('x', this.x)
      .attr('y', this.y)
      .style('fill', this.color);
      /// add interatives
      this.svg.call(
      d3
          .drag()
          .on("start", (event, d) => this.dragstarted(event, d))
          .on("drag", (event, d) => this.dragged(event, d))
          .on("end", (event, d) => this.dragended(event, d))
      );

    this.update();
  }

  dragstarted(event) {
    this.svg.raise();
    //set the offset
    this.fx = this.svg.attr("x") - d3.pointer(event, this)[0];
    this.fy = this.svg.attr("y") - d3.pointer(event, this)[1];

    }
  
  dragged(event) {   
      this.svg
      ///update position
      .attr("x", parseInt(this.fx) + parseInt(d3.pointer(event, this)[0]) )
      .attr("y", parseInt(this.fy) + parseInt(d3.pointer(event, this)[1]) ) ;

    }
  
  dragended(event) {
      ///reset offset
      this.fx = 0;
      this.fy = 0;
    }

  update() {
    // Update the Node's appearance based on hover state
    this.svg.style('cursor', this.isHovered ? 'pointer' : 'default');
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
