<template>
  <div class="login">
    <div class="login-bg">
      <div class="login-title">
        <img src="../assets/img/logo.png" alt />
      </div>
      <div class="login-form">
        <md-field>
          <md-input-item title="用户" type="text" v-model="form.userName"></md-input-item>
          <md-input-item title="密码" type="password" v-model="form.pwd"></md-input-item>
        </md-field>
      </div>
      <div class="login-btn" @click="toLogin()">
        <svg-icon class="svg-btn" icon-class="login-btn"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        userName: 'cool',
        pwd: 'cool'
      }
    }
  },
  methods: {
    toLogin() {
      this.$router.push({ path: '/trip' })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  &-bg {
    width: 100%;
    height: 100%;
    background-image: url('../assets/img/login-bg-mini.jpg');
    background-size: 100% 100%;
    .login-title {
      img {
        width: 250px;
        margin-top: 50px;
      }
    }
  }
}
</style>
<style lang="less">
.login {
  .md-field {
    margin-top: 100px;
    background: transparent;
  }
  .md-field-item-content:before {
    background: black;
  }
  .md-field-item {
    text-align: left;
  }
}
.login-btn {
  width: 200px;
  height: 200px;
  margin: 20px auto;
  font-size: 100px;
}
</style>
