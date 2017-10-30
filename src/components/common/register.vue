<template>
    <div class="register" v-show="show">
    	<div class="formItem">
			<span class="formName">手机号</span><!-- 
		 --><span class="formInput">
				<input type="number" placeholder="请输入" class="phoneNumber" v-model="phoneNumber">
			</span>
		</div>
		<div class="formItem">
			<span class="formName">验证码</span><!-- 
		 --><span class="formInput">
				<input class="numberCode" type="number" placeholder="请输入" v-model="numberCode">
				<img class="fr numberCodeImg mgt10" :src="numberCodeSrc" @click="getImgNumberCode">
			</span>
		</div>
		<div class="formItem">
			<span class="formName">手机验证码</span><!-- 
		 --><span class="formInput">
				<input type="number" class="code" placeholder="请输入" v-model="code">
				<span class="getMobileCode fr mgt10" @click="getMobileCode">获取验证码{{countDownNumber!=0?countDownNumber+'s':''}}</span>
			</span>
		</div>
		<div class="bind" @click="bindPhoneNumber">绑定手机</div>
    </div>
</template>

<script>
export default {
	name: 'nav',
	data () {
		return {
			imgPath:"../static/img/",
			phoneNumber:"",
			numberCode:"",
			code:"",
			numberCodeSrc:"",
			countDownNumber:0,
			msgId:"",
			clearNum:""
		}
	},
	created(){
		this.getImgNumberCode();
	},
	props:['show'],
	methods:{
		getImgNumberCode(){
			var _this = this;
			this.$http.post('http://weixin.sspp.co/api/'+ 'PictureCode/PC_getPictureCode', {
				"OpenId": this.$store.state.openId
			}).then(function (response) {
				if (response.data.RetCode == 0) {
					_this.numberCodeSrc = response.data.RetData.imgData;
				}
			}).catch(function (error) {
				console.log(error);
			});
		},
		getMobileCode() {
			var _this = this;
			if (!/^1\d{10}$/.test(this.phoneNumber)) {
				this.$Message.error("手机号格式不正确");
				return;
			}
			if (this.countDownNumber > 0) {
				return;
			}
			var _this = this;
			this.$http.post('http://weixin.sspp.co/api/' + 'Common/COM_CreateMobileCode', {
				"mobileNum": this.phoneNumber,
				"pictureCode": this.numberCode,
				"isTypeText": "绑定用户",
				"openId": this.$store.state.openId
			}).then(function (response) {
				if (response.data.RetCode == 0) {
					_this.msgId = response.data.RetData.msgId;
					_this.countDownNumber = 60;
					_this.clearNum = setInterval(function () {
						_this.countDownNumber += -1;
						if (_this.countDownNumber == 0) {
							clearInterval(_this.clearNum);
						}
					}, 1000);
				}
			}).catch(function (error) {
				console.log(error);
			});
		},
		bindPhoneNumber() {
			var _this = this;
			this.$http.post('http://weixin.sspp.co/api/' + 'Common/COM_BindUserInfo', {
				"msgId": this.msgId,
				"msgCode": this.code,
				"openId": this.$store.state.openId
			}).then(function (response) {
				if (response.data.RetCode == 0) {
					_this.$store.state.isBind = 1;
					_this.setCookie("isBind", 1);
					_this.$router.push({ name: 'personalCenter'});
				} else {
					_this.$Message.error(response.data.RetMsg)
				}
			}).catch(function (error) {
				console.log(error);
			});
		},
        setCookie(c_name, value) {
            var exdate = new Date();
            exdate.setTime(exdate.getTime() + 3600000);
            document.cookie = c_name + "=" + escape(value) + ";expires=" + exdate.toGMTString();
        },
	}
}
</script>

<style lang='less' scoped>
@import '../../assets/css/common.less';
.register{
	z-index: 7;
	background-color: white;
	position: fixed;
	top: 50%;
	left: 50%;
	margin:-1rem 0 0 -1.5rem;
	height: 2rem;
	width: 3rem;
	padding-top: 0.1rem;
}
.formItem{
	background: white;
	padding: 0 0.1rem;
	height: 0.4rem;
	line-height: 0.4rem;
	border-bottom: 1px solid @lightGrey;
	.formName{
		display: inline-block;
		width: 35%;
	}
	.formInput{
		display: inline-block;
		width: 65%;
		text-align: left;
	}
	input{
		border:none;
		outline: none;
		height: 0.29rem;
		-webkit-appearance:none; 
		background-color: white;
	}
	.code,.numberCode{
		width: 0.7rem;
	}
}
.getMobileCode{
	font-size: 0.1rem;
	color: @blue;
	border: 1px solid @blue;
	.rounded-corners(20px);
	line-height: 1;
	padding: 0.05rem;
}
.bind{
	color: white;
	background-color: @blue;
	line-height: 2.5;
	margin:0.2rem 0.1rem 0 0.1rem;
	.rounded-corners();
}
</style>
