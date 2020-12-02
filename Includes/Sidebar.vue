<template>
  <v-card>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :append-icon="item.model ? item.icon : item['icon-alt']"
            :prepend-icon="'mdi-apps'"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
              :to="child.url"
              class="unlink"
              dense
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
            </v-list-item>
          </v-list-group>
          <v-list-item v-else :key="item.text" link :to="item.link">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app flat outlined>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-btn class="pl-5" to="/" text>home</v-btn>
      <v-btn class="pl-5" to="/posts" text>posts</v-btn>
      <v-spacer />

      <v-btn text large color="secondary--text" @click="logout()">
        Sign Out
        <v-icon dense right> mdi-account-arrow-right </v-icon>
      </v-btn>
    </v-app-bar>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          text: "Home",
          link: "/",
        },
        {
          icon: "mdi-multiplication",
          text: "Posts",
          link: "/posts",
        },
        {
          icon: "mdi-multiplication",
          text: "Category",
          link: "/categories",
        },
      ],
      miniVariant: false,
      right: true,
      title: "Vuetify.js",
    };
  },

  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/auth");
    },
  },
};
</script>

<style scoped>
</style>
