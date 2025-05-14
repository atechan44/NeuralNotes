/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Karanlık tema için class stratejisi kullanılıyor
    theme: {
        extend: {
            colors: {
                // CSS değişkenlerinden renkleri kullanma
                primary: {
                    50: 'rgb(var(--primary-50) / <alpha-value>)',
                    100: 'rgb(var(--primary-100) / <alpha-value>)',
                    200: 'rgb(var(--primary-200) / <alpha-value>)',
                    300: 'rgb(var(--primary-300) / <alpha-value>)',
                    400: 'rgb(var(--primary-400) / <alpha-value>)',
                    500: 'rgb(var(--primary-500) / <alpha-value>)',
                    600: 'rgb(var(--primary-600) / <alpha-value>)',
                    700: 'rgb(var(--primary-700) / <alpha-value>)',
                    800: 'rgb(var(--primary-800) / <alpha-value>)',
                    900: 'rgb(var(--primary-900) / <alpha-value>)',
                    950: 'rgb(var(--primary-950) / <alpha-value>)',
                },
                // Temaya göre değişen nötr renkler
                neutral: {
                    50: 'rgb(var(--neutral-50) / <alpha-value>)',
                    100: 'rgb(var(--neutral-100) / <alpha-value>)',
                    200: 'rgb(var(--neutral-200) / <alpha-value>)',
                    300: 'rgb(var(--neutral-300) / <alpha-value>)',
                    400: 'rgb(var(--neutral-400) / <alpha-value>)',
                    500: 'rgb(var(--neutral-500) / <alpha-value>)',
                    600: 'rgb(var(--neutral-600) / <alpha-value>)',
                    700: 'rgb(var(--neutral-700) / <alpha-value>)',
                    800: 'rgb(var(--neutral-800) / <alpha-value>)',
                    900: 'rgb(var(--neutral-900) / <alpha-value>)',
                    950: 'rgb(var(--neutral-950) / <alpha-value>)',
                },
            },
            // Animasyon sürelerini özelleştir
            transitionDuration: {
                '2000': '2000ms',
            },
            // Responsive tasarım için grid özellikleri
            gridTemplateColumns: {
                'notes-sm': 'repeat(1, minmax(0, 1fr))',
                'notes-md': 'repeat(2, minmax(0, 1fr))',
                'notes-lg': 'repeat(3, minmax(0, 1fr))',
                'notes-xl': 'repeat(4, minmax(0, 1fr))',
            },
            // Ana layout için grid özellikleri
            gridTemplateRows: {
                'layout': 'auto 1fr auto',
            },
        },
    },
    // Eklentiler
    plugins: [],
}