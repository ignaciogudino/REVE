<template>

    <!-- COMIENZO BUSCADOR -->
    <div class="hero-section">
        <div class="search-container">
            <input v-model="lugar" type="text" class="search-input" placeholder="Ingrese una Ubicación">
            <router-link :to="/resultados/ + formatLugar" style="text-decoration: none;color: white;">
                <button class="search-button" :disabled="!lugar">Buscar</button>
            </router-link> 
        </div>
    </div>
    <!-- FIN BUSCADOR -->

    <!-- COMIENZO ESLOGAN -->
    <div class="app-section">
        <span class="app-name">REVE</span>
        <span class="app-slogan">Encontrá el Auto Perfecto para tu Próximo Viaje</span>
    </div>
    <!-- FIN ESLOGAN -->

    <hr style="margin: 50px">

    <!-- COMIENZO VEHICULOS DESTACADOS -->
    <div class="featured-section" v-if="cars">
        <h2 class="featured-subtitle">Vehículos destacados</h2>
        <div class="card-list" >
            <CardResultado :car="car" v-for="car in cars" v-bind:key="car.index"></CardResultado>
        </div>
    </div>
    <!-- FIN VEHICULOS DESTACADOS -->

    <!-- COMIENZO INFO REVE -->
    <div class="info-section">
        <span class="info-title">Descubrí lo que REVE te ofrece</span>
        <div class="info-icons">
            <div class="info-icon">
                <div class="info-icon-wrapper"><i class="fas fa-car fa-3x hover-home-icon"></i></div>
                <span class="info-icon-title">VARIEDAD DE AUTOS</span>
                <span class="info-icon-subtitle">Elegí el que mejor se adapte a tus necesidades</span>
            </div>
            <div class="info-icon">
                <div class="info-icon-wrapper"><i class="far fa-clock fa-3x hover-home-icon"></i></div>
                <span class="info-icon-title">RESERVA FÁCIL</span>
                <span class="info-icon-subtitle">Realizá tu reserva de manera sencilla y rápida</span>
            </div>
            <div class="info-icon">
                <div class="info-icon-wrapper"><i class="fas fa-globe-americas fa-3x hover-home-icon"></i></div>
                <span class="info-icon-title">EXPERIENCIAS ÚNICAS</span>
                <span class="info-icon-subtitle">Viví viajes memorables y diferentes</span>
            </div>
            <div class="info-icon">
                <div class="info-icon-wrapper"><i class="fas fa-headset fa-3x hover-home-icon"></i></div>
                <span class="info-icon-title">ATENCIÓN PERSONALIZADA</span>
                <span class="info-icon-subtitle">Siempre estamos aca para ayudarte</span>
            </div>
        </div>
        
    </div>
    <!-- FIN INFO REVE -->

</template>

<script>
import CardResultado from '../components/CardResultado.vue';
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    CardResultado
  },
  data(){
    return{
        lugar: '',
        cars: []
    }
  },
  created(){
    this.getHighlights()
  },
  methods: {
    async getHighlights(){
        await axios.get(process.env.VUE_APP_API_URL + "/destacados")
        .then(async resp => {
            this.cars = resp.data.cars
        }).catch( err => {
            Swal.fire('Error',err.response.data.message,'error')
        })
    }
  },
  computed: {
    formatLugar() {
    // Utiliza una expresión regular para que /buscar/{lugar} sea lowerCase y sin espacios
      return this.lugar.toLowerCase().replace(/\s+/g, '-');
    },
  },
  watch: {
    lugar(newValue) {
      // Utiliza una expresión regular para permitir solo letras, números y espacios
      this.lugar = newValue.replace(/[^a-zA-Z0-9\s]/g, '');
    },
  },
}
</script>


<style scoped>
/* COMIENZO DEL BUSCADOR */
.hero-section {
    height: 300px;
    background-image: url('../assets/images/banner_camioneta.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
}

.search-container {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    width: 50%;
    justify-content: space-between;
    align-items: center;
    gap: 40px;
}

.search-input {
    flex: 1;
    border: none;
    padding: 10px;
    border-radius: 5px;
    font-family: 'Geologica', sans-serif;
    font-size: 1.3rem
}

.search-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 25px;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
    font-size: 1.2rem;
    font-family: 'Geologica', sans-serif;
}

.search-button:hover {
    background-color: #0056b3;
}
/* FIN DEL BUSCADOR */

/* COMIENZO ESLOGAN */
.app-section {
    text-align: center;
    display: flex;
    flex-direction: column;
}

.app-name {
    font-size: 5rem;
    margin-bottom: 10px;
    margin-top: 10px;
    font-family: 'Times New Roman', serif;
    font-style: bold;
    width: 100%;
}

.app-slogan {
    font-size: 2rem;
    font-weight: 400; /* Semibold */
    font-family: 'Geologica', sans-serif;
    width: 100%;
}
  /* COMIENZO ESLOGAN */

/* COMIENZO AUTOS DESTACADOS */
.featured-section {
    padding: 0 50px 50px 50px;
}

.featured-subtitle {
    font-size: 2rem;
    padding: 1rem 1rem;
    font-family: 'Geologica', sans-serif;
    font-style: bold;
}

.justified-text{
    font-size: 1rem;
    padding: 1rem 1rem;
    font-family: 'Geologica', sans-serif;
    font-style: bold;
    text-align: justify;

}

.card-list {
    display: flex;
    justify-content: space-around;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;
}
/* FIN AUTOS DESTACADOS*/


/* COMIENZO INFO REVE */
.info-section {
    text-align: center;
    padding: 50px;
    background-color: rgb(11, 11, 49);
    color: #ffffff;
}

.info-title {
    font-size: 2rem;
    padding: 1.5rem;
    font-family: 'Geologica', sans-serif;
}

.info-icons {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 25px;
}

.info-icon {
    width: 25%;    
    text-align: center;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
}

.info-icon-wrapper{
    padding: 1rem;
}


.info-icon-title{
    font-style: bold;
    font-size: 1.2rem;
    min-height: 2rem;
}


.info-icon-subtitle{
    font-size: 0.8rem;
}

.hover-home-icon{
    transition: 0.3s
}

.hover-home-icon:hover{
    transform: scale(1.2)
}
/* FIN INFO REVE */ 
</style>