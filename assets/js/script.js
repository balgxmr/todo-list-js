const listaTareas = [
  {
    id: 1,
    nombre: "Realizar el proyecto de Redes Computacionales",
    status: false,
  },
  {
    id: 2,
    nombre: "Limpiar el baño",
    status: false,
  },
  {
    id: 3,
    nombre: "Conseguir novia",
    status: false,
  },
];

const enviarInput = document.querySelector("#enviar");
let contador = 3; // En 3 porque ya hay 3 tareas por default :P

const agregarTarea = function (event) {
  event.preventDefault();
  const nuevaTarea = document.querySelector("#tarea-nueva");

  contador++;
  listaTareas.push({ id: contador, nombre: nuevaTarea.value, status: false });

  nuevaTarea.value = "";
  actualizarListaTareas();
  actualizarContadorTareas();
};

const actualizarListaTareas = function () {
  const listaTareasContainer = document.querySelector(".lista-tareas");
  listaTareasContainer.innerHTML = `
    <p>ID</p>
    <p>Tareas</p>
    <p></p>
    <p></p>
  `;

  listaTareas.forEach((tarea) => {
    const tareaElement = document.createElement("div");
    tareaElement.innerHTML = `
      <span>${tarea.id}</span>
      <span>${tarea.status ? `<s>${tarea.nombre}</s>` : tarea.nombre}</span>
      <input type="checkbox" ${tarea.status ? "checked" : ""} onclick="marcarRealizada(${tarea.id})" />
      <button onclick="eliminarTarea(${tarea.id})">X</button>
    `;
    listaTareasContainer.appendChild(tareaElement);
  });
};

const marcarRealizada = function (id) {
  const tarea = listaTareas.find((tarea) => tarea.id === id);
  if (tarea) {
    tarea.status = !tarea.status;
    actualizarListaTareas();
    actualizarContadorTareas();
  }
};

const eliminarTarea = function (id) {
  const tareaIndex = listaTareas.findIndex((tarea) => tarea.id === id);
  // findIndex() devuelve el índice de la tarea o -1 si no la encuentra.. Por ello se valida si tareaIndex !== -1
  if (tareaIndex !== -1) {
    listaTareas.splice(tareaIndex, 1);
    actualizarListaTareas();
    actualizarContadorTareas();
  }
};

const actualizarContadorTareas = function () {
  const totalTareas = listaTareas.length;
  const realizadas = listaTareas.filter((tarea) => tarea.status).length;

  document.getElementById("total-tareas").textContent = `Total: ${totalTareas}`;
  document.getElementById("finished-tareas").textContent = `Realizadas: ${realizadas}`;
};

enviarInput.addEventListener("click", agregarTarea);
actualizarListaTareas();
