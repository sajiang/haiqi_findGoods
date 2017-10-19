<template>
	<div class="findGoodsOwner">
		<div class="filter grey flex flex-direction-row">
			<div class="flex-1 ellipsis" @click="showSearchOption('shippingLine')">
				<span :class="searchOption.shippingLine.show||searchOption.shippingLine.showstr!=='航线'?'blue':''">{{searchOption.shippingLine.showstr}}</span>
				<img class="arrow" :src="searchOption.shippingLine.show?imgPath+'arrowUp.png':imgPath+'arrowDown.png'">
			</div>
			<div class="flex-1 ellipsis" @click="showSearchOption('goodsType')">
				<span :class="searchOption.goodsType.show||searchOption.goodsType.showstr!=='货种'?'blue':''">{{searchOption.goodsType.showstr}}</span>
				<img class="arrow" :src="searchOption.goodsType.show?imgPath+'arrowUp.png':imgPath+'arrowDown.png'">
			</div>
			<div class="flex-1 ellipsis" @click="showSearchOption('weightRange')">
				<span :class="searchOption.weightRange.show||searchOption.weightRange.showstr!=='货量'?'blue':''">{{searchOption.weightRange.showstr}}</span>
				<img class="arrow" :src="searchOption.weightRange.show?imgPath+'arrowUp.png':imgPath+'arrowDown.png'">
			</div>
			<div class="keywordSearchWrap" @click="showKeywordSearch">
				<span class="broder">
					<img class="keywordSearch" :src="imgPath+'search.png'">
				</span>
			</div>
		</div>
		<div class="searchOption">
			<!-- 航线 -->
			<div class="shippingLine"  v-show="searchOption.shippingLine.show">
				<span class="normalInput" :class="searchOption.shippingLine.startPortName?'':'grey'"  @click="showPortSelect('startPort')">{{searchOption.shippingLine.startPortName?searchOption.shippingLine.startPortName:"请选择港口"}}</span>
				<span class="grey">-</span>
				<span class="normalInput" :class="searchOption.shippingLine.endPortName?'':'grey'"   @click="showPortSelect('endPort')">{{searchOption.shippingLine.endPortName?searchOption.shippingLine.endPortName:"请选择港口"}}</span>
				<span class="blueBtn" @click="clearShippingLine">清空</span>
				<span class="blueBtn" @click="replaceShippingLine">搜索</span>
			</div>
			<!-- 货种 -->
			<div class="goodsType"  v-show="searchOption.goodsType.show">
				<div v-for="(item,index) in goodsTypes" class="goodsTypeItemWrap">
					<div class="goodsTypeItem" :class="searchOption.goodsType.goodsTypeIndexes.indexOf(index)>-1?'goodsTypeItemChosen':''" @click="replaceGoodsType(index)">{{item.GPName}}</div>
				</div>
				
			</div>
			<!-- 货量 -->
			<div class="weightRange"  v-show="searchOption.weightRange.show">
				<input class="normalInput" placeholder="输入吨数" type="number" name="" v-model="searchOption.weightRange.theStartVal" >
				<span class="grey">-</span>
				<input class="normalInput" placeholder="输入吨数" type="number" name="" v-model="searchOption.weightRange.theEndVal">
				<span class="blueBtn" @click="clearWeightRange">清空</span>
				<span class="blueBtn" @click="replaceWeightRange">搜索</span>
			</div>
		</div>
		<div class="banner">
			找货戳以下货主试试
		</div>
		<div class="goodsCompanyList">
			<div class="goodsCompany" v-for="(item,index) in goodsOwnerList">
				<div class="clearfix titleInfo">
					<div class="fl mgr5">
						<img class="logo" :src="imgPath+'logo.png'">
					</div>
					<div class="fl mgl5">
						<div class="font16">{{item.Company}}</div>
						<div class="font12 grey mgt5">
							<span>已注册{{item.RegNum}}</span>
							<span class="mgl5">通话{{item.ContactNum}}次</span>
						</div>
					</div>
					<div class="fr font12 grey" @click="showCustomerServicePhone">纠错</div>
				</div>
				<div class="businessIntroduction">
					<div>
						<span class="title">主营航线：</span>
						<span class="content">{{item.MainRoute}}</span>
					</div>
					<div>
						<span class="title">主营货种：</span>
						<span class="content">{{item.MainGoods}}</span>
					</div>
					<div>
						<span class="title">主营吨位：</span>
						<span class="content">{{item.MainTon}}</span>
					</div>
				</div>
				<div class="historyGoods" @click="toHistoryCompany(item.CompanyId)">
					<span>已发货盘</span>
					<span>{{item.PubNum}}</span>
					<span class="grey fr"><img class="arrowRightIcon" :src="imgPath+'arrowRightIcon.png'"></span>
				</div>
				<div class="contact">
					<a :href="'tel:'+contacts.GoodsOwnerPhone" class="telInfo" v-for="contacts in item.GoodsOwnerList">
						<span class="verticalMiddle">{{contacts.GoodsOwnerName}}</span>
						<img class="tel verticalMiddle" :src="imgPath+'tel1.png'">
						<span class="grey mgl5 mgr5" v-show="index<1">|</span>
					</a>
				</div>
			</div>
		</div>
		<!-- 客服电话 纠错 -->
		<div class="customerServicePhonePanel" v-show="customerServicePhoneShow">
			<div class="title font15">联系客服修改</div>
			<div class="blue font16">400-115-1356</div>
			<div class="callBtn font15"><a href="tel:400-115-1356">拨打</a></div>
		</div>
		<!-- 关键字搜索 -->
		<div class="keywordSearchPanel" v-show="keywordSearchShow">
			<div class="clearfix">
				<span class="searchBox">
					<span><img :src="imgPath+'searchSmall.png'"></span>
					<input type="" name="" placeholder="公司名称搜索" v-model="keyword" @input="preKeywordSearch">
					<img :src="imgPath+'delete.png'" @click="keyword=''">
				</span>
				<span class="fr cancel" @click="keywordSearchShow=false">取消</span>
			</div>
			<div class="waitToSelectCompanyListWrap" v-show="waitToSelectCompanyListShow">
				<div class="waitToSelectCompanyList">
					<div class="waitToSelectCompany" @click="keywordSearch(item.CompanyName)" v-for='item in waitToSelectCompanyList'>{{item.CompanyName}}</div>
				</div>
			</div>
			
			<div class="historySearch">
				<div>历史搜索</div>
				<div>
					<span class="historySpan" v-for="item in historySearchGoodserKeywordRecord" @click="quickSearch(item)">{{item}}</span>
				</div>
			</div>
		</div>
		<v-shade :class="isHighShadowIndex?'shadeIndex6':'shadeIndex4'" v-show="shadeShow" @click.native="hideShade()"></v-shade>
		<!-- 装货港选项 -->
		<v-port-select v-show="searchOption.shippingLine.startPortShow" v-on:selectportdone="replaceStartPort" ></v-port-select>
		<!-- 卸货港选项 -->
		<v-port-select v-show="searchOption.shippingLine.endPortShow" v-on:selectportdone="replaceEndPort"></v-port-select>
	</div>
</template>
<script>
import shade from '@/components/common/shade'
import portSelect from '@/components/common/portSelect'

export default {
  name: 'findGoods',
  data () {
    return {
      imgPath:"../../static/img/",
      shadeShow:false,
      customerServicePhoneShow:false,
      keywordSearchShow:false,
      keyword:'',
      keywordId:0,
      headerZIndex:4,
      isHighShadowIndex:false,
      searchOption:{
		shippingLine:{
		  showstr:"航线",
		  show:false,
		  startPortId:'',
		  endPortId:'',
		  startPortName:"",
		  endPortName:"",
		  startPortShow:false,
		  endPortShow:false
		},
		goodsType:{
		  showstr:"货种",
		  show:false,
		  goodsTypeIndexes:[],
		},
		weightRange:{
		  showstr:"货量",
		  show:false,
		  theStartVal:"",
		  theEndVal:""
		}
      },
      goodsOwnerList:[],
      pageIndex:1,
      totalPage:0,
      notLoading:false,
      goodsTypes:[],
      portList:[],
      waitToSelectCompanyList:[],
      waitToSelectCompanyListShow:false,
      historySearchGoodserKeywordRecord:[],
    }
  },
  components: {
    'v-shade': shade,
    'v-port-select':portSelect,
  },
  created(){
    if (window.localStorage.historySearchGoodserKeywordRecord) {
      this.historySearchGoodserKeywordRecord=window.localStorage.historySearchGoodserKeywordRecord.split(",");
    }
    this.getGoodsOwnerList();
    this.getGoodsTypes();
  },
  methods:{
  	loadMore(){
  		this.pageIndex++;
  		this.getGoodsOwnerList();

  	},
  	getGoodsOwnerList(){
  		var _this=this;
  		var GPIDs=[];
  		for(var i =0 ;i <this.searchOption.goodsType.goodsTypeIndexes.length;i++){
  			GPIDs.push(this.goodsTypes[this.searchOption.goodsType.goodsTypeIndexes[i]].GPID)
  		}
  		var postData={
  			Page: this.pageIndex,
  			PageSize:10,
  			StartRouteName:this.searchOption.shippingLine.startPortName,
  			EndRouteName:this.searchOption.shippingLine.endPortName,
  			GPID: GPIDs,
  			CompanyId:this.keywordId,
  			MinVolume:this.searchOption.weightRange.theStartVal,
  			MaxVolume:this.searchOption.weightRange.theEndVal,
  			OpenId:this.$store.state.openId
  		};
  		this.$http.post(this.$store.state.url+'Goods/GOO_GoodserCompanyList',postData)
  		.then(function(response){
  			_this.totalPage=response.data.RetData.TotalPage;
  			if (_this.totalPage==_this.pageIndex) {
  				_this.notLoading=true;
  			}
  			if (_this.pageIndex>1) {
  				_this.goodsOwnerList=_this.goodsList.concat(response.data.RetData.GoodserCompanyList);
  			}else{
  				_this.goodsOwnerList=response.data.RetData.GoodserCompanyList;
  			}
  			
  		})
  		.catch(function(error){
  			console.log(error);
  		});
  	},
  	getGoodsTypes(){
  		var _this=this;
  		this.$http.get(this.$store.state.url+ 'Common/COM_GoodsTypesAllInfo?Type=1')
  		.then(function (response) {
            if (response.data.RetCode == 0) {
                _this.goodsTypes=response.data.RetData;
            }else{
                _this.$Message.error(response.data.RetMsg);
            }
        }).catch(function (error) {
            _this.$Message.error(error);
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
		this.isHighShadowIndex=false;
    },
    showPortSelect(type){
    	this.shadeShow=true;
    	this.isHighShadowIndex=true;
    	if (type=="startPort") {
    		this.searchOption.shippingLine.startPortShow=true;
    	}else if (type=="endPort") {
    		this.searchOption.shippingLine.endPortShow=true;
    	}
    },
    replaceStartPort(portInfo){
    	this.shadeShow=false;
    	this.searchOption.shippingLine.startPortShow=false;
    	//市有值
    	if(portInfo.length>1){
	        this.searchOption.shippingLine.startPortId=portInfo[1].cityId
        	this.searchOption.shippingLine.startPortName=portInfo[1].cityName;
	    }
	    //只有省份有值
	    else if (portInfo.length>0) {
	    	this.searchOption.shippingLine.startPortId=portInfo[0].proviceId;
        	this.searchOption.shippingLine.startPortName=portInfo[0].proviceName;
	    }else{
	    	this.searchOption.shippingLine.startPortName="";
	        this.searchOption.shippingLine.startPortId==0;
	    }
    },
    replaceEndPort(portInfo){
    	this.shadeShow=false;
    	this.searchOption.shippingLine.endPortShow=false;
    	//市有值
    	if(portInfo.length>1){
	        this.searchOption.shippingLine.endPortId=portInfo[1].cityId;
        	this.searchOption.shippingLine.endPortName=portInfo[1].cityName;
	    }
	    //只有省份有值
	    else if (portInfo.length>0) {
	    	this.searchOption.shippingLine.endPortId=portInfo[0].proviceId;
        	this.searchOption.shippingLine.endPortName=portInfo[0].proviceName;
	    }else{
	    	this.searchOption.shippingLine.endPortName="";
	        this.searchOption.shippingLine.endPortId==0;
	    }
    },
    replaceGoodsType(index){
    	//如果已经存在，则反选
    	if(this.searchOption.goodsType.goodsTypeIndexes.indexOf(index)>-1){
    		this.searchOption.goodsType.goodsTypeIndexes.splice(this.searchOption.goodsType.goodsTypeIndexes.indexOf(index),1);
    	}else{
    		this.searchOption.goodsType.goodsTypeIndexes.push(index);
    	}
    	this.searchOption.goodsType.showstr='';
    	for (var i = this.searchOption.goodsType.goodsTypeIndexes.length - 1; i >= 0; i--) {
    		this.searchOption.goodsType.showstr+=this.goodsTypes[this.searchOption.goodsType.goodsTypeIndexes[i]].GPName;
    	}
    	if (this.searchOption.goodsType.showstr=='') {
    		this.searchOption.goodsType.showstr="货种";
    	}
    	this.getGoodsOwnerList();
    },
    replaceWeightRange(){
    	if (parseInt(this.searchOption.weightRange.theStartVal)<parseInt(this.searchOption.weightRange.theEndVal)) {
			this.searchOption.weightRange.showstr=this.searchOption.weightRange.theStartVal+"-"+this.searchOption.weightRange.theEndVal;
			this.searchOption.weightRange.show=false;
			this.shadeShow=false;
		}else{
			this.$Message.error('起始吨位不能大于截止吨位');
		}
		this.getGoodsOwnerList();
    },
    replaceShippingLine(){
    	if (this.searchOption.shippingLine.startPortName==""&&this.searchOption.shippingLine.endPortName=="") {
    		this.$Message.error('起始港和目的港不能都为空');
    	}else{
    		this.searchOption.shippingLine.showstr=this.searchOption.shippingLine.startPortName+"-"+this.searchOption.shippingLine.endPortName;
    		this.shadeShow=false;
    		this.searchOption.shippingLine.show=false;
    	}
    	this.getGoodsOwnerList();
    },
    clearShippingLine(){
    	this.searchOption.shippingLine.startPortName="";
	    this.searchOption.shippingLine.startPortId=0;
    	this.searchOption.shippingLine.endPortName="";
	    this.searchOption.shippingLine.endPortId=0;
	    this.searchOption.shippingLine.showstr='航线';
	    this.shadeShow=false;
    	this.searchOption.shippingLine.show=false;
    	this.getGoodsOwnerList();
	},
    clearWeightRange(){
    	this.searchOption.weightRange.showstr="货量";
    	this.searchOption.weightRange.theStartVal="";
    	this.searchOption.weightRange.theEndVal="";
    	this.getGoodsOwnerList();
    },
    hideShade(){
		this.shadeShow=false;
		for (var key in this.searchOption) {
			this.searchOption[key].show=false;
		}
		this.searchOption.shippingLine.startPortShow=false;
		this.searchOption.shippingLine.endPortShow=false;
		this.customerServicePhoneShow=false;
    },
    showKeywordSearch(){
    	this.keywordSearchShow=true;
    	this.keyword="";
    },
    preKeywordSearch(){
    	var _this=this;
  		this.$http.post(this.$store.state.url+ 'Goods/GOO_GoodserCompanyListSearchItem',{SearchWord:this.keyword})
  		.then(function (response) {
            if (response.data.RetCode == 0) {
                _this.waitToSelectCompanyList=response.data.RetData;
                _this.waitToSelectCompanyListShow=true;
            }else{
                _this.$Message.error(response.data.RetMsg);
                _this.waitToSelectCompanyList=[];
            }
        }).catch(function (error) {
            _this.$Message.error(error);
        });
    },
    keywordSearch(keyword){
    	this.waitToSelectCompanyListShow=false;
    	this.keyword=keyword;
    	this.recordAndSearch();
    },
    recordAndSearch(){
    	//record
		if (window.localStorage.historySearchGoodserKeywordRecord) {
			//搜索的值在历史记录中有出现
			if (window.localStorage.historySearchGoodserKeywordRecord.indexOf(this.keyword)>-1) {
				//排在第一
				var historySearchGoodserKeywordRecord=window.localStorage.historySearchGoodserKeywordRecord.split(",");
				var index=historySearchGoodserKeywordRecord.indexOf(this.keyword);
				historySearchGoodserKeywordRecord.splice(index,1);
				historySearchGoodserKeywordRecord.unshift(this.keyword);
				window.localStorage.historySearchGoodserKeywordRecord=historySearchGoodserKeywordRecord.join(",");
			}else{
				var historySearchGoodserKeywordRecord=window.localStorage.historySearchGoodserKeywordRecord.split(",");
				if (historySearchGoodserKeywordRecord.length<10) {
					window.localStorage.historySearchGoodserKeywordRecord=this.keyword+','+window.localStorage.historySearchGoodserKeywordRecord;
				}else{
					window.localStorage.historySearchGoodserKeywordRecord=this.keyword+','+window.localStorage.historySearchGoodserKeywordRecord;
					historySearchGoodserKeywordRecord=window.localStorage.historySearchGoodserKeywordRecord.split(",");
					historySearchGoodserKeywordRecord.splice(-1,1);
					window.localStorage.historySearchGoodserKeywordRecord=historySearchGoodserKeywordRecord.join(",");
				}
			}
		}else{
			window.localStorage.historySearchGoodserKeywordRecord=this.keyword;
		}
		this.historySearchGoodserKeywordRecord=window.localStorage.historySearchGoodserKeywordRecord.split(",");
		//search
		var _this=this;
		this.$http.post(this.$store.state.url+ 'Goods/GOO_GoodserCompanyAccurateSearch',{CompanyName:this.keyword})
  		.then(function (response) {
            if (response.data.RetCode == 0) {
                _this.goodsOwnerList=[];
                _this.goodsOwnerList.push(response.data.RetData);
            }else{
                _this.$Message.error(response.data.RetMsg);
                _this.goodsOwnerList=[];
            }
        }).catch(function (error) {
            _this.$Message.error(error);
        });
		this.keywordSearchShow=false;
		//清空之前的选项,但是不重新搜索
		this.searchOption.goodsType.showstr="货种";
		this.searchOption.goodsType.goodsTypeIndexes=[];
		this.searchOption.shippingLine.startPortName="";
	    this.searchOption.shippingLine.startPortId=0;
    	this.searchOption.shippingLine.endPortName="";
	    this.searchOption.shippingLine.endPortId=0;
	    this.searchOption.shippingLine.showstr='航线';
	    this.searchOption.weightRange.showstr="货量";
    	this.searchOption.weightRange.theStartVal="";
    	this.searchOption.weightRange.theEndVal="";
    },
    quickSearch(item){
		this.keyword=item;
		var historySearchGoodserKeywordRecord=window.localStorage.historySearchGoodserKeywordRecord.split(",");
		var index=historySearchGoodserKeywordRecord.indexOf(this.keyword);
		historySearchGoodserKeywordRecord.splice(index,1);
		historySearchGoodserKeywordRecord.unshift(this.keyword);
		window.localStorage.historySearchGoodserKeywordRecord=historySearchGoodserKeywordRecord.join(",");
		this.historySearchGoodserKeywordRecord=window.localStorage.historySearchGoodserKeywordRecord.split(",");
		var _this=this;
		this.$http.post(this.$store.state.url+ 'Goods/GOO_GoodserCompanyAccurateSearch',{CompanyName:this.keyword})
  		.then(function (response) {
            if (response.data.RetCode == 0) {
                _this.goodsOwnerList=[];
                _this.goodsOwnerList.push(response.data.RetData);
            }else{
                _this.$Message.error(response.data.RetMsg);
                _this.goodsOwnerList=[];
            }
        }).catch(function (error) {
            _this.$Message.error(error);
        });
		this.keywordSearchShow=false;
		//清空之前的选项,但是不重新搜索
		this.searchOption.goodsType.showstr="货种";
		this.searchOption.goodsType.goodsTypeIndexes=[];
		this.searchOption.shippingLine.startPortName="";
	    this.searchOption.shippingLine.startPortId=0;
    	this.searchOption.shippingLine.endPortName="";
	    this.searchOption.shippingLine.endPortId=0;
	    this.searchOption.shippingLine.showstr='航线';
	    this.searchOption.weightRange.showstr="货量";
    	this.searchOption.weightRange.theStartVal="";
    	this.searchOption.weightRange.theEndVal="";
    },
    showCustomerServicePhone(){
    	this.customerServicePhoneShow=true;
    	this.shadeShow=true;
    	this.isHighShadowIndex=true;
    },
    toHistoryCompany(companyId){
        this.$router.push({ name: 'historyCompany', params: { companyId}});
    }
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
	.keywordSearchWrap{
		width: 0.5rem;
		text-align: center;
		.broder{
			padding:0 0.15rem;
			border-left: 1px solid @grey;
			.keywordSearch{
				width: 0.16rem;
				height: 0.16rem;
			}
		}
		
	}
	
}
.searchOption{
	position: fixed;
	top: 0.85rem;
	width: 100%;
	z-index: 5;
	.goodsType{
		background-color: white;
		border-top: 1px solid @lightGrey;
		padding-bottom: 0.1rem;
		.goodsTypeItemWrap{
			display: inline-block;
			position: relative;
		}
		.goodsTypeItem{
			
			border: 1px solid @lightGrey;
			.rounded-corners();
			height: 0.3rem;
			line-height: 0.3rem;
			width: 1rem;
			text-align: center;
			margin: 0.1rem 0 0 0.16rem;
			color: @drakGrey;
		}
		.goodsTypeItemChosen{
			border-color: @orange;
			background-color: @transOrange;
			color: @orange;
		}
		.goodsTypeItemChosen:after{
			content: url(../../static/img/check.svg);
			position: absolute;
			right: 0;
			bottom: -0.1rem;
		}
	}
	.weightRange,.shippingLine{
		border-top: 1px solid @lightGrey;
		background-color: white;
		padding: 0.1rem 0.1rem;
		width: 100%;
		box-sizing:border-box;
	}
	.normalInput{
		width: 1rem;
		border: 1px solid @lightGrey;
		display: inline-block;
		.rounded-corners();
		padding-left: 0.1rem;
		height: 0.3rem;
		line-height: 0.3rem;
	}
	.blueBtn{
		color: white;
		background-color: @blue;
		display: inline-block;
		width: 0.5rem;
		margin: 0 0.02rem;
		height: 0.25rem;
		line-height: 0.25rem;
		.rounded-corners();
		text-align: center;
	}
}
.banner{
	background-color: @backGrey;
	color: @grey;
	padding: 0.05rem;
	text-align: center;
	margin-top: 0.85rem;
}
.goodsCompanyList{
	background-color: @backGrey;
	.goodsCompany{
		background-color: white;
		padding: 0.1rem;
		margin-bottom: 0.1rem;
		.titleInfo{
			padding: 0.05rem;
			border-bottom: 1px solid @lightGrey;
			.logo{
				width: 0.45rem;
				height: 0.45rem;
			}
		}
		.businessIntroduction{
			color: @grey;
			line-height: 1.5;
			padding: 0.05rem 0;
			border-bottom: 1px solid @lightGrey;
			.title{
				display: inline-block;
				vertical-align: top;
			}
			.content{
				display: inline-block;
				width: 75%;
			}
		}
		.historyGoods{
			padding: 0.1rem 0.05rem 0.1rem 0;
			border-bottom: 1px solid @lightGrey;
			.arrowRightIcon{
				width: 0.2rem;
				height: 0.2rem;
			}
		}
		.contact{
			color: @blue;
			padding: 0.1rem 0;
			.tel{
				width: 0.15rem;
				height: 0.15rem;
			}
		}
	}
}
.keywordSearchPanel{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 0.2rem 0.1rem;
	z-index: 7;
	background: white;
	.searchBox{
		background: @backGrey;
		display: inline-block;
		line-height: 0.3rem;
		height: 0.3rem;
		margin-left: 0.1rem;
		.rounded-corners();
		padding: 0 0.05rem;
		img{
			width: 0.15rem;
			height: 0.15rem;
			vertical-align: middle;
		}
		input{
			background: @backGrey;
			border:none;
			outline: none;
			line-height: 0.25rem;
			height: 0.25rem;
			width: 2.3rem;
		}
	}
	.cancel{
		line-height: 0.3rem;
		height: 0.3rem;
	}
	.historySearch{
		margin-left: 0.1rem;
		margin-top: 0.1rem;
		.historySpan{
			display: inline-block;
			background: @backGrey;
			color: @grey;
			padding: 0.05rem 0.1rem;
			.rounded-corners();
			margin: 0.05rem 0.1rem 0.05rem 0;
		}
	}

}
.customerServicePhonePanel{
	position: fixed;
	width: 2.4rem;
	height: 1.2rem;
	background: white;
	top: 50%;
	left: 50%;
	z-index: 7;
	margin-top: -0.6rem;
	margin-left: -1.2rem;
	text-align: center;
	.rounded-corners();
	.title{
		margin-top: 0.2rem;
		line-height: 1.5;
	}
	.callBtn{
		border-top: 1px solid @lightGrey;
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 0.4rem;
		line-height: 0.4rem;
		color: @blue;
		a{
			width: 100%;
			height: 100%;
			display: inline-block;
		}
	}
}
.waitToSelectCompanyListWrap{
	position: relative;
	.waitToSelectCompanyList{
		position: absolute;
		top: 0;
		left: 0.1rem;
		background-color: white;
		width: 2.7rem;
		.waitToSelectCompany{
			padding: 0.1rem;
			border-bottom: 1px dashed @lightGrey;
		}
	}
}

</style>
