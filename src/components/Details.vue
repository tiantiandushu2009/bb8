<template>
  <div>
    <Loading :show="isShow"></Loading>
    <div class="head">
      <div class="logo">
        <img src="../assets/img/bb8.jpg"/>
      </div>
      <div class="search_board">
        <span>
          <input v-model="searchstr" autofocus="autofocus" class="s_input"/>
        </span>
        <span>
          <input @click="search(searchstr, selectedPlatform, selectedNamespace)" type="submit" value="搜索" class="s_btn"/>
        </span>
      </div>
    </div>
    <div class="condition max-width center">
      <div class="condition_head">
        <ul>
          <li>刷选条件</li>
          <li></li>
        </ul>
      </div>
      <div class="condition_list">
        <li>
          <div>平台</div>
          <div>
            <select v-model="selectedPlatform">
              <option disabled selected value=''>请选择平台</option>
              <option v-for="platform in platforms" >{{platform}}</option>
            </select>
          </div>
        </li>
        <li>
          <div>命名空间</div>
          <div>
            <select v-model="selectedNamespace">
              <option disabled selected value=''>请选择命名空间</option>
              <option v-for="namespace in namespaces" >{{namespace}}</option>
            </select>
          </div>
        </li>
      </div>
    </div>
    <div class="content max-width center" v-if="showContent">
      <li>
        <div>名称</div>
        <div>平台</div>
        <div>命名空间</div>
        <div>链接</div>
      </li>
      <li v-for="result in filterBySelected" >
        <div>{{result.name}}</div>
        <div>{{result.platform}}</div>
        <div>{{result.namespace}}</div>
        <div><a  :href= "result.shellURL" target="_blank">shell链接</a></div>
      </li>
    </div>
    <div class="content max-width center" v-if="showError">
      <li>
        <div>ERROR:</div>
        <div>{{errorInfo}}</div>
      </li>
    </div>
  </div>
</template>

<script>
import Loading from './Loading.vue';
export default {
  name: 'Details',
  data() {
    return {
      searchstr: "",
      platforms: [],
      namespaces: [],
      selectedPlatform: "",
      selectedNamespace: "",
      datas: [],
      showContent: false,
      showError: false,
      errorInfo: "",
      isShow: false,
    }
  },
  components: {
    Loading
  },
  methods: {
    search: function (searchstr, platform, namespace) {
        if (searchstr === '') {
          return 
        }
        this.isShow = true;
        var url = location.origin + '/shell'
        // this.$http.get("http://localhost:3412/shell", {
        this.$http.get(url, {
          params: {'key':searchstr}
        }).then((response) => { 
          if (response.body == undefined || response.body.length == 0){
             this.showError = true;
             this.errorInfo = 'Not Found';
             this.isShow = false;
             return;
          }
          this.datas = response.body;
          this.showContent = true;
          this.showError = false;
          this.isShow = false;
        }, (response) => {
          this.showContent = false;
          this.showError = true;
          this.errorInfo = response.statusText;
          this.isShow = false;
        });
    }
  },
  computed: {
    filterBySelected: function () {
      var res = [];
      for(var i=0, len = this.datas.length; i < len; i++) {
        if (this.selectedPlatform != "" && this.datas[i].platform != this.selectedPlatform) {  
            continue;
        }
        if (this.selectedNamespace != "" && this.datas[i].namespace != this.selectedNamespace) {
          continue;
        }
        res.push(this.datas[i])
      }
      return res
    }
  },
  mounted() {
    
    if (this.$route.params.showContent != undefined) {
      if (this.$route.params.data.length == 0) {
        this.showError = true;
        this.errorInfo = 'Not Found';
      } else {
        this.datas = this.$route.params.data;
        this.showContent = true;
      }
    }
    if (this.$route.params.showError != undefined) {
      this.showError = true;
      this.errorInfo = this.$route.params.errorInfo;
    }
    for(var i=0, len = this.datas.length; i < len; i++) {
      if (this.platforms.indexOf(this.datas[i].platform) == -1) {
        this.platforms.push(this.datas[i].platform)
      }
      if (this.namespaces.indexOf(this.datas[i].namespace) == -1) {
        this.namespaces.push(this.datas[i].namespace)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .center {
    margin: 0 auto;
  }
  .max-width {
    width: 1280px;
  }
  .head {
    position: relative;
    height: 100px;
  }
  .head .logo {
    position: absolute;
    left: 10%;
    margin-left: 15px;
    top: 50%;
    margin-top: -20px;
    width: 112.5px;
    height: 45px;
    border-radius: 40%;
    display: block;
    overflow: hidden;
  }
  .logo img {
    width: 100%;
    height: 100%;
  }
  .head .search_board {
    position: absolute;
    left: 40%;
    margin-left: 150px;
    top: 50%;
    margin-top: -20px;
    width: 550px;
    height: 50px;
    overflow: hidden;
  }
  .search_board .s_input {
    width: 400px;
    height: 35px;
    font-size: 0.9em;
    overflow: scroll;
  }
  .search_board .s_btn {
    width: 100px;
    height: 40px;
    margin-top: 1px;
    font-size: 0.9em;
    background-color: #3490ec;
    color: white;
  }
  .condition {
    display: table;
  }
  .condition .condition_head {
    display: table-header-group;
    width: auto;
  }
  .condition_head ul {
    display: table-row;
    width: auto;
  }
  .condition_head li {
    display: table-cell;
    height: 40px;
    width: 50px;
		line-height: 40px;
		font-size: 0.9em;
		border-bottom: 1px dashed;
    text-indent: 30px;
	}
  .condition .condition_list {
	  display: table-row-group;
	}
	.condition_list>li {
		display: table-row;
	}
	.condition_list>li>div {
		display: table-cell;
		height: 30px;
		width: 50px;
		line-height: 30px;
		font-size: 0.9em;
		border-bottom: 1px dashed;
		text-indent: 60px;
	}
	.content {
		display: table;
		margin-top: 50px;
	}
	.content>li {
		display: table-row;
	}
	.content>li>div {
		display: table-cell;
		height: 25px;
		line-height: 25px;
		border: 1px solid;
		text-align: center;
	}
</style>
