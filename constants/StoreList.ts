import FirestoreManager from './firestoreManager';
import { Collections } from '../enums/collections.enum';

export const userListManager = new FirestoreManager(Collections.Users);
export const analysisListManager = new FirestoreManager(Collections.AnalysisList);
export const auditListManager = new FirestoreManager(Collections.AuditList);
export const guideListManager = new FirestoreManager(Collections.GuideList);