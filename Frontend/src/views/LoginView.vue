<template>
<div class="container-login">
    <div class="wrap-login">
    <!-- COMIENZO LOGIN -->
        <div class="form-login" v-if="!registerMode">
            <span class="title-login" style="font-size: 2rem">LOGIN</span>
            <span class="title-login reve-title">REVE</span>
            <div class="wrap-input">
                <input class="input" type="text" name="correo" placeholder="Correo Electronico" v-model="mail">
                <span class="error-message" v-if="mailError" v-on:key-press="limpiarError()">{{mailError}}</span>
            </div>
            <div class="wrap-input">
                <input class="input" type="password" name="pass" placeholder="Contraseña" v-model="password">
                <span class="error-message" v-if="passwordError">{{passwordError}}</span>
            </div>

            <div class="container-btn">
                <button class="login-btn" @click="login">
                Ingresar
                </button>
                <span @click="registerMode = true" class="title-login register-link">¿Sos nuevo? Registrate!</span>
            </div>
        </div>

        <!-- FIN LOGIN -->

        <!-- COMIENZO REGISTER -->

        <div class="form-login" v-if="registerMode">
            <span class="title-login" style="font-size: 2rem">REGISTER</span>
            <span class="title-login reve-title">REVE</span>
            <div class="wrap-input">
                <input class="input" type="text" name="nombre" placeholder="Nombre" v-model="nombre">
            </div>
            <div class="wrap-input">
                <input class="input" type="text" name="apellido" placeholder="Apellido" v-model="apellido">
            </div>
            <div class="wrap-input">
                <input class="input" type="number" name="dni" placeholder="DNI" v-model="dni">
            </div>
            <div class="wrap-input">
                <input class="input" type="text" name="domicilio" placeholder="Domicilio" v-model="domicilio">
            </div>
            <div class="wrap-input">
                <input class="input" type="number" name="whatsapp" placeholder="WhatsApp" v-model="wsp">
            </div>
            <div class="wrap-input">
                <input class="input" type="text" name="cbu" placeholder="CBU" v-model="cbu">
            </div>
            <div class="wrap-input">
                <input class="input" type="text" name="correo" placeholder="Correo Electronico" v-model="mail">
            </div>
            <div class="wrap-input">
                <input class="input" type="password" name="pass" placeholder="Contraseña" v-model="password">
            </div>
             <div class="wrap-input">
                <input class="input" type="password" name="repeatPass" placeholder="Repetir Contraseña" v-model="repeatPassword">
            </div>

            <div class="container-btn">
                <button class="login-btn" @click="register">
                Ingresar
                </button>
                <span @click="registerMode = false" class="title-login register-link">¿Ya tenes una cuenta? Inicia sesión</span>
            </div>
        </div>

        <!-- FIN REGISTER -->

    </div>
</div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'LoginView',
  data(){
    return{
        mail: "",
        password: "",
        nombre: "",
        apellido: "",
        dni: "",
        domicilio: "",
        wsp: "",
        cbu: "",
        repeatPassword:"",
        
        mailError: "",
        passwordError: "",

        registerMode: false
    }
  },
  methods:{
    async login(){

        this.mailError=""
        this.passwordError=""

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!regex.test(this.mail)){
            this.mailError="Formato Inválido"
            return    
        }

        if(!this.mail){
            this.mailError="Campo Incompleto"
            return
        }

        if(!this.password){
            this.passwordError="Campo Incompleto"
            return
        }

        await axios.post(process.env.VUE_APP_API_URL + "/login", {email: this.mail, password: this.password})
        .then(async resp => {
            let token = 'Bearer ' + resp.data.token
            axios.defaults.headers.common['Authorization'] = token
            await localStorage.setItem('token', token)
            this.$router.push({path: '/'})
        }).catch( err => {
            Swal.fire('Error',err.response.data.message,'error')
        })

    },
    register(){
        if(!this.nombre || !this.apellido || !this.dni || !this.domicilio || !this.wsp || !this.cbu  || !this.mail || !this.password || !this.repeatPassword)
            return Swal.fire('Error', 'Falta completar algún campo obligatorio.', 'error')

        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!regex.test(this.mail)){
            return Swal.fire('Error', 'Formato inválido de correo electronico.', 'error')
        }

        if(this.password != this.repeatPassword)
            return Swal.fire('Error', 'Las contraseñas no coinciden.', 'error')



        Swal.fire({
            title: `Crear nueva cuenta?`,
            text: "Esta acción no podrá deshacerse",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: `CREAR CUENTA`,
            preConfirm: async () => {

                  await axios.post(process.env.VUE_APP_API_URL + "/register", {mail: this.mail, password: this.password, nombre: this.nombre, apellido: this.apellido, domicilio: this.domicilio, wsp: this.wsp, cbu: this.cbu, dni: this.dni})
                    .then(async resp => {
                        await Swal.fire('Exito',resp.data.message, 'success')
                    }).catch( err => {
                        Swal.fire('Error',err.response.data.message,'error')
                    })

                this.registerMode = false
            },
        }) 
    }
  }
}
</script>

<style scoped>

.container-login{
    width: 100%;
    min-height: 100vh;
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
}

.wrap-login{
    width:35rem;
    background: #fff;
    border-radius:0.3rem;
    position:relative;
    padding-bottom: 3rem;
    padding-top:1.5rem;
}

.form-login{
    width:100%;
    justify-content: space-between;
    display:flex;
    flex-direction: column;
    gap:0.7rem
}

.title-login{
    font-family: 'Geologica', sans-serif;
    font-size: 6rem;
    color: #403866;
    line-height: 1.2;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    display: block;
}

.reve-title{
    font-family: 'Times New Roman', serif;
}

.wrap-input{
    width: 100%;
    background-color: #e6e6e6;
    border: 1px solid transparent;
    border-radius: 10px;
    margin-bottom: 0.6rem;
    display:flex;
    flex-direction:column;
    justify-content: center;
    text-align: center;
}

.input{
    font-family: 'Geologica', sans-serif;
    color: #403866;
    line-height: 1.2;
    font-size: 1.5rem;
    text-align:center;
    display: block;
    background: 0 0;
    height: 62px;
    border: none;
    outline:none
}

.container-btn{
    margin-top:0.5rem
}

.login-btn{
    font-family: 'Geologica', sans-serif;
    font-size: 2rem;
    color: #fff;
    line-height: 1.2;
    text-transform: uppercase;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 62px;
    background-color: #827FFE;
    border-radius: 10px;
    transition: all .4s;
    outline: none!important;
    border: none;
}

.login-btn:hover{
    background-color: #3c138f;
    cursor: pointer
}

.error-message{
    color: red;
    font-family: 'Geologica', sans-serif;
    text-align: center;
}

.register-link{
    font-size: 0.7rem;
    padding-top: 15px;
}

.register-link:hover{
    text-decoration: underline;
    cursor: pointer;
}

</style>