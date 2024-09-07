import React from 'react';
import Tree from 'react-d3-tree';

// Importing images
import avatartwo from './assets/Group 763930 (1).svg';
import avatarthree from './assets/Group 763930 (3).svg';
import avatarfour from './assets/Mask Group (1).svg';
import avatarfive from './assets/Mask Group (2).svg';
import avatarsix from './assets/Mask Group (3).svg';
import avatarseven from './assets/Mask Group (4).svg';
import avatareight from './assets/Mask Group.svg';
import avatarnine from './assets/image 153.svg';

const orgChart = {
  name: 'Mukesh Ambani',
  attributes: { 
    spouse: 'Nita Ambani',
    image: avatartwo, 
    spouseImage: avatarthree
  },
  children: [
    {
      name: 'Akash Ambani',
      attributes: 
      { spouse: 'Shloka Mehta', 
        image: avatarfour, 
        spouseImage: avatarfive 
      },
      children: [
        {
          name: 'Prithvi Ambani',
          attributes: { 
            image: avatarsix,
            spouse: 'Future Spouse 1',
            spouseImage: avatareight ,
           
          },
          children:[
            {
              name: 'Grandchild 1',
              attributes: { image: avatarsix },
            },
            {
              name: 'Grandchild 2',
              attributes: { image: avatarsix },
            },
          ]
        },
      ],
    },
    {
      name: 'Isha Ambani',
      attributes: 
      { spouse: 'Anand Piramal', 
        image: avatarseven,
        spouseImage: avatareight
      },
      children: [
        {
          name: 'Krishna Piramal',
          attributes: { image: avatarsix },
        },
        {
          name: 'Aadiya Piramal',
          attributes: { 
            image: avatarsix,
            spouse: 'Future Spouse 2',
            spouseImage: avatarfive 
          },
          children: [
            {
              name: 'Grandchild 1',
              attributes: { image: avatarsix },
            },
            {
              name: 'Grandchild 2',
              attributes: { image: avatarsix },
            },
            {
              name: 'Grandchild 1',
              attributes: { image: avatarsix },
            },
            {
              name: 'Grandchild 2',
              attributes: { image: avatarsix },
            },
          ]
        },
      ],
    },
  ],
};


// Custom node rendering function
const renderCustomNodeElement = ({ nodeDatum }) => {
  const lineLength = 75.6; // 2 cm in pixels

  return (
    <g>
   
    {nodeDatum.attributes && nodeDatum.attributes.spouse && (
      <line
        x1="0"  
        y1="0"
        x2={70 + (lineLength / 2)}  
        y2="0"
        stroke="#dcdcdc"
        strokeWidth="2"
      />
    )}

    {/* Box for the person */}
    <rect
      width="180"
      height="70"
      x="-140"
      y="-40"
      className="fill-[#dcdcdc] stroke-[#dcdcdc] stroke-[1px] rounded-lg shadow-lg"
    />

    {/* Image for the person */}
    {nodeDatum.attributes && nodeDatum.attributes.image && (
      <image
        href={nodeDatum.attributes.image}
        x="-70" 
        y="-60" 
        width="40"
        height="40"
        className="rounded-full"
      />
    )}

    {/* Name for the person */}
    <text
      x="-50"
      y="10" 
      fontSize="12" 
      textAnchor="middle" 
      style={{ fontWeight: '500', fill: '#777' }} 
    >
      {nodeDatum.name}
    </text>

    {/* Spouse box */}
    {nodeDatum.attributes && nodeDatum.attributes.spouse && (
      <>
        {/* Box for the spouse */}
        <rect
          width="180"
          height="70"
          x="90" 
          y="-40"
          className="fill-[#dcdcdc] stroke-[#dcdcdc] stroke-[2px] rounded-lg shadow-lg"
        />

        {/* Image for the spouse */}
        {nodeDatum.attributes.spouseImage && (
          <image
            href={nodeDatum.attributes.spouseImage}
            x="160" 
            y="-60"
            width="40"
            height="40"
            className="rounded-full"
          />
        )}

        {/* Name for the spouse */}
        <text
          x="175"
          y="10" 
          fontSize="12" 
          textAnchor="middle" 
          style={{ fontWeight: '500', fill: '#777' }} 
        >
          {nodeDatum.attributes.spouse}
        </text>
      </>
    )}
  </g>
  );
};

// Custom path function to connect children from the exact midpoint between parent and spouse
const customPathFunc = (linkDatum) => {
  const { source, target } = linkDatum;
  const midpointX = source.x + 60; 
  const midpointY = source.y;

  return `M${midpointX},${midpointY} 
          V${(midpointY + target.y) / 2} 
          H${target.x} 
          V${target.y}`;
};

export default function OrgChartTree() {
  return (
    <div id="treeWrapper" className="w-full h-screen bg-gray-100">
      <Tree
        data={orgChart}
        orientation="vertical"
        pathFunc={customPathFunc} 
        renderCustomNodeElement={renderCustomNodeElement}
        translate={{ x: 500, y: 50 }} 
        nodeSize={{ x: 300, y: 200 }} 
        linkStyles={{ stroke: '#dcdcdc', strokeWidth: 1 }} 
      />
    </div>
  );
}
