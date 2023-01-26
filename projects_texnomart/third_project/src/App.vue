<template>
  <div class="market">
    <nav class="navbar">
      <div class="container">
        <div class="navbar__nav">
          <h2 class="navbar__logo">LOGO</h2>
          <div class="d-center">
            <input type="text" @input="searchProducts" v-model="search" class="navbar__search" placeholder="search">
            <popupContent />
          </div>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="main">
        <h1 class="main__title">Products</h1>
        <ul class="main__products">
          <li class="main__products--col" v-for="item in products" :key="item.id">
            <div class="main__product">
              <div class="main__product--img"><img :src="item.thumbnail" alt="">
              </div>
              <div class="main__product--info">
                <div class="product__name">
                  <p>{{ item.title }}</p>
                  <span class="product__rate">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="15px"
                      width="15px" version="1.1" id="Capa_1" viewBox="0 0 47.94 47.94" xml:space="preserve">
                      <path style="fill:#ED8A19;"
                        d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757  c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042  c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685  c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528  c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956  C22.602,0.567,25.338,0.567,26.285,2.486z" />
                    </svg>
                    <strong>{{ item.rating }}</strong>
                  </span>
                </div>
                <p class="product__description">{{ item.description }}</p>
                <div class="product__price">
                  <span class="product__old-value">
                    <p>{{ maskSumField(getCalcValue(item.price, item.discountPercentage)) }}$</p>
                    <p>-{{ item.discountPercentage }}%</p>
                  </span>
                  <strong class="product__new-value">{{ maskSumField(item.price) }}$ <p @click="openModal(item)">
                      get more info
                    </p>
                  </strong>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <infoModal :infoModal="infoModal" @close-modal="infoModal = false" :product="product" />
  </div>
</template>

<script>
import popupContent from "@/components/popup";
import infoModal from "./components/infoModal.vue";

export default {
  name: 'App',
  data() {
    return {
      // popup: false,
      infoModal: false,
      product: null,
      user: null,
      search: '',
    }
  },
  components: { popupContent, infoModal },
  computed: {
    products: {
      get() {
        return this.$store.getters.getProducts
      },
      set(value) {
        return value
      }
    }
  },
  methods: {
    searchProducts() {
      this.$store.dispatch('GET_SEARCHED_DATA', this.search)
    },
    openModal(item) {
      this.infoModal = !this.infoModal
      this.product = item
    },
    getCalcValue(newVal, DP) {
      return Math.round((newVal * 100) / (100 - DP))
    },
    async getAllData() {
      await this.$store.dispatch('SET_ALL_PRODUCT')
    },

    maskSumField(summ) {
      return Number.parseFloat(summ)?.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1 ') ?? 0;
    }
  },
  watch: {
    infoModal(newVal, oldVal) {
      if (newVal) {
        document.querySelector('body').classList.add('lock')
      } else {
        document.querySelector('body').classList.remove('lock')
      }
    },
  },
  async created() {
    await this.getAllData()
  },
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: 'Poppins', sans-serif;
}

ul {
  list-style: none;
}

.lock {
  overflow: hidden;
}

.d-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.market {
  height: 120%;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
}

.market {
  position: relative;
}

.navbar {
  box-shadow: 1px 1px 10px #333;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: #fff;

  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
  }

  &__search {
    border: none;
    outline: none;
    padding: 4px 15px;
    border: 1px solid gray;
    border-radius: 4px 0 0 4px;
  }
}

.main {
  margin-top: 100px;
  z-index: 2;

  &__title {
    text-align: center;
  }

  &__products {
    display: flex;
    flex-wrap: wrap;

    &--col {
      width: 25%;
      margin-top: 20px;
    }
  }

  &__product {
    width: 300px;
    border-radius: 4px;
    overflow: hidden;
    box-shadow: 1px 1px 3px gray;
    transition: all 0.3s;

    &--img {
      width: 100% !important;
      height: 160px !important;

      & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &--info {
      padding: 5px 10px;
    }
  }

  &__product:hover {
    box-shadow: 1px 1px 10px gray;
    border: none;
  }

}

.product {
  &__name {
    display: flex;

    & p {
      font-size: 20px;
      max-width: 208px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  &__rate {
    margin-left: 15px;
    display: flex;
    align-items: center;

    & strong {
      margin-left: 3px;
    }
  }

  &__description {
    margin-top: 5px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__old-value {
    display: flex;
    margin-top: 5px;

    & p:first-child {
      text-decoration: line-through;
      margin-right: 10px;
      opacity: 0.6;
      z-index: -1;
    }

    & p:last-child {
      color: red;
    }
  }

  &__new-value {
    font-weight: 800;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & p {
      font-size: 18px;
      font-weight: 400;
      cursor: pointer;
      transition: all 0.2s;
    }

    & p:hover {
      transform: skew(-10deg);
    }
  }
}
</style>
