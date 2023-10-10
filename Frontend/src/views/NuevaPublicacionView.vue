<template>

    <div class="hero-section-absolute"></div>

    <div class="card-rent-container">
        <div class="card-rent-request">
            <div class="card-info-wrapper">
                <span class="card-title-rent-request">Nueva Publicacion</span>
                                
                <hr class="card-divider">


                <div class="info-owner-wrapper">
                    <span class="card-title-rent">Datos del Propietario</span>
                    <div class="date-wrapper">
                        <div class="date-from">
                            <span>Nombre y Apellido</span>
                            <input type="text" class="input-date" :placeholder="nombre + ' ' + apellido" disabled>
                        </div>

                        <div class="date-to">
                            <span>Direccion</span>
                            <input type="text" class="input-date"  :placeholder="domicilio" disabled>
                        </div>
                    </div>
                    <div class="date-wrapper">
                        <div class="date-from">
                            <div style="display: flex; flex-direction: row; gap: 5px">
                                <i class="fa fa-whatsapp"></i><span>Whatsapp</span>
                            </div>  
                            <input type="text" class="input-date"  :placeholder="whatsapp" disabled>
                        </div>

                        <div class="date-to">
                            <div style="display: flex; flex-direction: row; gap: 5px">
                                <i class="fa fa-envelope"></i><span>Correo Electronico</span>
                            </div>  
                            <input type="text" class="input-date" :placeholder="correo" disabled>
                        </div>
                    </div>
                </div>

                <hr class="card-divider">

                <div class="info-owner-wrapper">
                    <span class="card-title-rent">Datos del Vehiculo</span>
                    <div class="date-wrapper">
                        <div class="date-from">
                            <span>Marca</span>
                            <select v-model="marca" name="marca" id="marca" class="input-date">
                                <option value="" selected disabled hidden>Seleccionar</option>
                                <option v-for="item in marcas" :key="item">{{item}}</option>
                            </select>
                        </div>

                        <div class="date-to">
                            <span>Modelo</span>
                             <select v-model="modelo" name="modelo" id="marca" class="input-date" :disabled="!marca">
                                <option value="" selected disabled hidden>Seleccionar</option>
                                <option v-for="item in modelos[marca]" :key="item">{{item}}</option>
                            </select>                    
                        </div>
                          <div class="date-from"> 
                            <span>Color</span>
                           <select v-model="color" name="color" id="color" class="input-date"  :disabled="!modelo">
                                <option value="" selected disabled hidden>Seleccionar</option>
                                <option v-for="item in colores" :key="item">{{item}}</option>
                            </select>
                        </div>
                    </div>
                   
                    <div class="date-wrapper">
                        <div class="date-to">
                            <span>Capacidad</span>
                            <input v-model="capacidad" type="number" class="input-date" :disabled="!color">
                        </div>
                        <div class="date-from"> 
                            <span>Puertas</span>
                            <input v-model="puertas" type="number" class="input-date" :disabled="!capacidad">
                        </div>

                        <div class="date-to">
                            <span>Kilometros</span>
                            <input v-model="km" type="number" class="input-date" :disabled="!puertas">
                        </div>
                    </div>

                    <div class="date-wrapper">
                     <div class="date-from"> 
                            <span>Ubicación de Retiro</span>
                            <input v-model="ubicacion" type="text" class="input-date" :placeholder="domicilio" >
                        </div>
                        <div class="date-from"> 
                            <span>Precio por Dia (en pesos)</span>
                            <input v-model="precio" type="number" class="input-date">
                        </div>
                        <div class="date-to">
                            <span>Comentarios (opcional)</span>
                            <input v-model="comentarios" type="text" class="input-date">
                        </div>
                    </div>
                </div>
                
                <!-- CARRUSEL IMAGENES -->
                <hr class="card-divider">
                
                <span class="card-title-rent">Imagen del Vehiculo</span>

                <section class="container-slider">
                    <div class="slider-wrapper">
                        <div class="slider">
                            <img v-if="selectedFileUrl" :src="selectedFileUrl" alt="Imagen Seleccionada"/>
                            <img v-else src="../assets/images/empty.png" alt="Imagen vacia">
                        </div>
                    </div>
                </section>

                <div class="wrapper-file-upload">
                    <div class="custom-file-input">
                        <input class="file-input" type="file" ref="fileInput" @change="handleFileChange" accept="image/*">
                        <button @click="openFilePicker">Seleccionar Imagen</button>
                    </div>
                </div>

                <hr class="card-divider">

                 <!-- TERMINOS Y CONDICIONES -->
                 <div class="info-owner-wrapper">
                     <router-link to="/tyc" target='_blank' style="color: black; text-decoration: none;">
                        <span class="card-title-rent tyc">TERMINOS Y CONDICIONES (click aquí)</span>
                    </router-link>
                    <div class="tyc-wrapper">
                        <input v-model="check" type="checkbox">
                        <span class="card-owner-subtitle">He leido y aceptado los Terminos y Condiciones</span>
                    </div>
                    <button @click="crearPublicacion()" class="button-rent-request">Crear Nueva Publicacion</button>
                </div>

                
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'NuevaPublicacionView',
  data(){
    return{
        check: false,

        //datos de usuario
        nombre: '',
        apellido: '',
        domicilio: '',
        whatsapp: 0,
        correo: '',


        //v-model
        marca: '',
        modelo: '',
        color: '',
        capacidad: '',
        puertas: '',
        km: '',
        precio: '',
        comentarios: '',
        ubicacion: '',
        selectedFile: null,
        selectedFileUrl: null,


        //select-boxes
        colores: ["Rojo", "Azul", "Negro", "Blanco", "Gris", "Otro"],
        marcas: ["Volkswagen", "Renault", "Ford", "Chevrolet", "Toyota", "Fiat"],
        modelos: {
            Volkswagen: ["Gol", "Vento", "Polo", "Suran", "Golf", "UP", "Otro"],
            Renault: ["Clio", "Sandero", "Kwid", "Duster", "Captur", "Otro"],
            Ford: ["Fiesta", "EcoSport", "Focus", "Ranger", "Ka", "Otro"],
            Chevrolet: ["Onix", "Cruze", "Corsa", "Tracker", "Spin", "Otro"],
            Toyota: ["Corolla", "Hilux", "Yaris", "Rav4", "SW4", "Otro"],
            Fiat: ["Palio", "Toro", "Fiorino", "Ducato"]
        }
    }
  },
  created(){
    this.getUsuario()
  },
  methods: {
    async crearPublicacion(){

        if(!this.marca || !this.modelo || !this.color || !this.capacidad || !this.puertas|| !this.km|| !this.precio)
            return Swal.fire('Error', 'Falta completar algún campo obligatorio.', 'error')

        if (!this.selectedFile) 
            return Swal.fire('Error', 'Debes seleccionar una imagen del automóvil.', 'error')
        
        if(!this.check)
            return Swal.fire('Error', 'Debes aceptar los "Terminos y Condiciones" para crear una publicación.', 'error')
        
        const formData = new FormData();
        formData.append('imagen', this.selectedFile);
        formData.append('marca', this.marca);
        formData.append('modelo', this.modelo);
        formData.append('color', this.color);
        formData.append('capacidad', this.capacidad);
        formData.append('puertas', this.puertas);
        formData.append('km', this.km);
        formData.append('ubicacion', this.ubicacion);
        formData.append('precio', this.precio);
        formData.append('comentario', this.comentarios);


        Swal.fire({
            title: `Crear nueva publicación?`,
            text: "Esta acción no podrá deshacerse",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: `ENVIAR`,
            preConfirm: async () => {
                await axios.post(
                process.env.VUE_APP_API_URL + '/crear-publicacion',
                formData,
                    {
                        headers: {
                        'Content-Type': 'multipart/form-data',
                        },
                    }
                )
                .then(async resp => {
                    await Swal.fire(resp.data.message, resp.data.text, 'success')
                    this.$router.push('/');
                }).catch( err => {
                    Swal.fire('Error',err.response.data.message,'error')
                })
            },
        }) 
    },
    async getUsuario(){
        await axios.get(process.env.VUE_APP_API_URL + '/usuario')
        .then(resp => {
            this.nombre = resp.data.nombre
            this.apellido = resp.data.apellido
            this.domicilio = resp.data.domicilio
            this.whatsapp = resp.data.wsp
            this.correo = resp.data.email
        })
        .catch(err => console.log(err))
    },
    handleFileChange(event) {
        this.selectedFile = event.target.files[0];
        this.selectedFile ? this.selectedFileUrl = URL.createObjectURL(this.selectedFile) : this.selectedFileUrl = null
    },
  },
  watch: {
     marca: function () {
      this.modelo = '';
      this.color = '';
      this.capacidad = '';
      this.puertas = '';
      this.km = '';
    },
    km: function (newValue) {
        this.km = Math.abs(newValue)
    },
    capacidad: function (newValue) {
        this.capacidad = Math.abs(newValue)
    },
    puertas: function (newValue) {
        this.puertas = Math.abs(newValue)
    },
    precio: function (newValue) {
        this.precio = Math.abs(newValue)
    },
  }
  
}
</script>


<style scoped>

/* COMIENZO CARD PUBLICACION */

.hero-section-absolute{
    position: absolute;
    top: 3.3rem;
    left: 0;
    width: 100%;
    height:300px;
    background-image: url('../assets/images/banner_camioneta.jpg');
    background-size: cover;
    background-position: center;
    z-index: -1;
}

.card-rent-container{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin: 100px 0;
}

.card-rent-request{    
    background-color: #ffffff;
    width: 70%;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-family: 'Geologica', sans-serif;
}

.card-info-wrapper{
    padding: 2rem;
    display: flex;
    flex-direction: column;
}

.card-title-rent-request{
    color: #000000;
    font-size: 2.2rem;
}

.info-owner-wrapper{
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.card-title-rent{
    font-size: 1.4rem;
    margin-top: 1rem;
}

.card-owner-title{
    width: 100%;
}

.card-owner-subtitle{
    color: #484848;
    width: 100%;
    display: flex;
    gap: 10px;
}

.container-slider {
	padding: 2rem;
}

.slider-wrapper {
	position: relative;
	max-width: 48rem;
	margin: 0 auto;
}

.slider {
	display: flex;
	aspect-ratio: 16 / 9;
	overflow-x: auto;
	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	box-shadow: 0 1.5rem 3rem -0.75rem hsla(0, 0%, 0%, 0.25);
	border-radius: 0.5rem;
	-ms-overflow-style: none; 
	scrollbar-width: none; 
}

.slider::-webkit-scrollbar {
	display: none;
}

.slider img {
	flex: 1 0 100%;
	scroll-snap-align: start;
	object-fit: cover;
}

.slider-nav {
	display: flex;
	column-gap: 1rem;
	position: absolute;
	bottom: 1.25rem;
	left: 50%;
	transform: translateX(-50%);
	z-index: 1;
}

.slider-nav a {
	width: 0.5rem;
	height: 0.5rem;
	border-radius: 50%;
	background-color: #fff;
	opacity: 0.75;
	transition: opacity ease 250ms;
}

.slider-nav a:hover {
	opacity: 1;
}

.date-wrapper{
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 15px
}

.date-from{
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 10px auto;
    gap: 10px;
}

.date-to{
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 10px auto;
    gap: 10px;

}

.input-date{
    font-size: 1rem;
    font-family: 'Geologica', sans-serif;
}

.tyc-wrapper{
    display: flex;
    flex-direction: row;
}

.tyc:hover{
    cursor: pointer;
    text-decoration: underline;
}

.button-rent-request{
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 15px;
    font-family: 'Geologica', sans-serif;
    font-size: 1rem;
}

.button-rent-request:hover{
    background-color: #0056b3;
}

.card-divider {
    border-top: 1px solid #ccc;
    margin: 10px 0;
}

.wrapper-file-upload{
    display: flex; 
    align-items: center;
    justify-content: center;
    text-align: center;
}

.custom-file-input {
  position: relative;
  overflow: hidden;
  display: inline-block;
  cursor: pointer;
}

.custom-file-input button {
  background-color: #007bff; 
  color: white; 
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.custom-file-input input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

/* FIN CARD PUBLICACION */
</style>