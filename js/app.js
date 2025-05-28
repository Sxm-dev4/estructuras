// Datos de prueba iniciales (requerido por el PDF)
const EJEMPLO_PDF = `Mario Juan Fernando--Juan 100 300 Reunión;Juan 350 700 PrepaClase;Mario 240 480 Reunión;Fernando 150 420 Clase;Fernando 490 620 PrepaClase;Juan 1100 1300 Otras;Fernando 715 900 Clase;Mario 590 720 Clase;Mario 810 920 Reunión;Juan 1350 1400 Otras;Fernando 1030 1200 PrepaClase;Mario 1100 1210 Reunión`;

document.addEventListener('DOMContentLoaded', () => {
  const inputCaso = document.getElementById('inputCaso');
  const btnCalcular = document.getElementById('btnCalcular');
  const resultado = document.getElementById('resultado');

  // Cargar datos de prueba iniciales
  inputCaso.value = EJEMPLO_PDF;

  btnCalcular.addEventListener('click', () => {
    const texto = inputCaso.value.trim();
    if (!texto) {
      resultado.textContent = 'Por favor, ingresa el texto del caso.';
      return;
    }
    const salida = calcularLongestNaps(texto);
    resultado.textContent = salida;
  });
});