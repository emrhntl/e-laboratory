import AnalysisValue from "./analysisValue";
import { BaseEntity } from "./base.entity";

export default class Analysis extends BaseEntity{
    userId: string;
    guideId: string;
    values: AnalysisValue;

    constructor(
        analysisId: string,
        userId: string,
        guideId: string,
        values: AnalysisValue
    ) {
        super(analysisId);
        this.userId = userId;
        this.guideId = guideId;
        this.values = values;
    }
}