<template>
  <div>
    <Loading :show="isShow"></Loading>
    <div class="search">
      <div class="logo">
        <img src="../assets/img/bb8.jpg" />
      </div>
      <div class="search_board">
        <span>
          <input v-model="inputData" autofocus="autofocus" class="s_input" />
        </span>
        <span>
          <input @click="search(inputData)" type="submit" value="搜索" class="s_btn"/>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from './Loading.vue';
export default {
  name: 'Index',
  data () {
    return {
      inputData: '',
      isShow: false,
    }
  },
  components: {
    Loading
  },
  methods: {
    search: function (params) {
      if (params === '') {
        return
      }
      this.isShow = true; 
      var url = location.origin + '/shell'
      // this.$http.get("http://localhost:3412/shell", {params: {'key':params}}).then((response) => { 
      this.$http.get(url, {params: {'key':params}}).then(response => { 
        var res = [];
        if (response.body != null) {
          res = response.body
        }
        this.$router.push({name: 'Details', params:{ data: res, showContent: true}})
        this.isShow = false;
      }, (response) => {
        this.$router.push({name: 'Details', params:{ errorInfo: response.statusText, showError: true}})
        this.isShow = false;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .search {
    position: absolute;
    width: 550px;
    height: 320px;
    left: 50%;
    margin-left: -260px;
    top: 15%;
    margin-top: 10px;
    overflow: hidden;
  }
  .search .logo {
    position: relative;
    left: 45%;
    margin-left: -200px;
    display: block;
    border-radius: 10%;
    width: 350px;
    height: 140px;
    overflow: hidden;
  }
  .search .search_board {
    position: relative;
    left: 50%;
    margin-left: -260px;
    margin-top: 10px;
    width: 520px;
    height: 60px;
  }
  .search .s_input {
    width: 400px;
    height: 40px;
    font-size: 1.2em;
    overflow: scroll;
  }
  .search .s_btn {
    width: 100px;
    height: 40px;
    font-size: 1.2em;
    background-color: #3490ec;
    color: white;
  }
</style>
