<template>
  <div class="portSelect">
    <div class="titles flex flex-direction-row">
      <div class="title flex-1">大类</div>
      <div class="title flex-1">小类</div>
    </div>
    <div class=" flex flex-direction-row list height100">
      <div class="flex-1 height100">
      
      <div @click="chosen('0',index)" class="item" :class="bigIndex==index?'selected':''" v-for="(item,index) in curBigType">{{item.GPName}}</div> 
      </div>
      <div class="flex-1 height100">
      
      <div @click="chosen('1',index)"  class="item" :class="smallIndex==index?'selected':''"  v-for="(item,index) in curSmallType">{{item.GSName}}</div>
      </div>
    </div>
   
  </div>
</template>

<script>
export default {
  name: 'portSelect',
  data () {
    return {
      bigIndex:0,
      smallIndex:-1,
      goodsTypeList:[],
    }
  },
  computed:{
    curBigType(){
      if (this.goodsTypeList&&this.goodsTypeList.length>0) {
        var obj=JSON.parse( JSON.stringify( this.goodsTypeList ) );
        return obj;
      }
    },
    curSmallType(){
      if (this.bigIndex<0) {
        return [];
      }
      if (this.goodsTypeList&&this.goodsTypeList.length>0) {
        return this.curBigType[this.bigIndex].GSList;
      }
    }
  },
  created(){
    this.getGoodsTypeList();
  },
  methods:{
    getGoodsTypeList(){
      var _this=this;
      this.$http.get(this.$store.state.url+ 'Common/COM_GoodsTypesAllInfo?Type=0')
      .then(function (response) {
            if (response.data.RetCode == 0) {
                _this.goodsTypeList=response.data.RetData;
            }else{
                _this.$Message.error(response.data.RetMsg);
            }
        }).catch(function (error) {
            _this.$Message.error(error);
        });
    },
    chosen(type,index){
      //选择省份
      if (type==0) {
        this.bigIndex=index;
        this.smallIndex=-1;
      }
      //选择市
      else if (type==1) {
        this.smallIndex=index;
        this.$emit("selectgoodstypedone",[
          {
            GPID:this.goodsTypeList[this.bigIndex].GPID,
            GPName:this.goodsTypeList[this.bigIndex].GPName
          },{
            GSID:this.goodsTypeList[this.bigIndex].GSList[this.smallIndex].GSID,
            GSName:this.goodsTypeList[this.bigIndex].GSList[this.smallIndex].GSName
          }]);
      }
    },
    
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/css/common.less';
.portSelect{
  background-color: white;
  
  position: fixed;
  width: 80%;
  height: 100%;
  top:0em;
  z-index: 10;
  .titles{
    padding-left: 0.5em;
    .title{
      padding: 0.5em 0em;
      border-bottom: 1px @grey solid;
    }
  }
  
  .list{
    padding-left: 0.5em;
    
  }
}
.height100{
  height: 100%;
  overflow: scroll;
}
.item{
  margin-top: 1.3em;
}
.selected{
  color:@blue !important;
}
.bottom{
  color: white;
  text-align: center;
  position: absolute;
  bottom: 0em;
  width: 100%;
  background-color: red;
  .reset{
     padding: 0.7em 0em;
     background-color: @blue;
  }
  .confirmSelect{
    padding: 0.7em 0em;
     background-color: @drakBlue;
  }
}
</style>