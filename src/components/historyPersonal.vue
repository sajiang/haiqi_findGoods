<template>
    <div class="historyCompany">
        <div class="goodsList" >
            <div class="goodsItem" v-for="(i,index) in 3" @click="toCompanyMainPage(index)">
                <div>
                    <span class="blue inlineBlock mgt10">王先生</span>
                    <span class="fr publishedTime">2分前</span>
                </div>
                <div class="flowDirection">
                    <div class="inlineBlock middle startPort">曹妃甸</div>
                    <div class="inlineBlock arrow">
                        <div class="font12 goodsType">沙子</div>
                        <div class="imgWrap"><img :src="imgPath+'arrowRight.png'" class="arrowRight"></div>
                        <div class="font12">12000±2000</div>
                    </div>
                    <div class="inlineBlock middle endPort">张家港</div>
                    <div class="inlineBlock middle blue time">12-09±3</div>
                </div>
                <div class="font12 grey flex flex-direction-row">
                    <span><img class="dot" :src="imgPath+'dot.png'"/>已注册1年</span>
                    <span class="contactFrequency"><img class="dot" :src="imgPath+'dot.png'"/>被联系10次</span>
                    
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
            companyId:'',

        }
    },
    created(){
        this.companyId=this.$route.params.companyId;
    },
    methods:{
    	toAddGoods(){
    		this.$router.push({ name: 'addGoods'});
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
