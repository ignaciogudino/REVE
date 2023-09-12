<template>

    <div class="card-aux">
        <div class="card-img">
            <img src="../assets/images/card_auto_principal.jpg">
        </div>
        <div class="card-details">
            <span class="card-car">Suran 1.6 Comfortline, Volkswagen</span>
            <span class="card-distance">La Plata, Buenos Aires (43km de distancia)</span>
            <span class="card-distance">Propietario: Hector Jose Cuevas</span>
            <span class="card-distance"><i class="fa fa-whatsapp"></i> 221-5951753</span>

            <hr class="card-divider">

            <!-- SOLICITUD RECHAZADA -->
            <span v-if="this.estado == 0">ESTADO SOLICITUD: <span style="color: RED">RECHAZADA</span></span>
            <!-- SOLICITUD RECHAZADA -->

            <!-- SOLICITUD PENDIENTE -->
            <span v-if="this.estado == 1">ESTADO SOLICITUD: <span style="color: orange">PENDIENTE</span></span>
            <!-- SOLICITUD PENDIENTE -->

            <!-- SOLICITUD ACEPTADA-->
            <div v-if="this.estado == 2" class="wrap-price-icons">
                <span>ESTADO: <span style="color: green">ACEPTADO (PAGO PENDIENTE)</span></span>
                <div @click="realizarPago()" class="trash-publicacion"><i class="fa fa-shopping-cart"></i></div>
            </div>            
            <!-- SOLICITUD ACEPTADA-->
            
            <!-- SOLICITUD PAGADA-->
            <span v-if="this.estado == 3">ESTADO: <span style="color: blue">ALQUILADO (Hasta 27/09/2023)</span></span>
            <!-- SOLICITUD PAGADA-->

            <hr class="card-divider">

            <div class="wrap-price-icons">
                <div v-if="this.estado == 0" @click="eliminarSolicitud()" class="trash-publicacion"><i class="fa-solid fa-trash-can"></i></div>
                <span>$12.500/día</span>
            </div>
            
        </div>
    </div>
   
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'CardSolicitud',
  props: {
    estado: undefined
  },
  methods: {
   eliminarSolicitud(){
        return Swal.fire({
            title: `¿Está seguro que desea eliminar la solicitud?`,
            text: "Esta acción no podrá deshacerse",
            icon: "warning",
            showCloseButton: true,
            confirmButtonColor: "#FF0000",
            confirmButtonText: `CANCELAR`,
            preConfirm: async () => {
                await Swal.fire('SOLICITUD ELIMINADA', '', 'success')
            },
        }) 
   },
    realizarPago(){
        return Swal.fire({
            title: `¿Está seguro que desea realizar el pago?`,
            text: "Será direccionado a Mercado Pago",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: `IR A MERCADOPAGO`,
            preConfirm: async () => {
                await Swal.fire('PAGO REALIZADO', '', 'success')
            },
        }) 
    }
  }
}
</script>

<style scoped>

.card-aux {
    width: 30%;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: left;
    overflow: hidden;
    transition: transform 0.2s;
    font-family: 'Geologica', sans-serif;
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
</style>