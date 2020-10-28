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
            </v-toolbar>
        </v-app-bar>
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>

export default {
    data() {
        return {
            drawer: false,
            links: [
                {title: 'Login', icon: 'mdi-lock', url: '/login'},
                {title: 'Registration', icon: 'mdi-face', url: '/registration'},
                {title: 'Orders', icon: 'mdi-order-numeric-ascending', url: '/orders'},
                {title: 'New add', icon: 'mdi-note-plus', url: '/new'},
                {title: 'My adds', icon: 'mdi-clipboard-list', url: '/list'}
            ]
        }
    },
};
</script>

<style lang="scss">
.pointer {
    cursor: pointer;
}
</style>
