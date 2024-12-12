import FirestoreManager from "@/constants/firestoreManager";
import Audit from "@/entity/audit";
import { Collections } from "@/enums/collections.enum";

export default class AuditService extends FirestoreManager<Audit> {

    private static instance: AuditService;

    constructor() {
        super(Collections.AuditList);
    }

    public static getInstance(): AuditService {
        if (!AuditService.instance) {
            AuditService.instance = new AuditService();
        }
        return AuditService.instance;
    }
}