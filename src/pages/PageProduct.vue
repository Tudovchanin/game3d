<script setup lang="ts">
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products.store";
import { ref, onMounted, onBeforeMount, onBeforeUnmount } from "vue";
import SliderProduct from "@/components/sliders/SliderProduct.vue";
import type { Product } from "@/stores/products.store";
import { inputMask } from "@/utils/mask";

const productsStore = useProductsStore();

const route = useRoute();
const productId = route.params.id;

const refInputPhone = ref();

const product = ref<Product | null>(null);
const step = ref(1);
const activeTab = ref<"description" | "specs">("description");

let removePhoneMask: any = null;

const handleSliderMove = (event: {
  currentStep: number;
  totalSteps: number;
}) => {
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
    await productsStore.fetchProducts();
  }

  if (typeof productId === "string" && productsStore.products) {
    product.value = getProduct(productId, productsStore.products);
  }
});

onMounted(async () => {
  const maskStart = 3;
  const maskValue = "+7(___)___-__-__";
  const maskSymbols = [")", "(", "-"];
  const maskHover = true;

  removePhoneMask = inputMask(
    maskStart,
    maskValue,
    maskSymbols,
    refInputPhone.value,
    maskHover
  );
});

onBeforeUnmount(() => {
  removePhoneMask();
});
</script>
<template>
  <section class="detail-product x-center width-common">
    <RouterLink class="detail-product__link-back" to="/products/?page=1">
      <img src="/images/left-black.png" alt="назад" />
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
          :class="{
            'detail-product__tab--active': activeTab === 'description',
          }"
          @click="activeTab = 'description'"
        >
          Описание
        </button>
        <button
          class="detail-product__tab tab-button"
          :class="{ 'detail-product__tab--active': activeTab === 'specs' }"
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
            <tr
              class="table-content__row"
              v-for="(value, key) in product?.specifications"
              :key="key"
            >
              <td class="table-content__name">{{ key }}</td>
              <td class="table-content__value">{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="detail-product__order">
      <form  action="/" method="POST" class="order-form">
        <div class="order-form__group">
          <label for="order-name" class="order-form__label">Ваше имя</label>
          <input
            type="text"
            id="order-name"
            class="order-form__input"
            placeholder="Иван Иванов"
            required
          />
        </div>

        <div class="order-form__group">
          <label for="order-phone" class="order-form__label">Телефон</label>
          <input
            ref="refInputPhone"
            type="tel"
            id="order-phone"
            autocomplete="off"
            class="order-form__input"
            pattern="^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$"
            placeholder="+7(953)723-50-79"
            required
          />
        </div>

        <button type="submit" class="order-form__submit">Заказать</button>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.detail-product {
  display: grid;
  grid-template-columns: 600px 1fr;
  row-gap: 20px;
  column-gap: 50px;
  position: relative;

  @media (max-width: 1500px) {
    column-gap: 20px;
    grid-template-columns: 1fr 500px;
  }

  @media (max-width: 1024px) {
    column-gap: 20px;
    grid-template-columns: 1fr;
  }

  &__link-back {
    position: absolute;
    left: 20px;
    top: -85px;
    width: 50px;
    height: 40px;

    @media (max-width: 530px) {
      top: -60px;
      width: 25px;
      height: 20px;
    }
  }

  &__header {
    grid-column: 1/3;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 40px;

    @media (max-width: 1024px) {
    }

    @media (max-width: 1024px) {
      gap: 20px;
      grid-column: 1/2;
    }
  }

  &__title {
    font-size: min(40px, 6vw);
    font-weight: 700;
    color: var(--color-main);
  }

  &__price {
    font-size: min(40px, 6vw);
    font-weight: 500;
  }

  &__slider {
    width: 100%;
    height: min(400px, 55vw);

    @media (max-width: 1024px) {
      margin-bottom: 20px;
    }
  }

  &__slider-step {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  &__info {
    min-height: 500px;
  }

  &__info-header {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    margin-bottom: 50px;

    @media (max-width: 530px) {
      gap: 20px;
      margin-bottom: 20px;
    }
  }

  &__tab {
    background-color: var(--light-color);
    color: var(--color-secondary);
    transition: color  .5s, background-color .5s;
    @media (hover:hover) {
      &:hover {
        background-color: var(--color-secondary);
      color: var(--light-color);
      }
    }

    &--active {
      background-color: var(--color-secondary);
      color: var(--light-color);
    }
  }

  &__description {
    max-width: 550px;
    font-size: 20px;
    line-height: 1.5;

    @media (max-width: 530px) {
      font-style: 16px;
    }
  }
}
</style>
