/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
        theme: {
            extend: {
                fontFamily: {
                    serif: ['"Playfair Display"', 'serif'],
                    sans: [
                    '"Poppins"',
                    '"HelveticaNeueLTStd-Roman"',
                    'Helvetica',
                    'Arial',
                    'sans-serif',
                    ],
                },
            },
            plugins: [],
        },
    };
