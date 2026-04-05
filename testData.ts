import 'dotenv/config';
export const testData = {
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
        "name": "Robert Brown",
        "email": "valid0@mail.com",
        "phone": "11248163264",
        "subject": "Subject 1",
        "description": "Lorem ipsum dolor sid"
        },

        invalid: {
        "name": "",
        "email": "werwe",
        "phone": "112244",
        "subject": "Sue",
        "description": "Lorem"
        }
    }
}
