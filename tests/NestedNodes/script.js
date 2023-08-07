function generateUniqueId(prefix) {
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substr(2, 8); // 8 characters long
    return `${prefix}-${timestamp}-${randomString}`;
}

class Node {
    constructor() {
      this.id = generateUniqueId('node');
      this.width = 100;
      this.height = 100;
      this.x = 20;
      this.y = 30;
      this.color = 'black';
      this.isHovered = false;
      this.isClicked = false;
      this.dragStart = null;
      this.fx;
      this.fy;
    }
  
    create(container) {
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

class NodeSpace {
    constructor(data) {
        this.id = generateUniqueId('ns'); // generate a unique one with prefix 'ns'
        this.data = data; // NodeSpace data
        this.children = []; // Array to hold child NodeSpaces
        this.isActive = false; // Flag to track whether the NodeSpace is active
        // console.log(this.id)
    }

    create(container, depth = 0) { // Create the SVG representation of the NodeSpace and its content
        this.svg = container.append('svg')
        .attr('id', this.id)
        .attr('width', 400)
        .attr('height', 300)
        .style('background-color', 'steelblue');

        // Depth label
        this.svg.append('text')
        .attr('x', 10) 
        .attr('y', 20) 
        .style('fill', 'white').style('font-size', '10px')
        .text(`Depth: ${depth}`);
        
        const node = new Node();
        node.create(this.svg); // Add the Node to the NodeSpace's SVG container
    }


    addChild(childNodeSpaceData) {
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

    addInteractivity() { // Add interactivity to the NodeSpace and its content
        this.svg.on('click', () => { // Handle NodeSpace click event
        });

    }
}

class NodeSpaceHierarchy {
    constructor() {
        this.root = null; // Root NodeSpace
        this.activeNodeSpace = null; // Currently active NodeSpace
    }

    setActiveNodeSpace(nodeSpace) { // Set the active NodeSpace and clear the previous active NodeSpace
        if (this.activeNodeSpace) {
            this.activeNodeSpace.isActive = false;
        }
        this.activeNodeSpace = nodeSpace;
        nodeSpace.isActive = true;
    }
}

class EventDelegator {
    constructor(nodeSpaceHierarchy) {
        this.nodeSpaceHierarchy = nodeSpaceHierarchy;
        this.activeNodeSpace = null; // Currently active NodeSpace
    }

    setActiveNodeSpace(nodeSpace) {
        this.activeNodeSpace = nodeSpace;
    }

    handleEvent(event) {
        if (this.activeNodeSpace) {
            // Process the event only if an active NodeSpace is set
            // You can delegate specific event types like 'click', 'mouseover', etc.
            // Example: this.activeNodeSpace.handleEvent(event);
        }
    }

    handleNodeEvent(node, eventType) {
        // Handle events specific to Node instances
        
        // console.log(node.id)

        // Handle the event for the specific Node instance
        if (eventType === 'mouseover')
        {
        node.isHovered = true;
        }

        if (eventType === 'mouseout')
        {
        node.isHovered = false;
        }

        if (eventType === 'click')
        {
            node.isClicked = true;
        }

        node.update(); // Update the Node appearance based on hover state
        
      }

}

// Usage:
const nodeSpaceHierarchy = new NodeSpaceHierarchy();
const eventDelegator = new EventDelegator(nodeSpaceHierarchy);

const rootNodeSpaceData = {}; // Data for the root NodeSpace
const rootNodeSpace = new NodeSpace('root', rootNodeSpaceData);

// Create and set up SVG for the entire NodeSpace hierarchy
const container = d3.select('#container');
rootNodeSpace.create(container);

// Set the root NodeSpace as the active NodeSpace initially
nodeSpaceHierarchy.setActiveNodeSpace(rootNodeSpace);
eventDelegator.setActiveNodeSpace(rootNodeSpace);

// Handle events
document.addEventListener('click', event => {
    eventDelegator.handleEvent(event);
});

// // Adding a child NodeSpace to the root NodeSpace
// const childNodeSpaceData1 = {}; // Data for the child NodeSpace
// const childNodeSpace1 = rootNodeSpace.addChild(childNodeSpaceData1);
// childNodeSpace1.create(rootNodeSpace.svg);
// // Create the child NodeSpace and add it to the root NodeSpace

// // Adding another child NodeSpace to the root NodeSpace
// const childNodeSpaceData2 = {}; // Data for the second child NodeSpace
// const childNodeSpace2 = rootNodeSpace.addChild(childNodeSpaceData2);
// childNodeSpace2.create(rootNodeSpace.svg); // Create the second child NodeSpace and add it to the root NodeSpace