/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            keyframes: {
                slide: {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-100%)' },
                },
            },
            animation: {
                slide: 'slide 35s linear infinite',
            },
            gradientColorStops: {
                whiteFade: 'rgba(255, 255, 255, 0)',
            },
        },
    },
    plugins: [],
}