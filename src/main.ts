import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

import ElementUI from 'element-ui';
import "../node_modules/element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI);

//引入字体图标：
import "./font/iconfont.css"

//引入echarts
import echarts from "echarts"
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

//组件实例
import DrawColumnar from "./components/DrawColumnar.vue"
import DrawLine from "./components/DrawLine.vue"
import HeaderTitle from "./components/HeaderTitle.vue"

Vue.component("DrawColumnar",DrawColumnar)
Vue.component("DrawLine",DrawLine)
Vue.component("HeaderTitle",HeaderTitle)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
