<template>
  <v-container>
    <v-layout row justify-center align-center fill-height>
      <v-flex xs12 md6>
        <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            class="mt-16 pa-16 elevation-5"
        >
          <v-toolbar-title>Login</v-toolbar-title>
          <v-text-field
              prepend-icon="mdi-account"
              v-model="email"
              label="Email"
              required
              :rules="emailRules"
          ></v-text-field>
          <v-text-field
              prepend-icon="mdi-lock"
              color="blue"
              v-model="password"
              label="Password"
              type="password"
              required
              :counter="max"
              :rules="passRules"
          ></v-text-field>
          <v-layout justify-end>
            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="validate"
            >
              Login
            </v-btn>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      valid: true,
      max: 6,
      name: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= this.max) || `Name must be more than ${this.max} characters`,
      ],
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('loginUser', user)
            .then(() => {
              this.$router.push('/')
            })
            .catch(() => {})
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
  created() {
    if(this.$route.query['loginError']){
      this.$store.dispatch('setError', 'Please log in to access this page!!!')
    }
  }
}
</script>

<style scoped lang="scss">
form {
  //border: 2px solid #1976d2;
  //box-shadow: 0 8px 28px rgba(0,0,0,.3);
}
</style>
