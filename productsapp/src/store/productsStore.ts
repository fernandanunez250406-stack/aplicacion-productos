import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  available: boolean;
  category: string;
}

interface ProductsState {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  deleteProduct: (id: string) => void;
  addProduct: (product: Product) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  selectedCategory: 'Todos',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
  addProduct: (product) =>
    set((state) => ({
      products: [product, ...state.products],
    })),
  products: [
    {
      id: '1',
      name: 'Suero Facial Botánico',
      description: 'Formula ligera de hidratacion profunda con extractos naturales de te verde y aloe.',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
      price: 480,
      available: true,
      category: 'Skincare',
    },
    {
      id: '2',
      name: 'Crema Corporal Oliva & Te',
      description: 'Nutricion intensiva de rapida absorcion con sutil aroma organico.',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80',
      price: 350,
      available: true,
      category: 'Cuidado Corporal',
    },
    {
      id: '3',
      name: 'Vela de Soya Artesanal',
      description: 'Aroma fresco inspirado en notas de bosque limpio y bambu natural.',
      image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=600&q=80',
      price: 290,
      available: false,
      category: 'Hogar',
    },
    {
      id: '4',
      name: 'Exfoliante Mineral Arcilla',
      description: 'Limpieza profunda desintoxicante formulada con arcilla verde y aceites esenciales.',
      image: 'https://images.unsplash.com/photo-1567073614440-d3221c97a216?auto=format&fit=crop&w=600&q=80',
      price: 420,
      available: true,
      category: 'Skincare',
    },
  ],
}));