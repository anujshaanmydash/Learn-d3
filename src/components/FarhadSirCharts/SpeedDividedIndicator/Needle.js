import * as d3 from 'd3';

const percentToDegree = (p) => p * 360;

const degreeToRadian = (d) => (d * Math.PI) / 180;

const percentToRadian = (p) => degreeToRadian(percentToDegree(p));


class Needle {
    constructor(props) {
      this.svg = props.svg;
      this.group = props.group;
      this.len = props.len;
      this.radius = props.radius;
      this.x = props.x;
      this.y = props.y;
    }
  
    render(p) {
      this.group = this.group.append('g');
  
      this.group
        .append('circle')
        .attr('class', 'needle-base')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('fill', '#000')
        .attr('r', this.radius);
  
      this.group
        .append('path')
        .attr('class', 'needle')
        .attr('fill', '#000')
        .attr('d', this.getPath(p));
    }
  
    animateTo(p) {
      this.group
        .transition()
        .delay(500)
        .ease(d3.easeElastic)
        .duration(3000)
        .select('path')
        .tween('progress', () => {
          const self = this;
          const lastP = this.lastP || 0;
          return function (step) {
            const progress = lastP + step * (p - lastP);
            d3.select(this).attr('d', self.getPath(progress));
          };
        })
        .on('end', () => (this.lastP = p));
    }
  
    getPath(p) {
      const thetaRad = percentToRadian(p / 2),
        centerX = 0,
        centerY = 0,
        topX = centerX - this.len * Math.cos(thetaRad) * 1.7,
        topY = centerY - this.len * Math.sin(thetaRad) * 1.7,
        leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2),
        leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2),
        rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2),
        rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);
  
      return `M ${leftX} ${leftY} L ${topX} ${topY} L ${rightX} ${rightY}`;
    }
  }
  
  export default Needle;