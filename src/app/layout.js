import Providers from '../provider';
import './globals.css';

export const metadata = {
  title: 'Reservation',
  description: 'Yun Hyojung',
}

export default function RootLayout({ children }) {
 return (
    <Providers>
      <html lang="en">
        <body>{children}</body>
      </html>
    </Providers>
  )
}
