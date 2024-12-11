import {BaseEntity} from "./base.entity";

class Audit extends BaseEntity {
    startAge: number;
    endAge: number;
    startValue: number;
    endValue: number;

    constructor(
        startAge: number,
        endAge: number,
        startValue: number,
        endValue: number
    ) {
        super();
        this.startAge = startAge;
        this.endAge = endAge;
        this.startValue = startValue;
        this.endValue = endValue;
    }
}

export default Audit;
