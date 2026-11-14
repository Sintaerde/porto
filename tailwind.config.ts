import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#fff6f8',
        bg2: '#fbeef3',
        ink: { DEFAULT: '#3b2342', soft: '#6f5874', body: '#4d3653' },
        rose: { DEFAULT: '#e9719a', d: '#cf4f7c' },
        lav: '#b7a1ff',
        peach: '#ffc4ad',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: { card: '28px', xl2: '32px', xl3: '44px' },
      boxShadow: {
        soft: '0 30px 60px -30px rgba(120,50,100,.35), 0 8px 20px -10px rgba(120,50,100,.15)',
        lift: '0 10px 30px -20px rgba(120,50,100,.3)',
      },
      transitionTimingFunction: { soft: 'cubic-bezier(.2,.7,.2,1)' },
      keyframes: {
        pulseDot: { '50%': { boxShadow: '0 0 0 7px rgba(47,191,127,0)' } },
        bob: { '50%': { transform: 'translateY(-14px)' } },
        wheel: { to: { transform: 'translate(-50%,10px)', opacity: '0' } },
        marquee: { to: { transform: 'translateX(-50%)' } },
        spin: { to: { transform: 'rotate(360deg)' } },
        ring: { '50%': { boxShadow: '0 0 0 20px rgba(255,255,255,.06)' } },
        drift: { to: { transform: 'translate(6vw,4vh) scale(1.1)' } },
      },
      animation: {
        pulseDot: 'pulseDot 1.8s infinite',
        bob: 'bob 6s ease-in-out infinite',
        wheel: 'wheel 1.6s infinite',
        marquee: 'marquee 34s linear infinite',
        ring: 'ring 2.4s infinite',
        drift: 'drift 22s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
} satisfies Config
