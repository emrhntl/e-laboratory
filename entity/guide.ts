import AuditEntity from "./audit.entity";
import { BaseEntity } from "./base.entity";

export default class Guide extends BaseEntity {
    name: string;
    description: string;
    auditList: AuditEntity[];

    constructor(
        id: string,
        name: string,
        description:string,
        auditList:AuditEntity[],
    ) {
        super(id);
        this.name = name;
        this.description = description;
        this.auditList = auditList;
    }
}
