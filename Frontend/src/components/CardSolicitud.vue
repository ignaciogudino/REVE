<template>

    <div class="card-aux">
        <div class="card-img">
            <img :src="imagenUrl">
        </div>
        <div class="card-details">
            <span class="card-car">{{this.solicitud.MODELO}}, {{this.solicitud.MARCA}} ({{this.solicitud.KILOMETRAJE}} km)</span>
            <span class="card-distance">{{this.solicitud.UBICACION_RETIRO}}</span>
            <span class="card-distance">Propietario: {{this.solicitud.NOMBRE}} {{this.solicitud.APELLIDO}}</span>
            <span class="card-distance"><i class="fa fa-whatsapp"></i> {{this.solicitud.WSP}}</span>

            <hr class="card-divider">

            <!-- SOLICITUD RECHAZADA -->
             <div v-if="this.solicitud.ID_ESTADO_ALQUILER == 0" class="wrap-price-icons">
                <span>ESTADO SOLICITUD: <span style="color: RED">RECHAZADA</span></span>
                <div @click="verMotivoRechazo()" class="trash-publicacion"><i class="fas fa-search"></i></div>
            </div>    
            <!-- SOLICITUD RECHAZADA -->

            <!-- SOLICITUD PENDIENTE -->
            <span v-if="this.solicitud.ID_ESTADO_ALQUILER == 1">ESTADO SOLICITUD: <span style="color: orange">PENDIENTE</span></span>
            <!-- SOLICITUD PENDIENTE -->

            <!-- SOLICITUD ACEPTADA-->
            <div v-if="this.solicitud.ID_ESTADO_ALQUILER == 2" class="wrap-price-icons">
                <span>ESTADO: <span style="color: green">ACEPTADO (PAGO PENDIENTE)</span></span>
                <div @click="realizarPago()" class="trash-publicacion"><i class="fa fa-shopping-cart"></i></div>
            </div>            
            <!-- SOLICITUD ACEPTADA-->
            
            <!-- SOLICITUD PAGADA-->
             <div v-if="this.solicitud.ID_ESTADO_ALQUILER == 3" class="wrap-price-icons">
                <span>ESTADO: <span style="color: blue">ALQUILADO (Hasta {{fechaEntrega}})</span></span>
                <div v-if="periodoCompleto" @click="entregarVehiculo()" class="trash-publicacion"><i class="fa fa-shopping-cart">HH:TX</i></div>
            </div>       
            <!-- SOLICITUD PAGADA-->


            <!-- SOLICITUD ENTREGADO -->
            <span v-if="this.solicitud.ID_ESTADO_ALQUILER == 6">ESTADO: <span style="color: green">VEHICULO ENTREGADO</span></span>
            <!-- SOLICITUD ENTREGADO -->


            <!-- SOLICITUD FINALIZADA-->
             <div v-if="this.solicitud.ID_ESTADO_ALQUILER == 5" class="wrap-price-icons">
                <span>ESTADO: <span style="color: red">FINALIZADA</span></span>
                <div @click="enviarComentario()" class="trash-publicacion"><i class="fa fa-shopping-cart">HH:ESTRELLA</i></div>
            </div>     
            <!-- SOLICITUD FINALIZADA-->

            <hr class="card-divider">

            <div class="wrap-price-icons">
                <span>$ <b>{{this.solicitud.COSTO}}</b>   (${{this.solicitud.PRECIO_DIA}}/día)</span>
                <div v-if="this.solicitud.ID_ESTADO_ALQUILER == 0" @click="eliminarSolicitud()" class="trash-publicacion"><i class="fa-solid fa-trash-can"></i></div>
            </div>
            
        </div>
    </div>
   
</template>

<script>
import Swal from 'sweetalert2';
import axios from 'axios';

export default {
  name: 'CardSolicitud',
  props: {
    solicitud: null
  },
  emits: ["refresh"],
  methods: {
    eliminarSolicitud(){
        return Swal.fire({
            title: `¿Está seguro que desea eliminar la solicitud?`,
            text: "Esta acción no podrá deshacerse.",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: 'ACEPTAR',
            cancelButtonColor: "#FF0000",
            showCancelButton: true,
            cancelButtonText: 'CANCELAR',
            preConfirm: async () => {

                axios.delete(process.env.VUE_APP_API_URL + '/solicitud/' + this.solicitud.ID_ALQUILER)
                 .then(async resp => {
                    await Swal.fire(resp.data.message, '', 'success')
                    this.$emit("refresh")
                    
                }).catch( err => {
                    Swal.fire('Error',err.response.data.message,'error')
                })


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
                await axios.put(process.env.VUE_APP_API_URL + '/pagar-solicitud/' + this.solicitud.ID_ALQUILER)
                .then(async resp => {
                    Swal.fire(resp.data.message, resp.data.text,'success')
                    this.$emit("refresh")
                })
                .catch(err => console.log(err))
                
            },
        }) 
    },
    verMotivoRechazo(){
        return Swal.fire('Motivo de Rechazo', `"`+this.solicitud.MOTIVO_RECHAZO+`"`, 'info')
    },
    entregarVehiculo(){
        return Swal.fire({
            title: `¿Ya le devolviste el auto a ${this.solicitud.NOMBRE + " " +this.solicitud.APELLIDO}?`,
            text: "El propietario del vehiculo tambien deberá confirmar la entrega para que la publicación finalice",
            icon: "warning",
            showCloseButton: true,
            confirmButtonText: 'VEHICULO ENTREGADO',
            cancelButtonColor: "#FF0000",
            showCancelButton: true,
            cancelButtonText: 'CANCELAR',
            preConfirm: async () => {
                await axios.put(process.env.VUE_APP_API_URL + '/entregar-auto/' + this.solicitud.ID_PUBLICACION)
                .then(async resp => {
                    Swal.fire(resp.data.message, resp.data.text,'success')
                    this.$emit("refresh")
                })
                .catch(err => console.log(err))
                
            },
        }) 
    },
    enviarComentario(){
        return Swal.fire({
                title: `Ingrese un comentario del vehiculo`,
                html: `
                       

                       <div class="rate">
                            <span style="text-decoration: underline">Calificación (1 a 5)</span>
                            <input type="radio" id="star1" name="rate" value="1"/>
                            <label for="star1" title="text">1</label>
                            <input type="radio" id="star2" name="rate" value="2"/>
                            <label for="star2" title="text">2</label>
                            <input type="radio" id="star3" name="rate" value="3"/>
                            <label for="star3" title="text">3</label>
                            <input type="radio" id="star4" name="rate" value="4"/>
                            <label for="star4" title="text">4</label>
                            <input type="radio" id="star5" name="rate" value="5"/>
                            <label for="star5" title="text">5</label>
                        </div> 
                        
                        <br>

                       <input type="text" id="comentario" class="swal2-input" size=32 placeholder="Comentario" >`,

                icon: "warning",
                showCloseButton: true,
                confirmButtonText: `ENVIAR COMENTARIO`,
                confirmButtonColor: '#3085d6',
                showCancelButton: true,
                cancelButtonText: 'CANCELAR',
                cancelButtonColor: '#b80f0f',
            }).then((result) => {

                if (result.isConfirmed){

                    const comentario = Swal.getPopup().querySelector('#comentario').value
                    const radioButtons = Swal.getPopup().querySelectorAll('input[name="rate"]');

                    let rate;

                    for (let i=0; i<radioButtons.length; i++)
                    {
                        if(radioButtons[i].checked)
                        {
                            rate = radioButtons[i].value
                        }
                    }

                    if (!comentario || !rate) {
                            return Swal.fire('Error', 'Comentario incompleto', 'error')
                    }

                    console.log('id_vehicu', this.solicitud.ID_VEHICULO)
                    console.log('calificacion', rate)
                    console.log('comentario', comentario)

                    axios.post(process.env.VUE_APP_API_URL + '/nuevo-comentario', {vehiculo: this.solicitud.ID_VEHICULO, calificacion: rate, comentario: comentario})
                    .then(async resp => {
                        Swal.fire(resp.data.message, '','success')
                        this.$emit("refresh")
                    })
                    .catch(err => console.log(err))
                }

            })
        }
    },
    computed: {
        imagenUrl(){
            let url = 'http://localhost:3000/' + this.solicitud.IMG_URL
            return url
        },
        fechaEntrega(){
            return new Date(this.solicitud.FECHA_ENTREGA + 1000 * 60 * 60 * 3).toLocaleDateString()
        },
        periodoCompleto(){
            return Date.now() > this.solicitud.FECHA_ENTREGA + 1000 * 60 * 60 * 3
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

.rate {
    float: left;
    height: 46px;
    padding: 0 10px;
}
.rate:not(:checked) > input {
    position:absolute;
    top:-9999px;
}
.rate:not(:checked) > label {
    float:right;
    width:1em;
    overflow:hidden;
    white-space:nowrap;
    cursor:pointer;
    font-size:30px;
    color:#ccc;
}
.rate:not(:checked) > label:before {
    content: '★';
}
.rate > input:checked ~ label {
    color: #ffc700;    
}
.rate:not(:checked) > label:hover,
.rate:not(:checked) > label:hover ~ label {
    color: #deb217;  
}
.rate > input:checked + label:hover,
.rate > input:checked + label:hover ~ label,
.rate > input:checked ~ label:hover,
.rate > input:checked ~ label:hover ~ label,
.rate > label:hover ~ input:checked ~ label {
    color: #c59b08;
}
</style>