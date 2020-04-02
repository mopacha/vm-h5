<template>  
    <div class="trip">
        <img class="trip-bg" src="./../../assets/img/bg.png" alt="">
        <div class="trip-con">
            <md-tabs v-model="tripWay">
                <md-tab-pane name="徒步" label="徒步"></md-tab-pane>
                <md-tab-pane name="跑步" label="跑步"></md-tab-pane>
                <md-tab-pane name="骑行" label="骑行"></md-tab-pane>
                <md-tab-pane name="自驾" label="自驾"></md-tab-pane>
            </md-tabs>
            <div class="trip-border">
                <p>累计{{tripWay}}</p>
                <strong>0.0</strong>
                <p>本月{{userDistance}}公里>></p>
            </div>
            <div class="trip-btn" @click="toMap()">
                开始{{tripWay}}
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'trip',
    data (){
        return{
            tripWay: '徒步'
        }
    },
    computed: {
        // 将getter映射到局部计算属性
        ...mapGetters(['userDistance'])
    },
    methods: {
        toMap () {
            this.$router.push({
                path: '/map'
            })
        },
        // 方法
        ...mapActions(['setUser', 'setUserData'])
    }
}
</script>
<style lang="less" scoped>
.trip{
    width: 100vw;
    height: 100%;
    &-bg{
        width: 100%;
        height: 100%;
        opacity: 0.5;
    }
    &-con{
        position: absolute;
        top: 0;
        width: 100%;
    }
    &-border{
        width: 450px;
        height: 450px;
        margin: 200px auto 80px;
        border: 8px dashed #c5d1d3;
        border-radius: 50%;
        text-align: center;
        border-bottom: none;
        p:nth-child(1){
            font-size: 30px;
            letter-spacing: 2px;
            margin-top: 100px;
        }
        strong{
            font-size: 100px;
        }
        p:nth-child(3){
            font-size: 25px;
            letter-spacing: 2px;
            margin-top: 50px;
            text-decoration: underline;
            color: #9a9b9b;
        }
    }
    &-btn{
        margin: auto;
        width: 500px;
        height: 100px;
        line-height: 100px;
        border-radius: 30px;
        background-color: #57c595;
        color: #fff;
        font-size: 35px;
        letter-spacing: 2px;
        cursor: pointer;
    }
}
</style>
<style lang="less">
.md-tab-bar{
    background: #fff;
}
</style>

