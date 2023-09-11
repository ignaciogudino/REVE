<template>

    <div class="hero-section-absolute"></div>

    <div class="card-rent-container">
        <div class="card-rent-request">
            <div class="card-info-wrapper">
                <span class="card-title-rent-request">Preguntas Frecuentes</span>

                <hr class="card-divider">

                <h3 class="featured-subtitle">¿Cuáles son los requisitos para ser conductor en la plataforma?</h3>

                <span class="justified-text">
                    Los requisitos para convertirte en conductor en nuestra plataforma son los siguientes:<br><br>

                    <ul class="bullet-list">
                        <li>Debes ser mayor de edad.</li>
                        <li>Debes poseer un permiso de conducir válido en el país en el que alquilarás un vehículo.</li>
                        <li>Debes tener al menos dos años de experiencia de conducción.</li>
                        <li>Debes proporcionar un medio de pago válido.</li>
                        <li>No debes haber incurrido en impagos con respecto a nuestras Condiciones del Servicio.</li>
                    </ul>
                </span>

                <h3 class="featured-subtitle">¿Cómo puedo publicar un anuncio para alquilar mi vehículo?</h3>

                <span class="justified-text">
                    Publicar un anuncio es sencillo:<br><br>

                    <ul class="bullet-list">
                        <li>Inicia sesión en tu cuenta.</li>
                        <li>Haz clic en "Mis Publicaciones".</li>
                        <li>Completa la información detallada sobre tu vehículo, incluyendo fotos de calidad.</li>
                        <li>Establece las tarifas y la disponibilidad.</li>
                        <li> Revisa y confirma la información del anuncio.</li>
                        <li> Revisa y confirma la información del anuncio.</li>
                    </ul>
                </span>

                <h3 class="featured-subtitle">¿Qué sucede si mi vehículo sufre daños durante un alquiler?</h3>

                <span class="justified-text">
                    Si tu vehículo sufre daños durante un alquiler, comunícate de inmediato con nuestro servicio de atención al cliente y sigue las instrucciones proporcionadas. Los conductores están cubiertos por un seguro, y trabajaremos para garantizar que cualquier reclamación de daños se maneje de manera adecuada y justa.
                </span>

                
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PreguntasFrecuentesView'
}
</script>


<style scoped>
h3{
    margin: 10px
}

.hero-section-absolute{
    position: absolute;
    top: 3rem;
    left: 0;
    width: 100%;
    height:300px;
    background-image: url('../assets/images/banner_camioneta.jpg');
    background-size: cover;
    background-position: center;
    z-index: -1;
}

.card-rent-container{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-top: 100px;
}

.card-rent-request{    
    background-color: #ffffff;
    width: 70%;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-family: 'Geologica', sans-serif;
}

.card-info-wrapper{
    padding: 2rem;
    display: flex;
    flex-direction: column;
}

.card-title-rent-request{
    color: #000000;
    font-size: 2.2rem;
}

.info-owner-wrapper{
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.card-title-rent{
    font-size: 1.4rem;
    margin-top: 1rem;
}



.featured-subtitle {
    font-size: 2rem;
    padding: 1rem 1rem;
    font-family: 'Geologica', sans-serif;
    font-style: bold;
}

.justified-text{
    font-size: 1rem;
    padding: 1rem 1rem;
    font-family: 'Geologica', sans-serif;
    font-style: bold;
    text-align: justify;
}

.card-divider {
    border-top: 1px solid #ccc;
    margin: 10px 0;
}


.bullet-list {
  list-style-type: disc; /* Puedes cambiarlo a "square" u otro estilo si prefieres */
  padding-left: 20px; /* Añade espaciado a la izquierda para que los bullets no estén pegados al borde */
}

.bullet-list li {
  margin-bottom: 10px; /* Espaciado entre los elementos de la lista */
}

</style>