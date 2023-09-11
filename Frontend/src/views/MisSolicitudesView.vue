<template>
    <!-- COMIENZO MIS SOLICITUDES -->
    <div class="featured-section">
        <div class="wrapper">
            <span class="featured-subtitle"><b>Mis Solicitudes</b></span>
        </div>
        <div class="card-list">
            <CardSolicitud :estado="0"></CardSolicitud>
            <CardSolicitud :estado="0"></CardSolicitud>
            <CardSolicitud :estado="0"></CardSolicitud>
            <CardSolicitud :estado="1"></CardSolicitud>
            <CardSolicitud :estado="2"></CardSolicitud>
            <CardSolicitud :estado="3"></CardSolicitud>
        </div>
    </div>
    <!-- FIN MIS SOLICITUDES -->

</template>

<script>
import CardSolicitud from '../components/CardSolicitud.vue';

export default {
  name: 'MisSolicitudesView',
  components: {
    CardSolicitud
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
</style>