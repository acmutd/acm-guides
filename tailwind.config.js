import typography from '@tailwindcss/typography';
import tailwindAnimate from 'tailwindcss-animate';
import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,md,mdx}'],
  safelist: [
    'bg-acm-gradient',
    'bg-media-gradient',
    'bg-research-gradient',
    'bg-education-gradient',
    'bg-projects-gradient',
    'bg-development-gradient',
    'bg-community-gradient',
    'bg-hackutd-gradient',
    'bg-industry-gradient',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Gilroy', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.10), 0 20px 80px rgba(0,0,0,0.65)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        primaryDark: '#CACACA',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      backgroundImage: {
        'acm-gradient':
          'linear-gradient(94deg, #E10087 10.67%, #4004C0 93.37%)',
        'media-gradient':
          'linear-gradient(98deg, #E10087 7.24%, #FFD600 95.11%)',
        'research-gradient':
          'linear-gradient(98deg, #EA5400 18.05%, #FFC700 94.8%)',
        'education-gradient':
          'linear-gradient(98deg, #56E100 7.24%, #00EAC0 95.11%)',
        'projects-gradient':
          'linear-gradient(98deg, #008CF1 7.24%, #00ECEC 95.11%)',
        'development-gradient':
          'linear-gradient(97deg, #9900E1 7.31%, #5200FF 59.32%)',
        'community-gradient':
          'linear-gradient(98deg, #FFB800 18.05%, #ADFF00 94.8%)',
        'hackutd-gradient':
          'linear-gradient(98deg, #FE002E 7.24%, #AD00FF 95.11%)',
        'industry-gradient':
          'linear-gradient(98deg, #6F6F6F 7.24%, #FFFFFF 95.11%)',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.zinc.300'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.pink.400'),
            '--tw-prose-code': theme('colors.orange.300'),
            '--tw-prose-pre-bg': 'rgba(255, 255, 255, 0.05)',
            '--tw-prose-pre-code': theme('colors.zinc.200'),
            h1: { fontFamily: 'Gilroy, sans-serif', fontWeight: '700' },
            h2: {
              fontFamily: 'Gilroy, sans-serif',
              fontWeight: '600',
              marginTop: '2em',
            },
            code: {
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
          },
        },
      }),
    },
  },
  plugins: [tailwindAnimate, typography, scrollbarHide],
};
