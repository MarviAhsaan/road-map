var links = [
  {source: "CS Core Courses", target: "Programming I COMP102", group: "5"},
  {source: "CS Core Courses", target: "Programming II COMP111", group: "5"},
  {source: "CS Core Courses", target: "Discrete Mathematics COMP113", group: "5"},
  {source: "CS Core Courses", target: "Data Structure & Algo COMP200", group: "4"},
     {source: "CS Core Courses", target: "Senior Project COMP400", group: "4"},
  {source: "CS Core Courses", target: "Intro to IT COMP205", group: "3"},
    {source: "CS Core Courses", target: "Operating Systems COMP301", group: "3"},
    {source: "CS Core Courses", target: "Computer Networks COMP311", group: "3"},
  {source: "CS Core Courses", target: "Hardware Logic & Design COMP206", group: "2"},
  {source: "CS Core Courses", target: "Database System", group: "1"},
    {source: "CS Core Courses", target: "Software EngineeringI COMP220", group: "2"},
    
    {source: "CS Core Courses", target: "Ethics For Computing Professionals COMP401", group: "1"}];

var nodes = {};

// Compute the distinct nodes from the links.
links.forEach(function(link) {
  link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
  link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
});

var color = d3.scale.category20();

var width = 1000,
    height = 500;

var force = d3.layout.force()
    .nodes(d3.values(nodes))
    .links(links)
    .size([width, height])
    .linkDistance(60)
    .charge(-300)
    .on("tick", tick)
    .start();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link")
    .data(force.links())
  .enter().append("line")
    .attr("class", "link");

var node = svg.selectAll(".node")
    .data(force.nodes())
  .enter().append("g")
    .attr("class", "node")
	.style("fill", function(d) { return color(d.group); })
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .call(force.drag);

node.append("circle")
    .attr("r", 11);

node.append("text")
    .attr("x", 18)
    .attr("dy", ".50em")
    .text(function(d) { return d.name; });

function tick() {
  link
      .attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}

function mouseover() {
  d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 16);
}

function mouseout() {
  d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 8);
}