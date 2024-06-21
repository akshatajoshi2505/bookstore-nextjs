import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Header from '@/app/ui/Header';
import Footer from '@/app/ui/Footer';
import { CartProvider } from '@/app/lib/CartContext';
import { OrderProvider } from '@/app/lib/OrderContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <CartProvider>
          <OrderProvider>
            <Header />
              {children}
            <Footer />
          </OrderProvider>
        </CartProvider>
      </body>
    </html>
  );
}
