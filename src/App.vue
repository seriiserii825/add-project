<template>
    <v-app>
        <v-navigation-drawer
            app
            temporary
            v-model="drawer"
        >
            <v-list shaped>
                <v-list-item
                    v-for="link of links"
                    :key="link.title"
                    :to="link.url"
                >
                    <v-list-item-icon>
                        <v-icon>{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ link.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-btn @click="onLogOut" text v-if="isUserLoggedIn">
                    <v-icon>mdi-arrow-right-bold-box</v-icon>
                    Logout
                </v-btn>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-toolbar dark color="primary">
                <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>
                    <router-link to="/" tag="span" class="pointer">Add application</router-link>
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items class="hidden-sm-and-down">
                    <v-btn text
                           v-for="link of links"
                           :key="link.title"
                           :to="link.url"
                    >
                        <v-icon left>{{ link.icon }}</v-icon>
                        {{ link.title }}
                    </v-btn>
                </v-toolbar-items>

                <v-btn @click="onLogOut" text v-if="isUserLoggedIn">
                    <v-icon>mdi-arrow-right-bold-box</v-icon>
                    Logout
                </v-btn>
            </v-toolbar>
        </v-app-bar>
        <v-content>
            <router-view></router-view>
        </v-content>
        <template v-if="error">
            <v-snackbar
                :timeout="9000"
                :multi-line="true"
                @input="closeError"
                :value="true"
                color="error"
            >
                {{ error }}
                <v-btn
                    @click="closeError"
                    color="blue"
                >
                    Close
                </v-btn>
            </v-snackbar>
        </template>
    </v-app>
</template>

<script>

export default {
    data() {
        return {
            drawer: false
        }
    },
    methods: {
        closeError() {
            this.$store.dispatch('clearError')
        },
        onLogOut() {
            this.$store.dispatch('logOutUser')
            if (this.$router.currentRoute.name !== 'home') {
                this.$router.push('/')
            }
        }
    },
    computed: {
        error() {
            return this.$store.getters.error
        },
        isUserLoggedIn() {
            return this.$store.getters.isUserLoggedIn
        },
        links() {
            if (this.isUserLoggedIn) {
                return [
                    {title: 'Orders', icon: 'mdi-order-numeric-ascending', url: '/orders'},
                    {title: 'New add', icon: 'mdi-note-plus', url: '/new'},
                    {title: 'My adds', icon: 'mdi-clipboard-list', url: '/list'}
                ]
            }
            return [
                {title: 'Login', icon: 'mdi-lock', url: '/login'},
                {title: 'Registration', icon: 'mdi-face', url: '/registration'},
            ]
        }
    }
};
</script>

<style lang="scss">
.pointer {
    cursor: pointer;
}
</style>
