<template>
  <div>
    <v-card outlined flat>
      <v-data-table
        :headers="headers"
        :search="search"
        :items="posts"
        :loading="loading"
        loading-text="Please Wait"
      >
        <template v-slot:top>
          <v-toolbar flat dark>
            <v-toolbar-title>Post List</v-toolbar-title>
            <v-divider class="mx-4" inset vertical />
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer />
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="teal" dark v-bind="attrs" v-on="on">
                  Add New Post
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                  <v-spacer />
                  <v-icon fab color="white" @click="close"> mdi-close </v-icon>
                </v-card-title>

                <v-form ref="form" @click.prevent="save">
                  <v-container grid-list-sm>
                    <v-row>
                      <v-col cols="12" sm="12" md="6" lg="12">
                        <v-text-field
                          v-model="editedItem.title"
                          outlined
                          :rules="validationRules.name"
                          :error-messages="errorMessages.title"
                          hide-details="auto"
                          label="Post Title"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
                <small>*indicates required field</small>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Close
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template #item.manage="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon color="secondary">
                <v-icon dark v-bind="attrs" v-on="on" @click="editItem(item)">
                  mdi-pencil
                </v-icon>
              </v-btn>
            </template>
            <span>EDIT</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon color="primary">
                <v-icon dark v-bind="attrs" v-on="on" @click="deleteItem(item)">
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>DELETE</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    search: "",
    dialog: false,
    headers: [
      {
        text: "Posts Id",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "title", value: "title" },
      {
        text: "Manage",
        align: "center",
        value: "manage",
      },
    ],
    posts: [],
    loading: false,
    //loadingDialog=true,
    editedIndex: -1,
    editedItem: {
      id: "",
      title: "",
    },
    defaultItem: {
      id: "",

      title: "",
    },
    errorMessages: {
      title: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.loading = true;
      this.$store
        .dispatch("post/initPost")
        .then((response) => {
         this.posts = response.slice(0,5);
        })
        .catch((error) => console.log(error))
        .finally(() => {
          this.loading = false;
        });
    },

    editItem(item) {
      this.editedIndex = this.posts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.posts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.deletePost();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
      this.$refs.form.reset();
    },

    save() {
      if (this.$refs.form.validate()) {
        // this.resetErrorMessages(this.errorMessages);
        if (this.editedIndex > -1) {
          this.$store
            .dispatch("post/updatePost", this.editedItem)
            .then((response) => {
              // Object.assign(this.posts[this.editedIndex], response.data.data);
              this.initialize();
              this.close();
              console.log(response.data.data);
            });
        } else {
          this.$store
            .dispatch("post/savePost", this.editedItem)
            .then((response) => {
              this.posts.push(response.data.data);
              this.close();
            });
        }
      } else {
        alert("please fill up the field");
      }
    },

    deletePost() {
      this.loading = true;
      this.$store
        .dispatch("post/deletePost", this.editedItem.id)
        .then((response) => {
           this.posts.splice(this.editedIndex, 1);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>