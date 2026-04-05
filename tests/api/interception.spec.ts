import { test, expect } from '@playwright/test';

test('shows 10 rooms when API returns 2 rooms', async ({ page }) => {
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
    await page.route('https://automationintesting.online/api/room', async route => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ rooms: rooms })
        });
    });

    await page.goto('https://automationintesting.online', { waitUntil: 'networkidle' });

    await expect(page.locator('.room-card')).toHaveCount(2);
});
