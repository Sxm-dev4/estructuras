function calcularLongestNaps(caso) {
  const [profesoresStr, appointmentsStr] = caso.split('--');
  if (!profesoresStr || !appointmentsStr) return 'Formato inválido.';

  const profesores = profesoresStr.trim().split(' ').filter(p => p);
  const citasPorProfesor = {};
  profesores.forEach(p => citasPorProfesor[p] = []);

  const appointments = appointmentsStr.split(';').map(a => a.trim()).filter(a => a.length > 0);
  appointments.forEach(app => {
    const partes = app.split(' ');
    if (partes.length < 4) return;
    const prof = partes[0];
    const start = parseInt(partes[1], 10);
    const end = parseInt(partes[2], 10);
    if (citasPorProfesor[prof]) {
      citasPorProfesor[prof].push([start, end]);
    }
  });

  function calcularMejorSiesta(intervalos) {
    let mejorDuracion = 0;
    let inicioSiesta = 0;

    if (intervalos.length === 0) return [1440, 0];

    intervalos.sort((a,b) => a[0]-b[0]);

    if (intervalos[0][0] > 0) {
      mejorDuracion = intervalos[0][0];
      inicioSiesta = 0;
    }

    for (let i=0; i<intervalos.length-1; i++) {
      const finActual = intervalos[i][1];
      const inicioSiguiente = intervalos[i+1][0];
      const diff = inicioSiguiente - finActual;
      if (diff > mejorDuracion) {
        mejorDuracion = diff;
        inicioSiesta = finActual;
      }
    }

    const finUltima = intervalos[intervalos.length -1][1];
    if (1440 - finUltima > mejorDuracion) {
      mejorDuracion = 1440 - finUltima;
      inicioSiesta = finUltima;
    }

    return [mejorDuracion, inicioSiesta];
  }

  const resultados = profesores.map(prof => {
    const citas = citasPorProfesor[prof];
    const [duracion, inicio] = calcularMejorSiesta(citas);
    return {profesor: prof, longestNap: duracion, initialTime: inicio};
  });

  resultados.sort((a,b) => {
    if (b.longestNap !== a.longestNap) return b.longestNap - a.longestNap;
    return a.profesor.localeCompare(b.profesor);
  });

  const lineas = resultados.map(r => `${r.profesor} ${r.longestNap} ${r.initialTime}`);
  return lineas.join('\n');
}

document.addEventListener('DOMContentLoaded', () => {
  const inputCaso = document.getElementById('inputCaso');
  const btnCalcular = document.getElementById('btnCalcular');
  const resultado = document.getElementById('resultado');

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
