<template>
    <div class="companyMainPage">
        <div class="backImg">
            <img :src="imgPath+'companyBackImg.png'">
        </div>
        <div class="companyInfo">
            <div class="clearfix basicInfo">
                <div class="logoWrap fl">
                    <img :src="imgPath+'logo.png'">
                </div>
                <div class="fl">
                    <div class="mgt20">日照宏达海运有限公司{{companyId}}</div>
                    <div class="font12 grey mgt5">
                        <span class="mgr5">已注册1年</span>
                        <span>被联系10次</span>
                    </div>
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
            <div class="historyGoods" @click="toHistoryCompany">
                已发盘<span class="blue">16</span>次
                <span class="fr">></span>
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
            companyId:'',
        }
    },
    created(){
        this.companyId=this.$route.params.companyId;
    },
    methods:{
        toHistoryCompany(){
            this.$router.push({ name: 'historyCompany', params: { companyId:this.companyId }});
        }
    }
}
</script>

<style scoped lang="less">
@import '../assets/css/common.less';
.backImg{
    height: 1.2rem;
    width: 100%;
    img{
        width: 100%;
        height: 100%;
    }
}
.companyInfo{
    background-color: white;
}
.basicInfo{
    .logoWrap{
        width: 0.8rem;
        height: 1rem;
        background: white;
        position: relative;
        top: -0.2rem;
        margin: 0 0.3rem;
        text-align: center;
        box-shadow: 5px 5px 5px #CCC;
        display: inline-block;
        img{
            width: 0.5rem;
            height: 0.5rem;
            position: relative;
            top: 50%;
            margin-top: -0.25rem;
        }
    }
}
.businessIntroduction{
    padding: 0.1rem 0;
    margin:0 0.3rem;
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
    margin:0 0.3rem;
    line-height: 1.5;
    border-top: 1px solid @lightGrey;
}
.companyMainPage{
    position: fixed;
    top: 0;
    bottom:0;
    background: @backGrey;
}
</style>
