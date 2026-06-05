import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import Config from 'react-native-config';
import { SecurityStorageService } from './SecurityStorageService';

const API_BASE_URL = Config.API_BASE_URL || 'https://api.rapiclave.com';

const TOKEN_STORAGE_KEY_ACCESS = 'auth.access-token';
const TOKEN_STORAGE_KEY_REFRESH = 'auth.refresh-token';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

function base64URLEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const len = bytes.length;
  let result = '';
  for (let i = 0; i < len; i += 3) {
    const b1 = bytes[i];
    const b2 = i + 1 < len ? bytes[i + 1] : 0;
    const b3 = i + 2 < len ? bytes[i + 2] : 0;
    result += CHARS[b1 >> 2];
    result += CHARS[((b1 & 3) << 4) | (b2 >> 4)];
    if (i + 1 < len) {
      result += CHARS[((b2 & 15) << 2) | (b3 >> 6)];
      if (i + 2 < len) {
        result += CHARS[b3 & 63];
      }
    }
  }
  return result;
}

function generateCodeVerifier(): string {
  const crypto = require('crypto');
  const randomBytes = crypto.randomBytes(32);
  return base64URLEncode(randomBytes.buffer);
}

async function generateCodeChallenge(verifier: string): Promise<string> {
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256').update(verifier).digest();
  return base64URLEncode(hash.buffer);
}

function isHttps(url: string): boolean {
  return url.startsWith('https://');
}

const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

client.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (!isHttps(config.baseURL || '')) {
      return Promise.reject(
        new Error('[ApiClient] REJECTED: Cleartext HTTP is not allowed'),
      );
    }

    const token = await SecurityStorageService.getSensitiveToken(
      TOKEN_STORAGE_KEY_ACCESS,
    );
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

client.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await SecurityStorageService.getSensitiveToken(
          TOKEN_STORAGE_KEY_REFRESH,
        );
        if (!refreshToken) {
          return Promise.reject(error);
        }

        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          { refreshToken },
        );

        const newAccessToken = refreshResponse.data.accessToken;
        const newRefreshToken = refreshResponse.data.refreshToken;

        await SecurityStorageService.storeSensitiveToken(
          TOKEN_STORAGE_KEY_ACCESS,
          newAccessToken,
        );
        await SecurityStorageService.storeSensitiveToken(
          TOKEN_STORAGE_KEY_REFRESH,
          newRefreshToken,
        );

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return client(originalRequest);
      } catch {
        await SecurityStorageService.resetSensitiveToken(TOKEN_STORAGE_KEY_ACCESS);
        await SecurityStorageService.resetSensitiveToken(TOKEN_STORAGE_KEY_REFRESH);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export const ApiClient = {
  client,

  async authenticateWithPKCE(
    authEndpoint: string,
    clientId: string,
    scope: string,
  ): Promise<string> {
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const authUrl = `${authEndpoint}?response_type=code&client_id=${clientId}&scope=${scope}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
    return authUrl;
  },

  async storeTokens(accessToken: string, refreshToken: string): Promise<void> {
    await SecurityStorageService.storeSensitiveToken(
      TOKEN_STORAGE_KEY_ACCESS,
      accessToken,
    );
    await SecurityStorageService.storeSensitiveToken(
      TOKEN_STORAGE_KEY_REFRESH,
      refreshToken,
    );
  },

  async clearTokens(): Promise<void> {
    await SecurityStorageService.resetSensitiveToken(TOKEN_STORAGE_KEY_ACCESS);
    await SecurityStorageService.resetSensitiveToken(TOKEN_STORAGE_KEY_REFRESH);
  },
};
