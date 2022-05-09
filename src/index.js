import { SVG } from '@svgdotjs/svg.js';
import SvgToothBuilder, { polygon } from './svgToothBuilder';

class SvgOdontogramService {
    
    constructor() {
        this.builder = new SvgToothBuilder();
    }

    initialize() {
        const svg = this.#createSvgCanvas('#odontograma');
        const mainGroup = this.#createMainGroup();
        const teeth = this.builder.teeth;
        const polygonKeys = Object.keys(polygon);
        for (let i = 0; i < teeth.length; i++) {
            const svgGPolygonWrapper = this.#createPolygonWrapper(`Tooth-${teeth[i].id}`, teeth[i].x, teeth[i].y)

            for (let j = 0; j < polygonKeys.length; j++) {
                const points = this.builder.calculatePolygon(polygon[polygonKeys[j]]);
                svgGPolygonWrapper.polygon(points)
                    .id(`Tooth-${teeth[i].id}-${polygonKeys[j]}`)
                    .fill("white")
                    .stroke({ color: "navy", width: 0.5 })
                    .opacity(1)
                    .click(this.onPolygonClick);
            }
            mainGroup.add(svgGPolygonWrapper);
        }
        svg.add(mainGroup);
    }

    onPolygonClick = (event) => {
        const toothSection = event.target;
        const toothSectionId = toothSection.id;
        SVG(toothSection).fill("crimson");
        console.log("selected tooth section", toothSectionId)
    }

    #createSvgCanvas = (container) => SVG().addTo(container).size('100%', '100%');
    #createMainGroup = () => SVG().group().id('Group-Main').scale(1.5, 1.5);
    #createPolygonWrapper = (id, x, y) => SVG().group().id(id).translate(x, y)
}

new SvgOdontogramService().initialize();
