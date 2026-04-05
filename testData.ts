import 'dotenv/config';
interface TestData {
    urls: Urls;
    users: Users;
    booking: Booking;
    contactForm: ContactForm;
}

interface Urls {
    ui?: string;
    api?: string;
}

interface Users {
    admin: Credentials;
    api: Credentials;
    api_invalid: Credentials;
}

interface Credentials {
    username?: string;
    password?: string;
}

interface Booking {
    valid: BookingData;
    invalid: BookingInvalid;
    updated: BookingData;
    partially_updated_names: Partial<BookingData>;
}

interface BookingData {
    firstname: string;
    lastname: string;
    depositpaid?: boolean;
    totalprice: number;
    bookingdates: BookingDates;
}

interface BookingInvalid {
    missing_data: Partial<BookingData>;
    wrong_date: BookingData;
    missmatched_date: BookingData;
    negative_price: BookingData;
    empty_name: BookingData;
}
interface BookingDates {
    checkin: string;
    checkout: string;
}

interface ContactForm {
    valid: ContactData;
    invalid: ContactData;
}

interface ContactData {
    name: string;
    email: string;
    phone: string;
    subject: string;
    description: string;
}


export const testData: TestData = {
    urls: {
        ui: process.env.UI_BASE_URL,
        api: process.env.API_BASE_URL,
    },
    users: {
        admin: {
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD,
        },
        api: {
            username: process.env.API_USERNAME,
            password: process.env.API_PASSWORD,
        },
        api_invalid: {
            username: 'green',
            password: 'house123'
        }
    },
    booking: {
        valid: {
            firstname: 'Michael',
            lastname: 'Brown',
            totalprice: 499,
            depositpaid: true,
            bookingdates: {
                checkin: '2026-08-01',
                checkout: '2026-08-08'
            }
        },
        updated: {
            firstname: 'Michael Updated',
            lastname: 'Brown Updated',
            totalprice: 599,
            depositpaid: false,
            bookingdates: {
                checkin: '2026-09-01',
                checkout: '2026-09-08'
            },
        },
        partially_updated_names: {
            firstname: 'Michael Upd',
            lastname: 'Brown Upd'
        },
        invalid: {
            missing_data: {
                firstname: 'Michael',
                lastname: 'Missing',
                depositpaid: false,
                bookingdates: {
                    checkin: '2026-09-01',
                    checkout: '2026-09-08'
                }
            },
            wrong_date: {
                firstname: 'Michael W',
                lastname: 'Date',
                totalprice: 400,
                depositpaid: false,
                bookingdates: {
                    checkin: '2026-99-01',
                    checkout: '2026-09-00'
                }
            },
            missmatched_date: {
                firstname: 'Michael W',
                lastname: 'Date',
                totalprice: 400,
                depositpaid: false,
                bookingdates: {
                    checkin: '2026-10-05',
                    checkout: '2026-09-01'
                }
            },
            negative_price: {
                firstname: 'Michael W',
                lastname: 'Date',
                totalprice: -333,
                depositpaid: false,
                bookingdates: {
                    checkin: '2026-10-05',
                    checkout: '2026-09-01'
                }
            },
            empty_name: {
                firstname: '',
                lastname: '',
                totalprice: 400,
                depositpaid: false,
                bookingdates: {
                    checkin: '2026-10-05',
                    checkout: '2026-09-01'
                }
            },
        }
    },
    contactForm: {
        valid: {
            name: 'Robert Brown',
            email: 'valid0@mail.com',
            phone: '11248163264',
            subject: 'Subject 1',
            description: 'Lorem ipsum dolor sid'
        },

        invalid: {
            name: '',
            email: 'werwe',
            phone: '112244',
            subject: 'Sue',
            description: 'Lorem'
        }
    }
}