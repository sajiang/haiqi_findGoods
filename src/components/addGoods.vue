<template>
	<div class="addGoods">
		<div class="formItem">
			<span class="formName">物种*</span><!-- 
		 --><span class="formInput">
				<span>请选择</span>
				<span class="fr grey">></span>
			</span>
		</div>
		<div class="formItem">
			<span class="formName">货量/吨*</span><!-- 
		 --><span class="formInput">
				<input type="number" placeholder="请输入" v-model="ton">
			</span>
		</div>
		<div class="formItem">
			<span class="formName">装货港*</span><!-- 
		 --><span class="formInput" @click="showStartPort">
				<span>{{startPortName}}</span>
				<span class="fr grey">></span>
			</span>
		</div>
		<div class="formItem">
			<span class="formName">卸货港*</span><!-- 
		 --><span class="formInput" @click="showEndPort">
				<span>{{endPortName}}</span>
				<span class="fr grey">></span>
			</span>
		</div>
		<div class="formItem">
			<span class="formName">受载日期*</span><!-- 
		 --><span class="formInput">
				<input type="date" placeholder="请输入" v-model="loadDate">
				<span>±</span>
				<select v-model="deviationDays">
					<option v-for="i in 11">{{i-1}}</option>
				</select>
			</span>
		</div>
		<div class="sureBtn" @click="submitNewGoods">确定</div>
		<v-shade v-show="shadeShow" @click.native="hideShade()"></v-shade>
		<!-- 装货港选项 -->
		<v-port-select v-show="startPortShow" v-on:selectportdone="replaceStartPort" ></v-port-select>
		<!-- 卸货港选项 -->
		<v-port-select v-show="endPortShow" v-on:selectportdone="replaceEndPort" ></v-port-select>
	</div>
</template>
<script>
import shade from '@/components/common/shade'
import portSelect from '@/components/common/portSelect'
import goodsTypeSelect from '@/components/common/goodsTypeSelect'
export default {
  	name: 'addGoods',
  	data () {
   		return {
   			shadeShow:false,
    		startPortShow:false,
    		endPortShow:false,
    		ton:"",
    		startPortId:"",
    		startPortName:"请选择",
    		endPortId:"",
    		endPortName:"请选择",
    		loadDate:"",
    		deviationDays:""
    	}
    },
	components: {
		'v-shade': shade,
		'v-port-select':portSelect,
		'v-goods-type-select':goodsTypeSelect
	},
    methods:{
    	showStartPort(){
    		this.startPortShow=true;
    		this.shadeShow=true;
    	},
    	showEndPort(){
    		this.endPortShow=true;
    		this.shadeShow=true;
    	},
    	hideShade(){
    		this.startPortShow=false;
    		this.endPortShow=false;
    		this.shadeShow=false;
		},
		replaceStartPort(portInfo){
	    	this.shadeShow=false;
	    	this.startPortShow=false;
	    	//市有值
	    	if(portInfo.length>1){
		        this.startPortName=portInfo[1].cityName;
	        	this.startPortId=portInfo[1].cityId;
		    }
		    //只有省份有值
		    else if (portInfo.length>0) {
		        this.startPortName=portInfo[0].proviceName;
	        	this.startPortId=portInfo[0].proviceId;
		    }else{
		    	this.startPortName="请选择";
		        this.startPortId=0;
		    }
	    },
	    replaceEndPort(portInfo){
	    	this.shadeShow=false;
	    	this.endPortShow=false;
	    	//市有值
	    	if(portInfo.length>1){
		        this.endPortName=portInfo[1].cityName;
	        	this.endPortId=portInfo[1].cityId;
		    }
		    //只有省份有值
		    else if (portInfo.length>0) {
		        this.endPortName=portInfo[0].proviceName;
	        	this.endPortId=portInfo[0].proviceId;
		    }else{
		    	this.endPortName="请选择";
		        this.endPortId=0;
		    }
	    },
	    submitNewGoods(){
	    	this.$router.go(-1);
	    }
    }
}
</script>
<style lang="less" scoped>
@import '../assets/css/common.less';
.addGoods{
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
		height: 0.29rem;
		width: 60%;
		-webkit-appearance:none; 
		background-color: white;
	}
	select{
		width: 25%;
		margin-left: 0.1rem;
		border:none;
		outline: none;
		padding:0 0.1rem;
		height: 0.29rem;
		background-color: white;
		-webkit-appearance:none; 
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