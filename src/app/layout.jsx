import './globals.css'
import LenisScroll from '../components/LenisScroll'

export const metadata = {
  title: {
    default: 'Leading Intelligence',
    template: '%s — Leading Intelligence',
  },
  description: 'AI consulting for engineering teams. We help Series B–D tech companies get actual value from AI coding tools.',
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LenisScroll />
        {children}
      </body>
    </html>
  )
}
