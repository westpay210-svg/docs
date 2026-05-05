/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Page background palette
        dark: {
          DEFAULT: '#0a0a0f',
          50: '#18181b',
          100: '#141419',
          200: '#1c1c24',
          300: '#252530',
          400: '#2e2e3a',
          500: '#3d3d4a',
        },

        // Primary brand color - Westrapay Teal
        kiwi: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },

        // Accent - Deep teal
        accent: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#14B8A6',
          500: '#0D9488',
          600: '#0F766E',
          700: '#115E59',
          800: '#134E4A',
          900: '#0D3B38',
        },

        // Highlight - Light teal
        highlight: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },

        // Glass/Surface colors (light mode)
        glass: {
          light: 'rgba(255, 255, 255, 0.7)',
          DEFAULT: 'rgba(255, 255, 255, 1)',
          medium: 'rgba(248, 250, 252, 1)',
          strong: 'rgba(241, 245, 249, 1)',
        },

        // Text colors (light mode)
        white: '#FFFFFF',
        'white-muted': 'rgba(15, 23, 42, 0.6)',
        'white-subtle': 'rgba(15, 23, 42, 0.45)',

        // Legacy support
        lime: '#14B8A6',

        // Sidebar (light mode)
        sidebar: {
          bg: '#ffffff',
          text: 'rgba(15, 23, 42, 0.7)',
          hover: '#14B8A6',
          border: 'rgba(15, 23, 42, 0.08)',
          active: '#14B8A6'
        },

        // Status colors
        success: '#14B8A6',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#14B8A6',
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'mesh-gradient': 'linear-gradient(135deg, rgba(20, 184, 166, 0.06) 0%, transparent 50%, rgba(13, 148, 136, 0.04) 100%)',
        'glow-gradient': 'linear-gradient(135deg, #14B8A6 0%, #0D9488 50%, #0F766E 100%)',
      },

      boxShadow: {
        'glow': '0 0 20px rgba(20, 184, 166, 0.15)',
        'glow-lg': '0 0 40px rgba(20, 184, 166, 0.2)',
        'glow-accent': '0 0 20px rgba(13, 148, 136, 0.12)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.1)',
      },

      animation: {
        'gradient': 'gradient 8s ease infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },

      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
      },

      backdropBlur: {
        xs: '2px',
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#334155',
            a: {
              color: '#0D9488',
              '&:hover': {
                color: '#14B8A6',
              },
            },
            h1: {
              color: '#0F172A',
            },
            h2: {
              color: '#0F172A',
            },
            h3: {
              color: '#1E293B',
            },
            code: {
              color: '#0D9488',
              backgroundColor: 'rgba(20, 184, 166, 0.08)',
              paddingLeft: '4px',
              paddingRight: '4px',
              paddingTop: '2px',
              paddingBottom: '2px',
              borderRadius: '0.375rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
