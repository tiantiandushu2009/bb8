<template>
  <div>
    <div v-show="show" >
      <div class="weui-mask_transparent center"/>
      <div class="weui-toast">
        <i class="weui-loading weui-icon_toast"></i>
        <!--<p class="weui-toast__content">{{text}}</p> -->
      </div>
    </div>
  </div>
</template>
<script>
export default{
    name: 'Loading',
    props: {
        show: Boolean
    }
  }
</script>
<style lang="stylus" scoped>
.center {
  margin: 0 auto;
}
.weui-mask_transparent{
  width: 1280px;
  height: 100%;
}
</style>