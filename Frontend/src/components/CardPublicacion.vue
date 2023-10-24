<template>

    <div class="card-aux">
        <div class="card-img">
            <img :src="imagenUrl">
        </div>
        <div class="card-details">
            <span class="card-car">{{this.publicacion.MODELO}}, {{this.publicacion.MARCA}} ({{this.publicacion.KILOMETRAJE}} km)</span>
            <hr class="card-divider">

            <!-- SOLICITUD ACTIVA -->
            <span v-if="this.publicacion.ID_ESTADO_PUBLICACION == 1">ESTADO PUBLICACION: <span style="color: green">ACTIVA</span></span>
            <!-- SOLICITUD ACTIVA -->

            <!-- SOLICITUD SOLICITADA -->
            <div v-if="this.publicacion.ID_ESTADO_PUBLICACION == 2" class="wrap-price-icons">
                <span>ESTADO PUBLICACION: <span style="color: orange">SOLICITADA!</span></span>
                <div @click="verInfoSolicitud()" class="trash-publicacion"><i class="fas fa-search"></i></div>
            </div>
            <!-- SOLICITUD SOLICITADA -->

            <!-- SOLICITUD PENDIENTE PAGO -->
            <div v-if="this.publicacion.ID_ESTADO_PUBLICACION == 3" class="wrap-price-icons">
                <span>ESTADO PUBLICACION: <span style="color: purple">PAGO PENDIENTE</span></span>
            </div>
            <!-- SOLICITUD PENDIENTE PAGO -->
            
            <!-- SOLICITUD PAGADA-->
             <div v-if="this.publicacion.ID_ESTADO_PUBLICACION == 4" class="wrap-price-icons">
                <span>ESTADO PUBLICACION: <span style="color: blue">ALQUILADO</span></span>
                <div @click="verInfoAlquiler()" class="trash-publicacion"><i class="fas fa-search"></i></div>
            </div>
            <!-- SOLICITUD PAGADA-->

             <!-- SOLICITUD PAGADA-->
             <div v-if="this.publicacion.ID_ESTADO_PUBLICACION == 6" class="wrap-price-icons">
                <span>ESTADO: <span style="color: green">ENTREGADO POR INQUILINO</span></span>
                <div @click="aceptarEntrega()" class="trash-publicacion"><i class="fas fa-search">HH:TX</i></div>
            </div>
            <!-- SOLICITUD PAGADA-->

            <!-- SOLICITUD FINALIZADA-->
             <div v-if="this.publicacion.ID_ESTADO_PUBLICACION == 5" class="wrap-price-icons">
                <span>ESTADO PUBLICACION: <span style="color: red">FINALIZADA</span></span>
                <div @click="reiniciarPublicacion()" class="trash-publicacion"><i class="fas fa-search">HH:REINICIAR</i></div>
            </div>
            <!-- SOLICITUD FINALIZADA-->

            <hr class="card-divider">

            <div class="wrap-price-icons">
                <div v-if="this.publicacion.ID_ESTADO_PUBLICACION == 1 || this.publicacion.ID_ESTADO_PUBLICACION == 5" @click="eliminarPublicacion()" class="trash-publicacion"><i class="fa-solid fa-trash-can"></i></div>
                <div v-else></div>
                <span>${{this.publicacion.PRECIO_DIA}}/dia</span>
            </div>
            
        </div>
    </div>
   
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'CardPublicacion',
  props: {
    publicacion: null
  },
  emits: ["refresh"],
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

                    axios.delete(process.env.VUE_APP_API_URL + '/publicacion/' + this.publicacion.ID_PUBLICACION)
                    .then(async resp => {
                        await Swal.fire(resp.data.message, '', 'success')
                        this.$emit("refresh")
                        
                    }).catch( err => {
                        Swal.fire('Error',err.response.data.message,'error')
                    })


                },
            }) 
        },
        async verInfoSolicitud(){

            await axios.get(process.env.VUE_APP_API_URL + '/ver-solicitud/'+ this.publicacion.ID_PUBLICACION)
            .then(async resp => {

                let data = resp.data

                return Swal.fire({
                        title: `Solicitud de Alquiler`,
                        html: `<b>Locatario</b>: `+ data.NOMBRE + ` ` + data.APELLIDO +`<br>
                        <b>Teléfono</b>: ` + data.WSP +`<br>
                        <b>Fecha Retiro</b>: ` + new Date(data.FECHA_RETIRO + 1000 * 60 * 60 * 3).toLocaleDateString()  +  `<br>
                        <b>Fecha Entrega</b>: ` + new Date(data.FECHA_ENTREGA + 1000 * 60 * 60 * 3).toLocaleDateString() +  `<br>
                        <b>Ganancia Total</b>: $`+data.COSTO+`<br>`,
                        icon: "warning",
                        showCloseButton: true,
                        confirmButtonText: `ACEPTAR SOLICITUD`,
                        confirmButtonColor: '#3085d6',
                        showCancelButton: true,
                        cancelButtonText: 'RECHAZAR',
                        cancelButtonColor: '#b80f0f',
                    }).then((result) => {
                    //ACEPTAR SOLICITUD
                    if (result.isConfirmed) {
                        axios.put(process.env.VUE_APP_API_URL + '/aceptar-solicitud/' + data.ID_PUBLICACION)
                        .then(async resp => {
                            Swal.fire(resp.data.message, '','success')
                            this.$emit("refresh")
                            return
                        })
                        .catch(err => console.log(err))
                    }
                    else{
                    //RECHAZAR SOLICITUD 

                    Swal.fire({
                        title: `Ingrese un Motivo de Rechazo`,
                        html: `<input type="text" id="rechazo" class="swal2-input" size=32 placeholder="Motivo de Rechazo">`,
                        icon: "warning",
                        showCloseButton: true,
                        confirmButtonText: `RECHAZAR SOLICITUD`,
                        confirmButtonColor: '#3085d6',
                        showCancelButton: true,
                        cancelButtonText: 'CANCELAR',
                        cancelButtonColor: '#b80f0f',
                    }).then((result) => {

                        if (result.isConfirmed){

                            const motivo = Swal.getPopup().querySelector('#rechazo').value

                            console.log("MOTIVO:", motivo)

                            if (!motivo) {
                                 return Swal.fire('Error', 'No puedes rechazar sin un motivo', 'error')
                            }

                            axios.put(process.env.VUE_APP_API_URL + '/rechazar-solicitud/' + data.ID_PUBLICACION, {motivo: motivo})
                            .then(async resp => {
                                Swal.fire(resp.data.message, '','success')
                                this.$emit("refresh")
                            })
                            .catch(err => console.log(err))
                        }

                    })

                    
                    }
                })
            })
            .catch( err => {
                Swal.fire('Error',err.response.data.message,'error')
            })
        
        },
        async verInfoAlquiler(){

            await axios.get(process.env.VUE_APP_API_URL + '/ver-solicitud/'+ this.publicacion.ID_PUBLICACION)
            .then(async resp => {

                let data = resp.data

                return Swal.fire({
                        title: `Detalles del alquiler`,
                        html: `<b>Locatario</b>: `+ data.NOMBRE + ` ` + data.APELLIDO +`<br>
                        <b>Teléfono</b>: ` + data.WSP +`<br>
                        <b>Fecha Retiro</b>: ` + new Date(data.FECHA_RETIRO + 1000 * 60 * 60 * 3).toLocaleDateString()  +  `<br>
                        <b>Fecha Entrega</b>: ` + new Date(data.FECHA_ENTREGA + 1000 * 60 * 60 * 3).toLocaleDateString() +  `<br>
                        <b>Ganancia Total</b>: $`+data.COSTO+`<br>`,
                        icon: "warning",
                        showCloseButton: true,
                    })
            })
            .catch( err => {
                Swal.fire('Error',err.response.data.message,'error')
            })
        
        },
        aceptarEntrega(){

            return Swal.fire({
                title: `¿Recibiste el auto sin problemas?`,
                text: "El inquilino marcó el auto como entregado",
                icon: "warning",
                showCloseButton: true,
                confirmButtonText: 'RECIBÍ EL AUTO',
                cancelButtonColor: "#FF0000",
                showCancelButton: true,
                cancelButtonText: 'NO RECIBÍ EL AUTO',
                preConfirm: async () => {
                    await axios.put(process.env.VUE_APP_API_URL + '/aceptar-entrega/' + this.publicacion.ID_PUBLICACION)
                    .then(async resp => {
                        Swal.fire(resp.data.message, resp.data.text,'success')
                        this.$emit("refresh")
                    })
                    .catch(err => console.log(err))
                    
                },
            }) 

        },
        reiniciarPublicacion(){
              return Swal.fire({
                title: `¿Queres volver a activar la publicación?`,
                text: "La publicaciones activas pueden ser solicitadas por nuevos inquilinos",
                icon: "warning",
                showCloseButton: true,
                confirmButtonText: 'ACTIVAR',
                cancelButtonColor: "#FF0000",
                showCancelButton: true,
                cancelButtonText: 'CANCELAR',
                preConfirm: async () => {
                    await axios.put(process.env.VUE_APP_API_URL + '/reiniciar/' + this.publicacion.ID_PUBLICACION)
                    .then(async resp => {
                        Swal.fire(resp.data.message, resp.data.text,'success')
                        this.$emit("refresh")
                    })
                    .catch(err => console.log(err))
                    
                },
            }) 

        }
    },
    computed: {
        imagenUrl(){
            let url = 'http://localhost:3000/' + this.publicacion.IMG_URL
            return url
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