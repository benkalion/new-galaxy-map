const width = 2000;
const height = 1200;

const svg = d3
  .select('#galaxy-map')
  .append('svg')
  .attr('viewBox', [0, 0, width, height].join(' '))
  .style('background', '#000');

const g = svg.append('g');
const background = g.append('g');
const systemsGroup = g.append('g');

const zoom = d3
  .zoom()
  .scaleExtent([0.2, 5])
  .on('zoom', (event) => {
    g.attr('transform', event.transform);
  });

svg.call(zoom);

const starData = d3.range(1000).map(() => ({
  x: Math.random() * width,
  y: Math.random() * height,
  r: Math.random() * 1.5,
}));

background
  .selectAll('circle')
  .data(starData)
  .enter()
  .append('circle')
  .attr('cx', (d) => d.x)
  .attr('cy', (d) => d.y)
  .attr('r', (d) => d.r)
  .attr('fill', '#555');

d3.json('data/star-systems.json').then((data) => {
  systemsGroup
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d) => d.x)
    .attr('cy', (d) => d.y)
    .attr('r', 8)
    .attr('fill', '#ffe81f')
    .attr('stroke', '#fff')
    .attr('stroke-width', 1);

  systemsGroup
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('x', (d) => d.x + 12)
    .attr('y', (d) => d.y - 12)
    .text((d) => d.name)
    .attr('fill', '#fff')
    .attr('font-size', 32)
    .attr('font-family', '"Star Jedi", sans-serif');
});
