<template>
    <!-- COMIENZO MIS SOLICITUDES -->
    <div class="featured-section">
        <div class="wrapper">
            <span class="featured-subtitle"><b>Mis Solicitudes</b></span>
        </div>
        <div class="card-list" v-if="solicitudes">
            <CardSolicitud :solicitud="s" v-for="s in solicitudes" v-bind:key="s.index" @refresh="getMisSolicitudes()"></CardSolicitud>
        </div>

        <div class="card-list" v-else style="min-height: 30vh; margin-top: 8rem">
            <h1>Aún no realizaste ninguna solicitud de alquiler</h1>
        </div>
    </div>
    <!-- FIN MIS SOLICITUDES -->

</template>

<script>
import CardSolicitud from '../components/CardSolicitud.vue';
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'MisSolicitudesView',
  components: {
    CardSolicitud
  },
  data(){
    return {
        solicitudes: []
    }
  },
  created(){
    this.getMisSolicitudes()
  },
  methods: {
    async getMisSolicitudes(){
         await axios.get(process.env.VUE_APP_API_URL + "/mis-solicitudes")
        .then(async resp => {
            this.solicitudes = resp.data
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
</style>