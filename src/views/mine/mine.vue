<template>
    <div class="mine">
        <img src="./../../assets/img/user-bg.png" />
        <div class="mine-con">
            <div class="mine-info">
                <div class="mine-title">
                    我的信息
                </div>
                <div class="mine-box">
                    <p>
                        <svg-icon class="img-svg" icon-class="mileage"/>
                        <span>
                            信息总览
                        </span>
                    </p>
                    <p @click="chart()">
                        <svg-icon class="img-svg" icon-class="trend"/>
                        <span>
                            出行趋势
                        </span>
                    </p>
                    <p>
                        <svg-icon class="img-svg" icon-class="Analysis"/>
                        <span>
                            数据分析
                        </span>
                    </p>
                    <p>
                        <svg-icon class="img-svg" icon-class="Medal"/>
                        <span>
                            成就殿堂
                        </span>
                    </p>
                </div>
            </div>
            <div class="mine-more">
                <div class="mine-title">
                    更多功能
                </div>
                <div class="mine-box">
                    <p>
                        <svg-icon class="img-svg" icon-class="p1"/>
                        <span>出行计划</span>
                    </p>
                    <p>
                        <svg-icon class="img-svg" icon-class="p2"/>
                        <span>好友排名</span>
                    </p>
                    <p>
                        <svg-icon class="img-svg" icon-class="p3"/>
                        <span>路况分析</span>
                    </p>
                    <p>
                        <svg-icon class="img-svg" icon-class="p4"/>
                        <span>交通补助</span>
                    </p>
                    <p>
                        <svg-icon class="img-svg" icon-class="p5"/>
                        <span>体重管理</span>
                    </p>
                    <p>
                        <svg-icon class="img-svg" icon-class="p6"/>
                        <span>周报</span>
                    </p>
                    <p>
                        <svg-icon class="img-svg" icon-class="p7"/>
                        <span>风险管控</span>
                    </p>
                    <p>
                        <svg-icon class="img-svg" icon-class="p8"/>
                        <span>运动课堂</span>
                    </p>
                    <p>
                        <svg-icon class="img-svg" icon-class="p9"/>
                        <span>智能硬件</span>
                    </p>
                    <p>
                        <svg-icon class="img-svg" icon-class="p10"/>
                        <span>心悦会员</span>
                    </p>
                    <p>
                    </p>
                    <p>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    methods: {
        chart () {
            this.$router.push({
                path: '/chart'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.mine{
    position: relative;
    img{
        width: 100%;
    }
    .mine-con{
        width: 100%;
        height: 200px;
        padding: 10px 20px;
        box-sizing: border-box;
        position: absolute;
        top: 200px;
        .mine-info,.mine-more{
            background: #fff;
            box-shadow: 0 0 10px #cccbcb;
        }
        .mine-more{
            margin-top: 20px;
        }
        .mine-title{
            font-size: 28px;
            text-align: left;
            padding: 20px;
        }
        .mine-box{
            display: flex;
            justify-content: space-between;
            width: 100%;
            align-items: center;
            flex-wrap: wrap;
            p{
                flex: 0 0 18%;
                padding: 20px;
                display: flex;
                flex-direction: column;
                text-align: center;
                justify-content: space-around;
                .img-svg{
                    font-size: 50px;
                    margin: 0 auto;
                }
            }
        }
        
    }

}
</style>

