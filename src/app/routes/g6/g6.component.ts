import { Component, OnInit } from '@angular/core';
import G6 from '@antv/g6';
// declare const G6;
@Component({
  selector: 'app-g6',
  templateUrl: './g6.component.html'
})
export class G6Component implements OnInit {
  constructor() {
  }

  ngOnInit() {
    G6.track(false);
    // this.draw1();
    // this.draw2();
    this.draw3();
  }
  draw1() {
    const data = {
      nodes: [{
        id: 'node1',
        x: 0,
        y: 0
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
      width: 500,
      height: 500
    });
    graph.read(data);
    console.log('aa');

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
      width: 500,
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
}
