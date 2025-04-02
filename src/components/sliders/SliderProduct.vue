<script setup lang='ts'>
import { Slider } from '@/utils/slider28.ts';
import { ref, onMounted, onBeforeUnmount } from 'vue';
const BASE_PATH = `${import.meta.env.BASE_URL}`;

type SliderImg = {
  images: string[];
}
const MEDIA = {
  1: window.matchMedia('(min-width: 1px)'),
};



const props = defineProps<SliderImg>()

const refSlider = ref<HTMLElement | null>(null);
const refSliderTrack = ref<HTMLElement | null>(null);
const refItem = ref<HTMLElement[]>([]);

let sliderProduct:any;

const emit = defineEmits(['slider-move']);

function emitEventSliderMove(event: { currentStep: number; totalSteps: number }) {
emit('slider-move', event);
}


function handleSliderEvent(e:CustomEvent<{
  currentStep: number;
  totalSteps: number;
}>) {
      emitEventSliderMove({
        currentStep: e.detail.currentStep,
        totalSteps: e.detail.totalSteps
      })
}


onMounted(() => {
  if (refItem.value && refSlider.value && refSliderTrack.value) {

    const $sliderElem = {
      btnNext: null,
      btnPrev: null,
      sliderTrack: refSliderTrack.value,
      itemLength: props.images.length,
      item: refItem.value[0],
    }
    sliderProduct = new Slider(MEDIA);
    sliderProduct.initSlider($sliderElem); //инициализация слайдера
    sliderProduct.initDragDrop(true);//инициализация drag'n drop , если для desktop ненужно, то вызываем метод без аргумента(для touch устройств)

    (refSlider.value as HTMLElement).addEventListener('slideChanged', handleSliderEvent as EventListener);

  }
})

onBeforeUnmount(()=> {
  if(sliderProduct) {
    sliderProduct.removeAllListener();
  }
})


</script>
<template>
  <div ref="refSlider" class="slider">
    <div ref="refSliderTrack" class="slider__track">
      <div v-for="image in props.images" ref="refItem" class="slider__item">
        <div class="slider__content">
          <img :src="`${BASE_PATH}images/${image}`" alt="ps6">
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.slider {
  overflow: hidden;
  width: 100%;
  height: 100%;

  &__track {
    display: flex;
    height: 100%;
    transform: translateX(0px);
    touch-action: none;
    transition: transform .5s linear;
  }

  &__item {
    flex-basis: 100%;
    height: 100%;
    flex-shrink: 0;
    flex-grow: 0;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }

  &__content {
    pointer-events: none;
    height: 100%;

    & img {
      object-fit: cover;
    }
  }
}
</style>