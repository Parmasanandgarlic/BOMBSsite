/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { ProductGrid } from './components/ProductGrid';
import { Lookbook } from './components/Lookbook';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';

export default function App() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white bg-grain">
            <Navbar
              isAccountOpen={isAccountOpen}
              setIsAccountOpen={setIsAccountOpen}
            />
            <main>
              <Hero />
              <Marquee />
              <ProductGrid />
              <Lookbook />
            </main>
            <Footer />
            <Cart onAccountOpen={() => setIsAccountOpen(true)} />
          </div>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
