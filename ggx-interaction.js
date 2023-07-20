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

document.addEventListener('DOMContentLoaded', function() {
  const div1 = document.getElementById('div1');
  const div2 = document.getElementById('div2');

  // Set initial styles
  div1.style.width = '50%';
  div2.style.width = '50%';

  document.addEventListener('keydown', function(event) {
    if (event.key === '1') {
      div1.classList.remove('hidden');
      div2.classList.add('hidden');
      div1.style.width = '100%';
      div2.style.width = '0';
    } else if (event.key === '3') {
      div1.classList.add('hidden');
      div2.classList.remove('hidden');
      div1.style.width = '0';
      div2.style.width = '100%';
    } else if (event.key === '2') {
      div1.classList.remove('hidden');
      div2.classList.remove('hidden');
      div1.style.width = '50%';
      div2.style.width = '50%';
    }
  });
});
