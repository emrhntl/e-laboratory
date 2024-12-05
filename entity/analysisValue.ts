import { AuditStatusEnum } from "@/enums/auditStatus.enum";

export default class AnalysisValue {
    constructor(
        auditName:string,
        auditValue:string,
        auditStatus:AuditStatusEnum, // tetkik e göre değişiklik durumu
        userAuditStatus:AuditStatusEnum // kullanıcının bir önceki tahliline göre değişiklik durumu
    ) { }
}