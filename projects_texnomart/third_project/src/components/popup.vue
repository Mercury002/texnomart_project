<template>
  <div class="d-center">
    <button class="btn-login" v-if="!$store.state.user" @click="popup = true">Login</button>
    <button class="btn-login" v-else @click="logOut">Logout</button>
    <div class="popup" v-show="popup">
      <div class="overflow" @click="popup = false"></div>
      <div class="popup__content">
        <h2>Registration</h2>
        <input type="text" v-model="firstname" placeholder="Firstname">
        <input type="text" v-model="password" placeholder="Password">
        <button @click="getInfo">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "popup",
  data: () => ({
    firstname: '',
    password: '',
    popup: false,
    isLoginUser: false
  }),
  methods: {
    async getInfo() {
      let formData = {
        username: this.firstname,
        password: this.password,
      }
      let response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('userInfo', JSON.stringify(data))
          this.closeModal()
        })
        .catch(err => console.error(err))

    },
    closeModal() {
      this.isLoginUser = true
      window.location.reload()
    },
    logOut() {
      localStorage.removeItem('userInfo')
      this.isLoginUser = false
      window.location.reload()
    }
  },
  watch: {
    popup(newVal, oldVal) {
      if (newVal) {
        document.querySelector('body').classList.add('lock')
      } else {
        document.querySelector('body').classList.remove('lock')
      }
    },
  },
  mounted() {
    this.$store.commit('CHECK_USER')
  }
}
</script>

<style lang="scss">
.btn-login {
  border-radius: 0 4px 4px 0;
  padding: 4px 15px;
  border: 1px solid gray;
  outline: none;
  background-color: #2E75E1;
  color: #fff;
  font-weight: 500;
}

.popup {
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;

  &__content {
    height: 300px;
    width: 400px;
    background-color: #fff;
    border-radius: 20px;
    position: absolute;
    z-index: 3;
    padding: 15px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & h2 {
      text-align: center;
      margin: 10px 0 20px;
      font-size: 30px;
    }

    & input {
      background: #FFFFFF;
      border: 1px solid #CCCCCC;
      border-radius: 4px;
      padding: 16px 30px 16px 16px;
      font-size: 18px;
      width: 100%;
      margin-bottom: 10px;
    }

    & button {
      background: #2E75E1;
      border-radius: 4px;
      padding: 15px 30px;
      border: none;
      color: #fff;
      font-size: 16px;
      margin-top: 15px;
    }
  }
}


.overflow {
  width: 100%;
  height: 100%;
  background-color: #333;
  opacity: 0.8;
  position: absolute;
  z-index: 1;
}
</style>