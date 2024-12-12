import axiosInstance from './AxiosInstance';
import { setSecureItem, getSecureItem, removeSecureItem } from '../constants/SecureStorage';
import Logger from '../constants/Logger';

class TokenManager {
    private static readonly ACCESS_TOKEN_KEY = 'access_token';
    private static readonly REFRESH_TOKEN_KEY = 'refresh_token';
    private static readonly ACCESS_TOKEN_REFRESH_INTERVAL = 14 * 60 * 1000;
    private static refreshTimer: NodeJS.Timeout | null = null;

    static async setTokens(accessToken: string, refreshToken: string): Promise<void> {
        try {
            await setSecureItem(this.ACCESS_TOKEN_KEY, accessToken);
            await setSecureItem(this.REFRESH_TOKEN_KEY, refreshToken);
            this.scheduleAccessTokenRefresh();
        } catch (error) {
            Logger.error('Failed to set tokens', error);
            throw error;
        }
    }

    static async getAccessToken(): Promise<string | null> {
        return await getSecureItem(this.ACCESS_TOKEN_KEY);
    }

    static async getRefreshToken(): Promise<string | null> {
        return await getSecureItem(this.REFRESH_TOKEN_KEY);
    }

    static async removeTokens(): Promise<void> {
        try {
            await removeSecureItem(this.ACCESS_TOKEN_KEY);
            await removeSecureItem(this.REFRESH_TOKEN_KEY);
            this.clearAccessTokenRefresh();
        } catch (error) {
            Logger.error('Failed to remove tokens', error);
            throw error;
        }
    }

    private static scheduleAccessTokenRefresh(): void {
        if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
        }

        this.refreshTimer = setTimeout(async () => {
            try {
                const refreshToken = await this.getRefreshToken();
                if (refreshToken) {
                    await this.refreshAccessToken(refreshToken);
                } else {
                    Logger.error('No refresh token available');
                    this.handleRefreshFailure();
                }
            } catch (error) {
                Logger.error('Failed to refresh access token', error);
                this.handleRefreshFailure();
            }
        }, this.ACCESS_TOKEN_REFRESH_INTERVAL);
    }

    private static clearAccessTokenRefresh(): void {
        if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
            this.refreshTimer = null;
        }
    }

    static async refreshAccessToken(refreshToken: string): Promise<void> {
        try {
            //simüle edilecek
            const response = await axiosInstance.post('/auth/refresh', { refreshToken });

            if (response.status === 200) {
                const { accessToken } = response.data;

                if (accessToken) {
                    await setSecureItem(this.ACCESS_TOKEN_KEY, accessToken);
                    Logger.info('Access token refreshed successfully');
                    this.scheduleAccessTokenRefresh();
                } else {
                    Logger.error('No new access token received');
                    this.handleRefreshFailure();
                }
            } else {
                Logger.error('Failed to refresh access token', response.statusText);
                this.handleRefreshFailure();
            }
        } catch (error) {
            Logger.error('Error during access token refresh', error);
            this.handleRefreshFailure();
        }
    }

    private static handleRefreshFailure(): void {
        this.removeTokens();
        Logger.warn('Access and refresh tokens removed due to refresh failure');
    }
}

export default TokenManager;
