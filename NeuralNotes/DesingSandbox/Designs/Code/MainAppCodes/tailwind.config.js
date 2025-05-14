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
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
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
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-in': 'slideIn 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideIn: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    // Eklentiler
    plugins: [],
}