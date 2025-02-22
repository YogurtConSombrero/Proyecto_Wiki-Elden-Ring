// Nicolás Felipe Padilla
// Script para alternar entre tema claro y oscuro
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-modo');

    // Comprobar si hay una preferencia guardada en localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleButton.innerHTML = '☀️ Modo Claro';
    } else {
        toggleButton.innerHTML = '🌙 Modo Oscuro';
    }

    // Función para cambiar el tema
    function toggleTheme() {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            toggleButton.innerHTML = '🌙 Modo Oscuro';
        } else {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            toggleButton.innerHTML = '☀️ Modo Claro';
        }
    }

    // Asignar evento al botón
    toggleButton.addEventListener('click', toggleTheme);
});

// Sacar info de la api
function obtenerValorDeArray(array, nombre) {
    // Trabja en minusculas
    const item = array.find(i => i.name.toLowerCase().includes(nombre.toLowerCase()));
    // Condición ? valor_si_verdadero : valor_si_falso;
    return item ? item.amount || item.scaling || 'N/A' : 'N/A';
}

// Cargar armas y mostrarlas en los selectores
document.addEventListener('DOMContentLoaded', function() {
    const selectArma1 = document.getElementById('select-arma1');
    const selectArma2 = document.getElementById('select-arma2');
    const infoArma1 = document.getElementById('info-arma1');
    const infoArma2 = document.getElementById('info-arma2');

    async function cargarArmas() {
        try {
            console.log("Probando que carga");
            // Llamado
            const response = await fetch('https://eldenring.fanapis.com/api/weapons?limit=100');
            const data = await response.json();

            console.log("Datos de la API:", data); // Verifica la estructura

            const armas = data.data;

            armas.forEach(arma => {
                if (!arma.id || !arma.name) return;

                const option1 = document.createElement('option');
                option1.value = arma.id;
                option1.textContent = arma.name;
                selectArma1.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = arma.id;
                option2.textContent = arma.name;
                selectArma2.appendChild(option2);
            });

            console.log("Carga lista.");

            // Eventos para mostrar información de armas
            selectArma1.addEventListener('change', (e) => mostrarInfoArma(e.target.value, infoArma1));
            selectArma2.addEventListener('change', (e) => mostrarInfoArma(e.target.value, infoArma2));

        } catch (error) {
            console.error("Error al cargar las armas:", error);
        }
    }

    async function mostrarInfoArma(armaId, contenedorInfo) {
        if (!armaId) {
            contenedorInfo.innerHTML = '';
            return;
        }

        try {
            console.log("Cargando:", armaId);
            // Llamado
            const response = await fetch(`https://eldenring.fanapis.com/api/weapons/${armaId}`);
            const data = await response.json();
            const arma = data.data;

            console.log("Datos del arma:", arma); // Para verificar en consola

            // Construir el HTML con la información del arma
            contenedorInfo.innerHTML = `
                <h3>${arma.name}</h3>
                <img src="${arma.image}" alt="${arma.name}" style="width:200px;">
                <p><strong>Descripción:</strong> ${arma.description || 'N/A'}</p>
                <p><strong>Tipo:</strong> ${arma.category || 'N/A'}</p>
                <p><strong>Daño Físico:</strong> ${obtenerValorDeArray(arma.attack, "phy")}</p>
                <p><strong>Daño Mágico:</strong> ${obtenerValorDeArray(arma.attack, "mag")}</p>
                <p><strong>Daño de Fuego:</strong> ${obtenerValorDeArray(arma.attack, "fire")}</p>
                <p><strong>Daño de Rayo:</strong> ${obtenerValorDeArray(arma.attack, "ligt")}</p>
                <p><strong>Daño Sagrado:</strong> ${obtenerValorDeArray(arma.attack, "holy")}</p>
                <p><strong>Crítico:</strong> ${obtenerValorDeArray(arma.attack, "crit")}</p>
                <p><strong>Escalado de Fuerza:</strong> ${obtenerValorDeArray(arma.scalesWith, "str")}</p>
                <p><strong>Escalado de Destreza:</strong> ${obtenerValorDeArray(arma.scalesWith, "dex")}</p>
                <p><strong>Escalado de Inteligencia:</strong> ${obtenerValorDeArray(arma.scalesWith, "int")}</p>
                <p><strong>Escalado de Fe:</strong> ${obtenerValorDeArray(arma.scalesWith, "faith")}</p>
                <p><strong>Escalado de Arcano:</strong> ${obtenerValorDeArray(arma.scalesWith, "arc")}</p>
                <p><strong>Peso:</strong> ${arma.weight || 'N/A'}</p>
            `;
        // Por si algo falla
        } catch (error) {
            console.error("Error al cargar la información del arma:", error);
        }
    }

    // Cargar las armas al iniciar la página
    cargarArmas();
});

