import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import G6 from '@antv/g6';
import * as Mapper from '@antv/g6/plugins/tool.d3.mapper';
import * as d3 from 'd3';
import * as quadraticCurve from '@antv/g6/plugins/edge.quadraticCurve';
import {Debugger} from 'inspector';
// declare const G6;
@Component({
  selector: 'app-g6',
  templateUrl: './g6.component.html'
})
export class G6Component implements OnInit {
  constructor(
    protected httpClient: HttpClient
  ) {
  }

  ngOnInit() {
    G6.track(false);
    // this.draw1();
    // this.draw2();
    // this.draw3();
    this.draw4();
    // this.draw5();
  }
  draw1() {
    const data = {
      nodes: [{
        id: 'node1',
        x: 100,
        y: 200,
      }, {
        id: 'node2',
        x: 300,
        y: 200
      }],
      edges: [
        {
          id: 'edge1',
          target: 'node2',
          source: 'node1',
          shape: 'quadraticCurve'
        },
        {
          id: 'edge2',
          target: 'node1',
          source: 'node2',
          shape: 'quadraticCurve'
        }
      ]
    };
    const graph = new G6.Graph({
      container: 'mountNode',
      // width: 500,
      height: 500,
      plugins: [quadraticCurve],
    });
    graph.edge({
      style() {
        return {
          endArrow: true
        };
      }
    });
    graph.read(data);
    let node;
    let dx;
    let dy;
    graph.on('node:dragstart', ev => {
      console.log('ev', ev)
      const {item} = ev;
      const model = item.getModel();
      console.log('model', model)
      node = item;
      dx = model.x - ev.x;
      dy = model.y - ev.y;
      console.log('dx', dx);
      console.log('dy', dy);
    });
    graph.on('node:drag', ev => {
      node && graph.update(node, {
        x: ev.x + dx,
        y: ev.y + dy
      });
    });
    graph.on('node:dragend', ev => {
      node = undefined;
    });
  }

  draw2() {
    const data = {
      'nodes': [
        {
          'shape': 'customNode',
          'id': 'node1'
        }
      ],
    };

    G6.registerNode('customNode', {
      draw(item) {
        const group = item.getGraphicGroup();
        group.addShape('text', {
          attrs: {
            x: 100,
            y: 100,
            fill: '#333',
            text: '我是一个自定义节点，\n有下面那个方形和我自己组成'
          }
        });
        return group.addShape('rect', {
          attrs: {
            x: 100,
            y: 100,
            width: 100,
            height: 100,
            stroke: 'red'
          }
        });
      }
    });

    const graph = new G6.Graph({
      container: 'mountNode',  // dom 容器 或 容器ID
      width: 500,              // 画布宽
      height: 500,             // 画布高
    });
    graph.read(data);
  }
  draw3() {
    const data = {
      nodes: [{
        id: 'node1',
        x: 100,
        y: 200
      },
        {
        id: 'node2',
        x: 300,
        y: 200
      }],
      edges: [{
        id: 'edge1',
        target: 'node2',
        source: 'node1'
      }]
    };
    const graph = new G6.Graph({
      container: 'mountNode',
      // width: 500,
      height: 500
    });
    graph.read(data);
    let node;
    let dx;
    let dy;
    graph.on('node:dragstart', ev => {
      const {item} = ev;
      const model = item.getModel();
      node = item;
      dx = model.x - ev.x;
      dy = model.y - ev.y;
    });
    graph.on('node:drag', ev => {
      node && graph.update(node, {
        x: ev.x + dx,
        y: ev.y + dy
      });
    });
    graph.on('node:dragend', ev => {
      node = undefined;
    });
  }
  draw4() {
    this.httpClient.get('assets/data/xiaomi.json').subscribe(( a ) => {
      // console.log('data', data);
      // const Mapper = G6.Plugins['tool.d3.mapper'];
      G6.registerNode('customNode', {
        draw(item) {
          console.log('item is', item)
          const group = item.getGraphicGroup();
          return group.addShape('rect', {
            attrs: {
              x: 0,
              y: 0,
              width: 100,
              height: 100,
              stroke: 'pink',
              fill: 'black',
              name: '节点4',
              labels: [
                'network'
              ],
              properties: {
                name: '节点4'
              }

            }
          });
        }
      });
      G6.registerNode('customNode02', {
        draw(item) {
          const group = item.getGraphicGroup();
          console.log('html', group);
          const html = group.addShape('html', {

          });
          return html;
        }
      });
      const data = {
        nodes: [
          {
            id: 'node1',
            name: '节点1',
            labels: [
              'network'
            ],
            style: 'blue',
            properties: {
              name: '节点1'
            },
          },
          {
            id: 'node2',
            name: '节点2',
            labels: [
              'network'
            ],
            properties: {
              name: '节点2'
            }
          },
          {
            id: 'node3',
            name: '节点3',
            labels: [
              'network'
            ],
            properties: {
              name: '节点3'
            }
          },
          {
            shape: 'customNode',
            id: 'node4',
            name: '节点3',
            labels: [
              'network'
            ],
            properties: {
              name: '节点4'
            }
          },
          {
            shape: 'customNode02',
            id: 'node5',
            name: '节点3',
            labels: [
              'network'
            ],
            properties: {
              name: '节点4'
            }
          },
        ],
        edges: [
          {
            id: 'edge1',
            target: 'node2',
            source: 'node1',
            shape: 'quadraticCurve'
          },
          {
            id: 'edge2',
            target: 'node1',
            source: 'node2',
            shape: 'quadraticCurve'
          },
          {
            id: 'edge3',
            target: 'node1',
            source: 'node3',
            shape: 'quadraticCurve'
          },
          {
            id: 'edge4',
            target: 'node1',
            source: 'node4',
            shape: 'quadraticCurve'
          },
          {
            id: 'edge5',
            target: 'node4',
            source: 'node1',
            shape: 'quadraticCurve'
          }
        ]
      };
      const _d = d3,
        forceSimulation = _d.forceSimulation,
        forceLink = _d.forceLink,
        forceManyBody = _d.forceManyBody,
        forceX = _d.forceX,
        forceY = _d.forceY,
        forceCollide = _d.forceCollide;

      const nodeMap = {};
      // const nodeSizeMapper = new Mapper('node', '', 'size', [8, 48], {
      //   legendCfg: null
      // });
      // const nodeColorMapper = new Mapper('node', 'type', 'color', ['#e18826', '#002a67']);
      const G = G6.G;
      let simulation = void 0;
      const graph = new G6.Graph({
        container: 'mountNode',
        height: window.innerHeight,
        // height: 500,
        // width: 500,
        // plugins: [nodeSizeMapper, nodeColorMapper],
        // plugins: [nodeSizeMapper],
        modes: {
          default: ['rightPanCanvas']
        },
        layout: (node, edge) => {
          if (simulation) {
            simulation.alphaTarget(0.3).restart();
          } else {
            simulation = forceSimulation(node)
              .force('charge', forceManyBody().strength(-100))
              .force('link', forceLink(edge).id(function(model) {
                return model.id;
              }))
              .force('collision', forceCollide().radius(function(model) {
                return model.size / 2 * 1.2;
                // return model.size * 2;
              }))
              .force('y', forceY())
              .force('x', forceX())
              .on('tick', function() {
                graph.updateNodePosition();
              });
          }
        }

      });
      graph.node({
        style: function style(model) {
          if (model.type === 'network') {
            console.log('1');
            return {
              shadowColor: 'rgba(0,0,0, 0.3)',
              shadowBlur: 3,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
              stroke: null
            };
          }
          console.log('2');
          return {
            fill: '#002a67',
            shadowColor: 'rgba(0,0,0, 0.3)',
            shadowBlur: 3,
            shadowOffsetX: 3,
            shadowOffsetY: 5,
            stroke: null
          };
        },
        label: function label(model) {
          return {
            text: model.properties['name'],
            stroke: null,
            fill: '#fff'
          };
        }
      });
      graph.edge({
        style: function style() {
          return {
            stroke: '#b3b3b3',
            lineWidth: 2,
            endArrow: true
          };
        }
      });
      graph.read(data);
      graph.translate(graph.getWidth() / 2, graph.getHeight() / 2);

      // 拖拽节点交互
      let subject = void 0; // 逼近点
      graph.on('mousedown', function(ev) {
        if (ev.domEvent.button === 0) {
          subject = simulation.find(ev.x, ev.y);
        }
      });

      graph.on('dragstart', function(ev) {
        if (subject) {
          simulation.alphaTarget(0.3).restart();
        }
      });

      graph.on('drag', function(ev) {
        if (subject) {
          subject.fx = ev.x;
          subject.fy = ev.y;
        }
      });

      graph.on('mouseup', resetState);
      graph.on('canvas:mouseleave', resetState);

      function resetState() {
        if (subject) {
          console.log('subject is', subject);
          console.log('simulation is', simulation);
          simulation.alphaTarget(0);
          subject.fx = null;
          subject.fy = null;
          subject = null;
        }
      }

      // 鼠标移入节点显示 label
      function tryHideLabel(node) {
        const model = node.getModel();
        const label = node.getLabel();
        const labelBox = label.getBBox();
        if (labelBox.maxX - labelBox.minX > model.size) {
          label.hide();
          graph.draw();
        }
      }
      const nodes = graph.getNodes();
      const edges = graph.getEdges();

      edges.forEach(function(edge) {
        edge.getGraphicGroup().set('capture', false); // 移除边的捕获，提升图形拾取效率
      });

      // nodes.forEach(function(node) {
      //   tryHideLabel(node);
      // });

      graph.on('node:mouseenter', function(ev) {
        const item = ev.item;
        graph.toFront(item);
        item.getLabel().show();
        graph.draw();
      });

      graph.on('node:mouseleave', function(ev) {
        const item = ev.item;
        tryHideLabel(item);
      });
    });
  }
  draw5() {
    this.httpClient.get('assets/data/university.json').subscribe((data) => {
      // const Mapper = G6.Plugins['tool.d3.mapper'];
      const Util = G6.Util;
      const _d = d3,
        forceSimulation = _d.forceSimulation,
        forceLink = _d.forceLink,
        forceManyBody = _d.forceManyBody,
        forceX = _d.forceX,
        forceY = _d.forceY;

      const nodeColorMapper = new Mapper('node', '办学层次', 'color', ['#4BA4C4', '#F0D79F', '#FF8B33']);
      let simulation = void 0;

      // 注册城市文本导引信息
      G6.registerGuide('city-label', {
        draw: function draw(item) {
          const tree = item.getGraph();
          const roots = tree.getRoots();
          const group = item.getGraphicGroup();
          roots.forEach(function(root) {
            const bbox = Util.getTotalBBox(root.getAllChildren().map(function(child) {
              return child.getBBox();
            }));
            const model = root.getModel();
            group.addShape('text', {
              attrs: {
                x: bbox.minX,
                y: bbox.minY - 8,
                text: model.name,
                fill: '#ccc'
              }
            });
          });
        }
      });

      const tree = new G6.Tree({
        container: 'mountNode',
        height: window.innerHeight,
        plugins: [nodeColorMapper],
        layout: function layout() {
          const nodes = tree.getNodes().map(function(node) {
            return node.getModel();
          });
          const edges = tree.getEdges().map(function(edge) {
            return Util.mix({}, edge.getModel());
          });
          simulation && simulation.stop();
          simulation = forceSimulation(nodes)
            .force('charge', forceManyBody())
            .force('link', forceLink(edges).id(function(d) {
              return d.id;
          }).distance(20).strength(1))
            .force('y', forceY())
            .on('tick', function() {
              tree.updateNodePosition();
          });
        }
      });
      tree.node({
        size: 10,
        style: {
          stroke: null
        }
      });
      tree.edge({
        style: function style() {
          return {
            strokeOpacity: 0.6
          };
        }
      });
      tree.read(data);
      tree.add('guide', {
        shape: 'city-label'
      });
      tree.translate(tree.getWidth() / 2, tree.getHeight() / 2);

      // 拖拽画布交互
      let lastPoint = void 0;
      tree.on('canvas:mouseenter', function() {
        tree.css({
          cursor: '-webkit-grabbing'
        });
      });
      tree.on('dragstart', function() {
        tree.css({
          cursor: '-webkit-grabbing'
        });
      });
      tree.on('drag', function(ev) {
        if (lastPoint) {
          tree.translate(ev.domX - lastPoint.x, ev.domY - lastPoint.y);
        }
        lastPoint = {
          x: ev.domX,
          y: ev.domY
        };
      });
      tree.on('dragend', function() {
        lastPoint = undefined;
        tree.css({
          cursor: '-webkit-grab'
        });
      });
      tree.on('canvas:mouseleave', function() {
        lastPoint = undefined;
      });
    });
  }
}
