<template>
    <!-- COMIENZO RESULTADOS EN {lugar} -->
    <div class="featured-section">
        <div class="wrapper">
            <span class="featured-subtitle"><b>Resultados en {{lugar}}:</b></span>
        </div>
        <div class="card-list" v-if="publicaciones.length != 0">
            <CardResultado :car="p" v-for="p in publicaciones" v-bind:key="p.index"></CardResultado>
        </div>
        <div class="card-list" v-else style="min-height: 30vh; margin-top: 8rem">
            <h1>No existen resultados para {{lugar}}</h1>
        </div>

    </div>
    <!-- FIN RESULTADOS EN {lugar} -->

</template>

<script>
import CardResultado from '../components/CardResultado.vue';
import axios from 'axios';

export default {
  name: 'ResultadosView',
  components: {
    CardResultado
  },
  data(){
    return{
        lugar: '',
        publicaciones: []
    }
  },
  created(){
    this.lugar = this.$route.params.lugar.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    this.buscarResultados()
  },
  methods: {
    async buscarResultados(){
        await axios.get(process.env.VUE_APP_API_URL + '/buscar/' + this.lugar)
        .then(resp => this.publicaciones = resp.data)
        .catch(err => console.log(err))
    }
  }
  
}
</script>


<style scoped>

/* COMIENZO AUTOS DESTACADOS */
.wrapper{
    padding: 2rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center
}

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

.card {
    width: 30%;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: left;
    overflow: hidden;
    transition: transform 0.2s;
    font-family: 'Geologica', sans-serif;
}

.card:hover {
    transform: scale(1.05);
    cursor: pointer;
}

.card:hover img{
    opacity: 90%;
}

.card-img {
    position: relative;
    overflow: hidden;
}

.card-img img {
    width: 100%;
    height: auto;
}

.card-details {
    padding: 15px;
    display: flex;
    flex-direction: column;
}

.card-label {
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.9rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: right;
}

.card-car {
    font-size: 0.9rem;
    margin-bottom: 5px;
}

.card-distance {
    font-size: 0.8rem;
    color: #777;
    margin-bottom: 10px;
}

.card-divider {
    border-top: 1px solid #ccc;
    margin: 10px 0;
}

.trash-publicacion{
    transition: 0.2s;
}

.trash-publicacion:hover{
    transform: scale(1.2);
    cursor: pointer;
}

.wrap-price-icons{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
/* FIN AUTOS DESTACADOS*/
</style>