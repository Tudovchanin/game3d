<script setup lang="ts">
import { ref, onBeforeMount, onMounted, computed, watch, onUpdated, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useProductsStore } from "@/stores/products.store";
import type { Product } from "@/stores/products.store";

const router = useRouter();
const route = useRoute();

const productsStore = useProductsStore();

const products = ref<Product[] | null>(null);

const visibleBtn = ref(3);
const GAP_BTN_PAGINATION = 20;

const cardsPerPage = ref(2);

const quantityCards = ref(0);

const indexActiveBtn = ref(0);

const currentPage = computed(() => {
  const page = route.query.page;
  return typeof page === "string" ? parseInt(page) || 1 : 1;
});

const selectPage = ref(currentPage.value);

const endPagination = computed(() => {
  const valueEnd = selectPage.value * cardsPerPage.value;
  return valueEnd > quantityCards.value ? quantityCards.value : valueEnd;
});

const startPagination = computed(() => {
  return currentPage.value * cardsPerPage.value - cardsPerPage.value;
});

let widthTransform: any = null;
const allBtn = <any>ref(null);
const wrapperVisibleWidth = ref<HTMLElement | null>(null);
const containerBtn = ref<HTMLElement | null>(null);

const handleSelectPage = (page: number, indexBtn: number) => {
  selectPage.value = page;

  router.replace(`/products?page=${selectPage.value}`);
  indexActiveBtn.value = indexBtn;
};

const lengthBtn = ref(0)

console.log(lengthBtn.value, 'dddd');

// watch(
//   () => products.value,
//   (newValue, oldValue) => {
//     console.log('watch');
    
//     if (newValue?.length) {
      
//       quentityCards.value = newValue?.length;
//       console.log(quentityCards.value);
      
//       lengthBtn.value = Math.ceil(quentityCards.value / cardsPerPage.value);
      
//     }
//   }
// );


onBeforeMount(async () => {
  await productsStore.fetchProducts();
  if (!productsStore.products) return;
  products.value = productsStore.products.map((product) => {
    return { ...product };
  });
  quantityCards.value = products.value.length

  lengthBtn.value = Math.ceil(quantityCards.value / cardsPerPage.value);

  console.log(lengthBtn.value,'onBeforeMount' );
  
});

onMounted(() => {





setTimeout(() => {
  if (allBtn.value) {
    console.log('allBtn.value', allBtn.value);

    const buttonElement: HTMLButtonElement = allBtn.value[0];

if (!buttonElement )
  return;

const widthButton = buttonElement.getBoundingClientRect().width;

widthTransform = widthButton + GAP_BTN_PAGINATION;
console.log(widthTransform, 'widthTransform');

const initWidth =
  widthButton * visibleBtn.value + GAP_BTN_PAGINATION * visibleBtn.value - 1;

  if(wrapperVisibleWidth.value) {
    wrapperVisibleWidth.value.style.width = initWidth + "px";

  }

let transform = 0;
if (selectPage.value > visibleBtn.value) {
  transform = (selectPage.value - (visibleBtn.value - 1)) * -widthTransform;
}

if (selectPage.value === visibleBtn.value) {
  transform = -widthTransform;
}

if (selectPage.value === allBtn.value?.length) {
  transform += widthTransform;
}
if(containerBtn.value) {
  containerBtn.value.style.transform = `translateX(${transform}px)`;

}
  }
},100);
 
 
});



onUpdated(() => {
  if (!containerBtn.value) return;
  if (
    selectPage.value >= visibleBtn.value &&
    selectPage.value !== allBtn.value?.length
  ) {
    containerBtn.value.style.transform = `translateX(${
      (selectPage.value - (visibleBtn.value - 1)) * -widthTransform
    }px)`;
  }
  if (selectPage.value < visibleBtn.value) {
    containerBtn.value.style.transform = "translateX(0px)";
  }
});
</script>
<template>
  <section class="all-products">
    {{ currentPage }}
    <div class="container-products width-common x-center">
      <RouterLink
        :to="`/product/${product.id}`"
        v-for="(product, index) in products?.slice(
          startPagination,
          endPagination
        )"
        :key="product.id"
        class="container-products__product product"
      >
        <span class="product__img">
          <img :src="`/game3d/images/${product.images[0]}`" alt="" />
        </span>
        <span class="product__text">
          {{ product.id }}
        </span>
      </RouterLink>
    </div>
  
    

    <div  class="cards-blog">
      <div class="cards-blog__footer">
        <div ref="wrapperVisibleWidth" class="cards-blog__hidden-btn">
          <div ref="containerBtn" class="cards-blog__container-btn">
            <div
              v-show="startPagination <= quantityCards && allBtn?.length !== 1"
              ref="allBtn"
              @click="handleSelectPage(v, index)"
              class="cards-blog__btn"
              :class="{ 'active-btn': v === selectPage }"
              v-for="(v, index) in lengthBtn"
              :key="index"
            >
              <button
              style="background-color: red; padding: 20px"
              >
                {{ v }}
              </button>
            </div>
          </div>
        </div>

        <div
          :class="{
            'hidden-dots':
              startPagination > quantityCards ||
              selectPage === lengthBtn ||
              quantityCards / cardsPerPage === lengthBtn ||
              indexActiveBtn + visibleBtn > lengthBtn,
          }"
          class="cards-blog__dots"
          aria-hidden="true"
        >
          <button style="background-color: red; padding: 20px">...</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.cards-blog {
  &__footer {
    display: flex;
    justify-content: center;

    min-height: 34px;
    background-color: black;
  }

  &__hidden-btn {
    position: relative;
    overflow: hidden;
    background-color: aliceblue;
  }

  &__container-btn {
    display: flex;
    gap: 20px;
    background-color: rgba(245, 222, 179, 0.458);
    color: wheat;
    position: absolute;
    left: 0;
    height: 100%;
    z-index: 100;
    transform: translateX(0);
  }

  &__btn {
    width: 34px;
    opacity: 0.1;
  }

  &__dots {
    width: 34px;
    color: white;
    pointer-events: none;
    opacity: 1;
    transition: opacity 0.3s linear;
  }
}

.active-btn {
  opacity: 1;

  pointer-events: none;
}

.hidden-dots {
  opacity: 0;
}

.pagination-buttons {
  display: flex;
  justify-content: space-between;
  max-width: 500px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.button-pagination {
  background-color: black;
  color: aliceblue;
  width: 50px;
  height: 50px;
}

.link-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: red;
}

.container-products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(47%, 1fr));
  justify-items: center;
  gap: 50px;
  // background-color: aqua;
}

.product {
  position: relative;
  max-width: 600px;
  width: 100%;
  height: min(300px, 50vw);
  outline: solid var(--color-secondary) 2px;
 

  &__text {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    background-color: var(--color-secondary);
    color: white;
    padding: 10px;
    font-size: min(20px, 3.5vw);
  }

  &__img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    @media (hover: hover) {
      transition: transform 0.3s linear;

      &:hover {
        transform: scale(1.05);
      }
    }

    & img {
      object-fit: cover;
    }
  }
}
</style>
