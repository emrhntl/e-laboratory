import AnalysisValue from "./analysisValue";
import { BaseEntity } from "./base.entity";

export default class Analysis extends BaseEntity{
    analysisId: string;
    userId: string;
    guideId: string;
    values: AnalysisValue;

    constructor(
        analysisId: string,
        userId: string,
        guideId: string,
        values: AnalysisValue
    ) {
        super();
        this.analysisId = analysisId;
        this.userId = userId;
        this.guideId = guideId;
        this.values = values;
    }
}