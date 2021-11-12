import { menuModule } from './menuModule';
import { createStore } from 'vuex'
import { tabMoudle } from './tabMoudle'


export default createStore({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    menu: menuModule,
    tabs: tabMoudle
  }
})
