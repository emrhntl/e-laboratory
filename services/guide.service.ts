import FirestoreManager from "@/constants/firestoreManager";
import Guide from "@/entity/guide";
import { Collections } from "@/enums/collections.enum";

export default class GuideService extends FirestoreManager<Guide> {

    private static instance: GuideService;

    constructor() {
        super(Collections.GuideList);
    }

    public static getInstance(): GuideService {
        if (!GuideService.instance) {
            GuideService.instance = new GuideService();
        }
        return GuideService.instance;
    }
}