import { http, HttpResponse, JsonBodyType } from 'msw';
import { setupServer } from 'msw/node';

export const mockServer = setupServer();

export type MockHttpOptions = {
  body?: unknown;
  type?: 'json' | 'xml';
  httpMethod?: 'get' | 'post';
  status?: number;
};

export const mockEndpoint = (
  endpoint: string,
  { body = '', type = 'json', httpMethod = `get`, status = 200 }: MockHttpOptions
): void => {
  mockServer.use(
    http[httpMethod](endpoint, (): Response => {
      if (type === 'xml') {
        return HttpResponse.xml(body as string, { status });
      }
      return HttpResponse.json(body as JsonBodyType, { status });
    })
  );
};
