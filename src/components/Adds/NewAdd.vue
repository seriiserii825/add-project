<template>
    <v-container>
        <v-layout row class=" elevation-5">
            <v-flex xs12 class="pa-10">
                <h1>Create ad</h1>
                <v-form
                    ref="form"
                    lazy-validation
                    class="mt-16 pa-16"
                >
                    <v-text-field
                        prepend-icon="mdi-account"
                        v-model="title"
                        label="Add title"
                        type="text"
                        required
                        :rules="[v => !!v || 'Title is required']"
                    ></v-text-field>
                    <v-text-field
                        prepend-icon="mdi-lock"
                        color="blue"
                        :rules="[v => !!v || 'Description is required']"
                        v-model="description"
                        label="Description"
                        type="text"
                        aria-multiline="true"
                        required
                    ></v-text-field>
                </v-form>
                <v-flex>
                    <v-layout row class="mb-4">
                        <v-flex>
                            <v-btn class="warning">Upload image</v-btn>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex>
                            <!--              <img src="@/assets/img/slider-3.jpg" height="150">-->
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex>
                            <v-switch v-model="promo" label="Add to promo"></v-switch>
                        </v-flex>
                    </v-layout>

                    <v-layout row justify-end>
                        <v-flex class="d-inline-block" tag="span" shrink>
                            <v-btn class="success" @click="createAd" :loading="loading">Create Ad</v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            description: '',
            promo: false
        }
    },
    computed: {
      loading(){
          return this.$store.getters.loading
      }
    },
    methods: {
        createAd() {
            if (this.$refs.form.validate()) {
                const ad = {
                    title: this.title,
                    description: this.description,
                    imageSrc: 'http://i.imgur.com/czsIYsv.png',
                    promo: this.promo
                }
                this.$store.dispatch('createAd', ad)
                .then(() => {
                    this.$router.push('/')
                })
                .catch(() => {})
            }
        }
    }
}
</script>

<style scoped>

</style>
