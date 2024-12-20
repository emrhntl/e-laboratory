import AnalysisValue from "./analysisValue";
import { BaseEntity } from "./base.entity";

export default class Analysis extends BaseEntity{
    userId: string;
    values: AnalysisValue[];
    createDate:string;

    constructor(
        analysisId: string,
        userId: string,
        values: AnalysisValue[],
        createDate:string
    ) {
        super(analysisId);
        this.userId = userId;
        this.values = values;
        this.createDate = createDate;
    }
}