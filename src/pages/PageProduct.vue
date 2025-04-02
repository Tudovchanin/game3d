<script setup lang="ts">
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products.store";
import { ref, onMounted, onBeforeMount } from "vue";
import SliderProduct from "@/components/sliders/SliderProduct.vue";
import type { Product } from "@/stores/products.store";

const productsStore = useProductsStore();



const route = useRoute();
const productId = route.params.id;

const product = ref<Product | null>(null);
const step = ref(1);
const activeTab = ref<"description" | "specs">("description");




const handleSliderMove = (event: {
  currentStep: number;
  totalSteps: number;
}) => {
  console.log(event);
  step.value = event.currentStep;
};

function getProduct(productId: string, products: Product[]): Product | null {
  const validProduct = products.find((product) => product.id === productId);

  if (validProduct) {
    return validProduct;
  }

  return null;
}

onBeforeMount(async () => {
  if (!productsStore.products) {
    console.log("запрос пошел");

    await productsStore.fetchProducts();
  }

  console.log("данные уже есть");
  if (typeof productId === "string" && productsStore.products) {
    product.value = getProduct(productId, productsStore.products);
  }
  console.log(product.value);
});

onMounted(async () => {});
</script>
<template>
  <section class="detail-product x-center width-common">

    <RouterLink class="detail-product__link-back" to="/products">
      <img src="/game3d/images/left-black.png" alt="">
    </RouterLink>

    <div class="detail-product__header">
      <h1 class="detail-product__title">
        {{ product?.name || "нет названия" }}
      </h1>
      <div class="detail-product__price">
        {{ product?.price ? product?.price + " р" : "нет цены" }}
      </div>
    </div>

    <div class="detail-product__slider">
      <SliderProduct
        v-if="product?.images?.length"
        @slider-move="handleSliderMove"
        :images="product.images"
      />
      <div v-if="product?.images?.length" class="detail-product__slider-step">
        <div
          :key="image"
          v-for="(image, index) in product.images"
          class="step-icon"
          :class="{ 'step-icon--active': index + 1 === step }"
        ></div>
      </div>
      <div v-else>Загрузка изображений...</div>
    </div>

    <div class="detail-product__info">
      <div class="detail-product__info-header">
        <button
          class="detail-product__tab tab-button"
          :class="{'detail-product__tab--active': activeTab === 'description'}"
          @click="activeTab = 'description'"
        >
          Описание
        </button>
        <button
          class="detail-product__tab tab-button"
          :class="{'detail-product__tab--active': activeTab === 'specs'}"
          @click="activeTab = 'specs'"
        >
          Спецификация
        </button>
      </div>
      <div
        v-show="activeTab === 'description'"
        class="detail-product__tab-content"
      >
      <p class="detail-product__description">{{ product?.description }}</p>
      </div>

      <div v-show="activeTab === 'specs'" class="detail-product__tab-content">
        <table class="table-content">
      <tbody>
        <tr class="table-content__row" v-for="(value, key) in product?.specifications" :key="key">
          <td class="table-content__name">{{ key }}</td>
          <td class="table-content__value">{{ value }}</td>
        </tr>
      </tbody>
        </table>
      </div>
    </div>

    <div class="detail-product__order">
      Форма
    </div>
  </section>
</template>

<style lang="scss" scoped>
.detail-product {
  display: grid;
  grid-template-columns: 600px 1fr;
  row-gap: 20px;
  column-gap: 50px;
  
  &__link-back {
    position: fixed;
    left: 20px;
    width: 50px;
    height: 40px;
  }

  &__header {
    grid-column: 1/3;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 40px;
    font-weight: 700;
    color: var(--color-main);
  }

  &__price {
    font-size: 40px;
    font-weight: 500;
  }

  &__slider {
    // max-width: 600px;
    width: 100%;
    height: min(400px, 50vw);
    // outline: solid;
  }

  &__slider-step {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    // background-color: aqua;
  }
  &__info {
    min-height: 500px;
  }
  &__info-header {
    display: flex;
    gap: 50px;
    margin-bottom: 50px;
  }
  &__tab {
    background-color: white;
    color: var(--color-secondary);
    transition: color .5s , background-color .5s;
    &--active {
      background-color: var(--color-secondary);
      color: white;
    }
  }

  &__description {
    max-width: 550px;
    font-size: 20px;
    line-height: 1.5;
  }
}

.table-content {
  width: 100%;
  height: 100%;
  table-layout: fixed;   

  &__name, &__value {
   padding: 2px;
  }

  &__name {
    font-weight: 700;
  }
}
</style>
