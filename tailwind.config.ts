import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern dark theme colors
        theme: {
          dark: "#0A0F1E",        // Deep blue-black
          darker: "#050914",      // Darker shade
          main: "#3B4EF8",        // Vibrant blue
          accent: "#9333EA",      // Rich purple
          muted: "#4B5563",       // Muted text
          surface: "#111827",     // Card background
          border: "#1F2937",      // Border color
          text: {
            primary: "#F9FAFB",   // Primary text
            secondary: "#9CA3AF", // Secondary text
          }
        }
      },
      fontFamily: {
        'heading': ['var(--font-orbitron)', 'sans-serif'],
        'mono': ['var(--font-geist-mono)', 'monospace'],
        'sans': ['var(--font-geist-sans)', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'subtle-grid': 'linear-gradient(to right, #1F2937 1px, transparent 1px), linear-gradient(to bottom, #1F2937 1px, transparent 1px)',
      }
    },
  },
  plugins: [],
};

export default config;