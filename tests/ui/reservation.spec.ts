import { test, expect } from '@playwright/test';
import { testData } from '../../testData';
import { ReservationPage } from '../../pages/reservation';

let roomId: number;
const checkin = '2026-04-06';
const checkout = '2026-04-07';


test.beforeEach(async ({ page, request }) => {
    const response = await request.get(testData.urls.ui + '/api/room');
    const body = await response.json();
    roomId = body.rooms[Math.floor(Math.random() * body.rooms.length)].roomid;

    await page.goto(testData.urls.ui + `/reservation/${roomId}?checkin=${checkin}&checkout=${checkout}`, { waitUntil: 'networkidle' });
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


test('Successful reservation path', async ({ page }) => {
    const reservation = new ReservationPage(page);
    await reservation.openReservationForm();
    await reservation.fillReservationForm(
        testData.reservationForm.valid.firstname,
        testData.reservationForm.valid.lastname,
        testData.reservationForm.valid.email,
        testData.reservationForm.valid.phone
    )
    await reservation.submitReservationForm();
    await expect(reservation.bookingConfirmed()).toBeVisible();
    await expect(reservation.bookingConfirmed().getByRole('paragraph').nth(1)).toContainText(checkin + ' - ' + checkout);
});

test.fail('Reservation with empty fields', async ({ page }) => {
    const reservation = new ReservationPage(page);
    await reservation.openReservationForm();
    await reservation.submitReservationForm();

    await expect(reservation.reservationValidationAlert().getByText('Firstname should not be blank')).toBeVisible();
    await expect(reservation.reservationValidationAlert().getByText('Lastname should not be blank')).toBeVisible();
    // Email and Phone validation messages are missing form titles
    await expect(reservation.reservationValidationAlert().getByText('Email must not be empty')).toBeVisible();
    await expect(reservation.reservationValidationAlert().getByText('Phone must not be empty')).toBeVisible();

});

test.fail('Reservation with invalid data', async ({ page }) => {
    const reservation = new ReservationPage(page);
    await reservation.openReservationForm();
    await reservation.fillReservationForm(
        testData.reservationForm.invalid.firstname,
        testData.reservationForm.invalid.lastname,
        testData.reservationForm.invalid.email,
        testData.reservationForm.invalid.phone
    )
    await reservation.submitReservationForm();
        // Validation messages are missing form titles
    await expect(reservation.reservationValidationAlert().getByText('Firstname size must be between 3 and 30')).toBeVisible();
    await expect(reservation.reservationValidationAlert().getByText('Lastname size must be between 11 and 21')).toBeVisible();
    await expect(reservation.reservationValidationAlert().getByText('Email must be a well-formed email address')).toBeVisible();
    await expect(reservation.reservationValidationAlert().getByText('Phone size must be between 3 and 18')).toBeVisible();
});