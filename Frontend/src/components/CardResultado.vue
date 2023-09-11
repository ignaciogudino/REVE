<template>
   <div class="card" @click="navegarAPublicacion()">
      <div class="card-img">
          <img src="../assets/images/card_auto_principal.jpg">
      </div>
      <div class="card-details">
          <span class="card-car">Suran 1.6 Comfortline, Volkswagen</span>
          <span class="card-distance">La Plata, Buenos Aires (43km de distancia)</span>
          <hr class="card-divider">
          <span class="card-price">$12.500/día</span>
      </div>
  </div>
</template>

<script>

export default {
  name: 'CardResultado',
  methods: {
    navegarAPublicacion() {
      // Utiliza Vue Router para redirigir al usuario a la ruta "/publicacion/111"
      this.$router.push('/publicacion/111');
    },
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
</style>