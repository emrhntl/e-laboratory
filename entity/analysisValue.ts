
export default class AnalysisValue {
    auditName: string;
    auditUnit:string;
    auditValue: string;
    constructor(
        auditName: string,
        auditValue: string,
        auditUnit:string,
    ) {
        this.auditName = auditName;
        this.auditValue = auditValue;
        this.auditUnit=auditUnit
    }
}
