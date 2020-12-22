<template>
  <v-app >
    <v-container>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
  
      <v-text-field
        v-model="login.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
  
      <v-text-field
            v-model="login.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            hint="At least 4 characters"
            counter
            @click:append="show1 = !show1"
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Validate
      </v-btn>
  
      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Reset Form
      </v-btn>
    </v-form>
          <v-btn
        color="error"
        class="mr-4"
        to= "/"
      >
              Home
      </v-btn>
      <pre>{{login}}</pre>
    </v-container>
  </v-app>
</template>


<script>
import axios from 'axios'
export default {
    data: () => ({
        valid:false,
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        show1: false,
        rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 4 || 'Min  characters',
            emailMatch: () => (`The email and password you entered don't match`),
        },
        login: {
            email: '',
            password: ''
        }
       
  }),  
  beforeCreate () {
    //this.$store.dispatch('autoLogin')? console.log('hola login'):this.$router.push({path:'/auth'});
    this.$store.dispatch('autoLogin')? this.$router.push({path:'/auth'}):false;
  },

  methods: {

    validate () {        
        //this.$refs.form.validate()
      axios
        .post("http://localhost:3000/api/usuario/login",this.login)
        .then((response) => {
            return response.data
        })
        .then((data) => {
            //let user = response.data;
            let token = data.tokenReturn;
            //localStorage.setItem("jwt", token);
            //localStorage.setItem("user", JSON.stringify(user));
            //console.log(token);
            if (token) {
                this.$store.dispatch('guardarToken',data.tokenReturn)
                this.$router.push("/auth");
        }

        })
        .catch((error) => {
        let errorMostrar;
        if (error["message"] == "Request failed with status code 404") {
          errorMostrar = "Error de usuario";
        }
        if (error["message"] == "Request failed with status code 401") {
          errorMostrar = "Usuario o clave incorrecta";
        }
        console.log(errorMostrar)
        });

    },
    reset () {
        this.$refs.form.reset()
    },
    resetValidation () {
        this.$refs.form.resetValidation()
    },
  },
}
</script>
