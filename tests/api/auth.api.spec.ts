import { test, expect } from '@playwright/test';
import { testData } from '../../testData';

test('should return auth token', async ({ request }) => {
    const response = await request.post(testData.urls.api + '/auth', {
        data: { username: testData.users.api.username, password: testData.users.api.password }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.token).toBeDefined();
});

test('should return error on bad credentials', async ({ request }) => {
    const response = await request.post(testData.urls.api + '/auth', {
        data: { username: testData.users.api_invalid.username, password: testData.users.api_invalid.password }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.reason).toBe('Bad credentials');
});