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
        this.isToAuth();
        //通过code获取到openId，存入store，再通过openId获得是否绑定
        this.getOpenId();
    },
    methods:{
        isToAuth:function(){
            var ua = window.navigator.userAgent.toLowerCase(); 
            //如果没有code并且是微信浏览器就跳授权页
            if(window.location.href.indexOf("code")<0&&ua.match(/MicroMessenger/i) == 'micromessenger'){
                window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx318ae0637e725068&redirect_uri=http%3a%2f%2fweixin.sspp.co%2fpage%2ffindgoods%2findex.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
            }
        },
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
                
            } else if(window.location.href.indexOf("code")>0) {
                this.$http.get('http://weixin.sspp.co/api/Common/COM_QueryOpenId?Code=' + this.getUrlParam("code")).then(function (response) {
                    if (response.data.RetCode == 0) {
                        _this.$store.state.openId = response.data.RetData.OpenId;
                        _this.$store.state.isBind = response.data.RetData.isBindMobileNum;
                        _this.setCookie("openId", _this.$store.state.openId);
                        _this.setCookie("isBind", _this.$store.state.isBind); //0 未绑定   1绑定
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
