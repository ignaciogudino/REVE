<template>
   <!-- PUBLICACION ACTIVA -->
   <div class="card" @click="navegarAPublicacion()" v-if="car.ID_ESTADO_PUBLICACION == 1">
      <div class="card-img">
          <img :src="imagenUrl">
      </div>
      <div class="card-details">
          <span class="card-car">{{car.MODELO}}, {{car.MARCA}} ({{car.KILOMETRAJE}} km)</span>
          <span class="card-distance">{{car.UBICACION_RETIRO}}</span>
          <hr class="card-divider">
          <span>ESTADO PUBLICACION: <span style="color: green">DISPONIBLE</span></span>
          <hr class="card-divider">
          <span class="card-price">${{car.PRECIO_DIA}}/día</span>
      </div>
  </div>
   <!-- FIN PUBLICACION ACTIVA -->

    <!-- PUBLICACION ALQUILADA -->
   <div class="card" v-if="car.ID_ESTADO_PUBLICACION == 4" style="cursor: normal">
      <div class="card-img">
          <img :src="imagenUrl">
      </div>
      <div class="card-details">
          <span class="card-car">{{car.MODELO}}, {{car.MARCA}} ({{car.KILOMETRAJE}} km)</span>
          <span class="card-distance">{{car.UBICACION_RETIRO}}</span>
          <hr class="card-divider">
          <span>ESTADO: <span style="color: blue">ALQUILADO (Hasta {{fechaEntrega}})</span></span>
          <hr class="card-divider">
          <span class="card-price">${{car.PRECIO_DIA}}/día</span>
      </div>
   </div>
   <!-- FIN PUBLICACION ALQUILADA -->
</template>

<script>

export default {
    name: 'CardResultado',
    props:{
    car: null
    },
    methods: {
    navegarAPublicacion() {
        this.$router.push('/publicacion/' + this.car.ID_PUBLICACION);
    },
    },
    computed: {
        imagenUrl(){
            let url = 'http://localhost:3000/' + this.car.IMG_URL
            return url
        },
        fechaEntrega(){
            return new Date(this.car.FECHA_ENTREGA + 1000 * 60 * 60 * 3).toLocaleDateString()
        }
    }
}
</script>

<style scoped>

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
    max-width:100%;
    max-height:100%;
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
</style>