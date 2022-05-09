export default class SvgToothBuilder {

    constructor() {
        this.teeth = [];
        this.createSvgCoordinates();
    }

    createSvgCoordinates() {
        // Left teeth...
        for (let i = 0; i < 8; i++)
            this.teeth.push(new Tooth(18 - i, i * 25, 0));
        for (let i = 0; i < 5; i++)
            this.teeth.push(new Tooth(55 - i, (i + 3) * 25, 1 * 40));
        for (let i = 0; i < 5; i++)
            this.teeth.push(new Tooth(85 - i, (i + 3) * 25, 2 * 40));
        for (let i = 0; i < 8; i++)
            this.teeth.push(new Tooth(48 - i, i * 25, 3 * 40));
        // Right teeth
        for (let i = 0; i < 8; i++)
            this.teeth.push(new Tooth(21 + i, i * 25 + 210, 0));
        for (let i = 0; i < 5; i++)
            this.teeth.push(new Tooth(61 + i, i * 25 + 210, 1 * 40));
        for (let i = 0; i < 5; i++)
            this.teeth.push(new Tooth(71 + i, i * 25 + 210, 2 * 40));
        for (let i = 0; i < 8; i++)
            this.teeth.push(new Tooth(31 + i, i * 25 + 210, 3 * 40));
    
    }

    calculatePolygon(position) {
        switch (position) {
            case polygon.top:
                return ["0,0", "20,0", "15,5", "5,5"];
            case polygon.bottom:
                return ["5,15", "15,15", "20,20", "0,20"];
            case polygon.right:
                return ["15,5", "20,0", "20,20", "15,15"];
            case polygon.left:
                return ["0,0", "5,5", "5,15", "0,20"];
            case polygon.center:
                return ["5,5", "15,5", "15,15", "5,15"];
            default:
                break;
        }
    }
}

export class Tooth {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }
}

export const polygon = {
    top: Symbol("Top"),
    bottom: Symbol("Bottom"),
    right: Symbol("Right"),
    left: Symbol("left"),
    center: Symbol("center")
}