<template>

    <div class="card-aux">
        <div class="card-img">
            <img src="../assets/images/card_auto_principal.jpg">
        </div>
        <div class="card-details">
            <span class="card-car">Suran 1.6 Comfortline, Volkswagen</span>
            <hr class="card-divider">

            <!-- SOLICITUD ACTIVA -->
            <span v-if="this.estado == 1">ESTADO PUBLICACION: <span style="color: green">ACTIVA</span></span>
            <!-- SOLICITUD ACTIVA -->

            <!-- SOLICITUD SOLICITADA -->
            <div v-if="this.estado == 2" class="wrap-price-icons">
                <span>ESTADO PUBLICACION: <span style="color: orange">SOLICITADA!</span></span>
                <div @click="verInfoSolicitud()" class="trash-publicacion"><i class="fas fa-search"></i></div>
            </div>
            <!-- SOLICITUD SOLICITADA -->

            <!-- SOLICITUD PENDIENTE PAGO -->
            <div v-if="this.estado == 3" class="wrap-price-icons">
                <span>ESTADO PUBLICACION: <span style="color: purple">PAGO PENDIENTE</span></span>
            </div>
            <!-- SOLICITUD PENDIENTE PAGO -->
            
            <!-- SOLICITUD PAGADA-->
             <div v-if="this.estado == 4" class="wrap-price-icons">
                <span>ESTADO: <span style="color: blue">ALQUILADO (Hasta 27/09/2023)</span></span>
                <div @click="verInfoAlquiler()" class="trash-publicacion"><i class="fas fa-search"></i></div>
            </div>
            <!-- SOLICITUD PAGADA-->

            <!-- SOLICITUD FINALIZADA-->
             <div v-if="this.estado == 5" class="wrap-price-icons">
                <span>ESTADO PUBLICACION: <span style="color: red">FINALIZADA</span></span>
            </div>
            <!-- SOLICITUD FINALIZADA-->

            <hr class="card-divider">

            <div class="wrap-price-icons">
                <div v-if="this.estado == 1 || this.estado == 5" @click="eliminarPublicacion()" class="trash-publicacion"><i class="fa-solid fa-trash-can"></i></div>
                <div v-else></div>
                <span>$12.500/día</span>
            </div>
            
        </div>
    </div>
   
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: 'CardPublicacion',
  props: {
    estado: undefined
  },
  methods: {
    eliminarPublicacion(){
        return Swal.fire({
            title: `¿Está seguro que desea ELIMINAR la publicación?`,
            text: "Esta acción no podrá deshacerse.",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: 'ACEPTAR',
            cancelButtonColor: "#FF0000",
            showCancelButton: true,
            cancelButtonText: 'CANCELAR',
            preConfirm: async () => {
                await Swal.fire('PUBLICACIÓN ELIMINADA', '', 'success')
            },
        }) 
    },
    verInfoAlquiler(){
        return Swal.fire(
            'Información del alquiler',
            `<b>Locatario</b>: Oscar Sanchez<br>
             <b>Teléfono</b>: 221-595-1232 <br>
             <b>Fecha Retiro</b>: 12/09/23 <br>
             <b>Fecha Entrega</b>: 27/09/23<br>`,
            'info'
        )},
    verInfoSolicitud(){
        return Swal.fire({
            title: `Solicitud de Alquiler`,
            html: `<b>Locatario</b>: Oscar Sanchez<br>
             <b>Teléfono</b>: 221-595-1232 <br>
             <b>Fecha Retiro</b>: 12/09/23 <br>
             <b>Fecha Entrega</b>: 27/09/23<br>
             <b>Ganancia Total</b>: $80.000<br>`,
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: `ACEPTAR SOLICITUD`,
            confirmButtonColor: '#3085d6',
            showCancelButton: true,
            cancelButtonText: 'RECHAZAR',
            cancelButtonColor: '#b80f0f',
        }).then((result) => {
            if (result.isConfirmed) 
                return Swal.fire('SOLICITUD ACEPTADA', '', 'success')
            
            return Swal.fire( 'SOLICITUD RECHAZADA', '', 'success' )
            })
        }
    },
    
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