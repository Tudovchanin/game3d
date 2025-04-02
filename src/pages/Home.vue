<script setup lang='ts'>
</script>
<template>
  <div class="home x-center width-common">
    <h1 class="home__title">Game 3d</h1>

    <RouterLink  class="home__link" to="/products/?page=1">Our Products</RouterLink>
  </div>

</template>


<style  lang="scss">


.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    font-size: 100px;
    text-transform: uppercase;
    font-weight: 700;
    text-decoration: underline;
    margin-bottom: 20px;
  }

  &__link {
    font-size: 50px;
    position: relative;

    @media (hover:hover) {
      &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 2px;
      background-color: rgb(255, 255, 255);
      transition: width .5s;
    }

      &:hover::before {
        width: 100%;
      }
    }
  
  }
}
</style>