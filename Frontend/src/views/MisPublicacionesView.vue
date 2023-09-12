<template>
    <!-- COMIENZO MIS PUBLICACIONES -->
    <div class="featured-section">
        <div class="wrapper">
            <span class="featured-subtitle"><b>Mis Publicaciones</b></span>
            <router-link to="/nueva-publicacion" style="text-decoration: none;color: white;">
                <button class="search-button">+ Nueva Publicacion</button>
            </router-link> 
        </div>
            <div class="card-list">
                <CardPublicacion :estado="1"></CardPublicacion>
                <CardPublicacion :estado="2"></CardPublicacion>
                <!-- <CardPublicacion :estado="3"></CardPublicacion> -->
                <CardPublicacion :estado="4"></CardPublicacion>
                <!-- <CardPublicacion :estado="5"></CardPublicacion> -->
            </div>
    </div>
    <!-- FIN MIS PUBLICACIONES -->
</template>

<script>
import CardPublicacion from '../components/CardPublicacion.vue';

export default {
  name: 'MisPublicacionesView',
  components: {
    CardPublicacion
  },
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
