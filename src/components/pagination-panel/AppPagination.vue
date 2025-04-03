<script setup lang="ts">
import { ref, onMounted, computed, onUpdated } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { Product } from "@/stores/products.store";
const BASE_PATH = `${import.meta.env.BASE_URL}`;

type Pagination = {
  cardsData: Product[];
  pageItemCount: number;
  linkCard: string;
  linkPage: string;
  visibleBtn: number;
  gapBtn: string;
};

const props = defineProps<Pagination>();

const router = useRouter();
const route = useRoute();

const allBtn = ref<HTMLElement[] | null>(null);
const wrapperVisibleWidth = ref<HTMLElement | null>(null);
const containerBtn = ref<HTMLElement | null>(null);

const lengthBtn = computed(() => {
  if (!props.cardsData) return;
  return Math.ceil(props.cardsData.length / props.pageItemCount);
});
const indexActiveBtn = ref(0);
const currentPage = computed(() => {
  const query = route.query.page;
  if (query && typeof query === "string") {
    return parseInt(query) || 1;
  }
});
const selectPage = ref(currentPage.value);

const endPagination = computed(() => {
  if (selectPage.value && props.cardsData) {
    const valueEnd = selectPage.value * props.pageItemCount;
    return valueEnd > props.cardsData.length
      ? props.cardsData.length
      : valueEnd;
  }
});
const startPagination = computed(() => {
  if (currentPage.value) {
    return currentPage.value * props.pageItemCount - props.pageItemCount;
  }
});

const handleSelectPage = (page: number, indexBtn: number) => {
  selectPage.value = page;

  router.replace(`${props.linkPage}?page=${selectPage.value}`);
  indexActiveBtn.value = indexBtn;
};

const setVariables = computed(() => {
  return { "--btn-gap": props.gapBtn };
});

let widthTransform: any = null;

// пагинацию вынести в отдельные методы
onMounted(() => {
  if (!allBtn.value) return;

  const buttonElement: HTMLElement = allBtn.value[0];

  if (buttonElement) {
    const widthButton: any = buttonElement.getBoundingClientRect()
      .width as number;

    widthTransform = widthButton + parseInt(props.gapBtn);

    const initWidth =
      widthButton * props.visibleBtn +
      parseInt(props.gapBtn) * (props.visibleBtn - 1);
    if (wrapperVisibleWidth.value) {
      wrapperVisibleWidth.value.style.width = initWidth + "px";
    }
  }

  let transform = 0;
  if (!selectPage.value) return;
  if (selectPage.value > props.visibleBtn) {
    transform = (selectPage.value - (props.visibleBtn - 1)) * -widthTransform;
  }

  if (selectPage.value === props.visibleBtn) {
    transform = -widthTransform;
  }

  if (selectPage.value === allBtn.value.length) {
    transform += widthTransform;
  }
  if (!containerBtn.value) return;

  containerBtn.value.style.transform = `translateX(${transform}px)`;
});

onUpdated(() => {
  if (!selectPage.value || !allBtn.value || !containerBtn.value) return;
  if (
    selectPage.value >= props.visibleBtn &&
    selectPage.value !== allBtn.value.length
  ) {
    containerBtn.value.style.transform = `translateX(${
      (selectPage.value - (props.visibleBtn - 1)) * -widthTransform
    }px)`;
  }
  if (selectPage.value < props.visibleBtn) {
    containerBtn.value.style.transform = "translateX(0px)";
  }
});
</script>
<template>
  <div class="pagination">
    <!-- карточки можно вынести в отдельный компонент -->
    <div class="pagination__cards">
      <RouterLink
        :to="`${linkCard}${card.id}`"
        v-for="card in cardsData.slice(startPagination, endPagination)"
        :key="card.id"
        class="pagination__card"
      >
        <span class="pagination__card-img">
          <img
            :src="`${BASE_PATH}/images/${card.images[0]}`"
            :alt="card.name"
          />
        </span>
        <span class="pagination__card-text">
          {{ card.name }}
        </span>
      </RouterLink>
    </div>

    <div :style="setVariables" class="pagination__footer">
      <button
        @click="handleSelectPage(1, 0)"
        class="pagination__to-start"
        :class="{'hidden-dots': currentPage! < visibleBtn}"
      >
        В начало
      </button>

      <div ref="wrapperVisibleWidth" class="pagination__hidden-btn">
        <div ref="containerBtn" class="pagination__container-btn">
          <button
            v-show="startPagination! <= props.cardsData!.length && allBtn?.length !== 1"
            ref="allBtn"
            @click="handleSelectPage(v, index)"
            class="pagination__btn no-select"
            :class="{ 'active-btn': v === selectPage }"
            v-for="(v, index) in lengthBtn"
            :key="index"
          >
            {{ v }}
          </button>
        </div>
      </div>

      <div
        :class="{
        'hidden-dots':
          startPagination! > cardsData.length ||
          selectPage === lengthBtn ||
          indexActiveBtn + visibleBtn > lengthBtn!
      }"
        class="pagination__dots no-select"
        aria-hidden="true"
      >
        <button style="background-color: black">...</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(47%, 1fr));
    justify-items: center;
    gap: 50px;
    height: 100%;
    margin-bottom: 50px;
  }

  &__card {
    position: relative;
    max-width: 600px;
    width: 100%;
    height: min(300px, 50vw);
    outline: solid var(--color-secondary) 2px;
  }

  &__card-img {
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

  &__card-text {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    background-color: var(--color-secondary);
    color: white;
    padding: 10px;
    font-size: min(20px, 3.5vw);
  }

  &__footer {
    display: flex;
    justify-content: center;
    gap: var(--btn-gap);
    min-height: 34px;
  }

  &__hidden-btn {
    position: relative;
    overflow: hidden;
  }

  &__container-btn {
    display: flex;
    gap: var(--btn-gap);
    position: absolute;
    left: 0;
    height: 100%;
    transform: translateX(0);
  }

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 34px;
    height: 34px;
    background-color: var(--light-color);
    color: var(--color-secondary);
    cursor: pointer;
    opacity: 0.5;

    @media (hover:hover) {
      transition: color .2s, background-color .2s;
      &:hover {
        background-color: var(--color-secondary);
        color: var(--light-color);
        opacity: 1;
        
      }
    }
  }

  &__to-start{
    padding: 0 10px;
    font-weight: 700;
    background-color: var(--color-secondary);
    color: var(--light-color);
    @media (hover:hover) {
      transition: color .5s, background-color .5s;
      &:hover {
        background-color: var(--light-color);
        color: var(--color-secondary);
        opacity: 1;
        
      }
    }
  }
  &__dots {
    width: 34px;
    height: 34px;
    color: var(--light-color);
    pointer-events: none;
    opacity: 1;
    text-align: center;
    line-height: 34px;
    transition: opacity 0.3s linear;
    background-color: var(--color-secondary);
  }
}

.active-btn {
  opacity: 1;
  pointer-events: none;
  background-color: var(--color-secondary);
  color: var(--light-color);
  font-weight: 700;
}

.hidden-dots {
  opacity: 0;
  pointer-events: none;
}
</style>
