import {UnitEnum} from "@/enums/unit.enum";
import Audit from "./audit";
import {BaseEntity} from "./base.entity";

class AuditEntity extends BaseEntity {
    id: string;
    auditName: string;
    valueRanges: Audit[];
    unit: UnitEnum;

    constructor(
        id: string,
        auditName: string,
        valueRanges: Audit[],
        unit: UnitEnum
    ) {
        super();
        this.id = id;
        this.auditName = auditName;
        this.valueRanges = valueRanges;
        this.unit = unit;
    }
}
export default AuditEntity;