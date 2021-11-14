import { menuModule } from './menuModule';
import { createStore } from 'vuex'
import { tabMoudle } from './tabMoudle'
import { userMoudle } from './userModule'


export default createStore({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    menu: menuModule,
    tabs: tabMoudle,
    user: userMoudle
  }
})
