class Space {
    constructor(containerElement) {
      this.containerElement = containerElement;
      this.nodes = [];
      this.gridSize = 20;
      this.scale = 1;
      this.offset = { x: 0, y: 0 };

      // Add the SVG grid pattern to the containerElement
      // this.addGridBackground();
  
      this.containerElement.addEventListener('mousedown', this.handleMouseDown.bind(this));
      this.containerElement.addEventListener('mousemove', this.handleMouseMove.bind(this));
      this.containerElement.addEventListener('mouseup', this.handleMouseUp.bind(this));
      this.containerElement.addEventListener('wheel', this.handleMouseWheel.bind(this));
    }

    addNode(node) {
      this.nodes.push(node);
      this.containerElement.appendChild(node.element);
    }
  
    handleMouseDown(event) {
      // handle node drag here
    }
  
    handleMouseMove(event) {
      // handle node drag here
    }
  
    handleMouseUp(event) {
      // handle node drag here
    }
  
    handleMouseWheel(event) {
      // handle zoom here
    }
  }