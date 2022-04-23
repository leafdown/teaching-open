<template>
  <div class="user-enter">
    <div v-if="token">
      <a-avatar shape="square" class="avatar" :size="100" :src="getFileAccessHttpUrl(avatar())" />
      <h3>欢迎您，{{ nickname() }}</h3>
      <a-button type="dashed" @click="enter">进入系统</a-button>
      <a-button type="dashed" @click="handleLogout">退出登录</a-button>
    </div>
    <div v-else>
      <a-avatar shape="square" class="avatar" :size="100" src="/logo.png" />
      <h3>欢迎来到{{ brandName }}</h3>
      <a-button type="dashed" @click="enter">登录/注册</a-button>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'

import { mapActions, mapGetters } from 'vuex'
import { ACCESS_TOKEN } from '@/store/mutation-types'
export default {
  data() {
    return {
      brandName: this.$store.getters.sysConfig.brandName,
      token: '',
    }
  },
  created() {
    this.token = Vue.ls.get(ACCESS_TOKEN)
  },

  methods: {
    ...mapActions(["Logout"]),
    ...mapGetters(['nickname', 'avatar', 'userInfo']),
    getFileAccessHttpUrl,
    enter() {
      this.$router.push('/account/center')
    },
      handleLogout() {
        const that = this

        this.$confirm({
          title: '提示',
          content: '真的要注销登录吗 ?',
          onOk() {
            return that.Logout({}).then(() => {
                window.location.href="/";
              //window.location.reload()
            }).catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
          },
          onCancel() {
          },
        });
      },
  },
}
</script>
<style scoped>
.user-enter {
  background: url(/img/login-bg.png) no-repeat;
  background-size: 100% 100%;
  border-radius: 10px;
  width: 250px;
  height: 400px;
  text-align: center;
  padding-top: 110px;
  line-height: 50px;
}
.ant-btn {
  width: 80%;
}
</style>