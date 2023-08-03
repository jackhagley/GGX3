class Space {
    constructor(containerElement) {
      // Store container element
      this.containerElement = containerElement;
  
      // Constants for chart dimensions and data generation
      this.width = this.containerElement.clientWidth;
      this.height = this.containerElement.clientHeight;
      this.radius = 6;
      this.step = this.radius * 2;
      this.theta = Math.PI * (3 - Math.sqrt(5));
  
      // Generate data for the chart, creating an array of objects with x and y coordinates
      this.data = Array.from({ length: 2000 }, (_, i) => {
        const radius = this.step * Math.sqrt(i + 0.5);
        const a = this.theta * i;
        return {
          x: this.width / 2 + radius * Math.cos(a),
          y: this.height / 2 + radius * Math.sin(a),
        };
      });
  
      // Create the SVG container with the specified viewBox
      this.svg = d3.create("svg").attr("viewBox", [0, 0, this.width, this.height]);
  
      // Append a <g> element to the SVG to group elements together and set cursor style
      this.main_group = this.svg.append("g").attr("cursor", "grab");
  
      // Bind data to circles and create circles for each data point
      this.circles = this.main_group
        .selectAll("circle")
        .data(this.data)
        .enter()
        .append("circle")
        .attr("cx", ({ x }) => x)
        .attr("cy", ({ y }) => y)
        .attr("r", this.radius)
        .attr("fill", (d, i) => d3.interpolateRainbow(i / 360));
  
      // Variables to keep track of the drag start position and zoom state
      this.dragStart = null;
      this.zoomTransform = d3.zoomIdentity;
  
      // Enable click and drag behavior on the circles
      this.circles.call(
        d3
          .drag()
          .on("start", (event, d) => this.dragstarted(event, d))
          .on("drag", (event, d) => this.dragged(event, d))
          .on("end", (event, d) => this.dragended(event, d))
      );
  
      // Enable zoom behavior on the main group (the <g> element)
      this.zoomBehavior = d3
        .zoom()
        .extent([
          [0, 0],
          [this.width, this.height],
        ])
        .scaleExtent([1, 8])
        .on("zoom", this.zoomed.bind(this));
  
      this.svg.call(this.zoomBehavior);
  
      // Append the SVG to the chart container
      this.containerElement.appendChild(this.svg.node());
    }
  
    dragstarted(event, d) {
      this.dragStart = this.zoomTransform.invert(d3.pointer(event, this.main_group.node()));
      d.fx = d.x;
      d.fy = d.y;
    }
  
    dragged(event, d) {
      const [x, y] = this.zoomTransform.invert(d3.pointer(event, this.main_group.node()));
      d.fx = x - this.dragStart[0];
      d.fy = y - this.dragStart[1];
    }
  
    dragended(event, d) {
      d.fx = null;
      d.fy = null;
    }
  
    // Function called on zoom event
    zoomed(event) {
      this.zoomTransform = event.transform;
      this.main_group.attr("transform", this.zoomTransform);
    }
  }