<template>
  <div class="portSelect">
    <div class="titles flex flex-direction-row">
      <div class="title flex-1">省份</div>
      <div class="title flex-1">市级</div>
    </div>
    <div class=" flex flex-direction-row list height100">
      <div class="flex-1 height100">
      
      <div @click="chosen('0',index)" class="item" :class="proviceIndex==index?'selected':''" v-for="(item,index) in curProvices">{{item.PName}}</div> 
      </div>
      <div class="flex-1 height100">
      
      <div @click="chosen('1',index)"  class="item" :class="cityIndex==index?'selected':''"  v-for="(item,index) in curCitys">{{item.CName}}</div>
      </div>
    </div>
    <div class="flex flex-direction-row bottom">
      <div class="flex-1 reset" @click="reset">重置</div>
      <div class="flex-1 confirmSelect" @click="confirmSelect">确定</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'portSelect',
  data () {
    return {
      proviceIndex:0,
      cityIndex:-1,
    }
  },
  computed:{
    portlist () {
      return this.$store.state.portlist;
    },
    curProvices(){
      if (this.portlist&&this.portlist.length>0) {
        var obj=JSON.parse( JSON.stringify( this.portlist ) );
        return obj;
      }
    },
    curCitys(){
      if (this.proviceIndex<0) {
        return [];
      }
      if (this.portlist&&this.portlist.length>0) {
        return this.curProvices[this.proviceIndex].Citys;
      }
    }
  },
  methods:{
    chosen(type,index){
      //选择省份
      if (type==0) {
        this.proviceIndex=index;
        this.cityIndex=-1;
      }
      //选择市
      else if (type==1) {
        this.cityIndex=index;
        this.$emit("selectportdone",[
          {
            proviceId:this.portlist[this.proviceIndex].PId,
            proviceName:this.portlist[this.proviceIndex].PName
          },{
            cityId:this.portlist[this.proviceIndex].Citys[this.cityIndex].CId,
            cityName:this.portlist[this.proviceIndex].Citys[this.cityIndex].CName
          }]);
      }
    },
    reset(){
      this.proviceIndex=-1;
      this.cityIndex=-1;
    },
    //只选了省 或者 什么都没选
    confirmSelect(){
      if (this.proviceIndex==-1) {
        //什么都没选
        this.$emit("selectportdone",[]);
      }else{
        //只选了省
        this.$emit("selectportdone",[{
          proviceId:this.portlist[this.proviceIndex].PId,
          proviceName:this.portlist[this.proviceIndex].PName
        }]);
      }
      
    }
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