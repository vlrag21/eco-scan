const video = document.getElementById("video");
const resultado = document.getElementById("resultado");

let ultimoObjeto = "";
let hablando = false;

/* =========================
   VOZ
========================= */

function hablar(texto){

    if(hablando) return;

    hablando = true;

    speechSynthesis.cancel();

    const voz =
    new SpeechSynthesisUtterance(texto);

    voz.lang = "es-ES";

    voz.rate = 0.9;

    voz.pitch = 1;

    voz.volume = 1;

    voz.onend = () => {

        hablando = false;

    };

    speechSynthesis.speak(voz);

}

/* =========================
   PILAS Y BATERÍAS
========================= */

function mostrarPilas(){

resultado.innerHTML = `

<h2>🔋 Pilas y baterías</h2>

<p>
<strong>Disposición:</strong>
Punto especial de recolección.
</p>

<p>
<strong>Cómo desecharlas:</strong>
Nunca deben depositarse en las canecas blanca,
verde o negra.
</p>

<p>
<strong>Reciclaje:</strong>
Llevar a campañas autorizadas para evitar la
contaminación del suelo y del agua.
</p>

`;

hablar(
"Las pilas y baterías nunca deben depositarse en las canecas comunes. Deben llevarse a puntos especiales de recolección para evitar la contaminación del suelo y del agua."
);

}

/* =========================
   BASE DE DATOS
========================= */

const residuos = {

bottle:{
nombre:"♻️ Botella plástica",
caneca:"⚪ Blanca",
desecho:"Vaciar, lavar y aplastar antes de reciclar.",
reciclaje:"Macetas, portalápices o sistemas de riego."
},

book:{
nombre:"📚 Libro o cuaderno",
caneca:"⚪ Blanca",
desecho:"Mantener limpio y seco.",
reciclaje:"Reutilizar para notas o manualidades."
},

cup:{
nombre:"🥤 Vaso",
caneca:"⚪ Blanca",
desecho:"Vaciar y limpiar antes de reciclar.",
reciclaje:"Semillero para plantas."
},

banana:{
nombre:"🍌 Banano",
caneca:"🟢 Verde",
desecho:"Depositar sin empaques.",
reciclaje:"Compostaje y producción de abono."
},

apple:{
nombre:"🍎 Manzana",
caneca:"🟢 Verde",
desecho:"Depositar en residuos orgánicos.",
reciclaje:"Producción de compost."
},

orange:{
nombre:"🍊 Naranja",
caneca:"🟢 Verde",
desecho:"Depositar en residuos orgánicos.",
reciclaje:"Compostaje y aromatizantes naturales."
},

"cell phone":{
nombre:"📱 Celular",
caneca:"Punto de recolección RAEE",
desecho:"No depositar en canecas convencionales.",
reciclaje:"Entregar en campañas de reciclaje electrónico."
},

mouse:{
nombre:"🖱️ Mouse",
caneca:"Punto de recolección RAEE",
desecho:"No mezclar con residuos comunes.",
reciclaje:"Llevar a jornadas de reciclaje tecnológico."
},

remote:{
nombre:"🎮 Control remoto",
caneca:"Punto de recolección RAEE",
desecho:"Retirar pilas antes de reciclar.",
reciclaje:"Centros de reciclaje electrónico."
}

};

/* =========================
   CÁMARA
========================= */

async function iniciarCamara(){

const stream =
await navigator.mediaDevices.getUserMedia({

video:{
facingMode:"environment"
}

});

video.srcObject = stream;

}

/* =========================
   IA
========================= */

async function iniciarIA(){

await iniciarCamara();

resultado.innerHTML =
"<h2>Cargando inteligencia artificial...</h2>";

const model =
await cocoSsd.load();

resultado.innerHTML =
"<h2>Escaneando residuos...</h2>";

setInterval(async()=>{

const predicciones =
await model.detect(video);

if(predicciones.length > 0){

const objeto =
predicciones[0].class;

if(residuos[objeto]){

const info =
residuos[objeto];

resultado.innerHTML = `

<h2>${info.nombre}</h2>

<p>
<strong>Caneca:</strong>
${info.caneca}
</p>

<p>
<strong>Cómo desecharlo:</strong>
${info.desecho}
</p>

<p>
<strong>Ideas de reciclaje:</strong>
${info.reciclaje}
</p>

`;

if(objeto !== ultimoObjeto){

const mensaje =

"Residuo identificado. " +

info.nombre +

". Debe depositarse en " +

info.caneca +

". Cómo desecharlo. " +

info.desecho +

". Ideas de reciclaje. " +

info.reciclaje;

hablar(mensaje);

ultimoObjeto = objeto;

}

}

}

},1500);

}

iniciarIA();