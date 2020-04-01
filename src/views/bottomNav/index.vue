<template>
  <div class="trip-nav">
    <md-tab-bar v-model="current" :items="items" @change="onChange">
      <template slot="item" slot-scope="{ item }">
        <div class="custom-item">
          <div class="icon">
            <md-icon :name="item.icon" />
          </div>
          <div class="text">
            <span v-text="item.label"></span>
          </div>
        </div>
      </template>
    </md-tab-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 1,
      items: [
        { name: 1, label: '出行', icon: 'home' },
        { name: 3, label: '历史', icon: 'calendar' },
        { name: 4, label: '我的', icon: 'authentication' }
      ]
    }
  },
  methods: {
    onChange(item) {
      switch (item.name) {
        case 1:
          this.$router.push('/')
          break
        case 2:
          this.$router.push('/traffic')
          break
        case 3:
          this.$router.push('/cssTest')
          break
        case 4:
          this.$router.push('/mine')
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.trip-nav {
  // fixed定位在ios上可能会失效
  // position: fixed;
  // bottom: 0;
  width: 100%;
  height: 100px;
  font-size: 25px;
}
</style>
