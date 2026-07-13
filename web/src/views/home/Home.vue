<template>
  <div class="home-content">
    <!-- 编辑器入口：水平滚动卡片（非 3 等栏） -->
    <section class="editor-section">
      <div class="section-header">
        <h2 class="section-title">开始创作</h2>
        <p class="section-subtitle">选择一个编辑器，开启你的编程之旅</p>
      </div>
      <div class="editor-scroll">
        <div class="editor-card editor-sjr" @click="toEditor(2)">
          <div class="editor-card-inner">
            <div class="editor-icon"><img src="@assets/sjr.png" alt="ScratchJr"></div>
            <div class="editor-info">
              <h3>ScratchJr</h3>
              <span class="editor-tag">启蒙编程</span>
            </div>
          </div>
          <div class="editor-arrow"><a-icon type="arrow-right" /></div>
        </div>
        <div class="editor-card editor-sc" @click="toEditor(1)">
          <div class="editor-card-inner">
            <div class="editor-icon"><img src="@assets/scratch.png" alt="Scratch"></div>
            <div class="editor-info">
              <h3>Scratch 3.0</h3>
              <span class="editor-tag">图形化编程</span>
            </div>
          </div>
          <div class="editor-arrow"><a-icon type="arrow-right" /></div>
        </div>
        <div class="editor-card editor-py" @click="toEditor(3)">
          <div class="editor-card-inner">
            <div class="editor-icon"><img src="@assets/python.png" alt="Python"></div>
            <div class="editor-info">
              <h3>Python</h3>
              <span class="editor-tag">代码编程</span>
            </div>
          </div>
          <div class="editor-arrow"><a-icon type="arrow-right" /></div>
        </div>
      </div>
    </section>

    <!-- 精选作品 -->
    <section class="panel-works" v-if="greatLeaderboard.length > 0">
      <div class="section-header">
        <div class="title-bar"></div>
        <h2 class="section-title">精选作品</h2>
        <router-link v-if="page.greatLeaderboard > -1" class="see-all" :to="{ path: '/workList?type=3' }">查看全部</router-link>
      </div>
      <a-row type="flex" justify="start" :gutter="[20, 20]">
        <a-col v-for="(item, index) in greatLeaderboard" :key="index" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <div class="work-card" @click="toDetail(item.id)">
            <div class="work-cover-wrap">
              <img class="work-cover" v-if="item.coverFileKey_url" :src="item.coverFileKey_url" />
              <img v-else-if="item.workType == 4 || item.workType == 10" src="@/assets/code.png" alt="" />
              <div class="work-overlay">
                <a-icon type="eye" /> {{ item.viewNum }}
                <a-divider type="vertical" />
                <a-icon type="like" /> {{ item.starNum }}
              </div>
            </div>
            <div class="work-info">
              <p class="work-name">{{ item.workName }}</p>
              <div class="work-meta">
                <a-avatar shape="circle" :size="24" :src="item.avatar_url" @click.stop="toFriend(item.userId)" />
                <span class="work-author" @click.stop="toFriend(item.userId)">{{ item.realname || item.username }}</span>
                <a-tag class="work-type">{{ item.workType_dictText }}</a-tag>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </section>

    <!-- 推荐课程 -->
    <section class="panel-works" v-if="courseLeaderboard.length > 0">
      <div class="section-header">
        <div class="title-bar"></div>
        <h2 class="section-title">推荐课程</h2>
        <router-link v-if="page.courseLeaderboard > -1" class="see-all" :to="{ path: '/courseList' }">查看全部</router-link>
      </div>
      <a-row type="flex" justify="start" :gutter="[20, 20]">
        <a-col v-for="(item, index) in courseLeaderboard" :key="index" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <div class="work-card" @click="toCourseDetail(item.id)">
            <div class="work-cover-wrap">
              <img class="work-cover" :src="item.courseCover_url" />
            </div>
            <div class="work-info">
              <p class="work-name">{{ item.courseName }}</p>
            </div>
          </div>
        </a-col>
      </a-row>
    </section>

    <!-- 最赞作品 -->
    <section class="panel-works">
      <div class="section-header">
        <div class="title-bar"></div>
        <h2 class="section-title">最赞作品</h2>
        <router-link v-if="page.starLeaderboard > -1" class="see-all" :to="{ path: '/workList?type=2' }">查看全部</router-link>
      </div>
      <a-row type="flex" justify="start" :gutter="[20, 20]">
        <a-col v-for="(item, index) in starLeaderboard" :key="index" :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <div class="work-card" @click="toDetail(item.id)">
            <div class="work-cover-wrap">
              <img class="work-cover" v-if="item.coverFileKey_url" :src="item.coverFileKey_url" />
              <img v-else-if="item.workType == 4 || item.workType == 10" src="@/assets/code.png" alt="" />
              <div class="work-overlay">
                <a-icon type="eye" /> {{ item.viewNum }}
                <a-divider type="vertical" />
                <a-icon type="like" /> {{ item.starNum }}
              </div>
            </div>
            <div class="work-info">
              <p class="work-name">{{ item.workName }}</p>
              <div class="work-meta">
                <a-avatar shape="circle" :size="24" :src="item.avatar_url" @click.stop="toFriend(item.userId)" />
                <span class="work-author" @click.stop="toFriend(item.userId)">{{ item.realname || item.username }}</span>
                <a-tag class="work-type">{{ item.workType_dictText }}</a-tag>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { getAction, getFileAccessHttpUrl } from '@/api/manage'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PublicWorkList',
  data() {
    return {
      brandName: this.$store.getters.sysConfig.brandName,
      logo: '/logo.png',
      avatarUrl: '/logo.png',
      token: '',
      greatLeaderboard: [],
      starLeaderboard: [],
      courseLeaderboard: [],
      page: {
        starLeaderboard: 0,
        courseLeaderboard: 0,
        greatLeaderboard: 0,
      },
    }
  },
  created() {
    this.token = Vue.ls.get(ACCESS_TOKEN)
    if (this.$store.getters.sysConfig.logo && this.$store.getters.sysConfig.qiniuDomain) {
      this.logo = this.$store.getters.sysConfig.qiniuDomain + '/' + this.$store.getters.sysConfig.logo
    }
    if (this.getFileAccessHttpUrl(this.avatar())) {
      this.avatarUrl = this.getFileAccessHttpUrl(this.avatar())
    }
    this.getGreatLeaderboard()
    this.getStarLeaderboard()
  },
  methods: {
    getFileAccessHttpUrl,
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar', 'userInfo']),
    enter(type) {
      switch (type) {
        case 0: this.$router.push('/user/login'); break
        case 1: this.$router.push('/account/center'); break
        case 2: this.$router.push('/teaching/mineCourse/cardList'); break
        default: this.$router.push('/account/center'); break
      }
    },
    changeAccount() {
      const that = this
      this.$confirm({
        title: '提示',
        content: '确定要退出当前账号并登录新的账号吗 ?',
        onOk() {
          return that.Logout({}).then(() => {
            window.location.href = '/user/login'
          }).catch(err => {
            that.$message.error({ title: '错误', description: err.message })
          })
        },
        onCancel() {},
      })
    },
    getGreatLeaderboard() {
      this.page.greatLeaderboard += 1
      getAction('/teaching/teachingWork/leaderboard', {
        orderBy: 'create_time', workStatus: 4, pageSize: 4, pageNo: this.page.greatLeaderboard,
      }).then((res) => {
        if (res.success) {
          this.greatLeaderboard = this.greatLeaderboard.concat(res.result.records)
          if (this.greatLeaderboard.length >= res.result.total) this.page.greatLeaderboard = -1
        }
      })
    },
    getStarLeaderboard() {
      this.page.starLeaderboard += 1
      getAction('/teaching/teachingWork/leaderboard', {
        orderBy: 'star', pageSize: 8, pageNo: this.page.starLeaderboard,
      }).then((res) => {
        if (res.success) {
          this.starLeaderboard = this.starLeaderboard.concat(res.result.records)
          if (this.starLeaderboard.length >= res.result.total) this.page.starLeaderboard = -1
        }
      })
    },
    getCourseLeaderboard() {
      this.page.courseLeaderboard += 1
      getAction('/teaching/teachingCourse/getHomeCourse', {
        pageSize: 4, pageNo: this.page.courseLeaderboard,
      }).then((res) => {
        if (res.success) {
          this.courseLeaderboard = this.courseLeaderboard.concat(res.result.records)
          if (this.courseLeaderboard.length >= res.result.total) this.page.courseLeaderboard = -1
        }
      })
    },
    toDetail(id) {
      let route = this.$router.resolve({ path: '/work-detail', query: { id: id } })
      window.open(route.href, '_blank')
    },
    toFriend(id) {
      let route = this.$router.resolve({ path: '/friend-detail', query: { id: id } })
      window.open(route.href, '_blank')
    },
    toCourseDetail(id) {
      this.$router.push('/teaching/mineCourse/courseUnitCard?id=' + id)
    },
    toEditor(type) {
      switch (type) {
        case 1: window.open('/scratch3/index.html?scene=create'); break
        case 2: window.open('/scratchjr/home.html'); break
        case 3: window.open('/python/index.html'); break
      }
    },
  },
}
</script>

<style lang="less" scoped>
.home-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px 64px;
}

// --- 编辑器入口：水平滚动卡片 ---
.editor-section {
  margin-bottom: 56px;
}

.editor-scroll {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 8px;
  scroll-snap-type: x mandatory;
  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-thumb { background: #E4E4E7; border-radius: 2px; }
}

.editor-card {
  flex: 0 0 320px;
  height: 140px;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  scroll-snap-align: start;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  &.editor-sjr { background: #2563EB; }
  &.editor-sc { background: #EAB308; }
  &.editor-py { background: #DC2626; }
}

.editor-card-inner {
  display: flex;
  align-items: center;
  gap: 16px;
}

.editor-icon img {
  width: 56px;
  height: 56px;
  object-fit: contain;
}

.editor-info {
  h3 {
    color: #FFFFFF;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 4px 0;
    line-height: 1.2;
  }
  .editor-tag {
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.8125rem;
  }
}

.editor-arrow {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.25rem;
  transition: transform 0.2s, color 0.2s;
  .editor-card:hover & {
    color: #FFFFFF;
    transform: translateX(4px);
  }
}

// --- 区块通用 ---
.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.title-bar {
  width: 4px;
  height: 24px;
  border-radius: 2px;
  background: #2563EB;
  flex-shrink: 0;
}

.section-title {
  font-size: 1.375rem;
  font-weight: 600;
  color: #18181B;
  letter-spacing: -0.01em;
  margin: 0;
  flex-grow: 1;
}

.section-subtitle {
  font-size: 0.875rem;
  color: #71717A;
  margin: 0;
}

.see-all {
  color: #2563EB;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.15s;
  &:hover { color: #1D4ED8; }
}

// --- 作品卡片 ---
.panel-works {
  margin-bottom: 56px;
}

.work-card {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #E4E4E7;
  background: #FFFFFF;
  cursor: pointer;
  transition: box-shadow 0.2s, border-color 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
    border-color: #D4D4D8;
    transform: translateY(-2px);
    .work-overlay { opacity: 1; }
  }
}

.work-cover-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #F4F4F5;
}

.work-cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.work-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px 12px;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
  color: #FFFFFF;
  font-size: 0.75rem;
  opacity: 0;
  transition: opacity 0.2s;
  .ant-divider { background: rgba(255, 255, 255, 0.3); }
}

.work-info {
  padding: 12px 16px;
}

.work-name {
  font-size: 0.9375rem;
  font-weight: 500;
  color: #18181B;
  margin: 0 0 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.work-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.work-author {
  font-size: 0.8125rem;
  color: #71717A;
  cursor: pointer;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover { color: #2563EB; }
}

.work-type {
  margin: 0;
  margin-left: auto;
  font-size: 0.6875rem;
  line-height: 1.4;
}

// --- 响应式 ---
@media (max-width: 768px) {
  .home-content { padding: 16px 12px 48px; }
  .editor-card { flex: 0 0 280px; height: 120px; }
  .panel-works { margin-bottom: 40px; }
  .section-title { font-size: 1.125rem; }
}
</style>
