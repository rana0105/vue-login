import { createStore } from 'vuex'
import modules from './modules/index';

// Create a new store instance.
const store = createStore({
  modules,
})
export default store;
