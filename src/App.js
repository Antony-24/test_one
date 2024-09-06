import React, { useState, useEffect } from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
} from 'reactflow';
import 'reactflow/dist/style.css';
import avatarone from './assets/Mask Group (2).svg';
import CustomNode from './components/CustomNode'; // Make sure the path is correct
import avatartwo from './assets/Group 763930 (1).svg';
import avatarthree from './assets/Group 763930 (3).svg';
import avatarfour from './assets/Mask Group (1).svg';
import avatarfive from './assets/Mask Group (2).svg';
import avatarsix from './assets/Mask Group (3).svg';
import avatarseven from './assets/Mask Group (4).svg';
import avatareight from './assets/Mask Group.svg';
import avatarnine from './assets/image 153.svg';






const nodeTypes = {
  custom: CustomNode,
};

// Dynamic JSON Data
const jsonData = {
  "name": "Mukesh Ambani",
  "spouse": "Nita Ambani",
  "image": avatarone,
  "spouseimage": avatartwo,
  "children": [
    {
      "name": "Akash Ambani",
      "spouse": "Shloka Mehta",
      "image": avatarthree,
      "spouseimage": avatarfour,
     
    },
    {
      "name": "Isha Ambani",
      "spouse": "Anand Piramal",
      "image": avatareight,
      "spouseimage": avatarnine,
      "children": [
        {
          "name": "Radhika Piramal", // New child
          "image": avatarone
        },
        {
          "name": "Kiran Piramal", // New child
          "image": avatartwo
        }
      ]
    },
    {
      "name": "Anshul Ambani",
      "spouse": "Priya Sharma",
      "image": avatarthree,
      "spouseimage": avatarfour,
      "children": [
        {
          "name": "Asha Ambani", // New child
          "image": avatarfive
        }
      ]
    },
    {
      "name": "Vikram Ambani", // New child
      "spouse": "Sneha Kapoor",
      "image": avatarsix,
      "spouseimage": avatarseven,
      "children": [
        {
          "name": "Vishal Ambani", // New child
          "image": avatareight
        },
        {
          "name": "Vanya Ambani", // New child
          "image": avatarnine
        },
        
        
      ]
    }
  ]
};


function generateNodesAndEdges(data, parentId = null, nodes = [], edges = [], position = { x: 0, y: 0 }, level = 0) {
  // Base spacing values
  const baseXSpacing = 700; // Increased spacing to prevent overlap
  const baseYSpacing = 250; // Increased vertical spacing between levels
  const spouseXSpacing = 280; // Spacing for spouse nodes

  // Generate unique ID for the current node
  const currentId = nodes.length + 1;

  // Add the current node
  nodes.push({
    id: `${currentId}`,
    position: { x: position.x, y: position.y },
    type: 'custom',
    data: { label: data.name, img: data.image },
  });

  // Create edge from parent to current node
  if (parentId) {
    edges.push({
      id: `e${parentId}-${currentId}`,
      source: `${parentId}`,
      target: `${currentId}`,
      type: 'smoothstep',
      style: { strokeWidth: 2 } // Optional: adjust edge style
    });
  }

  // Add spouse node if present
  if (data.spouse) {
    const spouseId = nodes.length + 1;
    nodes.push({
      id: `${spouseId}`,
      position: { x: position.x + spouseXSpacing, y: position.y },
      type: 'custom',
      data: { label: data.spouse, img: data.spouseimage },
    });

    edges.push({
      id: `e${currentId}-${spouseId}`,
      source: `${currentId}`,
      target: `${spouseId}`,
      type: 'straight',
      style: { strokeWidth: 2 } // Optional: adjust edge style
    });
  }

  // Add child nodes and edges if present
  if (data.children && data.children.length > 0) {
    const childCount = data.children.length;
    const childSpacing = baseXSpacing * 1.5; // Ensure enough space between children
    const initialOffset = -((childSpacing * (childCount - 1)) / 2); // Center children under the parent

    data.children.forEach((child, index) => {
      generateNodesAndEdges(
        child,
        currentId, // Pass currentId as parentId for children
        nodes,
        edges,
        { x: position.x + initialOffset + index * childSpacing, y: position.y + baseYSpacing },
        level + 1
      );
    });
  }

  return { nodes, edges };
}





export default function App() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const { nodes, edges } = generateNodesAndEdges(jsonData);
    setNodes(nodes);
    setEdges(edges);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
}
