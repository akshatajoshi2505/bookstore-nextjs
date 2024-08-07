import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Header from '@/app/ui/Header';
import Footer from '@/app/ui/Footer';
import { CartProvider } from '@/app/lib/CartContext';
import { OrderProvider } from '@/app/lib/OrderContext';
import Providers from '@/app/providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <CartProvider>
            <OrderProvider>
              <Header />
                {children}
              <Footer />
            </OrderProvider>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
