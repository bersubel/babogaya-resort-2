import { Cormorant, Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/global/SmoothScroll';
import CustomCursor from '@/components/global/CustomCursor';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';

const cormorant = Cormorant({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant', 
  display: 'swap' 
});

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter', 
  display: 'swap' 
});

export const metadata = {
  title: 'Babogaya Resort | The Premier Escape',
  description: 'Experience absolute harmony with nature at Lake Babogaya.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-body bg-snow text-charcoal antialiased overflow-x-hidden">
        <SmoothScroll>
          <CustomCursor />
          <Header />
          {children}  
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}