<template>
  <!-- COMIENZO NAVBAR -->
  <nav class="navbar" v-if="!isLogin">
      <div class="navbar-links">
          <router-link to="/">Inicio</router-link>
          <router-link to="/mis-solicitudes">Mis Solicitudes</router-link>
          <router-link to="/mis-publicaciones">Mis Publicaciones</router-link>
      </div>
      <div class="navbar-right">
          <span class="navbar-title">REVE </span>
          <i @click="logout()" class="fa fa-sign-out logout-icon" aria-hidden="true"></i>
      </div>
  </nav>
  <!-- FIN NAVBAR -->
  
  <router-view/>

   <!-- COMIENZO FOOTER-->
    <footer class="footer" v-if="!isLogin">
        <div class="footer-content">
            <div class="footer-section">
                <h3>Contacto</h3>
                <div class="footer-item-wrapper"><i class="fas fa-envelope"></i> soporte@reve.com</div>
                <div class="footer-item-wrapper">
                    <a target="_blank" href="https://www.telegram.org/" class="footer-link">
                        <i class="fa-brands fa-telegram"></i> Telegram
                    </a>
                </div>
                <router-link to="/faq" class="footer-link"><div class="footer-item-wrapper">Preguntas Frecuentes</div></router-link>
            </div>
            <div class="footer-section">
                <h3>Seguinos</h3>
                <div class="footer-item-wrapper">
                    <a target="_blank" href="https://www.instagram.com/" class="footer-link">
                        <i class="fab fa-instagram"></i> Instagram
                    </a>
                </div>
                <div  class="footer-item-wrapper">
                    <a target="_blank" href="https://www.twitter.com/" class="footer-link">
                        <i class="fab fa-twitter"></i> Twitter
                    </a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <span>&copy; 2023 REVE. Todos los derechos reservados. REVE es propiedad de Acople SA.</span>
        </div>
    </footer>
    <!-- FIN FOOTER-->
</template>


<script>
import Swal from 'sweetalert2';

export default {
    name: 'AppVue',
    methods:{
        logout(){
            return Swal.fire({
            title: `¿Está seguro que desea salir?`,
            icon: "warning",
            showCloseButton: true,
            confirmButtonColor: "#FF0000",
            confirmButtonText: `SALIR`,
            preConfirm: async () => {
                    localStorage.removeItem('user');
                    this.$router.push({path: '/login'})
                },
            }) 
        },
    },
    computed: {
        isLogin: function () {
            return "" + this.$router.currentRoute.value.fullPath == '/login'
        },
    },
}

</script>

<style>

body {
    margin: 0;
    padding: 0;
    font-family: 'Geologica', sans-serif;
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}

input[type=number] { -moz-appearance:textfield; }


/* COMIENZO DEL NAVBAR */

.navbar {
    height: 3.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 50px 0 50px;
    border-bottom: 0.1px solid #ccc;
}

.navbar a {
    text-decoration: none;
    color: black;
    transition: transform 0.3s;
    font-family: 'Geologica', sans-serif;
    font-size: 1.2rem;
    padding: 15px;
}

.navbar a:hover {
    background-color: #ddd;
}

.navbar-right {
    display: flex;
    align-items: center;
}

.navbar-title {
    font-size: 2.7rem;
    font-family: 'Times New Roman', serif;
    padding: 20px
}

.logout-icon{
    height:100%;
    margin-left: 15px;
    transition: 0.2s
}

.logout-icon:hover{
    transform: scale(1.2);
    cursor:pointer
}

/* FIN DEL NAVBAR */


/* COMIENZO FOOTER*/
.footer {
    background-color: #f0f0f0; /* Color de fondo gris claro */
    bottom: 0;
    left: 0;
    width: 100%;
    position: relative;
}

.footer-content {
    display: flex;
    justify-content: space-around;
    max-width: 1200px;
    margin: 0 auto;
}

.footer-section h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
}

.footer-section div {
    text-decoration: none;
    color: #000000;
    padding: 5px;
}

.footer-section div:hover  {
    text-decoration: underline;
    cursor: pointer;
}

.footer-item-wrapper{
    flex-direction: row;
}

.footer-bottom {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 5px;
    font-size: 0.8rem;
    color: #555;
}

.footer-link{
  text-decoration: none;
  color: black;
}
/* FIN FOOTER */



</style>
