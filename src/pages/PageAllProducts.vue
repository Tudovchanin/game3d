<script setup lang="ts">
import {
  ref,
  onBeforeMount,
 
} from "vue";
import type { Product } from "@/stores/products.store";

import { useProductsStore } from "@/stores/products.store";

import AppPagination from "@/components/pagination-panel/AppPagination.vue";

const productsStore = useProductsStore();

// данные из state(все карточки)
const cardsProductData = ref<Product[] | null>(null);

// кол-во карточек на странице
const cardsPerPage = ref(6);


// ссылка на страницу PageProduct(страницы о продукте)
const linkCardProduct = "/product/";

// ссылка страницы пагинации
const linkPageProducts = "/products/"

// gam между кнопками пагинации
const gapBtn = "16px";

// количество видимых кнопок пагинации
const visibleBtn = 3;

onBeforeMount(async () => {
  // вызываем метод из store, который делает запрос к api
  await productsStore.fetchProducts();
  if (!productsStore.products) return;

  cardsProductData.value = productsStore.products.map((product) => {
    return { ...product };
  });
});
</script>
<template>
  <template v-if="cardsProductData">
    <section class="all-products x-center width-common">
      <AppPagination
        :gapBtn
        :cardsData="cardsProductData"
        :pageItemCount="cardsPerPage"
        :linkCard="linkCardProduct"
        :linkPage="linkPageProducts"
        :visibleBtn
      />
    </section>
  </template>
</template>

<style lang="scss" scoped>
.all-products {
  min-height: 800px;
}
</style>
