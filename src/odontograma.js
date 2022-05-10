import dataSource from "./odontograma.json";
import { Tooth } from "./svgToothBuilder";

export default class ToothBuilder {
    createList() {
        const sortedTeeth = [];
        const teethGroups = dataSource.rows.sort((a, b) => a.id - b.id);

        for (let i = 0; i < teethGroups.length; i++) {
            const teeth = teethGroups[i];
            for (let j = teeth.lenght - 1; j >= 0; j--) {
                const { toothPostion } = teeth;
                const id = Number(`${teeth.id}${j+1}`);
                const axisX = toothPostion.x.increment 
                    ? toothPostion.x.startAt + toothPostion.x.offset * ((teeth.lenght - 1) - j)
                    : toothPostion.x.startAt;
                const axisY = toothPostion.y.increment 
                    ? toothPostion.y.startAt + toothPostion.y.offset * ((teeth.lenght - 1) - j)
                    : toothPostion.y.startAt;
                sortedTeeth.push(new Tooth(id, axisX, axisY, teeth.order));
            }
        }

        return sortedTeeth.sort((a, b) => a.order - b.order);
    }
}
