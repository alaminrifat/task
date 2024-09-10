import React, { useState } from 'react';
import SplitPane from 'react-split-pane';
import { v4 as uuidv4 } from 'uuid';

// Function to generate a random color
const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Partition = ({ id, color, onSplit, onRemove }) => {
  return (
    <div className="h-full w-full relative" style={{ backgroundColor: color }}>
      <div className="absolute top-2 right-2 z-10 flex gap-1">
        <button className="bg-gray-800 text-white px-2 py-1 rounded" onClick={() => onSplit(id, 'V')}>
          V
        </button>
        <button className="bg-gray-800 text-white px-2 py-1 rounded" onClick={() => onSplit(id, 'H')}>
          H
        </button>
        <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => onRemove(id)}>
          -
        </button>
      </div>
    </div>
  );
};

// Recursive partition renderer
const RenderPartitions = ({ partition, onSplit, onRemove }) => {
  if (partition.children) {
    return (
      <SplitPane
        split={partition.children.direction === 'V' ? 'vertical' : 'horizontal'}
        minSize={100}
        defaultSize="50%"
        resizerStyle={{ cursor: partition.children.direction === 'V' ? 'col-resize' : 'row-resize', backgroundColor: '#000', opacity: 0.2 }}
      >
        <RenderPartitions partition={partition.children.first} onSplit={onSplit} onRemove={onRemove} />
        <RenderPartitions partition={partition.children.second} onSplit={onSplit} onRemove={onRemove} />
      </SplitPane>
    );
  }

  return (
    <Partition
      key={partition.id}
      id={partition.id}
      color={partition.color}
      onSplit={onSplit}
      onRemove={onRemove}
    />
  );
};

const LayoutBuilder = () => {
  const [rootPartition, setRootPartition] = useState({ id: uuidv4(), color: randomColor(), children: null });

  const handleSplit = (id, direction) => {
    const splitPartition = (partition) => {
      if (partition.id === id && !partition.children) {
        const newPartition = { id: uuidv4(), color: randomColor(), children: null };
        return {
          ...partition,
          children: {
            first: partition,
            second: newPartition,
            direction,
          },
        };
      }

      if (partition.children) {
        return {
          ...partition,
          children: {
            first: splitPartition(partition.children.first),
            second: splitPartition(partition.children.second),
          },
        };
      }

      return partition;
    };

    setRootPartition(splitPartition(rootPartition));
  };

  const handleRemove = (id) => {
    const removePartition = (partition) => {
      if (partition.id === id) {
        return null; 
      }

      if (partition.children) {
        const first = removePartition(partition.children.first);
        const second = removePartition(partition.children.second);

        if (!first) return second;
        if (!second) return first;

        return {
          ...partition,
          children: {
            first,
            second,
          },
        };
      }

      return partition;
    };

    const updatedPartition = removePartition(rootPartition);

    if (updatedPartition) {
      setRootPartition(updatedPartition);
    } else {
      alert('Cannot remove the last remaining partition.');
    }
  };

  return (
    <div className="h-screen w-full">
      <RenderPartitions partition={rootPartition} onSplit={handleSplit} onRemove={handleRemove} />
    </div>
  );
};

export default LayoutBuilder;
