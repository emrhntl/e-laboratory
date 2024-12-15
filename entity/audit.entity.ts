import { UnitEnum } from "@/enums/unit.enum";
import AuditValues from "./audit.values";

class AuditEntity {
    auditName: string;
    unit: UnitEnum;
    valueRanges: AuditValues[];

    constructor(
        auditName: string,
        unit: UnitEnum,
        valueRanges: AuditValues[],
    ) {
        this.auditName = auditName;
        this.unit = unit;
        this.valueRanges = valueRanges
    }
}
export default AuditEntity;