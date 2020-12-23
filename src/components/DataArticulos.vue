<template>
  <v-app id="inspire">
    <v-data-table
      :headers="isAdmin()?this.headers:this.headers2"
      :items="articulos"
      sort-by="nombre"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Artículos</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px" v-if="isAdmin()">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nuevo artículo
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nombre"
                        label="Nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.descripcion"
                        label="descripción"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.codigo"
                        label="codigo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <div class="opciones">
                        <label>Seleccione una categoría</label>
                        <select v-model="editedItem.categoriaId">
                           
                          <option
                            v-for="categoria in categorias"
                            :key="categoria.id"
                            :value="categoria.id"
                          >
                            {{ categoria.nombre }}
                          </option>
                        </select>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">{{ mensaje }}</v-card-title>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="list"> Reiniciar </v-btn>
      </template>
    </v-data-table>
  </v-app>
</template>
<script>
import axios from "axios";

export default {
  name: "Articulos",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Nombre", value: "nombre" },
      { text: "Estado", value: "estado" },
      { text: "Descripción", value: "descripcion" },
      { text: "Categoría", value: "categoria.nombre" },
      { text: "Aciones", value: "actions", sortable: false },
    ],
    headers2: [
      { text: "Nombre", value: "nombre" },
      { text: "Estado", value: "estado" },
      { text: "Descripción", value: "descripcion" },
      { text: "Categoría", value: "categoria.nombre" },
    ],
    articulos: [],
    editedIndex: -1,
    editedItem: {
      nombre: "",
      descripcion: "",
      estado: 1,
      
      
    },
    defaultItem: {
      nombre: "",
      articulo: 0,
      estado: 0,
      
    },
    mensaje: "eliminar??",
    articuloActDesact: [],
    categorias: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Artículo" : "Editar Categoría";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.list();
    this.listarCategorias();
  },

  methods: {
    isAdmin(){
      return this.$store.state.user.rol === 'Administrador' || this.$store.state.user.rol === 'Almacenero'
    },
    listarCategorias() {
      if (this.isAdmin()){
        axios
          .get("http://localhost:3000/api/categoria/list",
          {
            headers: {
              token: this.$store.state.token
            }
          })
          .then((response) => {
            this.categorias = response.data;
          })
          .catch((error) => {
            console.log(error);
          });

      }
    },

    list() {
      axios
        .get("http://localhost:3000/api/articulo/list",{
          headers: {
            token: this.$store.state.token
          }
        })
        .then((response) => {
          this.articulos = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    editItem(item) {
      this.editedIndex = this.articulos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.articuloActDesact = item;

      if (item.estado === 0) {
        this.mensaje = "Estás seguro que deseas activar este artículo??";
      }
      if (item.estado === 1) {
        this.mensaje = "Estás seguro que deseas desactivar este artículo??";
      }
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      //this.articulos.splice(this.editedIndex, 1);

      let articuloActDesact = this.articuloActDesact;
      this.editedItem = Object.assign({}, articuloActDesact);

      if (articuloActDesact.estado === 0) {
        axios
          .put("http://localhost:3000/api/articulo/activate", {
            id: this.editedItem.id,
          },{
            headers: {
            token: this.$store.state.token
          }
          })
          .then((response) => {
            this.list();

            return response;
          })
          .catch((error) => {
            return error;
          });
      } else {
        axios
          .put("http://localhost:3000/api/articulo/deactivate", {
            id: this.editedItem.id,
          },{
            headers: {
            token: this.$store.state.token
          }
          })
          .then((response) => {
            this.list();

            return response;
          })
          .catch((error) => {
            return error;
          });
      }
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        axios
          .put("http://localhost:3000/api/articulo/update", {
            nombre: this.editedItem.nombre,
            descripcion: this.editedItem.descripcion,
            estado: this.editedItem.estado,
            codigo: this.editedItem.codigo,
            id: this.editedItem.id,
            categoriaId: this.editedItem.categoriaId,
          },{
            headers: {
            token: this.$store.state.token
          }
          })
          .then((response) => {
            this.list();
            return response;
          })
          .catch((error) => {
            return error;
          });
      } else {
        axios
          .post("http://localhost:3000/api/articulo/add", {
            nombre: this.editedItem.nombre,
            descripcion: this.editedItem.descripcion,
            estado: 1,
            codigo: this.editedItem.codigo,
            categoriaId: this.editedItem.categoriaId,
          },{
            headers: {
            token: this.$store.state.token
          }
          })
          .then((response) => {
            this.list();
            console.log(response);
            return response;
          })
          .catch((error) => {
            console.log(error);
            return error;
          });
      }
      this.close();
    },
  },
};
</script>
<style scoped>
.opciones {
  padding: 5px;
  border-bottom: solid 1px #949494;
}
</style>
