<template>
    <div class="copyright">
          <a-divider type="vertical" />
          Copyright
          <a-icon type="copyright" />
          2019 - 2021 <span>{{ brandName }}</span>
          <a-divider type="vertical" />
          <a href="http://beian.miit.gov.cn/"
            ><span
              style="
                background-color: #fdfdfd;
                color: #666666;
                font-family: 'Microsoft Yahei', simsun, arial, sans-serif;
                font-size: 14px;
              "
              >{{ beian }}</span
            ></a
          >
        </div>
    <div class="footer" v-html="$store.getters.sysConfig.footer"></div>
</template>
<script>
</script>
<style scoped>
.footer {
  width: 100%;
  height: 90px;
  bottom:0;
  padding-top: 20px;
  padding-bottom: 15px;
    text-align: center;
}
</style>