// ggx-space.js

class Node {
  constructor(x, y, radius) {
    this.id = this.generateRandomId();
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  generateRandomId() {
    const idLength = 8;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';

    while (id.length < idLength) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      const randomCharacter = characters[randomIndex];
      id += randomCharacter;
    }

    return id;
  }
}

class Space {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.nodes = [];
    this.links = [];

    const width = containerElement.clientWidth;
    const height = containerElement.clientHeight;
    
    const svg = d3.create("svg").attr("viewBox", [0, 0, width, height]);
    this.containerElement.appendChild(svg.node());
    
    this.main_group = svg.append("g").attr("cursor", "grab");

    svg.call(d3.zoom()
    .extent([[0, 0], [width, height]])
    .scaleExtent([1, 8])
    .on("zoom", zoomed)); // Call zoomed function on zoom event
  }

  addNode(x, y, radius) {
    console.log("adding node")
    const node = new Node(x, y, radius);
    this.nodes.push(node);

    const newNode = this.main_group
      .append("rect")
      .attr("x", node.x)
      .attr("y", node.y)
      .attr("id", node.id)
      .attr("width", node.radius * 2)
      .attr("height", node.radius * 2)
      .attr("fill", "steelblue")
      .call(d3.drag()
        .on("start", dragstarted) // Call dragstarted function on drag start
        .on("drag", dragged) // Call dragged function on drag
        .on("end", dragended)); // Call dragended function on drag end
    
    newNode.call(drag);
  }



  zoomed() {
    this.main_group.attr("transform", d3.event.transform);
}



class NodeSpace extends Space {
  constructor(containerElement) {
    super(containerElement);

    console.log("NodeSpace Constructor");

    // Test stuff, you can add more nodes to NodeSpace here
    this.addNode(100, 100, 10);
    this.addNode(150, 150, 15);
    this.addNode(300, 300, 20);
  }
  clickNode(node) {
    // Do something when a node is clicked, for example, log its id
    console.log("Clicked node ID:", node.id);

    
}

