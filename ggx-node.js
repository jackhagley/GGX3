class Draggable {
    constructor(space) {
      this.space = space;
      this.isDragging = false;
  
      this.element = document.createElement('div'); // Create the div element
  
      // Add the necessary styling for a draggable element
      this.element.classList.add('draggable');
      this.element.style.position = 'absolute';
      this.element.style.left = '50px';
      this.element.style.top = '50px';
      this.element.style.cursor = 'grab';
  
      this.offsetX = 0;
      this.offsetY = 0;
  
      // Use arrow functions for the event listeners to bind the correct 'this' context
      this.element.addEventListener('mousedown', (event) => this.handleMouseDown(event));
      document.addEventListener('mousemove', (event) => this.handleMouseMove(event));
      document.addEventListener('mouseup', () => this.handleMouseUp());
      console.log("added a Draggable");
  
      // Append the draggable element to the space containerElement
      this.space.containerElement.appendChild(this.element);
    }
  
    handleMouseDown(event) {
      event.preventDefault();
      this.isDragging = true;
      this.offsetX = event.clientX - this.element.offsetLeft;
      this.offsetY = event.clientY - this.element.offsetTop;
      this.element.style.cursor = 'grabbing';
    }
  
    handleMouseMove(event) {
      if (this.isDragging) {
        const x = event.clientX - this.offsetX;
        const y = event.clientY - this.offsetY;
        const spaceRect = this.space.getBoundingClientRect();
        const maxX = spaceRect.width - this.element.offsetWidth;
        const maxY = spaceRect.height - this.element.offsetHeight;
  
        // Ensure the element stays within the space boundaries
        const clampedX = Math.min(Math.max(x, 0), maxX);
        const clampedY = Math.min(Math.max(y, 0), maxY);
  
        this.element.style.left = `${clampedX}px`;
        this.element.style.top = `${clampedY}px`;
      }
    }
  
    handleMouseUp() {
      this.isDragging = false;
      this.element.style.cursor = 'grab';
    }

    handleMouseMove(event) {
        if (this.isDragging) {
          const x = event.clientX - this.offsetX;
          const y = event.clientY - this.offsetY;
          const spaceRect = this.space.getContainerRect(); // Use getContainerRect() here
          const maxX = spaceRect.width - this.element.offsetWidth;
          const maxY = spaceRect.height - this.element.offsetHeight;
      
          // Ensure the element stays within the space boundaries
          const clampedX = Math.min(Math.max(x, 0), maxX);
          const clampedY = Math.min(Math.max(y, 0), maxY);
      
          this.element.style.left = `${clampedX}px`;
          this.element.style.top = `${clampedY}px`;
        }
    }
  }
  