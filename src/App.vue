<template>
  <v-app>
    <v-navigation-drawer app temporary></v-navigation-drawer>
    <v-app-bar app>
      <v-toolbar dark color="primary">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Add application</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn text>
            <v-icon >mdi-account-heart</v-icon>
            Link one
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

export default {};
</script>

<style scoped></style>
