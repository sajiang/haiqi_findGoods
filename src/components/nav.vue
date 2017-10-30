<template>
  <div class="textCenter nav">
    <div class="routers">
      <router-link to="/findGoods" class="findGoods grey" >
        <span class="navText">货盘</span>
      </router-link>
      <router-link to="/findGoodsOwner" class="findGoodsOwner grey">
        <span class="navText">货主</span>
      </router-link>
    </div>
    
    <div class="personalCenter">
      <div @click="toPersonalCenter">
        <img class="personalCenterImg" :src="imgPath+'personalCenter.png'">
      </div>
    </div>
    <v-shade class="shadeIndex6" v-show="shadeShow" @click.native="hideShade()"></v-shade>
    <v-register :show="registerShow"></v-register>
  </div>
</template>

<script>
import shade from '@/components/common/shade'
import register from '@/components/common/register'
export default {
  name: 'nav',
  data () {
    return {
      imgPath:"static/img/",
      shadeShow:false,
      registerShow:false,
    }
  },
  components: {
    'v-shade': shade,
    'v-register': register,
  },
  created(){
    
  },
  methods:{
    hideShade(){
      this.shadeShow=false;
      this.registerShow=false;
    },
    toPersonalCenter(){
      if (this.$store.state.isBind==0) {
        this.shadeShow=true;
        this.registerShow=true;
      }else{
        this.$router.push({ name: 'personalCenter'});
      }
    }
  }
}
</script>

<style lang='less' scoped>
@import '../assets/css/common.less';
.nav{
    z-index: 6;
    position: fixed;
    background: white;
    top: 0;
    width: 100%;
}
.routers{
  height: 0.4rem;
  line-height: 0.4rem;
  border-bottom: 1px solid @lightGrey;

}
.findGoods,.findGoodsOwner{
  margin:0 0.1rem;
}
.navText{
    position: relative;
}
.personalCenter{
  position: absolute;
  top: 0.08rem;
  right: 0.15rem;
  .personalCenterImg{
    width: 0.24rem;
    height: 0.24rem;
    
  }
}

.router-link-exact-active,.router-link-active{
  color: @blue;
  :after
  { 
    content:"";
    display: inline-block;
    position: absolute;
    left: 0rem;
    bottom: -0.11rem;
    height: 4px;
    width: 0.32rem;
    background-color: @blue;
  }
}
.shadeIndex6{
  z-index: 6;
}
</style>
