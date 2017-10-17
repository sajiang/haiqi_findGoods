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
				<img class="fr numberCodeImg mgt10" :src="numberCodeSrc">
			</span>
		</div>
		<div class="formItem">
			<span class="formName">手机验证码</span><!-- 
		 --><span class="formInput">
				<input type="number" class="code" placeholder="请输入" v-model="code">
				<span class="getMobileCode fr mgt10" @click="getMobileCode">获取验证码{{countDownNumber!=0?countDownNumber+'s':''}}</span>
			</span>
		</div>
    </div>
</template>

<script>
export default {
	name: 'nav',
	data () {
		return {
			imgPath:"../../static/img/",
			phoneNumber:"",
			numberCode:"",
			code:"",
			numberCodeSrc:"",
			countDownNumber:0,
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
			if (!/^1\d{10}$/.test(this.bindPhoneNumberData.phoneNumber)) {
				alert("手机号格式不正确");
				return;
			}
			if (this.bindPhoneNumberData.countDownNumber > 0) {
				return;
			}
			var _this = this;
			axios.post(this.url + 'Common/COM_CreateMobileCode', {
				"mobileNum": this.bindPhoneNumberData.phoneNumber,
				"pictureCode": this.bindPhoneNumberData.numberCode,
				"isTypeText": "绑定用户",
				"openId": this.openId
			}).then(function (response) {
				if (response.data.RetCode == 0) {
					_this.bindPhoneNumberData.msgId = response.data.RetData.msgId;
					_this.bindPhoneNumberData.countDownNumber = 60;
					_this.bindPhoneNumberData.clearNum = setInterval(function () {
						app.bindPhoneNumberData.countDownNumber += -1;
						if (app.bindPhoneNumberData.countDownNumber == 0) {
							clearInterval(app.bindPhoneNumberData.clearNum);
						}
					}, 1000);
				}
			}).catch(function (error) {
				console.log(error);
			});
		},
		bindPhoneNumber() {
			var _this = this;
			this.loading = true;
			axios.post(this.url + 'Common/COM_BindUserInfo', {
				"msgId": this.bindPhoneNumberData.msgId,
				"msgCode": this.bindPhoneNumberData.code,
				"openId": this.openId
			}).then(function (response) {
				if (response.data.RetCode == 0) {
					_this.hidePopup();
					_this.isBind = 1;
					_this.setCookie("isBind", 1);
				} else {
					_this.bindPhoneNumberData.errorCode = true;
					_this.bindPhoneNumberData.errorMsg = response.data.RetMsg;
				}
				_this.loading = false;
			}).catch(function (error) {
				console.log(error);
			});
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
</style>
