// Add event listeners
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);

// Run the function to connect nodes visually


function handleMouseDown(event) {
  if (event.target.classList.contains('node')) {
    selectedNode = event.target;
    offset.x = event.clientX - selectedNode.offsetLeft;
    offset.y = event.clientY - selectedNode.offsetTop;

    selectedNode.style.cursor = 'grabbing';
  }
}

function handleMouseMove(event) {
  if (selectedNode) {
    const x = event.clientX - offset.x;
    const y = event.clientY - offset.y;

    selectedNode.style.left = `${x}px`;
    selectedNode.style.top = `${y}px`;

    redrawConnections();
  }
}

function handleMouseUp() {
  if (selectedNode) {
    selectedNode.style.cursor = 'grab';
    selectedNode = null;
  }
}