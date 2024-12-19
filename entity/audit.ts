import { BaseEntity } from "./base.entity";

class Audit extends BaseEntity {
    name: string;
    unit: any;

    constructor(
        id: string,
        name: string,
        unit: any,
    ) {
        super(id);
        this.name = name;
        this.unit = unit;
    }

}

export default Audit;
