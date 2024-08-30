import React, { useState } from 'react';
import ReactFlow, {
  Controls,
  MiniMap,
  Background,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';
import avatarone from './assets/Group 763930 (1).svg';
import avatartwo from './assets/Group 763930 (2).svg';
import avatarthree from './assets/Group 763930 (3).svg';
import avatarfour from './assets/Mask Group (1).svg';
import avatarfive from './assets/Group 763930 (3).svg';
import avatarsix from './assets/Mask Group (3).svg';
import avatarseven from './assets/Mask Group (4).svg';
import avatareight from './assets/Mask Group.svg';
import elips from './assets/elipse.svg';

// Define nodes and edges
const allNodes = [
  { id: '1', position: { x: -200, y: 0 }, data: { label: 'Adam Rossier', img: avatarone }, style: { width: 180, height: 200 }, type: 'special' },
  { id: '2', position: { x: 200, y: 0 }, data: { label: 'Jessie Ava', img: avatartwo }, style: { width: 180, height: 200 }, type: 'special' },
  { id: '3', position: { x: -250, y: 215 }, data: { label: 'Mira Rossier', img: avatarthree }, style: { width: 180, height: 200 }, type: 'special' },
  { id: '4', position: { x: 250, y: 215 }, data: { label: 'Henry Rossier', img: avatarfour }, style: { width: 180, height: 200 }, type: 'special' },
  { id: '5', position: { x: -550, y: 215 }, data: { label: 'Zain Korsgaard', img: avatarfive }, style: { width: 180, height: 200 }, type: 'special' },
  { id: '6', position: { x: -400, y: 400 }, data: { label: 'Jack Korsgaard', img: avatarsix }, style: { width: 180, height: 200 }, type: 'special' },
  { id: '7', position: { x: 550, y: 215 }, data: { label: 'Grace Charlie', img: avatarseven }, style: { width: 180, height: 200 }, type: 'special' },
  { id: '8', position: { x: 400, y: 400 }, data: { label: 'Lily Rossier', img: avatareight }, style: { width: 180, height: 200 }, type: 'special' },
  { id: '9', position: { x: 100, y: 400 }, data: { label: 'Lucas Rossier', img: avatarone }, style: { width: 180, height: 200 }, type: 'special' },
  { id: '10', position: { x: 700, y: 400 }, data: { label: 'Oliver Rossier', img: avatarone }, style: { width: 180, height: 200 }, type: 'special' },
];

const initialEdges = [
  { id: 'e1-1', source: '1', target: '2', type: 'custom', sourceHandle: 'bottom', targetHandle: 'bottom' },
  { id: 'e1-2', source: '3', target: '4', type: 'smoothstep', sourceHandle: 'top', targetHandle: 'top' },
  { id: 'e1-3', source: '3', target: '5', type: 'custom', sourceHandle: 'bottom', targetHandle: 'bottom' },
  { id: 'e1-4', source: '4', target: '7', type: 'custom', sourceHandle: 'bottom', targetHandle: 'bottom' },
  { id: 'e1-5', source: '8', target: '10', type: 'smoothstep', sourceHandle: 'top', targetHandle: 'top' },
  { id: 'e1-6', source: '9', target: '8', type: 'smoothstep', sourceHandle: 'top', targetHandle: 'top' },
];

// Custom Edge Component to draw an additional vertical line from the middle
const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY }) => {
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  const lineLength = 60; // Approx. 2cm in pixels
  const lineEndY = midY + lineLength;

  return (
    <g>
      {/* Original straight edge */}
      <line x1={sourceX} y1={sourceY} x2={targetX} y2={targetY} stroke="#DCDCDC" strokeWidth={2} />
      {/* Additional vertical line from the midpoint */}
      <line x1={midX} y1={midY} x2={midX} y2={lineEndY} stroke="#DCDCDC" strokeWidth={2} />
    </g>
  );
};

const CustomEdgetwo = ({ id, sourceX, sourceY, targetX, targetY }) => {
  const lineLength = 60; // Approx. 2cm in pixels

  return (
    <g>
      {/* Original straight edge */}
      <line x1={sourceX} y1={sourceY} x2={targetX} y2={targetY} stroke="#DCDCDC" strokeWidth={2} />

      {/* Vertical line at the source */}
      <line x1={sourceX} y1={sourceY} x2={sourceX} y2={sourceY + lineLength} stroke="#DCDCDC" strokeWidth={2} />

      {/* Vertical line at the target */}
      <line x1={targetX} y1={targetY} x2={targetX} y2={targetY + lineLength} stroke="#DCDCDC" strokeWidth={2} />
    </g>
  );
};

export default function App() {
  const [nodes, setNodes] = useState([allNodes[0], allNodes[1]]); // Start with nodes 1 and 2
  const [edges, setEdges] = useState(initialEdges);

  const handleNodeClick = (nodeId) => {
    setNodes((prevNodes) => {
      const nodeIds = new Set(prevNodes.map((n) => n.id));
      let nodesToAdd = [];
      let nodesToRemove = [];
  
      // Determine which nodes to add or remove based on the clicked node
      if (nodeId === '1' || nodeId === '2') {
        // If Node 1 or 2 is clicked, toggle nodes 3, 4, 5, 7
        if (nodeIds.has('1') || nodeIds.has('2')) {
          nodesToAdd = [allNodes[2], allNodes[3], allNodes[4], allNodes[6]];
          nodesToRemove = prevNodes.filter((n) => !['1', '2'].includes(n.id));
        } else {
          nodesToAdd = [allNodes[0], allNodes[1]];
        }
      } else if (['3', '5'].includes(nodeId)) {
        // If Node 3 or 5 is clicked, toggle node 6
        nodesToAdd = [allNodes[5]];
        nodesToRemove = prevNodes.filter((n) => !['1', '2', '3', '5'].includes(n.id));
      } else if (['4', '7'].includes(nodeId)) {
        // If Node 4 or 7 is clicked, toggle nodes 8, 9, 10
        nodesToAdd = [allNodes[7], allNodes[8], allNodes[9]];
        nodesToRemove = prevNodes.filter((n) => !['1', '2', '4', '7'].includes(n.id));
      }
  
      // Check if the node is already visible and determine which nodes to remove
      if (nodeIds.has(nodeId)) {
        // Node is visible, remove corresponding nodes
        if (['1', '2'].includes(nodeId)) {
          nodesToRemove = [
            allNodes[2],
            allNodes[3],
            allNodes[4],
            allNodes[6],
            allNodes[5],
            allNodes[7],
            allNodes[8],
            allNodes[9],
            allNodes[10],
          ];
        }
        if (['3', '5'].includes(nodeId)) {
          nodesToRemove = [allNodes[5]];
        }
        if (['4', '7'].includes(nodeId)) {
          nodesToRemove = [allNodes[7], allNodes[8], allNodes[9], allNodes[10]];
        }
      }
  
      // Remove nodes
      const newNodes = prevNodes.filter((node) => !nodesToRemove.includes(node));
  
      // Add nodes
      nodesToAdd.forEach((node) => {
        if (!nodeIds.has(node.id)) {
          newNodes.push(node);
        }
      });
  
      return newNodes;
    });
  };
  

  const CustomNode = ({ data }) => {
    const showVerticalLine = !['Jack Korsgaard', 'Lucas Rossier', 'Lily Rossier', 'Oliver Rossier'].includes(data.label);

    return (
      <div onClick={() => handleNodeClick(
        data.label === 'Adam Rossier' ? '1' : 
        data.label === 'Jessie Ava' ? '2' : 
        data.label === 'Mira Rossier' ? '3' : 
        data.label === 'Zain Korsgaard' ? '5' : 
        data.label === 'Henry Rossier' ? '4' : 
        data.label === 'Grace Charlie' ? '7' : 
        data.label === 'Lily Rossier' ? '8' : 
        data.label === 'Lucas Rossier' ? '9' : 
        data.label === 'Oliver Rossier' ? '10' : 
        ''
      )} className='flex flex-wrap align-middle items-center bg-[#DCDCDC] h-24 w-60 rounded-md'>
        <img src={data.img} alt={data.label} className='mx-auto -mt-10' />
        <p className='text-center w-full font-semibold text-[13px]'>{data.label}</p>
        <img src={elips} className='absolute right-0 top-0 -mr-[25px]' />
        {/* Conditionally render the vertical line */}
        {showVerticalLine && (
          <div style={{ position: 'absolute', bottom: '-10px', left: '50%', width: '2px', height: '37px', background: '#DCDCDC', transform: 'translateX(-50%)' }} />
        )}

        <Handle
          type="source"
          position="bottom"
          id="bottom"
          style={{ bottom: '-8px', background: '#DCDCDC' }}
        />
        <Handle
          type="target"
          position="bottom"
          id="bottom"
          style={{ bottom: '-8px', background: '#DCDCDC' }}
        />
        <Handle
          type="source"
          position="top"
          id="top"
          style={{ top: '-8px', background: '#DCDCDC' }}
        />
        <Handle
          type="target"
          position="top"
          id="top"
          style={{ top: '-8px', background: '#DCDCDC' }}
        />
      </div>
    );
  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={{ special: CustomNode }}
        edgeTypes={{ custom: CustomEdge, customtwo: CustomEdgetwo }}
      >
        <Controls />
        <MiniMap />
        <Background />
      </ReactFlow>
    </div>
  );
}
