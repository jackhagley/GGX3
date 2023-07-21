

class Space {
    constructor(containerElement) {
      this.containerElement = containerElement;
      this.draggables = [];
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

    addDraggable(d) {
      this.draggables.push(d);
      this.containerElement.appendChild(d.element);
    }

    getContainerRect() {
      return this.containerElement.getBoundingClientRect();
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

  class NodeSpace extends Space {
    constructor(containerElement) {
      // Call the parent class constructor using super()
      super(containerElement);
      


      ///test stuff
      
      
    }
  }