import Vue from "vue";
import Vuex from "vuex"
import CreateLogger from "vuex/dist/logger"

import login from "./module/login"
import user from "./module/user"

Vue.use(Vuex);

export default new Vuex.Store({
    modules : {
        login,
        user
    },
    plugins : [CreateLogger()]
})