<template>

    <div class="hero-section-absolute"></div>

    <div class="card-rent-container">
        <div class="card-rent-request">
            <div class="card-info-wrapper" v-if="publicacion">
                <span class="card-title-rent-request">Solicitud de Alquiler</span>

                <div class="info-owner-wrapper">
                    <span class="card-title-rent">Propietario</span>
                    <span class="card-owner-title">{{publicacion.NOMBRE}} {{publicacion.APELLIDO}} (DNI {{publicacion.DNI}})</span>
                    <span class="card-owner-subtitle"><i class="fa-solid fa-location-dot"></i>{{publicacion.UBICACION_RETIRO}}</span>
                    <span class="card-owner-subtitle"><i class="fa fa-whatsapp"></i>{{publicacion.WSP}}</span>
                    <span class="card-owner-subtitle"><i class="fa fa-envelope"></i>{{publicacion.EMAIL}}</span>
                </div>

                <hr class="card-divider">
                
                <!-- CARRUSEL IMAGENES -->

                <span class="card-title-rent">Imagen del Vehiculo</span>

                <section class="container-slider">
                    <div class="slider-wrapper">
                        <div class="slider">
                            <!-- <img v-if="selectedFileUrl" :src="selectedFileUrl" alt="Imagen Seleccionada"/> -->
                            <img :src="imagenUrl" alt="Imagen vacia">
                        </div>
                    </div>
                </section>


                <hr class="card-divider">

                <!-- CARACTERISTICAS VEHICULO -->

                <div class="info-owner-wrapper">
                    <span class="card-title-rent">Características del vehículo</span>
                    <span class="card-owner-title"><b>Marca:</b> {{publicacion.MARCA}} </span>
                    <span class="card-owner-title"><b>Modelo:</b> {{publicacion.MODELO}}</span>
                    <span class="card-owner-title"><b>Color:</b> {{publicacion.COLOR}}</span>
                    <span class="card-owner-title"><b>Capacidad:</b> {{publicacion.CAPACIDAD}} personas</span>
                    <span class="card-owner-title"><b>Puertas:</b> {{publicacion.PUERTAS}}</span>
                    <span class="card-owner-title"><b>Kilometros:</b> {{publicacion.KILOMETRAJE}}</span>
                    <span class="card-owner-title"><b>Comentarios:</b> {{publicacion.COMENTARIO}}</span>
                </div>

                <hr class="card-divider">

                <!-- DETALLES DEL ALQUILER -->
                <span class="card-title-rent">Fecha del Alquiler</span>
                <div class="date-wrapper">
                    <div class="date-from">
                        <span>Retiro</span>
                        <input v-model="fechaRetiro" type="date" class="input-date">
                    </div>

                    <div class="date-to">
                        <span>Entrega</span>
                        <input v-model="fechaEntrega" type="date" class="input-date">
                    </div>
                </div>

                <hr class="card-divider">

                <!-- PAGO -->
                <div class="info-owner-wrapper">
                    <span class="card-title-rent">Pago</span>
                    <span class="card-owner-title">Precio por Dia: <strong> {{publicacion.PRECIO_DIA}} $</strong></span>
                    <span class="card-owner-title">Total: <strong> {{precioFinal}} $ </strong>({{publicacion.PRECIO_DIA}} x {{restoDias}} dias)</span>
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
                    <button @click="consultar()" class="button-rent-request">Consultar Disponibilidad</button>
                </div>

                
            </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'PublicacionView',
  components: {
  },
  data(){
    return{
        idPublicacion: 0,
        check: false,

        publicacion: null,

        //v-model
        fechaEntrega: new Date(),
        fechaRetiro: new Date()
    }
  },
  computed: {
    restoDias: function () {
      if (this.fechaRetiro && this.fechaEntrega) {
        var diferencia = new Date(this.fechaEntrega).getTime() - new Date(this.fechaRetiro).getTime();
        return Math.floor(diferencia / (1000 * 60 * 60 * 24));
      }
      return 0; // Otra opción podría ser devolver null o un mensaje de error.
    },
    precioFinal: function () {
      if (this.fechaRetiro && this.fechaEntrega) {
        return this.publicacion.PRECIO_DIA * this.restoDias;
      }
      return 0; // Otra opción podría ser devolver null o un mensaje de error.
    },
    imagenUrl(){
        let url = 'http://localhost:3000/' + this.publicacion.IMG_URL
        return url
    }
  },
  created(){
    this.idPublicacion = this.$route.params.idPublicacion;
    this.getPublicacion()
  },
  methods: {

    async getPublicacion(){
        await axios.get(process.env.VUE_APP_API_URL + '/publicacion/' + this.idPublicacion)
        .then(async resp => {
            this.publicacion = resp.data
        })
        .catch( err => {
            Swal.fire('Error',err.response.data.message,'error')
        })
    },
    consultar(){
        if(!this.check){
            return Swal.fire(
                'Error', 
                'Debes aceptar los "Terminos y Condiciones" para enviar la solicitud.', 
                'error')
        }

         if(!this.fechaEntrega || !this.fechaRetiro){
            return Swal.fire(
                'Error', 
                'Debes completar los campos "Fecha de Entrega" y/o "Fecha de Retiro"', 
                'error')
        }

        Swal.fire({
            title: `¿Enviar solicitud de alquiler?`,
            text: "Esta acción no podrá deshacerse",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: `ENVIAR`,
            preConfirm: async () => {

                let fecha1 = new Date(this.fechaRetiro).getTime()
                let fecha2 = new Date(this.fechaEntrega).getTime()

                 await axios.post(process.env.VUE_APP_API_URL + "/solicitar-alquiler", {idPublicacion: this.publicacion.ID_PUBLICACION, fechaRetiro: fecha1, fechaEntrega: fecha2, costo: this.precioFinal})
                    .then(async resp => {
                        await Swal.fire('Exito',resp.data.message, 'success')
                        this.$router.push('/');
                    }).catch( err => {
                        Swal.fire('Error',err.response.data.message,'error')
                    })
            },
        }) 
    }
  },
  watch:{
    fechaEntrega: function(newValue){
        if(newValue < this.fechaRetiro)
            this.fechaEntrega = this.fechaRetiro
    },
    fechaRetiro: function(){
        this.fechaEntrega = 0
    }
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
    margin-top: 100px;
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

/* FIN CARD PUBLICACION */
</style>