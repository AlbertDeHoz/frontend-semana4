<template>
  <v-app id="inspire">
    <v-data-table
      :headers="isAdmin() ? headers : headers2"
      :items="categorias"
      sort-by="nombre"
      class="elevation-1"
    >
    <v-data-iterator
  disable-filtering
  disable-pagination
  disable-sort
  hide-default-footer
></v-data-iterator>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Categorías</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px" v-if="isAdmin()">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nueva categoría
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
                        label="nombre"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-textarea
                        v-model="editedItem.descripcion"
                        label="descripcion"
                        no-resize
                        auto-grow
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
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
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
    
  </v-app>
</template>
<script>
import axios from "axios";

export default {
  name: "Categoria",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Nombre", value: "nombre" },
      { text: "Estado", value: "estado" },
      { text: "Descripción", value: "descripcion" },
      { text: "Aciones", value: "actions", sortable: false }
    ],
    headers2: [
      { text: "Nombre", value: "nombre" },
      { text: "Estado", value: "estado" },
      { text: "Descripción", value: "descripcion" },
    ],
    type:'A',
    desserts: [],
    categorias: [],
    editedIndex: -1,
    editedItem: {
      nombre: "",
      descripcion: '',
      estado: 0,
    },
    defaultItem: {
      nombre: "",
      articulo: 0,
      estado: 0,
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
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.list();
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          nombre: "Frozen Yogurt",
          descripcion: 159,
          estado: 6.0,
        },
      ];
    },
    isAdmin() {
      return this.$store.state.user.rol==='Administrador'|| this.$store.state.user.rol === 'Almacenero'

    },
    list() {
      axios
        .get("http://localhost:3000/api/categoria/list",{
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
    },

    editItem(item) {
      this.editedIndex = item.id;
      console.log(this.editedItem)
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      //this.editedIndex = this.desserts.indexOf(item);
      //this.dialogDelete = true;
      if (item.estado === 0){
        axios
        .put("http://localhost:3000/api/categoria/activate",{
          'id':this.editedItem.id,
          'nombre':this.editedItem.nombre,
          'estado':1
        },{
          headers: {
            token: this.$store.state.token
          }
        })
        .then((response) => {
          this.list()
          return response
        
        })
        .catch((error) => {
          return error
        });
      }else{
        axios
        .put("http://localhost:3000/api/categoria/deactivate",{
          'id':this.editedItem.id,
          'nombre':this.editedItem.nombre,
          'estado':0
        },{
          headers: {
            token: this.$store.state.token
          }
        })
        .then((response) => {
          this.list()
          return response
        
        })
        .catch((error) => {
          return error
        });
      }
    


    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1);
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
        //Object.assign(this.desserts[this.editedIndex], this.editedItem);
        axios
        .put("http://localhost:3000/api/categoria/update",{
          'id':this.editedItem.id,
          'nombre': this.editedItem.nombre,
          'descripcion': this.editedItem.descripcion          
        },{
          headers:{
            token: this.$store.state.token
          }
        })
        .then((response) => {
          this.list()
          return response
        
        })
        .catch((error) => {
          return error
        });
      } else {
        //this.desserts.push(this.editedItem);
        axios        
        .post("http://localhost:3000/api/categoria/add",{
          'nombre': this.editedItem.nombre,
          'descripcion': this.editedItem.descripcion,
          'estado': 0          
        },{
          headers: {
            token: this.$store.state.token
          }
        })
        .then((response) => {
          this.list()
          return response
        
        })
        .catch((error) => {
          return error
        });
      }
      this.close();
    },
  },
};
</script>
