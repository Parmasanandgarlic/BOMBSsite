/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { ProductGrid } from './components/ProductGrid';
import { Lookbook } from './components/Lookbook';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white bg-grain">
          <Navbar />
          <Hero />
          <Marquee />
          <ProductGrid />
          <Lookbook />
          <Footer />
          <Cart />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
