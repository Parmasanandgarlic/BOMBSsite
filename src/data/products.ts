import { Product } from '../context/CartContext';

export const products: Product[] = [
  {
    id: 'b-001',
    name: 'SYNDICATE HEAVY TEE',
    price: 45,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop',
    category: 'Tees',
    description: 'Vintage wash 250gsm cotton. Brutalist logo graphic on the back. "Back On My Bullshit" text on left chest.',
  },
  {
    id: 'b-002',
    name: 'INDUSTRIAL ZIPPO',
    price: 35,
    image: 'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?q=80&w=1000&auto=format&fit=crop',
    category: 'Accessories',
    description: 'Brushed chrome finish. Engraved brutalist architecture and BOMBS acronym.',
  },
  {
    id: 'b-003',
    name: 'SYNDICATE TRUCKER HAT',
    price: 30,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop',
    category: 'Headwear',
    description: 'High-crown foam trucker. Screen-printed heavy industrial logo.',
  }
];
