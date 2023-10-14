import React from "react";
import dynamic from "next/dynamic";

class Queue {
  constructor() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }
  size() {
    return Object.keys(this.items).length;
  }
  enqueue(item) {
    this.items[this.backIndex] = item;
    this.backIndex++;
    return item + " inserted";
  }
  dequeue() {
    const item = this.items[this.frontIndex];
    delete this.items[this.frontIndex];
    this.frontIndex++;
    return item;
  }
  peek() {
    return this.items[this.frontIndex];
  }
  get printQueue() {
    return this.items;
  }
}

const ForceGraph2D = dynamic(() => import("react-force-graph-2d"), {
  ssr: false,
});

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default function GraphComponent({}) {
  let nodes = [];
  for (let i = 0; i <= getRndInteger(50, 100); i++) {
    const nodeNamePkg = i;
    nodes.push({
      id: `${i}`,
      color: 'white'
    });
  }
  let explored = {};
  for (let i = 0; i < nodes.length; i++) {
    explored[nodes[i].id] = false;
  }

  let edges = [];
  let edgeCount = 0;

  function BFS(nodes, start) {
    explored[start] = true;

    let queue = new Queue();
    queue.enqueue(start);

    while (queue.size() > 0) {
      let s = queue.dequeue();
      let connectable = getRndInteger(1, 3);
      let connected = 0;

      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        if (connected == connectable) break;
        if (!explored[node.id]) {
          queue.enqueue(node.id);
          explored[node.id] = true;
          edges.push({
            id: "edge" + edgeCount,
            source: s,
            target: node.id,
            color: 'white'
          });
          edgeCount++;
          connected++;
        }
      }
    }
  }
  BFS(nodes, nodes[0].id);

  let data = {
    nodes: nodes,
    links: edges,
  };

  let displayHeight = window.innerHeight;
  let displayWidth = window.innerWidth;

  return (
    <div className="absolute top-0 z-0">
      <ForceGraph2D 
      width={(displayWidth)} 
      height={(displayHeight)}
      enablePanInteraction={false} 
      enableZoomInteraction={false} 
      graphData={data}></ForceGraph2D>
    </div>
  );
}
