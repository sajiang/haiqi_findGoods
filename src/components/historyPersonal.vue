<template>
    <div class="historyCompany">
        <div class="goodsList" v-infinite-scroll="loadMore"
             infinite-scroll-disabled="notLoading"
             infinite-scroll-distance="10"
             infinite-scroll-immediate-check="false">
            <div class="goodsItem" v-for="(item,index) in goodsList">
                <div>
                    <span class="blue inlineBlock mgt10">{{item.GoodsOwnerName}}</span>
                    <span class="fr publishedTime">{{item.EditDate}}</span>
                </div>
                <div class="flowDirection">
                    <div class="inlineBlock middle startPort">{{item.StartPortName}}</div>
                    <div class="inlineBlock arrow">
                        <div class="font12 goodsType">{{item.GoodsTypeName}}</div>
                        <div class="imgWrap"><img :src="imgPath+'arrowRight.png'" class="arrowRight"></div>
                        <div class="font12">{{item.GoodsVolume}}±{{item.AddVolume}}</div>
                    </div>
                    <div class="inlineBlock middle endPort">{{item.EndPortName}}</div>
                    <div class="inlineBlock middle blue time">{{item.LoadDate}}±{{item.LoadAddDay}}</div>
                </div>
                <div class="font12 grey flex flex-direction-row">
                    <span><img class="dot" :src="imgPath+'dot.png'"/>已注册{{item.RegNum}}</span>
                    <span class="contactFrequency"><img class="dot" :src="imgPath+'dot.png'"/>被联系{{item.ContactNum}}次</span>
                    
                </div>
				<div class="dustbin"><img class="" :src="imgPath+'dustbin.png'"></div>
            </div>
        </div>
        <div class="addGoods">
			<img @click="toAddGoods" :src="imgPath+'addGoods.png'">
		</div>
    </div>
</template>

<script>
export default {
    name: 'historyCompany',
    data () {
        return {
            imgPath:"../../static/img/",
            goodsOwnerId:'',
            goodsList:[],
            pageIndex:1,
            totalPage:0,
            notLoading:false,
        }
    },
    created(){
        this.goodsOwnerId=this.$route.params.goodsOwnerId;
        this.getPersonalGoodsList();
    },
    methods:{
        loadMore(){
            this.pageIndex++;
            this.getPersonalGoodsList();
        },
    	toAddGoods(){
    		this.$router.push({ name: 'addGoods'});
    	},
        getPersonalGoodsList(){
            var _this = this;
            this.$http.post(this.$store.state.url+ 'Goods/GOO_GoodsListAlreadyReleasedInfo', {
                "OpenId": this.$store.state.openId,
                "GoodsOwerId":this.goodsOwnerId,
                "Page":this.pageIndex,
                "PageSize":10,
            }).then(function (response) {
                if (response.data.RetCode == 0) {
                    if (_this.totalPage==_this.pageIndex) {
                        _this.notLoading=true;
                    }
                    if (_this.pageIndex>1) {
                        _this.goodsList=_this.goodsList.concat(response.data.RetData.GoodsList);
                    }else{
                        _this.goodsList=response.data.RetData.GoodsList;
                    }
                }else{
                    _this.$Message.error(response.data.RetMsg);
                }
            }).catch(function (error) {
                this.$Message.error(error);
            });
        },
    }
}
</script>
<style lang="less" scoped>
@import '../assets/css/common.less';
.goodsList{
    background-color: #eee;
    padding:0.12rem 0;
    .goodsItem{
    	position: relative;
        background-color: white;
        margin:0 0.15rem 0.12rem 0.15rem ;
        padding-left: 0.1rem;
        .flowDirection{
            position: relative;
            top: -0.1rem;
            height: 0.5rem;
            .startPort{
                width: 0.74rem;
            }
            .endPort{
                width: 0.74rem;
                text-align: right;
            }
            
            .middle{
                position: relative;
                top: -0.1rem;
            }
            .time{
                position: absolute;
                right: 0.05rem;
                top: 0.2rem;
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
        .dot{
            width: 0.04rem;
            height: 0.04rem;
            vertical-align: middle;
            margin:0 0.05rem 0.02rem 0;
        }
        .publishedTime{
            font-size: 12px;
            color: @grey;
            margin: 0.1rem;
            display: inline-block;
        }
        .contactFrequency{
            margin-left: 0.2rem;
        }
        .dustbin{
        	position: absolute;
        	right: 0;
        	bottom: 0;
        	img{
        		width: 0.32rem;
        		height: 0.28rem;
        	}
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
