/**
 * BubbleCloud Component
 */
import React from 'react';
import _ from 'underscore';
import * as d3 from 'd3';
import { format as d3Format } from 'd3-format';
import { interpolateNumber } from 'd3-interpolate';
import {
  // forceCenter,
  forceCollide as D3forceCollide,
  // forceLink,
  forceManyBody as D3forceManyBody,
  // forceRadial,
  forceSimulation as D3forceSimulation,
  forceX as D3forceX,
  forceY as D3forceY
} from 'd3-force';
import { hierarchy as D3hierarchy, pack as D3pack } from 'd3-hierarchy';
import {
  event as d3Event,
  mouse as d3Mouse,
  select as d3Select,
  selectAll as d3SelectAll
} from 'd3-selection';
import { transition as d3Transition } from 'd3-transition';
import { drag as D3drag } from 'd3-drag';
import { easeElasticOut, easePolyOut } from 'd3-ease';
import { scaleOrdinal as D3scaleOrdinal } from 'd3-scale';
import {
  legendColor as D3legendColor,
  legendSize as D3legendSize
} from 'd3-svg-legend';
import { injectIntl } from 'react-intl'; // intlShape
// import { schemeCategory10 } from "d3-scale-chromatic";

// console.log("--d3-3---", d3);

const schemeSet1 = [
  '#ff9d0c',
  '#b15f7a',
  '#27babe',
  '#9b53ba',
  '#c71200',
  '#343a40',
  '#0c9600',
  '#aca119',
  '#5d6afc',
  '#838383'
];

type Props = {
  inputData: object,
  sourceClick: () => void
};

class BubbleCloud extends React.Component<Props> {
  componentDidMount() {
    // console.log('------process.env-----', process.env);
    this.renderCloud();
  }

  componentDidUpdate(prevProps) {
    const { inputData } = this.props;

    if (!_.isEqual(prevProps.inputData, inputData)) {
      this.renderCloud();
    }
  }

  renderCloud() { // console.log("--d3-4---", d3);
  // console.log("--d3Event---", d3Event);
    // const { intl } = this.props;
    // const { formatMessage } = intl;

    // const { type } = this.props;

    // https://naustud.io/tech-stack/
    // https://github.com/trongthanh/techstack
    // Based loosely from this D3 bubble graph https://bl.ocks.org/mbostock/4063269
    // And this Forced directed diagram https://bl.ocks.org/mbostock/4062045
    /* eslint-disable indent */
    /* [
        {
            id: "test" ,
            cat: 'فلزهای قلیایی',
            name: 'D3',
            value: 30,
            icon: 'https://naustud.io/tech-stack/https://naustud.io/tech-stack/img/d3.svg',
            desc: `
                D3.js (or just D3 for Data-Driven Documents) is a JavaScript library for
                producing dynamic, interactive data visualizations in web browsers.
                It makes use of the widely implemented SVG, HTML5, and CSS standards.<br>
                This infographic you are viewing is made with D3.
            `
        }
    ] */
    // Based loosely from this D3 bubble graph https://bl.ocks.org/mbostock/4063269
    // And this Forced directed diagram https://bl.ocks.org/mbostock/4062045

    const { inputData } = this.props;

    if (_.isEmpty(inputData)) {
      return;
    }

    document.getElementById('teck-stack-svg').innerHTML = '';

    let data = inputData;

    const svg = d3Select('#teck-stack-svg');

    const width =
      document.body.clientWidth -
      document.querySelector('.smfp-header-wrap').offsetWidth; // get width in pixels
    const height = +svg.attr('height');
    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const strength = 0.05;
    let focusedNode;
    const format = d3Format(',d');
    const scaleColor = D3scaleOrdinal(schemeSet1);
    // use pack to calculate radius of the circle
    const pack = D3pack()
      .size([width, height])
      .padding(4);
    const forceCollide = D3forceCollide(d => d.r + 1);
    // use the force
    const simulation = D3forceSimulation()
      // .force('link', d3.forceLink().id(d => d.id))
      .force('charge', D3forceManyBody())
      .force('collide', forceCollide)
      // .force('center', d3.forceCenter(centerX, centerY))
      .force('x', D3forceX(centerX).strength(strength))
      .force('y', D3forceY(centerY).strength(strength));
    // reduce number of circles on mobile screen due to slow computation
    if (
      'matchMedia' in window &&
      window.matchMedia('(max-device-width: 767px)').matches
    ) {
      data = data.filter(el => el.value >= 50);
    }
    const root = D3hierarchy({ children: data }).sum(d => d.value);
    // we use pack() to automatically calculate radius conveniently only
    // and get only the leaves
    const nodes = pack(root)
      .leaves()
      .map(node => {
        // console.log('node:', node.x, (node.x - centerX) * 2);
        const newData = node.data;
        return {
          x: centerX + (node.x - centerX) * 3, // magnify start position to have transition to center movement
          y: centerY + (node.y - centerY) * 3,
          r: 0, // for tweening
          radius: node.r, // original radius
          id: `${newData.cat}.${newData.name.replace(/\s/g, '-')}`,
          cat: newData.cat,
          name: newData.name,
          value: newData.value,
          icon: newData.icon,
          desc: newData.desc,
          isImage: newData.isImage,
          element: newData.id
        };
      });

    simulation.nodes(nodes).on('tick', () => {
      node
        .attr('transform', d => `translate(${d.x},${d.y})`)
        .select('circle')
        .attr('r', d => d.r);
    });

    // svg.style('background-color', '#eee');

    const node = svg
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .call(
        D3drag()
          .on('start', d => {
            const dem = d;
            if (!d3Event.active) simulation.alphaTarget(0.2).restart();
            dem.fx = d.x;
            dem.fy = d.y;
          })
          .on('drag', d => {
            const dem = d;
            dem.fx = d3Event.x;
            dem.fy = d3Event.y;
          })
          .on('end', d => {
            const dem = d;
            if (!d3Event.active) simulation.alphaTarget(0);
            dem.fx = null;
            dem.fy = null;
          })
      );

    node
      .append('circle')
      .attr('id', d => d.id)
      .attr('r', 0)
      .style('fill', d => scaleColor(d.cat))
      .transition()
      .duration(2000)
      .ease(easeElasticOut)
      .tween('circleIn', d => {
        const dem = d;
        const i = interpolateNumber(0, d.radius);
        return t => {
          dem.r = i(t);
          simulation.force('collide', forceCollide);
        };
      });

    node
      .append('clipPath')
      .attr('id', d => `clip-${d.id}`)
      .append('use')
      .attr('xlink:href', d => `#${d.id}`);

    // display text as circle icon
    node
      .filter(d => {
        // console.log('---consoe.log--d.isImage--', d.isImage, d);
        return (
          !String(d.icon).includes('https://naustud.io/tech-stack/img/') &&
          !d.isImage
        );
      })
      .append('text')
      .classed('node-icon', true)
      .attr('clip-path', d => `url(#clip-${d.id})`)
      .selectAll('tspan')
      .data(d => d.icon.split(';'))
      .enter()
      .append('tspan')
      .attr('x', 0)
      .attr('y', (d, i, nodes2) => {
        // console.log('--nodes2--');
        return 19 + (i - nodes2.length / 2 - 0.5) * 10;
      })
      .text(name => name);

    // display image as circle icon
    node
      .filter(
        d =>
          String(d.icon).includes('https://naustud.io/tech-stack/img/') ||
          d.isImage === true
      )
      .append('image')
      .classed('node-icon', true)
      .attr('clip-path', d => `url(#clip-${d.id})`)
      .attr('xlink:href', d => d.icon)
      .attr('x', d => -d.radius * 0.7)
      .attr('y', d => -d.radius * 0.7)
      .attr('height', d => d.radius * 2 * 0.7)
      .attr('width', d => d.radius * 2 * 0.7);

    // node.append('title').text(d => `${d.cat}::${d.name}\n${format(d.value)}`);

    const Tooltip = d3Select('.tech-stack-container')
      .append('div')
      .style('opacity', 0)
      .attr('class', 'tooltip');

    const mouseover = function() {
      // console.log( "-------this------" , this );
      Tooltip.style('opacity', 1);
      d3Select(this)
        .style('stroke', 'black')
        .style('opacity', 1);
    };

    const mousemove = function(d) {
      // console.log( "----d3Mouse(this)-----------" , d3Mouse(this) , d );
      Tooltip.html(
        `
          <div>
            <span>${d.cat}</span> <br />
            <div class="clearfix"> 
              <span style="float: right;color:#deea92;">${d.name}</span> 
              <span style="float: left">${format(d.value)}</span>
            </div>
          </div>`
      )
        .style('left', `${d3Mouse(this)[0] + d.x + 50}px`)
        .style('top', `${d3Mouse(this)[1] + d.y}px`);
    };

    const mouseleave = function() {
      Tooltip.style('opacity', 0);
      d3Select(this)
        .style('stroke', 'none')
        .style('opacity', 0.9);
    };

    node
      .on('mouseover', mouseover)
      .on('mousemove', mousemove)
      .on('mouseleave', mouseleave);

    const legendOrdinal = D3legendColor()
      .scale(scaleColor)
      .shape('circle')
      .shapePadding(10); // console.log( "--------legendOrdinal----" , legendOrdinal );

    /**
     * legend 1
     */
    svg
      .append('g')
      .classed('legend-color', true)
      .attr('text-anchor', 'end')
      .attr('transform', 'translate(30,30)')
      .style('font-size', '12px')
      .style('fill', '#FFFFFF')
      .style('font-family', 'IranSans')
      .call(legendOrdinal);

    const sizeScale = D3scaleOrdinal()
      .domain(['امتیاز کمتر', 'امتیاز بیشتر'])
      .range([5, 10]);

    const legendSize = D3legendSize()
      .scale(sizeScale)
      .shape('circle')
      .shapePadding(10)
      .labelAlign('start');
    // console.log(legendSize);

    /**
     * legend 2
     */
    /* svg
      .append('g')
      .classed('legend-size', true)
      .attr('text-anchor', 'end')
      .attr('transform', 'translate(180, 25)')
      .style('font-size', '12px')
      .style('fill', '#FFFFFF')
      .style('font-family', 'IranSans')
      .call(legendSize); */

    /*
    <foreignObject class="circle-overlay" x="10" y="10" width="100" height="150">
      <div class="circle-overlay__inner">
        <h2 class="circle-overlay__title">ReactJS</h2>
        <p class="circle-overlay__body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam, sunt, aspernatur. Autem repudiandae, laboriosam. Nulla quidem nihil aperiam dolorem repellendus pariatur, quaerat sed eligendi inventore ipsa natus fugiat soluta doloremque!</p>
      </div>
    </foreignObject>
    */

    const infoBox = node
      .append('foreignObject')
      .classed('circle-overlay hidden', true)
      .attr('x', -350 * 0.5 * 0.8)
      .attr('y', -350 * 0.5 * 0.8)
      .attr('height', 350 * 0.8)
      .attr('width', 350 * 0.8)
      .append('xhtml:div')
      .classed('circle-overlay__inner', true);

    infoBox
      .append('h2')
      .classed('circle-overlay__title', true)
      .text(d => d.name);

    infoBox
      .append('p')
      .classed('circle-overlay__body', true)
      .html(d => d.desc);

    const moreButton = infoBox
      .append('button')
      .classed('circle-overlay__button btn btn-overly', true)
      .attr('type', 'button')
      .text('اطلاعات بیشتر');

    moreButton.on('click', currentNode => {
      // console.log('----currentNode----', currentNode);
      const { sourceClick } = this.props;
      sourceClick(currentNode);
    });

    node.on('click', currentNode => {
      const currNode = currentNode;
      d3Event.stopPropagation();
      // console.log('currentNode', currentNode);
      const { currentTarget } = d3Event; // the <g> el
      if (currNode === focusedNode) {
        // no focusedNode or same focused node is clicked
        return;
      }
      const lastNode = focusedNode;
      focusedNode = currNode;
      simulation.alphaTarget(0.2).restart();
      // hide all circle-overlay
      d3SelectAll('.circle-overlay').classed('hidden', true);
      d3SelectAll('.node-icon').classed('node-icon--faded', false);
      // don't fix last node to center anymore
      if (lastNode) {
        lastNode.fx = null;
        lastNode.fy = null;
        node
          .filter((d, i) => i === lastNode.index)
          .transition()
          .duration(2000)
          .ease(easePolyOut)
          .tween('circleOut', () => {
            const irl = interpolateNumber(lastNode.r, lastNode.radius);
            return t => {
              lastNode.r = irl(t);
            };
          })
          .on('interrupt', () => {
            lastNode.r = lastNode.radius;
          });
      }
      // if (!d3Event.active) simulation.alphaTarget(0.5).restart();
      d3Transition()
        .duration(2000)
        .ease(easePolyOut)
        .tween('moveIn', () => {
          // console.log('tweenMoveIn', currentNode);
          const ix = interpolateNumber(currentNode.x, centerX);
          const iy = interpolateNumber(currentNode.y, centerY);
          const ir = interpolateNumber(currentNode.r, centerY * 0.5);
          return t => {
            // console.log('i', ix(t), iy(t));
            currNode.fx = ix(t);
            currNode.fy = iy(t);
            currNode.r = ir(t);
            simulation.force('collide', forceCollide);
          };
        })
        .on('end', () => {
          simulation.alphaTarget(0);
          const $currentGroup = d3Select(currentTarget);
          $currentGroup.select('.circle-overlay').classed('hidden', false);
          $currentGroup.select('.node-icon').classed('node-icon--faded', true);
        })
        .on('interrupt', () => {
          // console.log('move interrupt', currNode);
          currNode.fx = null;
          currNode.fy = null;
          simulation.alphaTarget(0);
        });
    });
    // blur
    d3Select(document).on('click', () => {
      const { target } = d3Event;
      // check if click on document but not on the circle overlay
      if (!target.closest('#circle-overlay') && focusedNode) {
        focusedNode.fx = null;
        focusedNode.fy = null;
        simulation.alphaTarget(0.2).restart();
        d3Transition()
          .duration(2000)
          .ease(easePolyOut)
          .tween('moveOut', () => {
            // console.log('tweenMoveOut', focusedNode);
            const ir = interpolateNumber(focusedNode.r, focusedNode.radius);
            return t => {
              focusedNode.r = ir(t);
              simulation.force('collide', forceCollide);
            };
          })
          .on('end', () => {
            focusedNode = null;
            simulation.alphaTarget(0);
          })
          .on('interrupt', () => {
            simulation.alphaTarget(0);
          });
        // hide all circle-overlay
        d3SelectAll('.circle-overlay').classed('hidden', true);
        d3SelectAll('.node-icon').classed('node-icon--faded', false);
      }
    });
  }

  render() {
    return (
      <div className="tech-stack-container bg" style={{ position: 'relative' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          direction="rtl"
          xmlLang="fa"
          id="teck-stack-svg"
          width="100%"
          height="700"
          fontFamily="sans-serif"
          fontSize="10"
          textAnchor="middle"
        />
      </div>
    );
  }
}

/* BubbleCloud.propTypes = {
  intl: intlShape.isRequired
}; */

export default injectIntl(BubbleCloud);
