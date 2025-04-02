import { defineStore } from 'pinia'
import { ref } from 'vue';


export type Product = {
  id: string;
  name: string;
  price: number;
  currency: string;
  images: string[];
  description: string;
  specifications: Record<string, string>;
}



export const useProductsStore = defineStore('products', () => {

  const products = ref<Product[] | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchProducts():Promise<void> {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetch('/game3d/products.json');
      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных');
      }
      const data = await response.json();
      products.value = data;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Неизвестная ошибка';
    } finally {
      loading.value = false;
    }
  }




  return { products, fetchProducts, error, loading }
})