//! Selecionando los elementos el HTML
const listaCurso = document.querySelector('#lista-cursos');
const carrito = document.querySelector('#carrito');
const contenedorCurso = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
let articuloCurso = [];

document.addEventListener('DOMContentLoaded', () => {
    articuloCurso = JSON.parse(localStorage.getItem('cursos')) || [];
    showHTML();
});

//! AddEventListener
//Llamando addEventListener
registrarEventListener();
function registrarEventListener() {
    //Agregar lista curso 
    listaCurso.addEventListener('click', agregarCurso);

    //Eliminar carrito 
    carrito.addEventListener('click', eliminarCarrito);

    // Vaciar el carrito
    vaciarCarrito.addEventListener('click', () => {
        articuloCurso = [];
        localStorage.clear();
        clearHTML();
    });
}
//!Funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        //Elegir todo el contenedor del curso 
        const cursoSeleccionado = e.target.parentElement.parentElement;
        datosCurso(cursoSeleccionado);
    }
}

// Eliminar carrito
function eliminarCarrito(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoRemove = e.target.getAttribute('data-id');

        //Eliminar elemnto del carrito
        articuloCurso = articuloCurso.filter(curso => curso.id !== cursoRemove);
        showHTML();
        swal({
            icon: 'success',
            title: 'Curso Eliminado'
        })
    }
}
function datosCurso(curso) {
    //Crear unn objeto para los curso

    const infoCurso = {
        image: curso.querySelector('img').src,
        title: curso.querySelector('h4').textContent,
        price: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const exite = articuloCurso.some(curso => curso.id === infoCurso.id);
    //Condicion si existe
    if (exite) {

        const cursos = articuloCurso.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
        articuloCurso = [...cursos];

    } else {
        //Agregarlo al arreglo
        articuloCurso = [...articuloCurso, infoCurso];
    }

    swal({
        title: 'Agregaste un curso 💯',
        icon: 'success'
    });

    showHTML();
}

//Mostrar en el HTML
function showHTML() {

    //Limpiar el HTML previo
    clearHTML();

    //Recorriendo el arreglo
    if (articuloCurso.length > 0) {
        articuloCurso.forEach(curso => {
            const { image, title, price, cantidad, id } = curso;
            //Crear un elemento tr
            const row = document.createElement("tr");
            row.innerHTML = `
            
            <td><img src = '${image}' width = '75px'></td>
            <td>${title}</td>
            <td>${price}</td>
            <td>${cantidad}</td>
            <td><a class = 'borrar-curso' data-id="${id}">X</a></td>
            `;
            //Insertarlo al carrito de compra
            contenedorCurso.appendChild(row);

        });
    }
    sincornizar();
}
//Guardando en el localStorage
function sincornizar() {
    localStorage.setItem('cursos', JSON.stringify(articuloCurso));
}

function clearHTML() {
    //Eliminar los hijos previo en el HTML
    while (contenedorCurso.firstChild) {
        contenedorCurso.removeChild(contenedorCurso.firstChild)
    }
}