let selectedNode = null;
let offset = { x: 0, y: 0 };
let workspace = document.getElementById('workspace');
let connections = [];

const line = document.createElement('div');
line.classList.add('connection');



function connectNodes(node1, node2) {
  const line = document.createElement('div');
  line.classList.add('connection');

  const x1 = node1.offsetLeft + node1.offsetWidth / 2;
  const y1 = node1.offsetTop + node1.offsetHeight / 2;
  const x2 = node2.offsetLeft + node2.offsetWidth / 2;
  const y2 = node2.offsetTop + node2.offsetHeight / 2;

  const angle = Math.atan2(y2 - y1, x2 - x1);
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  line.style.width = `${length}px`;
  line.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}rad)`;

  workspace.appendChild(line);
  connections.push(line);
}

function redrawConnections() {
  connections.forEach(line => line.remove());
  connections = [];

  const nodes = document.getElementsByClassName('node');
  for (let i = 0; i < nodes.length - 1; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      connectNodes(nodes[i], nodes[j]);
    }
  }
}

function connectNodesVisually() {
  const nodes = document.getElementsByClassName('node');
  for (let i = 0; i < nodes.length - 1; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      connectNodes(nodes[i], nodes[j]);
    }
  }
}


