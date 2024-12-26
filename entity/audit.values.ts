class AuditValues {
    minAgeValue:string // db den ay olarak gelir
    maxAgeValue: string; // db den ay olarak gelir

    standartDeviation: string; // geometric
    avarage: string; // geometric

    minValue:string; // min max
    maxValue:string; // min max

    ciMinValue:string; // confidence intervals
    ciMaxValue:string; // confidence intervals

    ageType:string; // yıl mı ay mı


    constructor(
        minAgeValue: string,
        maxAgeValue: string,
        standartDeviation: string,
        avarage: string,
        minValue: string,
        maxValue:string,
        ciMinValue:string,
        ciMaxValue:string,
        ageType:string,
    ) {
        this.minAgeValue = minAgeValue;
        this.maxAgeValue = maxAgeValue;
        this.standartDeviation = standartDeviation;
        this.avarage = avarage;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.ciMinValue = ciMinValue;
        this.ciMaxValue = ciMaxValue;
        this.ageType = ageType;
    }
}

export default AuditValues;
