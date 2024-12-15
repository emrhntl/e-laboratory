import { UnitEnum } from "@/enums/unit.enum";
import { BaseEntity } from "./base.entity";

class Audit extends BaseEntity {
    auditName: string;
    unit: UnitEnum;

    constructor(
        id:string,
        auditName: string,
        unit: UnitEnum,
    ) {
        super(id);
        this.auditName = auditName;
        this.unit = unit;
    }
}
export default Audit;