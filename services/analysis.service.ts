import FirestoreManager from "@/constants/firestoreManager";
import Analysis from "@/entity/analysis";
import { Collections } from "@/enums/collections.enum";

export default class AnalysisService extends FirestoreManager<Analysis> {

    private static instance: AnalysisService;

    constructor() {
        super(Collections.AnalysisList);
    }

    public static getInstance(): AnalysisService {
        if (!AnalysisService.instance) {
            AnalysisService.instance = new AnalysisService();
        }
        return AnalysisService.instance;
    }
}