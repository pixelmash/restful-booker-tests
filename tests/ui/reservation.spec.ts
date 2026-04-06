import { test, expect } from '@playwright/test';
import { testData } from '../../testData';
import { ReservationPage } from '../../pages/reservation';

let roomId: number;


test.beforeEach(async ({ page, request }) => {
    const response = await request.get(testData.urls.ui + '/api/room');
    const body = await response.json();
    roomId = body.rooms[Math.floor(Math.random() * body.rooms.length)].roomid;

    await page.goto(testData.urls.ui + `/reservation/${roomId}?checkin=2026-04-06&checkout=2026-04-07`, { waitUntil: 'networkidle' });
});

test('Reservation contains required elements of the room', async ({ page }) => {
    const reservation = new ReservationPage(page);
    // Cheking Room photo
    await expect(page.getByAltText('Room Image')).toBeVisible();
    // Checking room desc
    await expect(reservation.roomDescription().getByRole('heading', { name: 'Room Description' })).toBeVisible();
    await expect(reservation.roomDescription().locator('p')).toBeVisible();

    // Checking room badges
    for (const badge of await reservation.roomFeatures().locator('span').all()) {
        await expect(badge).toBeVisible();
    }
    // Checking room policies
    for (const policy of await reservation.roomPolicies().locator('.card-body').all()) {
        await expect(policy).toBeVisible();
    }
});
