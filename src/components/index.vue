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
    }
}
</script>

<style scoped>
.top{
    
}
</style>
