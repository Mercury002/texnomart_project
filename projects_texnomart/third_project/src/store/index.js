import { createStore } from 'vuex'

export default createStore({
  state: {
    products: [],
    comments: [],
    user: null
  },
  getters: {
    getProducts(state) {
      return state.products
    },
    getComments(state) {
      return state.comments
    },
    getUser(state) {
      return state.user
    }
  },
  mutations: {
    SET_PRODUCT(state, payload) {
      state.products = payload
    }, 
    GET_COMMENTS(state, payload) {
      state.comments = payload
    },
    CHECK_USER(state) {
      if(localStorage.getItem('userInfo')) {
        state.user = localStorage.getItem('userInfo')
      }
    }
  },
  actions: {
    async SET_ALL_PRODUCT(context) {
      await fetch('https://dummyjson.com/products?limit=10')
        .then((res) => res.json())
        .then(({products}) => {
          context.commit('SET_PRODUCT', products)
        })
        .catch((err) => console.error(err))
    },
    async GET_SEARCHED_DATA(context, payload) {
      await fetch(`https://dummyjson.com/products/search?q=${payload}`)
        .then((res) => res.json())
        .then(({products}) => {
          context.commit('SET_PRODUCT', products)
        })
        .catch((err) => console.error(err))
    },
    async GETT_ALL_COMMENT(context, payload) {
      await fetch(`https://dummyjson.com/comments/post/${payload}`)
        .then(res => res.json())
        .then(({comments}) => {
          context.commit('GET_COMMENTS', comments)
        })
        .catch((err) => console.error(err))
    }
  },
})
