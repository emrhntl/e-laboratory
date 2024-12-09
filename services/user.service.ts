import FirestoreManager from "@/constants/firestoreManager";
import User from "@/entity/user";
import { Collections } from "@/enums/collections.enum";

export default class UserService extends FirestoreManager<User> {

    private static instance: UserService;
    
    constructor() {
        super(Collections.Users);
    }
    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
}