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
          <v-toolbar-title>Registration</v-toolbar-title>
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
              name="password"
              required
              :counter="max"
              :rules="passRules"
          ></v-text-field>
          <v-text-field
              prepend-icon="mdi-lock"
              color="blue"
              name="confirm-password"
              v-model="confirmPassword"
              label="Password"
              type="password"
              required
              :counter="max"
              :rules="confirmPassRules"
          ></v-text-field>
          <v-layout justify-end>
            <v-btn
                color="success"
                class="mr-4"
                @click="validate"
                :loading="loading"
                :disabled="!valid || loading"
            >
              Create account!
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
      confirmPassword: '',
      name: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= this.max) || `Name must be more than ${this.max} characters`,
      ],
      confirmPassRules: [
        v => !!v || 'Password is required',
        v => v === this.password || 'Password should match!!!',
      ],
    }
  },
  computed: {
    loading() {
      return this.$store.getters.loading
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        }
        this.$store.dispatch('registerUser', user)
        .then(() => {
          this.$router.push('/')
        })
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style scoped lang="scss">
form {
  //border: 2px solid #1976d2;
  //box-shadow: 0 8px 28px rgba(0,0,0,.3);
}
</style>
