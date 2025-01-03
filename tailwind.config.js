/** @type {import('tailwindcss').Config} */

const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) };
const px0_300 = {
  ...Array.from(Array(301)).map((_, i) => `${i}px`),
};

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        notification: {
          '0%': { opacity: '0' },
          '20%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        notification: 'notification 3s forwards',
      },
      zIndex: {
        dim: 900,
        alert: 1200,
      },
      screens: {
        xs: '460px',
      },
      borderRadius: {
        md: '0.25rem',
      },
      aspectRatio: {
        '7/10': 0.7,
      },
      boxShadow: {
        default: '0px 2px 10px 0px rgba(25, 25, 30, 0.10)',
      },
      minWidth: { ...px0_300, 1264: '1264px' },
      borderWidth: px0_10,
      spacing: {
        ...px0_300,
        331: '331px',
        374: '374px',
        398: '398px',
        984: '984px',
        1024: '1024px',
      },
      colors: {
        // primary
        primary1: '#ff6d62',
        // secondary
        secondary1: '#276DAE',
        secondary2: '#0F88C8',
        secondary3: '#28AEED',
        secondary4: '#29D1FF',
        secondary5: '#54DAFF',
        secondary6: '#7FE3FF',
        secondary7: '#A9EDFF',
        secondary8: '#D4F6FF',
        secondary9: '#EAFAFF',
        // gray
        gray1: '#000000',
        gray2: '#282A2E',
        gray3: '#3C3E42',
        gray4: '#5A5C60',
        gray5: '#96989C',
        gray6: '#BEC0C4',
        gray7: '#DDDFE2',
        gray8: '#E7E9EC',
        gray9: '#ECEEF1',
        gray10: '#F1F3F6',
        gray11: '#F6F8FB',
        gray12: '#FFFFFF',
        // system-red
        systemRed1: '#D71308',
        systemRed2: '#FF3B30',
        systemRed3: '#FF6D62',
        systemRed4: '#FF9F94',
        systemRed5: '#FFCDC6',
        systemRed6: '#FFF2F0',
        // system-orange
        systemOrange1: '#E17700',
        systemOrange2: '#FF9500',
        systemOrange3: '#FFAA33',
        systemOrange4: '#FFBF66',
        systemOrange5: '#FFDFB3',
        systemOrange6: '#FFF4E5',
        // system-yellow
        systemYellow1: '#E1AE00',
        systemYellow2: '#FFCC00',
        systemYellow3: '#FFD633',
        systemYellow4: '#FFE066',
        systemYellow5: '#FFF0B3',
        systemYellow6: '#FFFAE5',
        // system-green
        systemGreen1: '#16A93B',
        systemGreen2: '#34C759',
        systemGreen3: '#5DD57B',
        systemGreen4: '#86DF9C',
        systemGreen5: '#C2EFCE',
        systemGreen6: '#EBFAEF',
        // system-mint
        systemMint1: '#284A5E',
        systemMint2: '#3B8C92',
        systemMint3: '#78B3C2',
        systemMint4: '#B2DDE8',
        systemMint5: '#CFF0F2',
        systemMint6: '#E1FCFE',
        // system-teal
        systemTeal1: '#3CAADC',
        systemTeal2: '#5AC8FA',
        systemTeal3: '#83D6FB',
        systemTeal4: '#B5E6FD',
        systemTeal5: '#CDEFFE',
        systemTeal6: '#E6F7FE',
        // system-blue
        systemBlue1: '#005CE1',
        systemBlue2: '#007AFF',
        systemBlue3: '#3395FF',
        systemBlue4: '#66AFFF',
        systemBlue5: '#B3D7FF',
        systemBlue6: '#E5F2FF',
        // system-pink
        systemPink1: '#D7052D',
        systemPink2: '#FF2D55',
        systemPink3: '#FF557D',
        systemPink4: '#FF87AF',
        systemPink5: '#FFB9E1',
        systemPink6: '#FFEBFF',
      },
      fontSize: {
        display1: ['56px', { fontWeight: 700, lineHeight: '78px' }],
        display2: ['48px', { fontWeight: 700, lineHeight: '68px' }],
        display3: ['40px', { fontWeight: 700, lineHeight: '56px' }],
        display4: ['32px', { fontWeight: 700, lineHeight: '44px' }],
        heading1: ['32px', { fontWeight: 700, lineHeight: '48px' }],
        heading2: ['28px', { fontWeight: 700, lineHeight: '42px' }],
        heading3: ['24px', { fontWeight: 700, lineHeight: '36px' }],
        heading4: ['22px', { fontWeight: 700, lineHeight: '34px' }],
        heading5: ['20px', { fontWeight: 700, lineHeight: '30px' }],
        heading6: ['19px', { fontWeight: 700, lineHeight: '26px' }],
        heading7: ['17px', { fontWeight: 700, lineHeight: '24px' }],
        heading8: ['15px', { fontWeight: 700, lineHeight: '20px' }],
        heading9: ['14px', { fontWeight: 700, lineHeight: '20px' }],
        heading10: ['11px', { fontWeight: 700, lineHeight: '16px' }],
        body1: ['28px', { fontWeight: 400, lineHeight: '42px' }],
        body2: ['24px', { fontWeight: 400, lineHeight: '36px' }],
        body3: ['22px', { fontWeight: 400, lineHeight: '34px' }],
        body4: ['20px', { fontWeight: 400, lineHeight: '30px' }],
        body5: ['19px', { fontWeight: 400, lineHeight: '26px' }],
        body6: ['17px', { fontWeight: 400, lineHeight: '24px' }],
        body7: ['15px', { fontWeight: 400, lineHeight: '20px' }],
        body8: ['14px', { fontWeight: 400, lineHeight: '20px' }],
        body9: ['13px', { fontWeight: 400, lineHeight: '18px' }],
        body10: ['12px', { fontWeight: 400, lineHeight: '18px' }],
        body11: ['11px', { fontWeight: 400, lineHeight: '16px' }],
        body1_m: ['28px', { fontWeight: 500, lineHeight: '42px' }],
        body2_m: ['24px', { fontWeight: 500, lineHeight: '36px' }],
        body3_m: ['22px', { fontWeight: 500, lineHeight: '34px' }],
        body4_m: ['20px', { fontWeight: 500, lineHeight: '30px' }],
        body5_m: ['19px', { fontWeight: 500, lineHeight: '26px' }],
        body6_m: ['17px', { fontWeight: 500, lineHeight: '24px' }],
        body7_m: ['15px', { fontWeight: 500, lineHeight: '20px' }],
        body8_m: ['14px', { fontWeight: 500, lineHeight: '20px' }],
        body9_m: ['13px', { fontWeight: 500, lineHeight: '18px' }],
        body10_m: ['12px', { fontWeight: 500, lineHeight: '18px' }],
        body11_m: ['11px', { fontWeight: 500, lineHeight: '16px' }],
        button1: ['19px', { fontWeight: 400, lineHeight: '26px' }],
        button2: ['17px', { fontWeight: 400, lineHeight: '24px' }],
        button3: ['15px', { fontWeight: 400, lineHeight: '20px' }],
        button4: ['13px', { fontWeight: 400, lineHeight: '18px' }],
        button5: ['11px', { fontWeight: 400, lineHeight: '14px' }],
        button1_sb: ['19px', { fontWeight: 600, lineHeight: '26px' }],
        button2_sb: ['17px', { fontWeight: 600, lineHeight: '24px' }],
        button3_sb: ['15px', { fontWeight: 600, lineHeight: '20px' }],
        button4_sb: ['13px', { fontWeight: 600, lineHeight: '18px' }],
        button5_sb: ['11px', { fontWeight: 600, lineHeight: '14px' }],
        label1: ['17px', { fontWeight: 400, lineHeight: '20px' }],
        label2: ['15px', { fontWeight: 400, lineHeight: '18px' }],
        label3: ['14px', { fontWeight: 400, lineHeight: '16px' }],
        label4: ['13px', { fontWeight: 400, lineHeight: '14px' }],
        label5: ['11px', { fontWeight: 400, lineHeight: '12px' }],
        label6: ['10px', { fontWeight: 400, lineHeight: '11px' }],
        paragraph1: ['17px', { fontWeight: 400, lineHeight: '26px' }],
        paragraph2: ['15px', { fontWeight: 400, lineHeight: '22px' }],
        paragraph3: ['14px', { fontWeight: 400, lineHeight: '18px' }],
        paragraph4: ['13px', { fontWeight: 400, lineHeight: '17px' }],
      },
    },
  },
  plugins: [],
};
