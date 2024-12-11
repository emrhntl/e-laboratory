import { AuditStatusEnum } from "@/enums/auditStatus.enum";
import {BaseEntity} from "./base.entity";

export default class AnalysisValue extends BaseEntity {
    auditName: string;
    auditValue: string;
    auditStatus: AuditStatusEnum; // tetkik e göre değişiklik durumu
    userAuditStatus: AuditStatusEnum; // kullanıcının bir önceki tahliline göre değişiklik durumu

    constructor(
        auditName: string,
        auditValue: string,
        auditStatus: AuditStatusEnum,
        userAuditStatus: AuditStatusEnum
    ) {
        super();
        this.auditName = auditName;
        this.auditValue = auditValue;
        this.auditStatus = auditStatus;
        this.userAuditStatus = userAuditStatus;
    }
}
