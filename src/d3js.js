// const d3js = require('d3');
import * as d3js from "d3";
import SvgToothBuilder, { polygon } from "./svgToothBuilder";

const builder = new SvgToothBuilder();

const svg = d3js.create("svg").attr("version", "1.1")
                .attr("xmlns", "http://www.w3.org/2000/svg")
                .attr("height", "100%").attr("width", "100%");
const svgGContainer = d3js.create("g").attr("id", "gmain").attr("transform", "scale(1.5)");

const teeth = builder.teeth;
const polygonKeys = Object.keys(polygon);
for (let i = 0; i < teeth.length; i++) {
    const svgGPolygonWrapper = d3js.create("g")
        .attr("id", `P${teeth[i].id}`)
        .attr("transform", `translate(${teeth[i].x},${teeth[i].y})`);

    for (let j = 0; j < polygonKeys.length; j++) {
        const points = builder.calculatePolygon(polygon[polygonKeys[j]]);
        svgGPolygonWrapper.append("polygon")
            .attr("id", `P${teeth[i].id}-${polygonKeys[j]}`)
            .attr("points", points.join(' '))
            .attr("fill", "white")
            .attr("stroke", "navy")
            .attr("stroke-width", "0.5")
            .attr("opacity", "1")
    }
    svgGContainer.append(() => svgGPolygonWrapper.node());
}

// const svg = d3js.create("svg").append(svgGContainer)
// const svg = d3js.create("svg");
svg.append(() => svgGContainer.node())
d3js.select("#odontograma").append(() => svg.node() );
    // .append("svg")
    // .attr("version", "1.1")
    // .attr("xmlns", "http://www.w3.org/2000/svg")
    // .attr("height", "100%").attr("width", "100%")
    // .append(() => svgGContainer.node());
    // .append(svg);
    
console.log("Works?", { polygon });