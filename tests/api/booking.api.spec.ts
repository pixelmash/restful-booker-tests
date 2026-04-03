import { test, expect } from '@playwright/test';
import { testData } from '../../testData';

test.describe.configure({ mode: 'serial' });

let createdBookingId: number;
let token: string;

test('should return auth token', async ({ request }) => {
    const response = await request.post(testData.urls.api + '/auth', {
        data: { username: testData.users.api.username, password: testData.users.api.password }
    });
    const body = await response.json();
    token = body.token;
});

test('return all bookings', async ({ request }) => {
    const response = await request.get(testData.urls.api + `/booking`, {});
    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
});

test('check one booking', async ({ request }) => {
    const responseFull = await request.get(testData.urls.api + `/booking`, {});
    const bodyFull = await responseFull.json();
    // For stability - replace with create booking later (or hardcoded id)
    const id = bodyFull[Math.floor(Math.random() * bodyFull.length)].bookingid;
    const responseOne = await request.get(testData.urls.api + `/booking/${id}`, {});
    const bodyOne = await responseOne.json();
    expect(responseOne.status()).toBe(200);
    expect(bodyOne.firstname).toBeDefined();
});

test.describe('Booking CRUD', () => {
    test('create booking', async ({ request }) => {
        const response = await request.post(testData.urls.api + `/booking`, {
            data: testData.booking.valid
        });
        const body = await response.json();
        expect(body.bookingid).toBeDefined();
        createdBookingId = body.bookingid;
    });

    test('get booking', async ({ request }) => {
        const responseOne = await request.get(testData.urls.api + `/booking/${createdBookingId}`, {});
        const bodyOne = await responseOne.json();
        expect(responseOne.status()).toBe(200);
        expect(bodyOne.firstname).toBeDefined();
    });

    test('update booking', async ({ request }) => {
        const response = await request.put(testData.urls.api + `/booking/${createdBookingId}`, {
            headers: { Cookie: `token=${token}` },
            data: testData.booking.updated
        });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.firstname).toBe(testData.booking.updated.firstname);
    });

    test('delete booking', async ({ request }) => {
        const response = await request.delete(testData.urls.api + `/booking/${createdBookingId}`, {
            headers: { Cookie: `token=${token}` },
        });
        expect(response.status()).toBe(201);
    });

    test('verify booking deleted', async ({ request }) => {
        const response = await request.get(testData.urls.api + `/booking/${createdBookingId}`, {});
        expect(response.status()).toBe(404);
    });
});

test.describe('Negative bookings', () => {
    test.fail('create booking with missing required fields', async ({ request }) => {
        const response = await request.post(testData.urls.api + `/booking`, {
            data: testData.booking.invalid.missing_data
        });
        // API returns 500 instead of 400 for missing required fields
        expect(response.status()).toBe(400);
    });

    test.fail('create booking with invalid date', async ({ request }) => {
        const response = await request.post(testData.urls.api + '/booking', {
            data: testData.booking.invalid.wrong_date
        });
        // Should return 400 but returns 200 - API accepts invalid dates
        expect(response.status()).toBe(400);
    });

      test.fail('create booking with mismatched dates', async ({ request }) => {
        const response = await request.post(testData.urls.api + '/booking', {
            data: testData.booking.invalid.missmatched_date
        });
        // Should return 400 but returns 200 - No validation for incorrect date order
        expect(response.status()).toBe(400);
    });

    test.fail('create booking with negative price', async ({ request }) => {
        const response = await request.post(testData.urls.api + '/booking', {
            data: testData.booking.invalid.negative_price
        });
        // Should return 400 but returns 200 - No validation for negative price value
        expect(response.status()).toBe(400);
    });

    test.fail('create booking with empty names', async ({ request }) => {
        const response = await request.post(testData.urls.api + '/booking', {
            data: testData.booking.invalid.empty_name
        });
        // Should return 400 but returns 200 - No validation value length
        expect(response.status()).toBe(400);
    });
});