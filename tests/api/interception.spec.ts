import { test, expect } from '@playwright/test';
import { testData } from '../../testData';

test.fail('shows info message when when API returns no rooms', async ({ page }) => {
    let rooms = Array();
    await page.route(testData.urls.ui + '/api/room', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ rooms: rooms })
        });
    });
    await page.goto(testData.urls.ui as string, { waitUntil: 'networkidle' });
    await expect(page.locator('.room-card')).toHaveCount(0);
    // No info message pops-up at the moment
    await expect(page.getByText("Sorry, there're no available rooms at the moment")).toBeVisible();
});

test.fail('shows info message when when API returns error', async ({ page }) => {
    await page.route(testData.urls.ui + '/api/room', async route => {
        const response = await route.fetch();
        const body = await response.json();
        await route.fulfill({ status: 500, body: JSON.stringify(body) });
    });
    await page.goto(testData.urls.ui as string, { waitUntil: 'networkidle' });
    // No error handler. Page just doesn't load on failed API request
    await expect(page.locator('.room-card')).toHaveCount(0);
});


test('shows 2 rooms when API returns 2 rooms', async ({ page }) => {
    let rooms = Array();
    for (let i = 0; i < 2; i++) {
        rooms[i] = {
            "roomid": i,
            "roomName": `room${i}`,
            "type": "Single",
            "accessible": (i % 2 == 0), "image": `/images/room${i}.jpg`,
            "description": `Aenean porttitor mauris sit amet lacinia molestie. ${i} In posuere accumsan aliquet. Maecenas sit amet nisl massa. Interdum et malesuada fames ac ante.`,
            "features": [
                `${i}`,
                `${i + 1}`,
                `${i + 2}`
            ],
            "roomPrice": i * 100
        }
    }
    await page.route(testData.urls.ui + '/api/room', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ rooms: rooms })
        });
    });
    await page.goto(testData.urls.ui as string, { waitUntil: 'networkidle' });
    await expect(page.locator('.room-card')).toHaveCount(2);
});