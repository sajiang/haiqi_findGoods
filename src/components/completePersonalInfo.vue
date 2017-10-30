<template>
	<div class="completePersonalInfo">
		<div class="formItem">
			<span class="formName">公司*</span><!-- 
		 --><span class="formInput">
				<input type="text" placeholder="请填写" v-model="companyName">
			</span>
		</div>
		<div class="formItem">
			<span class="formName">您的称呼*</span><!-- 
		 --><span class="formInput">
				<input type="text" placeholder="请填写" v-model="name">
			</span>
		</div>
		<div class="formItem">
			<span class="formName">联系电话</span><!-- 
		 --><span class="formInput">
				<span>{{phoneNumber}}</span>
			</span>
		</div>
		<div class="sureBtn" @click="submitPersonalInfo">完成</div>
	</div>
</template>
<script>
export default {
  	name: 'completePersonalInfo',
  	data () {
   		return {
   			companyName:"",
   			name:"",
   			phoneNumber:this.$store.state.phoneNumber,
    	}
    },
    methods:{
    	submitPersonalInfo(){
    		var _this=this;
    		var postData={
    			OpenId:this.$store.state.openId,
    			Company:this.companyName,
    			NickName:this.name,
    		};
    		this.$http.post(this.$store.state.url+ 'Goods/GOO_GoodserEdit',postData)
	  		.then(function (response) {
	            if (response.data.RetCode == 0) {
	                _this.$Message.success(response.data.RetMsg);
	                _this.$router.go(-1)
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
.completePersonalInfo{
	background: @backGrey;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}
.formItem{
	background: white;
	padding: 0 0.1rem;
	height: 0.4rem;
	line-height: 0.4rem;
	border-bottom: 1px solid @lightGrey;
	.formName{
		display: inline-block;
		width: 30%;
	}
	.formInput{
		display: inline-block;
		width: 70%;
	}
	input{
		border:none;
		outline: none;
		height: 0.35rem;
		width: 50%;
	}
	select{
		width: 30%;
		margin-left: 0.1rem;
		border:none;
		outline: none;
		padding:0 0.15rem;
		option{
			text-align: center;
		}
	}
}
.sureBtn{
	.rounded-corners();
	text-align: center;
	background-color: @blue;
	position: fixed;
	bottom: 0.1rem;
	left: 0.15rem;
	right: 0.15rem;
	color: white;
	padding: 0.08rem;

}
</style>