import React, { useState, useEffect, useRef } from "react";
import ForceGraph2D from "react-force-graph-2d";
import * as d3 from "d3";

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

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default function GraphComponent({}) {
  let displayHeight = window.innerHeight;
  let displayWidth = window.innerWidth;
  let marginSize = 2;

  let nodes = [];
  for (let i = 0; i <= getRndInteger(100, 200); i++) {
    nodes.push({
      id: `${i}`,
      color: "rgba(255,255,255,0.4)"
    });
  }
  let explored = {};
  for (let i = 0; i < nodes.length; i++) {
    explored[nodes[i].id] = false;
  }

  let edges = [];
  let edgeCount = 0;
  let treeCount = 0;

  function BFS(nodes, start, max) {
    explored[start.id] = true;

    let queue = new Queue();
    queue.enqueue(start);

    let connectable = max;
    let connected = 0;

    let randomMarginWidth = getRndInteger(
      -(displayWidth / marginSize),
      displayWidth / marginSize
    );
    let randomMarginHeight = getRndInteger(
      -(displayHeight / marginSize),
      displayHeight / marginSize
    );
    treeCount++;

    while (queue.size() > 0) {
      let s = queue.dequeue();
      if (connected == connectable) break;

      let linkMax = getRndInteger(1, 3);
      let linked = 0;

      for (let i = start.id; i < nodes.length; i++) {
        if (linked == linkMax || connectable == connected) break;
        let node = nodes[i];

        if (!explored[node.id]) {
          node.x = randomMarginWidth;
          node.y = randomMarginHeight;
          start.x = randomMarginWidth;
          start.y = randomMarginHeight;

          queue.enqueue(node.id);
          explored[node.id] = true;
          edges.push({
            id: "edge" + edgeCount,
            source: s,
            target: node.id,
            color: "rgba(255,255,255,0.4)",
          });
          edgeCount++;
          connected++;
          linked++;
        }
      }
    }
  }

  for (let k = 0; k < nodes.length; k++) {
    if (explored[nodes[k].id]) continue;
    BFS(nodes, nodes[k], getRndInteger(10, 20));
  }

  nodes.push({
    id: `sun`,
    color: "yellow",
    val: 100,
    fx: 0,
    fy: 0,
  });

  let data = {
    nodes: nodes,
    links: edges,
  };

  const FindPoint = (x1, y1, x2, y2, x, y) => {
    if (x > x1 && x < x2 && y > y1 && y < y2) return true;
    return false;
  };


  let widthBorder = displayWidth / marginSize;
  let heightBorder = displayHeight / marginSize;
  console.log("Range: width: " + widthBorder + " height: " + heightBorder);

  const fgRef = useRef();

  return (
    <div
      className={
        "w-[" +
        displayWidth +
        "] h-[" +
        displayHeight +
        "] border-white border-10 absolute top-0 z-0"
      }
    >
      <ForceGraph2D
        ref={fgRef}
        width={displayWidth}
        height={displayHeight}
        enableZoomInteraction={false}
        enablePanInteraction={false}
        graphData={data}
        cooldownTime={4000}
        onEngineTick={() => {
          let graph = fgRef.current;
          graph.centerAt(0, 0, 0);
          graph.zoom(1); 
          let sim = graph.d3Force;
          if (sim == undefined) return;
          if (sim("collide") == undefined) sim("collide", d3.forceCollide);
          sim("charge").distanceMax(1000).distanceMin(30).strength(-300);
          sim("centerx", d3.forceX(0).strength(0.02));
          sim("centery", d3.forceY(0).strength(0.02));
        }}
        onEngineStop={() => {
          let sim = fgRef.current.d3Force;
          sim("link").distance(getRndInteger(10, 50));
        }}
        onNodeDragEnd={(node, translate) => {
          console.log("x: " + node.x + " y: " + node.y);
          if(!FindPoint(-widthBorder, -heightBorder, widthBorder, heightBorder, node.x, node.y)) {
            node.x = translate.x; node.y = translate.y;
            console.log("did");
          } 
        }}
        nodeCanvasObject={(node, context, glb) => {
          const r = Math.sqrt(Math.max(0, node.val || 1)) * 4;
          context.beginPath();
          context.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
          context.fillStyle = node.color;
          context.fill();
        }}
      ></ForceGraph2D>
    </div>
  );
}
