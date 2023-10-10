<template>
    <!-- COMIENZO MIS PUBLICACIONES -->
    <div class="featured-section">
        <div class="wrapper">
            <span class="featured-subtitle"><b>Mis Publicaciones</b></span>
            <router-link to="/nueva-publicacion" style="text-decoration: none;color: white;">
                <button class="search-button">+ Nueva Publicacion</button>
            </router-link> 
        </div>
            <div class="card-list" v-if="publicaciones">
                <CardPublicacion :publicacion="p" v-for="p in publicaciones" v-bind:key="p.index" @refresh="getMisPublicaciones()"></CardPublicacion>
            </div>
            <div class="card-list" v-else style="min-height: 30vh; margin-top: 8rem">
                <h1>Aún no creaste ninguna publicación</h1>
            </div>
    </div>
    <!-- FIN MIS PUBLICACIONES -->
</template>

<script>
import CardPublicacion from '../components/CardPublicacion.vue';
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'MisPublicacionesView',
  components: {
    CardPublicacion
  },
  data(){
    return {
        publicaciones: []
    }
  },
  created(){
    this.getMisPublicaciones()
  },
  methods: {
    async getMisPublicaciones(){
         await axios.get(process.env.VUE_APP_API_URL + "/mis-publicaciones")
        .then(async resp => {
            this.publicaciones = resp.data
        }).catch( err => {
            Swal.fire('Error',err.response.data.message,'error')
        })
    }
  }
}
</script>


<style scoped>

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

.card-list {
    display: flex;
    justify-content: space-around;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;
}

.search-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 25px;
    border-radius: 5px;
    margin-right: 1.2rem;
    cursor: pointer;
    font-size: 1.2rem;
    font-family: 'Geologica', sans-serif;
}

.search-button:hover {
    background-color: #0056b3;
}

</style>
