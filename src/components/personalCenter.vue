<template>
    <div class="personalCenter">
        <div class="companyInfo">
            <div class="clearfix basicInfo">
                <div class="logo fl ">
                    <img :src="personalInfo.PicUrl?personalInfo.PicUrl:imgPath+'logo.png'">
                </div>
                <div class="fl mgl5">
                    <div class=""></div>
                    <div class="">{{personalInfo.Company}}</div>
                    <div class=" blue mgt5">
                        <span class="mgr5">{{personalInfo.GoodsOwerName}}</span>
                        <span>{{personalInfo.MobilePhone}}</span>
                    </div>
                    <div class="font12 grey mgt5">
                        <span class="mgr5">已注册{{personalInfo.RegNum}}</span>
                        <span class="mgl5">被联系{{personalInfo.ContactNum}}次</span>
                    </div>
                </div>
                <div class="fr mgt20">
                	<span class="blueBtn" @click="toCompletePersonalInfo">完善</span>
                	<span class="grey"><img class="arrowRightIcon" :src="imgPath+'arrowRightIcon.png'"></span>
                </div>
            </div>
            <div class="businessIntroduction">
                <div class="font15">主营业务</div>
                <div class="grey mgt5">
                    <span class="title">主营航线：</span>
                    <span class="content">{{personalInfo.MainRoute}}</span>
                </div>
                <div class="grey">
                    <span class="title">主营货种：</span>
                    <span class="content">{{personalInfo.MainGoods}}</span>
                </div>
                <div class="grey">
                    <span class="title">主营吨位：</span>
                    <span class="content">{{personalInfo.MainTon}}</span>
                </div>
            </div>
            <div class="historyGoods" @click="toHistoryPersonal">
                已发盘<span class="blue">{{personalInfo.PubNum}}</span>次
                <span class="fr"><img class="arrowRightIcon" :src="imgPath+'arrowRightIcon.png'"></span>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'personalCenter',
    data () {
        return {
            imgPath:"../../static/img/",
            personalInfo:{},
           
        }
    },
    created(){
        this.getPersonalInfo();
    },
    methods:{
        getPersonalInfo(){
            var _this=this;
            this.$http.get(this.$store.state.url+ 'Goods/GOO_GoodsDetails?OpenId='+this.$store.state.openId)
            .then(function (response) {
                if (response.data.RetCode == 0) {
                    _this.personalInfo=response.data.RetData;
                }else{
                    _this.$Message.error(response.data.RetMsg);
                }
            }).catch(function (error) {
                _this.$Message.error(error);
            });
        },
        toHistoryPersonal(){
            this.$router.push({ name: 'historyPersonal', params:{goodsOwnerId:this.personalInfo.GoodsOwerId}});
        },
        toCompletePersonalInfo(){
            this.$router.push({ name: 'completePersonalInfo'});
        }
    }
}
</script>

<style scoped lang="less">
@import '../assets/css/common.less';
.personalCenter{
    position: fixed;
    top: 0;
    bottom:0;
    background: @backGrey;
    width: 100%;
}
.companyInfo{
    background-color: white;
    .blueBtn{
    	background-color: @blue;
    	color: white;
    	display: inline-block;
    	padding: 0.05rem 0.08rem;
    	.rounded-corners(0.5rem);
    	margin-right: 0.05rem;
    }
}
.basicInfo{
	padding: 0.2rem 0.2rem 0.1rem 0.1rem;
    .logo{
        width: 0.5rem;
        height: 0.5rem;

        margin: 0rem 0.1rem;
    }
}
.businessIntroduction{
    padding: 0.1rem 0;
    margin:0 0.2rem;
    line-height: 1.5;
    border-top: 1px solid @lightGrey;
    .title{
        display: inline-block;
        vertical-align: top;
    }
    .content{
        display: inline-block;
        width: 72%;
    }
}
.historyGoods{
    padding: 0.1rem 0;
    margin:0 0.2rem;
    line-height: 1.5;
    border-top: 1px solid @lightGrey;

}

.arrowRightIcon{
    width: 0.2rem;
    height: 0.2rem;
    vertical-align: text-bottom;
}
</style>
