<template>
    <div class="traffic">
        <!-- 地图 -->
        <div id="container"></div>
        <div class="traffic-search">
            <md-field>
                <md-input-item @focus="focusStart('searchStart')"
                    ref=""
                    title="出发点"
                    placeholder="请输入出发点"
                    v-model="searchStart"
                    is-title-latent
                    clearable
                ></md-input-item>
                <md-input-item @focus="focusStart('searchObjective')"
                    ref=""
                    title="目的地"
                    placeholder="请输入目的地"
                    v-model="searchObjective"
                    is-title-latent
                    clearable
                    ></md-input-item>
            </md-field>
            <md-button class="serach-btn1" type="primary" plain @click="selOutWay()">{{trafficType.slice(0,2)}}</md-button>
            <md-button class="serach-btn2" type="primary" @click.stop="search">搜索</md-button>
        </div>
        <transition name="traffic">
            <div v-show="showTrafficResult" class="traffic-list">
                <p class="up-btn" @click="downResult">
                    <svg-icon class="up-svg" icon-class="down"/>
                </p>
                <div class="tesult-list">
                    <md-field>
                        <md-cell-item v-for="(item, index) in resultList" :key="index" 
                        :title="item.name" 
                        :brief="typeof item.address==='string'?item.address:item.district"
                        @click="selectAddress(item)"
                        />
                    </md-field>
                </div>
                <div class="no-result" v-show="resultList.length===0">
                    <md-result-page></md-result-page>
                </div>
            </div>
        </transition>
        <div class="panel-list" v-if="isPanleShow" :id="panelListShow?'panel-list-id':''">
            <p class="panel-list-top">
                <span class="panel-list-title">请选择合适路线</span>
                <span class="panel-list-svg" @click="downPanel">
                    <svg-icon v-if="panelListShow" class="up-svg" icon-class="down"/>
                    <svg-icon v-else class="up-svg" icon-class="up"/>
                </span>
                <span class="panel-list-btn" @click="panelSureOnClick">确定</span>
            </p>
            <div id="panel"></div>
        </div>
        <md-popup
            v-model="isPopupShow"
            position="top"
            >
            <div class="map-popup">
            <md-field title="选择出行工具" class="radio-field">
                <md-radio-list
                    :options="outWays"
                    v-model="myWay"
                    @change="changeRadio"
                    icon="right"
                    icon-inverse=""
                    icon-disabled=""
                    icon-position="right"
                />
            </md-field>
            </div>
        </md-popup>
        <md-dialog
            title="本次出行"
            :closable="true"
            v-model="basicDialog.open"
            :btns="basicDialog.btns"
            >
                <md-field class="dialog-field">
                    <md-detail-item title="交通公交" :content="trafficType" bold/>
                    <md-detail-item title="出发地" :content="searchStart"/>
                    <md-detail-item title="目的地" :content="searchObjective"/>
                    <!-- <md-detail-item title="花费" content="5元"/> -->
                    <md-field-item title="花费">
                        <md-stepper slot="right" v-model="spendValue" min="0"/>
                    </md-field-item>
                    <md-detail-item title="日期" :content="dateTime"/>
                    <md-input-item
                    id="markText"
                    v-model="markText"
                    title="备注"
                    placeholder="点此输入备注，少于20字"
                    :maxlength="20"
                    ></md-input-item>
                </md-field>
        </md-dialog>
    </div>
</template>
<script>
import { Toast } from 'mand-mobile'
import { getTime } from './../../utils/util'
export default {
    data () {
        return {
            // 地图实例
            map: null,
            isPopupShow: false,
            myWay: 'AMap.Transfer',
            trafficType: '公交/地铁',
            showTrafficResult: false,
            searchStart: '',
            searchObjective: '',
            searchStartData: null,
            searchObjectiveData: null,
            curSearchType: '',
            spendValue: 0,
            dateTime: getTime().date1,
            markText: '',
            // 实时搜索 定时器
            timer: null,
            watchStop: false, // 监听请求
            resultList: [], // 查询列表
            isPanleShow: false,
            panelListShow: false,
            driving: null, // 路线规划实例
            outWays: [
                {
                    value: 'AMap.Transfer',
                    text: '公交/地铁'
                },
                {
                    value: 'AMap.Driving',
                    text: '出租车'
                },
                {
                    value: 'AMap.Riding',
                    text: '单车/电车'
                },
                {
                    value: 'AMap.Walking',
                    text: '步行'
                }
            ],
            basicDialog: {
                open: false,
                btns: [{
                    text: '确认保存',
                    handler: this.onBasicDialogConfirm
                }]
            }
        }
    },
    mounted () {
        this.initMap()
    },
    // 监听 出发点 目的地
    watch: {
        searchStart (val) {
            this.keySearchBefore(val)
        },
        searchObjective (val) {
            this.keySearchBefore(val)
        }
    },
    methods: {
        initMap () {
            Toast.loading('加载中...')
            let that = this
            this.map = new AMap.Map('container',{
                zoom: 13,  //设置地图显示的缩放级别
                center: [126.56092959999998, 43.920187299999995],//设置地图中心点坐标
                // layers: [new AMap.TileLayer.Satellite()],  //设置图层,可设置成包含一个或多个图层的数组
                // mapStyle: 'amap://styles/whitesmoke',  //设置地图的显示样式
                viewMode: '2D',  //设置地图模式
                lang:'zh_cn',  //设置地图语言类型
            })
            // 插件定位
            AMap.plugin('AMap.Geolocation', function(){
                let geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true, // 是否使用高精度定位，默认:true
                    timeout: 10000, // 超过10秒后停止定位，默认：5s
                    buttonPosition: 'LT', // 定位按钮的停靠位置
                    buttonOffset: new window.AMap.Pixel(100, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    zoomToAccuracy: true // 定位成功后是否自动调整地图视野到定位点
                })
                that.map.addControl(geolocation)
                geolocation.getCurrentPosition()
                // 监听定位成功或者失败
                AMap.event.addListener(geolocation, 'complete', 
                    that.localOnComplete
                    // function(data){
                    //     console.log(data.position.getLng())
                    //     console.log(data.position.getLat())
                    // }
                )
                AMap.event.addListener(geolocation,'error',function(data){
                    if(data.info === 'FAILED'){
                        Toast.failed('加载失败')
                    }
                })
            })
            // 地图加载完成
            this.map.on('complete',function(){
                console.log('地图加载成功')
            })
        },
        // 定位u成功
        localOnComplete (e) {
            Toast.succeed('加载完成')
            console.log(e)
        },
        // 聚焦搜索框
        focusStart (type) {
            this.showTrafficResult = true
            // 当前选择是出发点  还是目的地
            this.curSearchType = type
            // this.resultList = []
            if(type === 'searchStart'){
                this.keySearchBefore(this.searchStart)
            }else{
                this.keySearchBefore(this.searchObjective)
            }
        },
        selOutWay () {
            this.isPopupShow = true
        },
        changeRadio (option, index) {
            this.trafficType = option.text
            this.isPopupShow = false
        },
        downResult () {
            this.showTrafficResult = false
        },
        keySearchBefore (val) {
            if(val === ''){
                this.resultList = []
                return
            }
            if(this.watchStop){
                this.watchStop = false
                return
            }
            // 每次请求搜索时  延迟一点
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.keySearch(val)
            }, 500)
        },
        keySearch (keyword) {
            this.ToastHide('正在搜索...')
            let that = this
            // 给地图实例添加输入提示的插件
            this.map.plugin('AMap.Autocomplete', function(){
                // 实例化Autocomplete
                var autoOptions = {
                    //city 限定城市，默认全国
                    city: '全国'
                }
                var autoComplete= new AMap.Autocomplete(autoOptions);
                autoComplete.search(keyword, function(status, result) {
                    // 搜索成功时，result即是对应的匹配数据
                    console.log(status, result)
                    if(status !== 'complete'){
                        that.resultList = []
                        return
                    }
                    if(result.info !== 'OK'){
                        that.resultList = []
                        return
                    }
                    that.resultList = result.tips
                })
            })
        },
        // 定时取消toast
        ToastHide (text) {
            Toast.loading(text)
            setTimeout(() => {
                Toast.hide()
            }, 1500)
        },
        // 选择地址
        selectAddress (item) {
            if(this.curSearchType === 'searchStart'){
                this.searchStart = item.name
                this.searchStartData = item
            }else{
                this.searchObjective = item.name
                this.searchObjectiveData = item
            }
            this.showTrafficResult = false
            this.watchStop = true // 本轮停止请求
        },
        // 搜索
        search () {
            // 清楚已经存在的路线
            if(this.driving){
                this.driving.clear()
            }
            if(!this.searchStartData.location || !this.searchObjectiveData.location){
                Toast.failed('请先在列表中确认准确地点')
                return
            }
            let temArr = []
            temArr.push(this.searchStartData.location)
            temArr.push(this.searchObjectiveData.location)
            this.searchDriving(temArr)
        },
        // 搜索路线
        searchDriving (LngLatArr) {
            console.log(LngLatArr)
            // this.isPanleShow = true
            // this.panelListShow = true
            this.ToastHide('正在规划路线...')
            // 给地图实例添加插件
            let that = this
            let type = this.myWay.slice(5)
            // that.panelListShow = true
            // that.isPanleShow = true
            this.map.plugin(this.myWay, function(){
                that.driving = new AMap[type]({
                    map: that.map,
                    city: '深圳市',
                    panel: 'panel',
                    autoFitView: true
                })
                // 根据起点终点规划路线
                that.driving.search(
                    LngLatArr[0],
                    LngLatArr[1],
                    function (status, result) {
                        // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                        Toast.hide()
                        console.log(status, result)
                        if (status === 'complete') {
                            console.log('绘制驾车路线完成')
                            that.panelListShow = true
                            that.isPanleShow = true
                            // 存第一条轨迹的路程
                            if (result.plans) {
                                that.distance = (result.plans[0].distance / 1000).toFixed(2)
                            } else {
                                that.distance = (result.routes[0].distance / 1000).toFixed(2)
                            }
                            //   that.isPanelShow = true
                        } else {
                            console.log('获取驾车数据失败：' + result)
                            Toast.failed('未检测到匹配路线')
                        }
                    }
                )
            })

        },
        // 收缩路线
        downPanel () {
            this.panelListShow = ! this.panelListShow
        },
        // 确定路线
        panelSureOnClick () {
            this.panelListShow = false
            this.basicDialog.open = true
        },
        // 确认后的弹框
        onBasicDialogConfirm () {
            this.basicDialog.open = false
        }
     }
}
</script>
<style lang="less" scoped>
.traffic{
    width: 100%;
    height: 100%;
    position: relative;
    #container{
        height: calc(100% + 200px);
    }
    &-search{
        position: absolute;
        top: 0;
        width: 100%;
        box-shadow: 0 0 10px #929090;
        .serach-btn1, .serach-btn2{
            position: absolute;
            width: 150px;
            height: 30%; 
            right: 10px;
        }
        .serach-btn1{
            top: 50px;
        }
        .serach-btn2{
            bottom: 40px;
        }
    }
    .traffic-list{
        margin-top: 20px;
        width: 100%;
        background: hsla(0,0%,100%,.82353);
        // background: #eee;
        position: absolute;
        top: 350px;
        height: calc(100% - 200px);
        overflow: auto;
        .up-btn{
            font-size: 40px;
            margin-top: 5px;
        }
        .md-field{
            background: transparent;
        }
        .md-cell-item{
            text-align: left;
        }
    }
    .panel-list{
        width: 100%;
        height: 60%;
        position: absolute;
        bottom: 0;
        background: #fff;
        transform: translateY(85%);
        transition: all .5s;
        overflow: auto;
        .panel-list-top{
            font-size: 12px;
            display: flex;
            justify-content: space-between;
            .panel-list-title{
                margin-left:10px;
                margin: 5px;
            }
            .panel-list-svg{
                font-size: 40px;
                .up{
                    transform: rotateX(180deg);
                }
            }
            .panel-list-btn{
                font-size: 25px;
                margin-right: 10px;
                background: #2f86f6;
                border-radius: 5px;
                padding: 0 15px;
                margin: 5px;
            }
        }
    }
    #panel-list-id{
        transform: translateY(0);
        transition: all .5s;
    }
    #panel{
        width: 100%;
        margin-top: 10px;
    }

}

.traffic-enter,.traffic-leave-to{
    transform: translateY(100%);
}
.traffic-enter-to,.traffic-leave{
    transform: translateY(0);
}
.traffic-enter-active,.traffic-leave-active{
    transition: all .4s;
}
</style>
<style lang="less">
.amap-geo{
    display: none;
}
.spendValue{
    border: none;
}
.dialog-field {
  .md-field-item-content:before {
    background-color: transparent;
  }
  .md-field-item-title {
    width: 13.333vw;
    font-size: 3.733vw;
  }
  .md-field-item-content {
    min-height: 0;
    padding: 12px 0;
  }
  .md-stepper-button.md-stepper-button-add:before{
    content: '';
  }
}
#markText{
    .md-input-item-input{
        font-size: 3.7vw;
        text-align: right;
        height: 6.333vw;
    }
    .md-field-item-title {
        width: 13.333vw;
        font-size: 3.733vw;
    }
}
</style>



