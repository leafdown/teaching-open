<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="split-container">
      <!-- 左侧品牌视觉区 -->
      <div class="brand-panel">
        <div class="brand-content">
          <img :src="logo" class="logo" alt="logo">
          <h1 class="brand-name">{{brandName}}</h1>
          <p class="brand-desc">{{brandDesc}}</p>
        </div>
      </div>
      <!-- 右侧表单区 -->
      <div class="form-panel">
        <div class="form-container">
          <route-view></route-view>
        </div>
        <div class="footer">
          <div class="copyright">
            Copyright &copy; 2019-2022 <a href="https://www.lanqu.vip" target="_blank">蓝趣编程课堂</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RouteView from "@/components/layouts/RouteView"
  import { mixinDevice } from '@/utils/mixin.js'
  import { getFileAccessHttpUrl } from '@/api/manage'
  export default {
    name: "UserLayout",
    components: { RouteView },
    mixins: [mixinDevice],
    data () {
      return {
         brandName: this.$store.getters.sysConfig.brandName,
         brandDesc: this.$store.getters.sysConfig.brandDesc,
         logo: '/logo.png'
      }
    },
    created() {
      if(this.$store.getters.sysConfig.logo){
        this.logo = getFileAccessHttpUrl(this.$store.getters.sysConfig.logo)
      }
    },
    mounted () {
      document.body.classList.add('userLayout')
    },
    beforeDestroy () {
      document.body.classList.remove('userLayout')
    },
  }
</script>

<style lang="less" scoped>
  #userLayout.user-layout-wrapper {
    min-height: 100dvh;

    .split-container {
      display: flex;
      min-height: 100dvh;
    }

    // 左侧品牌视觉区
    .brand-panel {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #2563EB;
      padding: 48px;

      .brand-content {
        text-align: center;
        max-width: 400px;

        .logo {
          max-height: 72px;
          margin-bottom: 24px;
          border-style: none;
        }

        .brand-name {
          font-size: clamp(1.75rem, 3vw, 2.25rem);
          font-weight: 600;
          color: #FFFFFF;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }

        .brand-desc {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.6;
        }
      }
    }

    // 右侧表单区
    .form-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #F7F7F8;
      padding: 48px 24px;
      position: relative;

      .form-container {
        width: 100%;
        max-width: 400px;
      }

      .footer {
        position: absolute;
        bottom: 24px;
        width: 100%;
        text-align: center;

        .copyright {
          color: #71717A;
          font-size: 0.75rem;

          a {
            color: #71717A;
            text-decoration: none;
            transition: color 0.15s;
            &:hover {
              color: #2563EB;
            }
          }
        }
      }
    }

    // 移动端：隐藏品牌区，只显示表单
    &.mobile {
      .brand-panel {
        display: none;
      }
      .form-panel {
        flex: 1;
      }
    }
  }
</style>
