import fetch from 'node-fetch';
import {
  AnonymousAuthMiddlewareOptions,
  ClientBuilder,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { tokenInstance } from './tokenHandlers';
import { LocalStorageKeys } from '../const/LocalStorage';

const {
  VITE_CTP_CLIENT_ID,
  VITE_CTP_CLIENT_SECRET,
  VITE_CTP_PROJECT_KEY,
  VITE_CTP_AUTH_URL,
  VITE_CTP_API_URL,
  VITE_CTP_SCOPES,
} = import.meta.env;

const projectKey = VITE_CTP_PROJECT_KEY;
const scopes = [VITE_CTP_SCOPES];

// eslint-disable-next-line
export let apirootPassword: ByProjectKeyRequestBuilder | null = null;

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: VITE_CTP_AUTH_URL,
  projectKey,
  credentials: {
    clientId: VITE_CTP_CLIENT_ID,
    clientSecret: VITE_CTP_CLIENT_SECRET,
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: VITE_CTP_API_URL,
  fetch,
};

export function constructClientAnonymousFlow(): ByProjectKeyRequestBuilder {
  const options: AnonymousAuthMiddlewareOptions = {
    host: VITE_CTP_AUTH_URL,
    projectKey: VITE_CTP_PROJECT_KEY,
    credentials: {
      clientId: VITE_CTP_CLIENT_ID,
      clientSecret: VITE_CTP_CLIENT_SECRET,
    },

    scopes,
    fetch,
    tokenCache: tokenInstance,
  };

  const client = new ClientBuilder()
    .withAnonymousSessionFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: VITE_CTP_PROJECT_KEY,
  });

  return apiRoot;
}

export function constructClientPasswordFlow(
  email: string,
  password: string,
): ByProjectKeyRequestBuilder {
  const options: PasswordAuthMiddlewareOptions = {
    host: VITE_CTP_AUTH_URL,
    projectKey: VITE_CTP_PROJECT_KEY,
    credentials: {
      clientId: VITE_CTP_CLIENT_ID,
      clientSecret: VITE_CTP_CLIENT_SECRET,
      user: {
        username: email,
        password,
      },
    },
    scopes,
    tokenCache: tokenInstance,
  };

  const client = new ClientBuilder()
    .withPasswordFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: VITE_CTP_PROJECT_KEY,
  });
  apirootPassword = apiRoot;
  return apiRoot;
}

export function constructClientRefresh(): ByProjectKeyRequestBuilder {
  const options: RefreshAuthMiddlewareOptions = {
    host: VITE_CTP_AUTH_URL,
    projectKey: VITE_CTP_PROJECT_KEY,
    credentials: {
      clientId: VITE_CTP_CLIENT_ID,
      clientSecret: VITE_CTP_CLIENT_SECRET,
    },
    refreshToken: localStorage.getItem(LocalStorageKeys.REFRESH_TOKEN) || '',
    fetch,
  };

  const refreshTokenClient = new ClientBuilder()
    .withRefreshTokenFlow(options)
    .withHttpMiddleware(httpMiddlewareOptions)
    .build();

  const apiRootRefreshToken = createApiBuilderFromCtpClient(
    refreshTokenClient,
  ).withProjectKey({
    projectKey: VITE_CTP_PROJECT_KEY,
  });
  return apiRootRefreshToken;
}

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: VITE_CTP_PROJECT_KEY,
});
