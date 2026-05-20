import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export const metadata: Metadata = {
  title: 'FabWashing - Professional Laundry & Dry Cleaning on Autopilot',
  description: 'Sustainable, clean, and fast laundry and dry cleaning services with doorstep pickup & delivery in 24 hours. Affordable neighborhood rates.',
  keywords: 'laundry, dry cleaning, wash and fold, wash and iron, steam iron, fabwashing, patna, bihar, sustainable laundry',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
