// Función principal requerida por el proyecto EDyA1
function calcularLongestNaps(caso) {
  // (1) O(1) - División inicial
  const [profesoresStr, appointmentsStr] = caso.split('--');
 // (2) O(1) 
  if (!profesoresStr || !appointmentsStr) return 'Formato inválido.';

  // (3) O(n) donde n = longitud de profesoresStr
  const profesores = profesoresStr.trim().split(' ').filter(p => p);
  
  // (4) O(p) donde p = número de profesores
  const citasPorProfesor = {};
  profesores.forEach(p => citasPorProfesor[p] = []);

  // (5) O(m) donde m = longitud de appointmentsStr
  const appointments = appointmentsStr.split(';').map(a => a.trim()).filter(a => a.length > 0);
  
  // (6) O(a*k) donde a = número de citas, k = longitud máxima de partes
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

  // Calcula la mejor siesta para un profesor
  function calcularMejorSiesta(intervalos) {
    // (7) O(1) - Caso vacío
    if (intervalos.length === 0) return [1440, 0]; // Todo el día libre

    // (8) O(i log i) donde i = número de intervalos
    intervalos.sort((a, b) => a[0] - b[0]);

    let mejorDuracion = 0;
    let inicioSiesta = 0;

    // (9) O(1) - Verificación espacio inicial
    if (intervalos[0][0] > 0) {
      mejorDuracion = intervalos[0][0];
      inicioSiesta = 0;
    }

    // (10) O(i) - Bucle entre intervalos
    for (let i = 0; i < intervalos.length - 1; i++) {
      const finActual = intervalos[i][1];
      const inicioSiguiente = intervalos[i + 1][0];
      const diff = inicioSiguiente - finActual;
      if (diff > mejorDuracion) {
        mejorDuracion = diff;
        inicioSiesta = finActual;
      }
    }

    // (11) O(1) - Verificación espacio final
    const finUltima = intervalos[intervalos.length - 1][1];
    const espacioFinal = 1440 - finUltima;
    if (espacioFinal > mejorDuracion) {
      mejorDuracion = espacioFinal;
      inicioSiesta = finUltima;
    }

    return [mejorDuracion, inicioSiesta];
  }

  // (12) O(p * complejidad de calcularMejorSiesta)
  const resultados = profesores.map(prof => {
    const citas = citasPorProfesor[prof];
    const [duracion, inicio] = calcularMejorSiesta(citas);
    return { profesor: prof, longestNap: duracion, initialTime: inicio };
  });

  // (13) O(p log p) - Ordenamiento final
  resultados.sort((a, b) => {
    if (b.longestNap !== a.longestNap) return b.longestNap - a.longestNap;
    return a.profesor.localeCompare(b.profesor);
  });

  // (14) O(p) - Formateo de salida
  const lineas = resultados.map(r => `${r.profesor} ${r.longestNap} ${r.initialTime}`);
  return lineas.join('\n');
}