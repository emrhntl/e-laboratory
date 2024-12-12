import FirestoreManager from "@/constants/firestoreManager";
import Analysis from "@/entity/analysis";
import { Collections } from "@/enums/collections.enum";

export default class AuditService extends FirestoreManager<Analysis> {

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