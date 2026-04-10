import { Page } from '@playwright/test';

export class ReservationPage {
    constructor(private page: Page) { }


    roomDescription() {
        return this.page.locator('.mb-4')
            .filter({ has: this.page.getByRole('heading', { name: 'Room Description' }) })
    }


    roomFeatures() {
        return this.page.locator('.mb-4')
            .filter({ has: this.page.getByRole('heading', { name: 'Room Features' }) });
    }


    roomPolicies() {
        return this.page.locator('.mb-4')
            .filter({ has: this.page.getByRole('heading', { name: 'Room Policies' }) })
    }

    bookThisRoom() {
        return this.page.locator('.card-body')
            .filter({ has: this.page.getByRole('heading', { name: 'Book This Room' }) })
    }

    bookingConfirmed() {
        return this.page.locator('.card-body')
            .filter({ has: this.page.getByRole('heading', { name: 'Booking Confirmed' }) })
    }

    reservationValidationAlert() {
        return this.page.locator('.card-body')
            .filter({ has: this.page.getByRole('alert') })
    }

    async fillReservationForm(
        firstname?: string,
        lastname?: string,
        email?: string,
        phone?: string
    ) {
        if (firstname !== undefined) await this.bookThisRoom().getByLabel('Firstname').fill(firstname);
        if (lastname !== undefined) await this.bookThisRoom().getByLabel('Lastname').fill(lastname);
        if (email !== undefined) await this.bookThisRoom().getByLabel('Email').fill(email);
        if (phone !== undefined) await this.bookThisRoom().getByLabel('Phone').fill(phone);
    }

    async openReservationForm() {
        await this.bookThisRoom().getByRole('button', { name: 'Reserve Now' }).click();
    }

    async submitReservationForm() {
        await this.bookThisRoom().getByRole('button', { name: 'Reserve Now' }).click();
    }

    async cancelReservationForm() {
        await this.bookThisRoom().getByRole('button', { name: 'Cancel' }).click();
    }

}