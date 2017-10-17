<template>
    <div class="index">
        <div class="top">
            <v-nav></v-nav>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>

        
    </div>
</template>

<script>
import nav from '@/components/nav'
export default {
    name: 'index',
    data () {
        return {

        }
    },
    components: {
        'v-nav': nav
    },
    created(){
        //通过code获取到openId，存入store，再通过openId获得是否绑定

    },
    methods:{
        getUrlParam(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg); //匹配目标参数
            if (r != null) {
                return unescape(r[2]); //返回参数值
            } else {
                return null;
            }
        },
        getCookie(name) {
            var arr,
                reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg)) return unescape(arr[2]);else return null;
        },
        setCookie(c_name, value) {
            var exdate = new Date();
            exdate.setTime(exdate.getTime() + 3600000);
            document.cookie = c_name + "=" + escape(value) + ";expires=" + exdate.toGMTString();
        },
        getOpenId() {
            var _this = this;
            if (_this.getCookie("openId")) {
                _this.$store.state.openId = _this.getCookie("openId");
                _this.$store.state.isBind = _this.getCookie("isBind");
                
            } else {
                axios.get(this.$store.state.url + 'Common/COM_QueryOpenId?Code=' + this.getUrlParam("code")).then(function (response) {
                    if (response.data.RetCode == 0) {
                        _this.$store.state.openId = response.data.RetData.OpenId;
                        _this.$store.state.isBind = response.data.RetData.isBind;
                        _this.setCookie("openId", _this.openId);
                        _this.setCookie("isBind", _this.isBind); //0 未绑定   1绑定
                        
                    } else {
                        _this.$Message.error(response.data.RetMsg);
                    }
                }).catch(function (error) {
                    _this.$Message.error("COM_QueryOpenId 失败");
                });
            }
        }
    }
}
</script>

<style scoped>
.top{
    
}
</style>
