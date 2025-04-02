<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { useRoute } from 'vue-router';


const route = useRoute();

const scroll = ref(false);
const namePath = computed(()=> {
  return route.name;
})
 

onMounted(() => {
  window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    scroll.value = scrollTop > 10;

    
  });
});
</script>
<template>
  <div class="page">
    <header class="page__header header" :class="{'light': namePath === 'Home'}">
      <div class="header__content x-center width-common">
        <div class="header__logo logo">
          <RouterLink class="text-dark" to="/">Game 3d</RouterLink>
        </div>
      </div>
    </header>

    <main class="page__main" :class="{'dark': namePath === 'Home'}">
      <slot></slot>
    </main>
    <footer class="page__footer footer" :class="{'light': namePath === 'Home'}">
      <div class="footer__content x-center width-common">
        <div class="footer__logo logo">
          <RouterLink class="text-dark" to="/">Game 3D</RouterLink>
        </div>
        <div class="footer__copyright text-dark">
          © 2023 Game 3D. Все права защищены.
        </div>
        <div class="footer__links">
          <RouterLink to="/" class="footer__link text-dark">Политика конфиденциальности</RouterLink>
          <RouterLink to="/" class="footer__link text-dark">Условия использования</RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__header {
    position: fixed;
    z-index: 100;
    left: 0;
    width: 100vw;
    transition:  background-color .5s;
  }

  &__main {
    flex-grow: 1;
    padding-top: 150px;
    padding-bottom: 100px;
    width: 100vw;
  }

  &__footer {
    padding-top: 50px;
    padding-bottom: 25px;
    width: 100%;
    min-height: 100px;
    background-color: var(--color-main);
    transition:  background-color .5s;

  }
}


.footer {
  width: 100vw;

  &__content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__copyright {
    align-self: flex-end;
    font-size: 14px;
    opacity: 0.8;
    text-align: center;
    color: white;
  }

  &__links {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: white;
    font-size: 14px;
  }
  &__logo {
    font-size: 20px;
    max-width: fit-content;
  }
}


.light {
  background-color: white;
  background: -webkit-linear-gradient(90deg, #bdbdbd,#dedede,#ffffff);background: linear-gradient(90deg, #bdbdbd,#dedede,#ffffff);
  font-family: sans-serif;
  .text-dark {
    text-decoration-line: underline;
    color: var(--color-secondary);
    text-decoration-color: black;
  }
}


.dark {
  background-color: var(--color-main);
  color: white;
}
</style>
