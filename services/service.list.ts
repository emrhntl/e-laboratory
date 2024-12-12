import UserService from '@/services/user.service';
import AnalysisService from '@/services/analysis.service';
import ServiceContainer from './service.container';
import GuideService from './guide.service';
import AuditService from './audit.service';

export const userService = ServiceContainer.getService<UserService>("userService", () => new UserService());
export const analysisService = ServiceContainer.getService<AnalysisService>("analysisService", () => new AnalysisService());
export const guideService = ServiceContainer.getService<GuideService>("guideService", () => new GuideService());
export const auditService = ServiceContainer.getService<AuditService>("auditService", () => new AuditService());
