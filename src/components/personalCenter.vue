<template>
    <div class="companyMainPage">
        <div class="companyInfo">
            <div class="clearfix basicInfo">
                <div class="logo fl ">
                    <img :src="imgPath+'logo.png'">
                </div>
                <div class="fl mgl5">
                    <div class=""></div>
                    <div class="">日照宏达海运有限公司</div>
                    <div class=" blue mgt5">
                        <span class="mgr5">王先生</span>
                        <span>18945157458</span>
                    </div>
                    <div class="font12 grey mgt5">
                        <span class="mgr5">已注册1年</span>
                        <span class="mgl5">被联系10次</span>
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
                    <span class="content">上海-广东，上海-张家口，上海-秦皇岛海-秦皇岛海-秦皇岛海-秦皇岛</span>
                </div>
                <div class="grey">
                    <span class="title">主营货种：</span>
                    <span class="content">沙，石子，煤炭</span>
                </div>
                <div class="grey">
                    <span class="title">主营吨位：</span>
                    <span class="content">15000-30000</span>
                </div>
            </div>
            <div class="historyGoods" @click="toHistoryPersonal">
                已发盘<span class="blue">16</span>次
                <span class="fr"><img class="arrowRightIcon" :src="imgPath+'arrowRightIcon.png'"></span>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: 'companyMainPage',
    data () {
        return {
            imgPath:"../../static/img/",
           
        }
    },
    created(){
    },
    methods:{
        toHistoryPersonal(){
            this.$router.push({ name: 'historyPersonal', params:{goodsOwnerId:2695}});
        },
        toCompletePersonalInfo(){
            this.$router.push({ name: 'completePersonalInfo'});
        }
    }
}
</script>

<style scoped lang="less">
@import '../assets/css/common.less';

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
.companyMainPage{
    position: fixed;
    top: 0;
    bottom:0;
    background: @backGrey;
}
.arrowRightIcon{
    width: 0.2rem;
    height: 0.2rem;
    vertical-align: text-bottom;
}
</style>
