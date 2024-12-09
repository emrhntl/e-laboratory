import UserService from '@/services/user.service';
import AnalysisService from '@/services/analysis.service';
import ServiceContainer from './service.container';

export const userService = ServiceContainer.getService("userService", () => new UserService());
export const analysisService = ServiceContainer.getService("analysisService", () => new AnalysisService());
