import { test, expect } from '@playwright/test';
import { testData } from '../../testData';

test.beforeEach(async ({ page }) => {
    await page.goto(testData.urls.ui as string, { waitUntil: 'networkidle' });
});

test('successful contact form flow', async ({ page }) => {
    const contact = page.locator('#contact');
    await contact.getByTestId('ContactName').fill(testData.contactForm.valid.name);
    await contact.getByTestId('ContactEmail').fill(testData.contactForm.valid.email);
    await contact.getByTestId('ContactPhone').fill(testData.contactForm.valid.phone);
    await contact.getByTestId('ContactSubject').fill(testData.contactForm.valid.subject);
    await contact.getByTestId('ContactDescription').fill(testData.contactForm.valid.description);
    await contact.getByRole('button', { name: 'Submit' }).click();
    await expect(contact.getByText(`Thanks for getting in touch ${testData.contactForm.valid.name}!`)).toBeVisible();
    await expect(contact.getByText(`We'll get back to you about`)).toBeVisible();
    await expect(contact.getByText(testData.contactForm.valid.subject)).toBeVisible();
    await expect(contact.getByText('as soon as possible.')).toBeVisible();

});

test('contact form with empty fields', async ({ page }) => {
    const contact = page.locator('#contact');
    await contact.getByRole('button', { name: 'Submit' }).click();
    await expect(contact.getByText('Name may not be blank')).toBeVisible();
    await expect(contact.getByText('Subject may not be blank')).toBeVisible();
    await expect(contact.getByText('Message may not be blank')).toBeVisible();
    await expect(contact.getByText('Email may not be blank')).toBeVisible();
    await expect(contact.getByText('Phone may not be blank')).toBeVisible();
    await expect(contact.getByText('Message must be between 20 and 2000 characters.')).toBeVisible();
});

test('contact form with too short phone', async ({ page }) => {
    const contact = page.locator('#contact');
    await contact.getByTestId('ContactName').fill(testData.contactForm.valid.name);
    await contact.getByTestId('ContactEmail').fill(testData.contactForm.valid.email);
    await contact.getByTestId('ContactPhone').fill(testData.contactForm.invalid.phone);
    await contact.getByTestId('ContactSubject').fill(testData.contactForm.valid.subject);
    await contact.getByTestId('ContactDescription').fill(testData.contactForm.valid.description);
    await contact.getByRole('button', { name: 'Submit' }).click();
    await expect(contact.getByText('Phone must be between 11 and 21 characters.')).toBeVisible();
});

test('contact form with too short subject', async ({ page }) => {
    const contact = page.locator('#contact');
    await contact.getByTestId('ContactName').fill(testData.contactForm.valid.name);
    await contact.getByTestId('ContactEmail').fill(testData.contactForm.valid.email);
    await contact.getByTestId('ContactPhone').fill(testData.contactForm.valid.phone);
    await contact.getByTestId('ContactSubject').fill(testData.contactForm.invalid.subject);
    await contact.getByTestId('ContactDescription').fill(testData.contactForm.valid.description);
    await contact.getByRole('button', { name: 'Submit' }).click();
    await expect(contact.getByText('Subject must be between 5 and 100 characters.')).toBeVisible();
});

test('contact form with too short message', async ({ page }) => {
    const contact = page.locator('#contact');
    await contact.getByTestId('ContactName').fill(testData.contactForm.valid.name);
    await contact.getByTestId('ContactEmail').fill(testData.contactForm.valid.email);
    await contact.getByTestId('ContactPhone').fill(testData.contactForm.valid.phone);
    await contact.getByTestId('ContactSubject').fill(testData.contactForm.valid.subject);
    await contact.getByTestId('ContactDescription').fill(testData.contactForm.invalid.description);
    await contact.getByRole('button', { name: 'Submit' }).click();
    await expect(contact.getByText('Message must be between 20 and 2000 characters.')).toBeVisible();
});

