import { create } from 'zustand';
import { Product } from '@/app/types/product';import initialProducts from '../data/products.json'; 

interface ProductsState {
  products: Product[];
  selectedCategory: string;
  setCategory: (category: string) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: initialProducts as Product[],
  selectedCategory: 'Todos',
  setCategory: (category) => set({ selectedCategory: category }),
  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
  getProductById: (id) => {
    return get().products.find((p) => p.id === id);
  },
}));