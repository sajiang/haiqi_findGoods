<template>
	<div class="findGoods">
		<div class="filter grey flex flex-direction-row">
			<div class="flex-1 ellipsis" @click="showSearchOption('startPort')">
				<span :class="searchOption.startPort.show||searchOption.startPort.showstr!=='装货港'?'blue':''">{{searchOption.startPort.showstr}}</span>
				<img class="arrow" :src="searchOption.startPort.show?imgPath+'arrowUp.png':imgPath+'arrowDown.png'">
			</div>
			<div class="flex-1 ellipsis" @click="showSearchOption('endPort')">
				<span :class="searchOption.endPort.show||searchOption.endPort.showstr!=='卸货港'?'blue':''">{{searchOption.endPort.showstr}}</span>
				<img class="arrow" :src="searchOption.endPort.show?imgPath+'arrowUp.png':imgPath+'arrowDown.png'">
			</div>
			<div class=" ellipsis" @click="showSearchOption('weightRange')" :class="searchOption.weightRange.showstr!=='货量'?'flex-1d5':'flex-1'">
				<span :class="searchOption.weightRange.show||searchOption.weightRange.showstr!=='货量'?'blue':''">{{searchOption.weightRange.showstr}}</span>
				<img class="arrow" :src="searchOption.weightRange.show?imgPath+'arrowUp.png':imgPath+'arrowDown.png'">
			</div>
			<div class=" ellipsis" @click="showSearchOption('dateRange')" :class="searchOption.dateRange.showstr!=='日期'?'flex-1d5':'flex-1'">
				<span :class="searchOption.dateRange.show||searchOption.dateRange.showstr!=='日期'?'blue':''">{{searchOption.dateRange.showstr}}</span>
				<img class="arrow" :src="searchOption.dateRange.show?imgPath+'arrowUp.png':imgPath+'arrowDown.png'">
			</div>
		</div>
		<div class="searchOption">
			
			<!-- 货量 -->
			<div class="weightRange"  v-show="searchOption.weightRange.show">
				<input class="normalInput" placeholder="输入吨数" type="number" name="" v-model="searchOption.weightRange.theStartVal">
				<span class="grey">-</span>
				<input class="normalInput" placeholder="输入吨数" type="number" name="" v-model="searchOption.weightRange.theEndVal">
				<span class="blueBorderBtn" @click="clearWeightRange">清空</span>
				<span class="blueBtn" @click="replaceWeightRange">搜索</span>
			</div>
			<!-- 日期 -->
			<div class="dateRange"  v-show="searchOption.dateRange.show">
				<input class="normalInput" placeholder="输入日期" type="date" name="" v-model="searchOption.dateRange.startDate">
				<span class="grey">-</span>
				<input class="normalInput" placeholder="输入日期" type="date" name="" v-model="searchOption.dateRange.endDate">
				<span class="blueBorderBtn" @click="clearDateRange">清空</span>
				<span class="blueBtn" @click="replaceDateRange">搜索</span>
			</div>
		</div>
		<div class="goodsList" v-infinite-scroll="loadMore"
			 infinite-scroll-disabled="notLoading"
			 infinite-scroll-distance="10"
			 infinite-scroll-immediate-check="false">
			<div class="goodsItem" v-for="(item,index) in goodsList" @click="toCompanyMainPage(item.GoodsOwnerId)">
				<div>
					<span class="blue inlineBlock mgt10">{{item.GoodsOwnerName}}</span>
					<a @click.stop="" class="tel" :href="'tel:'+item.GoodsOwnerPhone"><img :src="imgPath+'tel.png'"></a>
				</div>
				<div class="flowDirection">
					<div class="ports">
						<div class="inlineBlock font16 startPort">{{item.StartPortName}}</div>
						<div class="inlineBlock arrow">
							<div class="font12 goodsType">{{item.GoodsTypeName}}</div>
							<div class="imgWrap"><img :src="imgPath+'arrowRight.png'" class="arrowRight"></div>
							<div class="font12">{{item.GoodsVolume}} ± {{item.AddVolume}}</div>
						</div>
						<div class="inlineBlock font16 endPort">{{item.EndPortName}}</div>
					</div>
					
					<div class="inlineBlock font16 blue time">{{item.LoadDate}}±{{item.LoadAddDay}}</div>
				</div>
				<div class="font12 grey flex flex-direction-row">
					<span class="flex-1"><img class="dot" :src="imgPath+'dot.png'"/>已注册{{item.RegNum}}</span>
					<span class="flex-1"><img class="dot" :src="imgPath+'dot.png'"/>发盘{{item.PubNum}}条</span>
					<span class="flex-1"><img class="dot" :src="imgPath+'dot.png'"/>被联系{{item.ContactNum}}次</span>
					<span class="fr publishedTime">{{item.EditDate}}</span>
				</div>
			</div>
		</div>
		<div class="addGoods">
			<img @click="toAddGoods" :src="imgPath+'addGoods.png'">
		</div>
		
		<v-shade :class="isHighShadowIndex?'shadeIndex6':'shadeIndex4'" v-show="shadeShow" @click.native="hideShade()"></v-shade>
		<!-- 装货港选项 -->
		<v-port-select v-show="searchOption.startPort.show" v-on:selectportdone="replaceStartPort"></v-port-select>
		<!-- 卸货港选项 -->
		<v-port-select v-show="searchOption.endPort.show" v-on:selectportdone="replaceEndPort" ></v-port-select>
	</div>
</template>

<script>
import shade from '@/components/common/shade'
import portSelect from '@/components/common/portSelect'

export default {
  name: 'findGoods',
  data () {
    return {
      imgPath:"static/img/",
      shadeShow:false,
      headerZIndex:4,
      isHighShadowIndex:false,
      searchOption:{
        startPort:{
          showstr:"装货港",
          StartPID: 0,
          StartCID: 0,
          show:false,
          curIndex:-1,
        },
        endPort:{
          showstr:"卸货港",
          show:false,
          EndCID:0,
          EndPID:0,
        },
        weightRange:{
          showstr:"货量",
          show:false,
          theStartVal:"",
          theEndVal:""
        },
        dateRange:{
          showstr:"日期",
          startDate:"",
          endDate:"",
          show:false,
        },
      },
      goodsList:[],
      pageIndex:1,
      totalPage:0,
      notLoading:false,
      portList:[]
    }
  },
  components: {
    'v-shade': shade,
    'v-port-select':portSelect,
  },
  created(){
  	this.getGoodsList();
  },
  methods:{
  	loadMore(){
  		this.pageIndex++;
  		this.getGoodsList();
  	},
  	getGoodsList(){
  		var _this=this;
  		var postData={
  			Page: this.pageIndex,
  			PageSize:10,
  			StartPID:this.searchOption.startPort.StartPID,
  			StartCID:this.searchOption.startPort.StartCID,
  			EndPID:this.searchOption.endPort.EndPID,
  			EndCID:this.searchOption.endPort.EndCID,
  			MinVolume: this.searchOption.weightRange.theStartVal,
  			MaxVolume:this.searchOption.weightRange.theEndVal,
  			StartTime: this.searchOption.dateRange.startDate,
  			EndTime:this.searchOption.dateRange.endDate,
  			OpenId:this.$store.state.openId
  		};
  		this.$http.post(this.$store.state.url+'Goods/GOO_GoodsList',postData)
  		.then(function(response){
  			_this.totalPage=response.data.RetData.TotalPage;
  			if (_this.totalPage==_this.pageIndex) {
  				_this.notLoading=true;
  			}
  			if (_this.pageIndex>1) {
  				_this.goodsList=_this.goodsList.concat(response.data.RetData.GoodsList);
  			}else{
  				_this.goodsList=response.data.RetData.GoodsList;
  			}
  			
  		})
  		.catch(function(error){
  			console.log(error);
  		});
  	},
  	showSearchOption(name) {
      //如果点击部分已经选中
      if (this.searchOption[name].show) {
        this.hideShade();
        return;
      }
      for (var key in this.searchOption) {
        this.searchOption[key].show=false;
      }
      this.searchOption[name].show=true;
      this.shadeShow=true;
      //如果是空船港口，变化层叠顺序
      if (name=="startPort"||name=="endPort") {
        this.isHighShadowIndex=true;
      }else{
        this.isHighShadowIndex=false;
      }
    },
    replaceStartPort(portInfo){
    	this.shadeShow=false;
    	this.searchOption.startPort.show=false;
    	//市有值
    	if(portInfo.length>1){
	        this.searchOption.startPort.showstr=portInfo[1].cityName;
        	this.searchOption.startPort.StartCID=portInfo[1].cityId;
        	this.searchOption.startPort.StartPID=portInfo[0].proviceId;
	    }
	    //只有省份有值
	    else if (portInfo.length>0) {
	        this.searchOption.startPort.showstr=portInfo[0].proviceName;
        	this.searchOption.startPort.StartPID=portInfo[0].proviceId;
        	this.searchOption.startPort.StartCID=0;
	    }else{
	    	this.searchOption.startPort.showstr="装货港";
	        this.searchOption.startPort.StartPID=0;
	        this.searchOption.startPort.StartCID=0;
	    }
	    this.pageIndex=1;
	    this.getGoodsList();
    },
    replaceEndPort(portInfo){
    	this.shadeShow=false;
    	this.searchOption.endPort.show=false;
    	//市有值
    	if(portInfo.length>1){
	        this.searchOption.endPort.showstr=portInfo[1].cityName;
        	this.searchOption.endPort.EndCID=portInfo[1].cityId;
        	this.searchOption.endPort.EndPID=portInfo[0].proviceId;
	    }
	    //只有省份有值
	    else if (portInfo.length>0) {
	        this.searchOption.endPort.showstr=portInfo[0].proviceName;
	        this.searchOption.endPort.EndCID=0;
        	this.searchOption.endPort.EndPID=portInfo[0].proviceId;
	    }else{
	    	this.searchOption.endPort.showstr="卸货港";
	        this.searchOption.endPort.EndCID=0;
        	this.searchOption.endPort.EndPID=0;
	    }
	    this.pageIndex=1;
	    this.getGoodsList();
    },
    replaceWeightRange(){
    	if (parseInt(this.searchOption.weightRange.theStartVal)<parseInt(this.searchOption.weightRange.theEndVal)) {
			this.searchOption.weightRange.showstr=this.searchOption.weightRange.theStartVal+"-"+this.searchOption.weightRange.theEndVal;
			this.searchOption.weightRange.show=false;
			this.shadeShow=false;
			this.pageIndex=1;
	    	this.getGoodsList();
		}else{
			this.$Message.error('起始吨位不能大于截止吨位');
		}
    },
    replaceDateRange(){
    	var startDateTime=new Date(this.searchOption.dateRange.startDate).getTime();
    	var endDateTime=new Date(this.searchOption.dateRange.endDate).getTime();
    	if (startDateTime>endDateTime&&startDateTime!=0&&endDateTime!=0) {
    		this.$Message.error('开始时间不能大于结束时间');
		}else{
			this.searchOption.dateRange.showstr=this.searchOption.dateRange.startDate.substr(5)+"~"+this.searchOption.dateRange.endDate.substr(5);
			this.searchOption.dateRange.show=false;
			this.shadeShow=false;
			this.pageIndex=1;
	    	this.getGoodsList();
		}
    },
    clearWeightRange(){
    	this.searchOption.weightRange.showstr="货量";
    	this.searchOption.weightRange.theStartVal="";
    	this.searchOption.weightRange.theEndVal="";
    	this.searchOption.weightRange.show=false;
    	this.shadeShow=false;
    	this.pageIndex=1;
	    this.getGoodsList();
    },
    clearDateRange(){
    	this.searchOption.dateRange.showstr="日期";
    	this.searchOption.dateRange.startDate="";
    	this.searchOption.dateRange.endDate="";
    	this.searchOption.dateRange.show=false;
    	this.shadeShow=false;
    	this.pageIndex=1;
	    this.getGoodsList();
    },
    toCompanyMainPage(goodsOwnerId){
    	this.$router.push({ name: 'companyMainPage', params: { goodsOwnerId }});
    },
    toAddGoods(){
    	this.$router.push({ name: 'addGoods'});
    },
    hideShade(){
      this.shadeShow=false;
      for (var key in this.searchOption) {
        this.searchOption[key].show=false;
      }
    },
  	
    
  }
}
</script>

<style lang='less' scoped>
@import '../assets/css/common.less';
.shadeIndex6{
	z-index: 6;
}
.shadeIndex4{
	z-index: 4;
}
.filter{
	height: 0.45rem;
	line-height: 0.45rem;
	text-align: center;
	z-index:5;
	background-color: white;
	position: fixed;
    width: 100%;
    top: 0.4rem;
	.arrow{
		width: 0.1rem;
		height: 0.1rem;
	}
}
.searchOption{
	position: fixed;
	top: 0.85rem;
	width: 100%;
	z-index: 5;
	.weightRange,.dateRange{
		border-top: 1px solid @lightGrey;
		background-color: white;
		padding: 0.1rem 0.1rem;
		width: 100%;
		box-sizing:border-box;
	}
	.normalInput{
		width: 30%;
		border: 1px solid @lightGrey;
		.rounded-corners();
		padding-left: 0.1rem;
		height: 0.3rem;
		line-height: 0.3rem;
		box-shadow: none;
	}
	.normalInput[type='date']{
	}
	.blueBtn{
		color: white;
		background-color: @blue;
		border:1px solid @blue;
		display: inline-block;
		width: 15%;
		margin: 0 0.02rem;
		padding: 0.03rem;
		.rounded-corners();
		text-align: center;
	}
	.blueBorderBtn{
		color:  @blue;
		background-color: white;
		display: inline-block;
		border:1px solid @blue;
		width: 15%;
		margin: 0 0.02rem;
		padding: 0.03rem;
		.rounded-corners();
		text-align: center;
	}
}
.goodsList{
	background-color: #eee;
	padding:0.12rem 0;
	margin-top: 0.85rem;
	.goodsItem{
		background-color: white;
		margin:0 0.1rem 0.1rem 0.1rem ;
		padding-left: 0.1rem;
		padding-bottom: 0.1rem;
		.tel{
			width: 0.51rem;
			height: 0.45rem;
			float: right;
			img{float: right;width: 0.32rem;
			height: 0.28rem;}
		}
		.flowDirection{
			position: relative;
			top: -0.1rem;
			height: 0.5rem;
			.ports{
				width:70%;text-align:center;position:relative;
				.startPort{
					position: absolute;
					top: 0.2rem;
					left: 0rem;
				}
				.endPort{
					position: absolute;
					top: 0.2rem;
					right: 0rem;
				}
				.arrow{
					text-align: center;
					.goodsType{
						position: relative;
						top: 0.1rem;
					}
					.arrowRight{
						width: 0.82rem;
					}
				}
			}
			.time{
				position: absolute;
				right: 0.05rem;
				top: 0.2rem;
			}
			
		}
		.dot{
			width: 0.04rem;
			height: 0.04rem;
			vertical-align: middle;
			margin:0 0.05rem 0.02rem 0;
		}
		.publishedTime{
			margin-right: 0.1rem;
			width: 0.6rem;
			text-align: right;
			display: inline-block;
		}
		
	}
}
.addGoods{
	position: fixed;
	bottom: 0rem;
	left: 50%;
	margin-left: -0.25rem;
	img{
		width: 0.5rem;
		height: 0.5rem;
	}
}
</style>
