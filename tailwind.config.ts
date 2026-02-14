import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ["Playfair Display", "Georgia", "serif"],
                sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
            },
            colors: {
                carnaval: {
                    orange: "#F5A623",
                    yellow: "#F8E71C",
                    green: "#417505",
                    pink: "#FF69B4",
                },
            },
        },
    },
    plugins: [],
};

export default config;