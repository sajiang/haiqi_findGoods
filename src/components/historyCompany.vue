<template>
    <div class="historyCompany">
        <div class="goodsList"  v-infinite-scroll="loadMore"
             infinite-scroll-disabled="notLoading"
             infinite-scroll-distance="10"
             infinite-scroll-immediate-check="true">
            <div class="goodsItem" v-for="(item,index) in goodsList" >
                <div>
                    <span class="blue inlineBlock mgt10">{{item.GoodsOwnerName}}</span>
                    <span class="fr publishedTime">{{item.EditDate}}</span>
                </div>
                <div class="flowDirection">
                    <div class="ports">
                        <div class="inlineBlock middle font16 startPort">{{item.StartPortName}}</div>
                        <div class="inlineBlock arrow">
                            <div class="font12 goodsType">{{item.GoodsTypeName}}</div>
                            <div class="imgWrap"><img :src="imgPath+'arrowRight.png'" class="arrowRight"></div>
                            <div class="font12">{{item.GoodsVolume}}±{{item.AddVolume}}</div>
                        </div>
                        <div class="inlineBlock font16 middle endPort">{{item.EndPortName}}</div>
                    </div>
                    <div class="inlineBlock font16 middle blue time">{{item.LoadDate}}±{{item.LoadAddDay}}</div>
                </div>
                <div class="font12 grey flex flex-direction-row">
                    <span><img class="dot" :src="imgPath+'dot.png'"/>已注册{{item.RegNum}}</span>
                    <span class="contactFrequency"><img class="dot" :src="imgPath+'dot.png'"/>被联系{{item.ContactNum}}次</span>
                    
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'historyCompany',
    data () {
        return {
            imgPath:"static/img/",
            companyId:'',
            goodsList:[],
            pageIndex:0,
            totalPage:0,
            notLoading:false,
        }
    },
    created(){
        this.companyId=this.$route.params.companyId;
        //this.getCompanyGoodsList();
    },
    methods:{
        loadMore(){
            this.pageIndex++;
            this.getCompanyGoodsList();
        },
        getCompanyGoodsList(){
            var _this = this;
            this.$http.post(this.$store.state.url+ 'Goods/GOO_GoodsListCompanyAlreadyReleasedInfo', {
                "OpenId": this.$store.state.openId,
                "CompanyId":this.companyId,
                "Page":this.pageIndex,
                "PageSize":10,
            }).then(function (response) {
                if (response.data.RetCode == 0) {
                    _this.totalPage=response.data.RetData.TotalPage;
                    if (_this.totalPage<=_this.pageIndex) {
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
                _this.$Message.error(error);
            });
        }
    }
}
</script>
<style lang="less" scoped>
@import '../assets/css/common.less';
.goodsList{
    background-color: #eee;
    padding:0.12rem 0;
    .goodsItem{
         background-color: white;
        margin:0 0.1rem 0.1rem 0.1rem ;
        padding-left: 0.1rem;
        padding-bottom: 0.1rem;
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
            margin:0.1rem 0.05rem;
            display: inline-block;
        }
        .contactFrequency{
            margin-left: 0.2rem;
        }
    }
}
    
</style>
