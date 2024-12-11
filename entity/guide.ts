import {BaseEntity} from "./base.entity";

export default class Guide extends BaseEntity {
    id: string;
    name: string;
    auditIdList: string[];

    constructor(
        id: string,
        name: string,
        auditIdList: string[]
    ) {
        super();
        this.id = id;
        this.name = name;
        this.auditIdList = auditIdList;
    }
}
