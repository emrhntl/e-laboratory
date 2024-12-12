export default class Logger {
    private static isProduction: boolean = process.env.NODE_ENV === 'production';

    static info(message: string, ...optionalParams: any[]): void {
        if (!Logger.isProduction) {
            console.info(`ℹ️ [INFO]: ${message}`, ...optionalParams);
        }
    }

    static warn(message: string, ...optionalParams: any[]): void {
        if (!Logger.isProduction) {
            console.warn(`⚠️ [WARN]: ${message}`, ...optionalParams);
        }
    }

    static error(message: string, ...optionalParams: any[]): void {
        console.error(`❌ [ERROR]: ${message}`, ...optionalParams);
    }

    static debug(message: string, ...optionalParams: any[]): void {
        if (!Logger.isProduction) {
            console.debug(`🐛 [DEBUG]: ${message}`, ...optionalParams);
        }
    }
}
