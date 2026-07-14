// ======================================================
// ECO SCAN
// PROYECTO DE CLASIFICACIÓN DE RESIDUOS CON IA
// PARTE 1
// ======================================================

// ============================
// VARIABLES
// ============================

const video = document.getElementById("video");
const resultado = document.getElementById("resultado");

let ultimoObjeto = "";
let hablando = false;

// ============================
// VOZ
// ============================

function hablar(texto){

    if(hablando) return;

    hablando = true;

    speechSynthesis.cancel();

    const voz = new SpeechSynthesisUtterance(texto);

    voz.lang="es-ES";
    voz.rate=0.9;
    voz.pitch=1;
    voz.volume=1;

    voz.onend=function(){

        hablando=false;

    };

    speechSynthesis.speak(voz);

}

// ============================
// MOSTRAR RESIDUOS
// ============================

function mostrarResiduo(objeto){

    const info=residuos[objeto];

    if(!info){

        return;

    }

    resultado.innerHTML=`

    <h2>${info.nombre}</h2>

    <p><strong>Tipo de residuo:</strong> ${info.tipo}</p>

    <p><strong>Caneca:</strong> ${info.caneca}</p>

    <p><strong>Cómo desecharlo:</strong><br>${info.desecho}</p>

    <p><strong>¿Cómo reutilizarlo?</strong><br>${info.reciclaje}</p>

    `;

    hablar(

        "Residuo seleccionado. " +

        info.nombre +

        ". " +

        info.tipo +

        ". Debe depositarse en " +

        info.caneca +

        ". " +

        info.desecho +

        ". " +

        info.reciclaje

    );

}

// ============================
// BASE DE DATOS
// ============================

const residuos={

    bottle:{

        nombre:"🧴 Botella plástica",

        tipo:"Residuo aprovechable",

        caneca:"⚪ Blanca",

        desecho:"Vaciar completamente, enjuagar y aplastar antes de reciclarla.",

        reciclaje:"Puede reutilizarse para hacer macetas, portalápices, sistemas de riego o manualidades."

    },

    book:{

        nombre:"📚 Libro o cuaderno",

        tipo:"Residuo aprovechable",

        caneca:"⚪ Blanca",

        desecho:"Debe mantenerse limpio y seco antes de reciclarse.",

        reciclaje:"Puede reutilizarse para escribir, elaborar libretas o hacer manualidades."

    },

    cup:{

        nombre:"🥤 Vaso plástico",

        tipo:"Residuo aprovechable",

        caneca:"⚪ Blanca",

        desecho:"Vaciar completamente y limpiarlo antes de depositarlo.",

        reciclaje:"Puede utilizarse como semillero, recipiente organizador o para manualidades."

    },

    banana:{

        nombre:"🍌 Banano",

        tipo:"Residuo orgánico",

        caneca:"🟢 Verde",

        desecho:"Depositar la cáscara en la caneca verde sin mezclarla con otros residuos.",

        reciclaje:"Puede convertirse en compost o abono natural."

    },

    apple:{

        nombre:"🍎 Manzana",

        tipo:"Residuo orgánico",

        caneca:"🟢 Verde",

        desecho:"Depositar los restos en la caneca verde.",

        reciclaje:"Puede utilizarse para elaborar compost."

    },

    orange:{

        nombre:"🍊 Naranja",

        tipo:"Residuo orgánico",

        caneca:"🟢 Verde",

        desecho:"Depositar las cáscaras en la caneca verde.",

        reciclaje:"Puede emplearse para hacer compost o aromatizantes naturales."

    },

    "cell phone":{

        nombre:"📱 Celular",

        tipo:"Residuo electrónico",

        caneca:"Punto de recolección RAEE",

        desecho:"Nunca debe depositarse en las canecas comunes porque contiene materiales contaminantes.",

        reciclaje:"Debe entregarse en campañas o puntos autorizados de reciclaje electrónico."

    },

    mouse:{

        nombre:"🖱️ Mouse",

        tipo:"Residuo electrónico",

        caneca:"Punto de recolección RAEE",

        desecho:"No debe mezclarse con residuos domésticos.",

        reciclaje:"Debe entregarse en programas de reciclaje tecnológico."

    },

    remote:{

        nombre:"🎮 Control remoto",

        tipo:"Residuo electrónico",

        caneca:"Punto de recolección RAEE",

        desecho:"Retirar las pilas antes de entregarlo para reciclaje.",

        reciclaje:"Sus componentes pueden recuperarse en centros especializados."

    }

};// ======================================================
// PARTE 2
// BOTONES ESPECIALES
// ======================================================

// ============================
// PILAS Y BATERÍAS
// ============================

function mostrarPilas(){

    resultado.innerHTML = `

    <h2>🔋 Pilas y baterías</h2>

    <p><strong>Tipo de residuo:</strong> Residuo peligroso.</p>

    <p><strong>Caneca:</strong> Punto especial de recolección de pilas.</p>

    <p><strong>Cómo desecharlas:</strong><br>
    Nunca deben depositarse en las canecas blanca, verde o negra. Contienen sustancias que contaminan el suelo y el agua.
    </p>

    <p><strong>¿Cómo reciclarlas?</strong><br>
    Llévalas a puntos autorizados de recolección de pilas usadas o campañas ambientales.
    </p>

    `;

    hablar(

        "Las pilas y baterías son residuos peligrosos. Nunca deben ir a las canecas comunes. Deben llevarse a un punto especial de recolección para evitar la contaminación del suelo y del agua."

    );

}

// ============================
// CARTÓN
// ============================

function mostrarCarton(){

    resultado.innerHTML = `

    <h2>📦 Cartón</h2>

    <p><strong>Tipo de residuo:</strong> Aprovechable.</p>

    <p><strong>Caneca:</strong> ⚪ Blanca.</p>

    <p><strong>Cómo desecharlo:</strong><br>
    Debe estar limpio, seco y doblado para ahorrar espacio. Si tiene grasa o restos de comida debe ir a la caneca negra.
    </p>

    <p><strong>¿Cómo reutilizarlo?</strong><br>
    Puedes elaborar organizadores, cajas, maquetas escolares, juguetes o manualidades.
    </p>

    `;

    hablar(

        "El cartón es un residuo aprovechable. Debe depositarse limpio, seco y doblado en la caneca blanca. Puede reutilizarse para hacer cajas, organizadores, maquetas y manualidades."

    );

}

// ============================
// HOJAS DE PAPEL
// ============================

function mostrarHojas(){

    resultado.innerHTML = `

    <h2>📄 Hojas de papel</h2>

    <p><strong>Tipo de residuo:</strong> Aprovechable.</p>

    <p><strong>Caneca:</strong> ⚪ Blanca.</p>

    <p><strong>Cómo desecharlas:</strong><br>
    Deben estar limpias, secas y sin restos de alimentos, grasa o líquidos.
    </p>

    <p><strong>¿Cómo reutilizarlas?</strong><br>
    Utilízalas por ambos lados antes de reciclarlas. También sirven para hacer dibujos, libretas o manualidades.
    </p>

    `;

    hablar(

        "Las hojas de papel son residuos aprovechables. Deben depositarse limpias y secas en la caneca blanca. Antes de reciclarlas pueden reutilizarse para escribir por ambos lados o realizar manualidades."

    );

}

// ============================
// EMPAQUES
// ============================

function mostrarEmpaques(){

    resultado.innerHTML = `

    <h2>🥡 Empaques</h2>

    <p><strong>Tipo de residuo:</strong> Depende del material.</p>

    <p><strong>Caneca:</strong> ⚪ Blanca si está limpio. ⚫ Negra si tiene restos de comida o grasa.</p>

    <p><strong>Cómo desecharlo:</strong><br>
    Vacía completamente el contenido y limpia el empaque cuando sea posible. Si está muy contaminado no puede reciclarse.
    </p>

    <p><strong>¿Cómo reutilizarlo?</strong><br>
    Algunos empaques pueden reutilizarse para guardar materiales escolares, juguetes pequeños o realizar manualidades.
    </p>

    `;

    hablar(

        "Los empaques deben estar limpios para reciclarse. Si están limpios van a la caneca blanca. Si contienen grasa o restos de comida deben depositarse en la caneca negra."

    );

}// ======================================================
// PARTE 3
// CÁMARA E INTELIGENCIA ARTIFICIAL
// ======================================================

// ============================
// INICIAR CÁMARA
// ============================

async function iniciarCamara(){

    try{

        const stream = await navigator.mediaDevices.getUserMedia({

            video:{
                facingMode:"environment"
            },

            audio:false

        });

        video.srcObject = stream;

    }

    catch(error){

        resultado.innerHTML=`

        <h2>❌ No fue posible acceder a la cámara.</h2>

        <p>Verifica que hayas concedido los permisos.</p>

        `;

        console.error(error);

    }

}

// ============================
// INICIAR IA
// ============================

async function iniciarIA(){

    resultado.innerHTML=`

    <h2>🤖 Cargando Inteligencia Artificial...</h2>

    <p>Espera unos segundos.</p>

    `;

    await iniciarCamara();

    const modelo = await cocoSsd.load();

    resultado.innerHTML=`

    <h2>📷 Cámara lista</h2>

    <p>Apunta hacia un residuo.</p>

    `;

    detectarObjeto(modelo);

}

// ============================
// DETECCIÓN AUTOMÁTICA
// ============================

async function detectarObjeto(modelo){

    setInterval(async()=>{

        const predicciones = await modelo.detect(video);

        if(predicciones.length==0){

            return;

        }

        const objeto = predicciones[0].class;

        if(residuos[objeto]){

            if(objeto!=ultimoObjeto){

                ultimoObjeto=objeto;

                mostrarResiduo(objeto);

            }

        }

    },1500);

}// ======================================================
// PARTE 4
// FINALIZACIÓN DEL PROYECTO
// ======================================================

// Iniciar la Inteligencia Artificial
iniciarIA();

// ======================================================
// MENSAJE CUANDO EL OBJETO NO ESTÁ REGISTRADO
// ======================================================

function objetoNoRegistrado(nombreObjeto){

    resultado.innerHTML = `

    <h2>⚠️ Objeto detectado</h2>

    <p><strong>${nombreObjeto}</strong></p>

    <p>
    Este objeto fue reconocido por la Inteligencia Artificial,
    pero ECO SCAN todavía no tiene información registrada sobre él.
    </p>

    <p>
    Puedes agregar este residuo en futuras versiones del proyecto.
    </p>

    `;

}

// ======================================================
// MEJORAR LA DETECCIÓN
// ======================================================

// Reemplaza la función detectarObjeto() de la Parte 3 por esta versión:

async function detectarObjeto(modelo){

    setInterval(async()=>{

        const predicciones = await modelo.detect(video);

        if(predicciones.length===0){

            return;

        }

        const objeto = predicciones[0].class;

        console.log("Objeto detectado:", objeto);

        if(residuos[objeto]){

            if(objeto!==ultimoObjeto){

                ultimoObjeto = objeto;

                mostrarResiduo(objeto);

            }

        }else{

            if(objeto!==ultimoObjeto){

                ultimoObjeto = objeto;

                objetoNoRegistrado(objeto);

            }

        }

    },1500);

}