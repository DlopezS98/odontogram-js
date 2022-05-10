import { SVG } from '@svgdotjs/svg.js';
import SvgToothBuilder, { polygon } from './svgToothBuilder';
import ToothBuilder from "./odontograma";
import CustomMenuContext from './customMenuContext';

class SvgOdontogramService {
    
    constructor() {
        this.builder = new SvgToothBuilder();
        this.secondBuiler = new ToothBuilder();
        document.addEventListener('click', CustomMenuContext.hideMenu);
        CustomMenuContext.initialize();
    }

    initialize() {
        const svg = this.#createSvgCanvas('#odontograma');
        const mainGroup = this.#createMainGroup();
        const teeth = this.secondBuiler.createList();
        const polygonKeys = Object.keys(polygon);
        for (let i = 0; i < teeth.length; i++) {
            const svgGPolygonWrapper = this.#createPolygonWrapper(`Tooth-${teeth[i].id}`, teeth[i].x, teeth[i].y)
            svgGPolygonWrapper.attr('class', 'polygon-wrapper').click(this.onPolygonWrapperClick);
            for (let j = 0; j < polygonKeys.length; j++) {
                const points = this.builder.calculatePolygon(polygon[polygonKeys[j]]);
                svgGPolygonWrapper.polygon(points)
                    .id(`${teeth[i].id}-${polygonKeys[j]}`)
                    .fill("white")
                    .stroke({ color: "navy", width: 0.5 })
                    .opacity(1)
                    .click(this.onPolygonClick)
                    .data({ selected: false, finding: '', toothId: teeth[i].id, toothSectionId: `${teeth[i].id}-${polygonKeys[j]}` })
                    .on('contextmenu', CustomMenuContext.rightClick)
                    .addClass('rectangle-polygon')
            }

            svgGPolygonWrapper.text()
                .plain(teeth[i].id).x(6)
                .stroke({ color: 'navy', width: 0.1 })
                .fill('navy')
                .attr('style', 'font-size: 6pt;font-weight:normal')
                .attr('y', '30');
            mainGroup.add(svgGPolygonWrapper);
        }
        svg.add(mainGroup);
    }

    onPolygonClick = (event) => {
        CustomMenuContext.hideMenu(event);
        const toothSection = SVG(event.target);
        this.createSelectedTooth(toothSection);
        // const selected = toothSection.data('selected');
        // toothSection.data('selected', !selected);
        // toothSection.fill(!selected ? "crimson" : "white");
    }

    onContextMenu = (event) => {
        CustomMenuContext.rightClick(event);
        const menuItem = document.querySelectorAll('[context-menu-item]')
        menuItem.forEach((a) => {
            a.addEventListener('customMenuContextOptionClick', (_event) => {
                console.log(_event);
                console.log(event)
            })
        })
    }

    onPolygonWrapperClick = (event) => {
        console.log(event);
    }

    #createSvgCanvas = (container) => SVG().addTo(container).size('100%', '100%');
    #createMainGroup = () => SVG().group().id('Group-Main').scale(1.5, 1.5);
    #createPolygonWrapper = (id, x, y) => SVG().group().id(id).translate(x, y)

    createSelectedTooth = (event) => {
        const id = event.data('toothId')
        document.getElementById('container-selected-tooth').innerHTML = '';
        const svg = this.#createSvgCanvas('#container-selected-tooth');
        const group = svg.group().scale(2, 2);
        const polygonKeys = Object.keys(polygon);
        for (let j = 0; j < polygonKeys.length; j++) {
            const points = this.builder.calculatePolygon(polygon[polygonKeys[j]]);
            group.polygon(points)
                .id(j)
                .fill("white")
                .stroke({ color: "navy", width: 0.5 })
                .opacity(1)
        }
        group.text()
        .plain(id).x(6)
        .stroke({ color: 'navy', width: 0.1 })
        .fill('navy')
        .attr('style', 'font-size: 6pt;font-weight:normal')
        .attr('y', '30');
    }
}

new SvgOdontogramService().initialize();
