import {UnitEnum} from "@/enums/unit.enum";
import Audit from "./audit";

class AuditEntity {
    constructor(
        id:string,
        auditName:string,
        valueRanges:Audit[],
        unit:UnitEnum
    ) {

    }
}
export default AuditEntity;