class AuditValues {
    minAgeValue:string // db den ay olarak gelir
    maxAgeValue: string; // db den ay olarak gelir

    standartDeviation: number; // geometric
    avarage: number; // geometric

    minValue:number; // min max
    maxValue:number; // min max

    ciMinValue:number; // confidence intervals
    ciMaxValue:number; // confidence intervals


    constructor(
        minAgeValue: string,
        maxAgeValue: string,
        standartDeviation: number,
        avarage: number,
        minValue: number,
        maxValue:number,
        ciMinValue:number,
        ciMaxValue:number,
    ) {
        this.minAgeValue = minAgeValue;
        this.maxAgeValue = maxAgeValue;
        this.standartDeviation = standartDeviation;
        this.avarage = avarage;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.ciMinValue = ciMinValue;
        this.ciMaxValue = ciMaxValue;
    }
}

export default AuditValues;
