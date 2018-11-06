<template>
  <div class="skeleton page">
    <div class="skeleton-nav"></div>
    <div class="skeleton-swiper"></div>
    <div class="skeleton-box">
      <ul class="skeleton-tabs">
        <li v-for="i in 8" v-bind:key="i" class="skeleton-tabs-item"><span></span></li>
      </ul>
      <div class="skeleton-banner"></div>
      <div v-for="i in 6" v-bind:key="i" class="skeleton-productions"></div>
    </div>
  </div>
</template>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  .skeleton {
    position: relative;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    background: #fff;
  }
  .skeleton-nav {
    height: 44px;
    background: #eee;
    margin-bottom: 15px;
  }
  .skeleton-swiper {
    height: 160px;
    background: #eee;
    margin-bottom: 15px;
  }
  .skeleton-box{
    padding: 15px;
  }
  .skeleton-tabs {
    list-style: none;
    padding: 0;
    margin: 0 -15px;
    display: flex;
    flex-wrap: wrap;
  }
  .skeleton-tabs-item {
    width: 25%;
    height: 55px;
    box-sizing: border-box;
    text-align: center;
    margin-bottom: 15px;
  }
  .skeleton-tabs-item span {
    display: inline-block;
    width: 55px;
    height: 55px;
    border-radius: 55px;
    background: #eee;
  }
  .skeleton-banner {
    height: 60px;
    background: #eee;
    margin-bottom: 15px;
  }
  .skeleton-productions {
    height: 20px;
    margin-bottom: 15px;
    background: #eee;
  }
</style>
