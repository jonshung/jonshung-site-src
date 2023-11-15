"use client";
import React, { useEffect, useState, useRef } from "react";
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

function NoGraph({}) {
  return <h1>Loading...</h1>;
}

export default function GraphComponent({
  graphMin,
  graphMax,
  minTree,
  maxTree,
  minNodeConnect,
  maxNodeConnect,
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  var _graphMin = graphMin == undefined ? 150 : graphMin,
    _graphMax = graphMax == undefined ? 300 : graphMax,
    _minTree = minTree == undefined ? 10 : minTree,
    _maxTree = maxTree == undefined ? 20 : maxTree,
    _minNodeConnect = minNodeConnect == undefined ? 1 : minNodeConnect,
    _maxNodeConnect = maxNodeConnect == undefined ? 3 : maxNodeConnect,
    marginSize = 2;

  useEffect(() => {
    setIsMounted(true);
    var body = document.body,
      html = document.documentElement;

    var lheight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    var lwidth = Math.max(
      body.scrollWidth,
      body.offsetWidth,
      html.clientWidth,
      html.scrollWidth,
      html.offsetWidth
    );
    setDimensions({ height: lheight, width: lwidth });
  }, []);
  const forceCount = useRef(0);
  const fgRef = useRef();

  let nodes = [];
  let edges = [];
  let edgeCount = 0;
  let treeCount = 0;

  for (let i = 0; i <= getRndInteger(_graphMin, _graphMax); i++) {
    nodes.push({
      id: `${i}`,
      color: "rgb(70,70,70)",
      degree: 0,
      val: 1,
    });
  }
  let explored = [];
  for (let i = 0; i < nodes.length; i++) {
    explored[nodes[i].id] = false;
  }

  function BFS(nodes, start, max) {
    explored[start.id] = true;

    let queue = new Queue();
    queue.enqueue(start);

    let connectable = max;
    let connected = 0;

    let randomMarginWidth = getRndInteger(
      -(dimensions.width / marginSize),
      dimensions.width / marginSize
    );
    let randomMarginHeight = getRndInteger(
      -(dimensions.height / marginSize),
      dimensions.height / marginSize
    );
    treeCount++;

    while (queue.size() > 0) {
      let s = queue.dequeue();
      if (connected == connectable) break;

      let linkMax = getRndInteger(_minNodeConnect, _maxNodeConnect);
      let linked = 0;

      for (let i = 0; i < nodes.length; i++) {
        if (linked == linkMax || connectable == connected) break;
        let node = nodes[i];

        if (!explored[node.id]) {
          node.x = randomMarginWidth;
          node.y = randomMarginHeight;
          start.x = randomMarginWidth;
          start.y = randomMarginHeight;

          queue.enqueue(node);
          explored[node.id] = true;
          edges.push({
            id: "edge" + edgeCount,
            source: s.id,
            target: node.id,
            color: "rgb(70,70,70)",
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
    BFS(nodes, nodes[k], getRndInteger(_minTree, _maxTree));
  }

  edges.forEach((edge) => {
    let srcNode = nodes[edge.source];
    let tgNode = nodes[edge.target];
    srcNode.degree += 1;
    tgNode.degree += 1;
    srcNode.val = Math.log2(srcNode.degree);
    tgNode.val = Math.log2(tgNode.degree);
  });

  let data = {
    nodes: nodes,
    links: edges,
  };

  const FindPoint = (x1, y1, x2, y2, x, y) => {
    if (x > x1 && x < x2 && y > y1 && y < y2) return true;
    return false;
  };

  const randomPositionForceHandler = (x, y, strength) => {
    const sim = fgRef.current.d3Force;
    const graph = fgRef.current;
    const aliveTime = getRndInteger(3000, 5000); //in ms
    const forceNameX = "randomCenterForceX" + (forceCount.current + 1);
    const forceNameY = "randomCenterForceY" + (forceCount.current + 1);
    sim(forceNameX, d3.forceX(x).strength(strength));
    sim(forceNameY, d3.forceY(y).strength(strength));

    setTimeout(() => {
      sim(forceNameX).strength(0);
    }, aliveTime);
    setTimeout(() => {
      sim(forceNameY).strength(0);
      forceCount.current = 0;
      graph.d3VelocityDecay = 0.02;
    }, aliveTime);
  };

  let widthBorder = dimensions.width / marginSize;
  let heightBorder = dimensions.height / marginSize;

  if (!isMounted) {
    return <NoGraph />;
  }
  return (
    <div className={"absolute top-0 left-0 right-0 bottom-0 z-0"}>
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        enableZoomInteraction={false}
        enablePanInteraction={false}
        graphData={data}
        cooldownTime={6000}
        linkDirectionalParticleColor={() => "rgb(80,80,80)"}
        linkDirectionalParticleSpeed={0.013}
        linkDirectionalParticles={1}
        onEngineTick={() => {
          let graph = fgRef.current;
          if(graph == null) return;
          graph.zoom(1);
          let sim = graph.d3Force;

          if (getRndInteger(1, 20) == 1 && forceCount.current == 0) {
            graph.d3VelocityDecay = 0.1;
            const randX = getRndInteger(widthBorder, widthBorder * 2);
            const randY = getRndInteger(heightBorder, heightBorder * 2);
            randomPositionForceHandler(
              randX,
              randY,
              getRndInteger(1, 10) / 10000
            );
            graph.d3ReheatSimulation();
            forceCount.current = 1;
          }

          if (sim == undefined) return;
          if (sim("collide") == undefined) sim("collide", d3.forceCollide);
          sim("charge").distanceMax(1000).distanceMin(30).strength(-100);
        }}
        onEngineStop={() => {
          let sim = fgRef.current.d3Force;
          sim("link").distance(getRndInteger(10, 50));
          sim("centerx", d3.forceX(0).strength(0.015));
          sim("centery", d3.forceY(0).strength(0.015));
        }}
        onNodeDragEnd={(node, translate) => {
          if (
            !FindPoint(
              -widthBorder,
              -heightBorder,
              widthBorder,
              heightBorder,
              node.x,
              node.y
            )
          ) {
            node.x -= translate.x;
            node.y -= translate.y;
          }

          let graph = fgRef.current;
          let sim = graph.d3Force;
          if (sim == undefined) return;
          sim("centerx", d3.forceX(0).strength(0.015));
          sim("centery", d3.forceY(0).strength(0.015));
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
