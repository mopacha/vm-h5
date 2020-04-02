import Vuex from 'vuex'
import Vue from 'vue'

import trip from './modules/trip'

Vue.use(Vuex)
export default new Vuex.Store({
    modules: {
        trip
    }
})