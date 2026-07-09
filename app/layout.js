import './globals.css';

export const metadata = {
  metadataBase: new URL('https://YOURDOMAIN.com.au'),
  title: 'Pressure Washing Nowra & the Shoalhaven | Nowra Pressure Washing Solutions',
  description:
    'Locally owned pressure washing in Nowra & the Shoalhaven. Driveways, house washing, decks, plus heated-water cleaning for fleet & machinery. Free, same-day quotes.',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Nowra Pressure Washing Solutions',
    title: 'Pressure Washing Nowra & the Shoalhaven',
    description:
      'Locally owned pressure washing in Nowra & the Shoalhaven. Driveways, house washing, decks, plus heated-water cleaning for fleet & machinery. Free, same-day quotes.',
    locale: 'en_AU',
    url: '/',
    images: ['/social-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pressure Washing Nowra & the Shoalhaven',
    description: 'Locally owned pressure washing across Nowra & the Shoalhaven. Free, same-day quotes.',
    images: ['/social-share.jpg'],
  },
  other: {
    'geo.region': 'AU-NSW',
    'geo.placename': 'Nowra, New South Wales',
    'geo.position': '-34.8726;150.6004',
    ICBM: '-34.8726, 150.6004',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU">
      <body>{children}</body>
    </html>
  );
}
