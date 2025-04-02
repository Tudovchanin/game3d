
<template>
  <div class="home x-center width-common">

    <RouterLink to="/products/?page=1">
      <h1 class="home__title">Game 3d</h1>
    <div  class="home__link" to="/products/?page=1">Our Products</div>
    </RouterLink>
   
  </div>

</template>

<style  lang="scss">

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    font-size: min(100px, 12vw);
    text-transform: uppercase;
    font-weight: 700;
    text-decoration: underline;
    margin-bottom: 20px;
  }

  &__link {
    font-size: min(50px, 7vw);
    position: relative;
    text-align: center;

    @media (hover:hover) {
      &::before {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 0;
      height: 2px;
      background-color: var(--light-color);
      transition: width .5s;
    }

      &:hover::before {
        width: 100%;
      }
    }
  
  }
}
</style>