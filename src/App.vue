<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
 html {font-size:90px;}
/* #### 移动设备分辨率字体 #### */
/* 安卓 */
@media (min-device-width: 360px) { 
    html {
        font-size: 100px;
    }
    
}

/* iphone 6 */
@media (min-device-width: 375px) and (max-device-width: 667px) and (-webkit-min-device-pixel-ratio: 2) { 
    html {
        font-size: 105px;
    }
}

/* iphone 6 plus */
@media (min-device-width: 414px) and (max-device-width: 736px) and (-webkit-min-device-pixel-ratio: 3) { 
    html {
        font-size: 115px;
    }
}
#app{font-size: 0.14rem;}
*{
	margin: 0px;
	padding: 0px;
}
/*mint ui 里面 loadmore的bug*/
  .is-dropped{
    transform: none !important;
  }
</style>
