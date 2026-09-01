const API_URL = "https://jsonplaceholder.typicode.com/users";

let usuarios = [];


const datosColombianos = [
    {
        name: "Juan David Rodríguez",
        email: "juan.rodriguez@email.com",
        phone: "300-456-7890",
        company: "Tecnología Antioquia"
    },
    {
        name: "María Fernanda Gómez",
        email: "maria.gomez@email.com",
        phone: "310-567-8912",
        company: "Soluciones Medellín"
    },
    {
        name: "Carlos Andrés Martínez",
        email: "carlos.martinez@email.com",
        phone: "315-678-2345",
        company: "Innovaciones Colombia"
    },
    {
        name: "Laura Valentina Pérez",
        email: "laura.perez@email.com",
        phone: "320-789-3456",
        company: "Diseños Bogotá"
    },
    {
        name: "Santiago Hernández López",
        email: "santiago.hernandez@email.com",
        phone: "301-234-5678",
        company: "Desarrollo Digital"
    },
    {
        name: "Camila Andrea Torres",
        email: "camila.torres@email.com",
        phone: "316-345-6789",
        company: "Marketing Cali"
    },
    {
        name: "Sebastián Ramírez Castro",
        email: "sebastian.ramirez@email.com",
        phone: "318-456-7891",
        company: "Servicios del Caribe"
    },
    {
        name: "Valentina Moreno Díaz",
        email: "valentina.moreno@email.com",
        phone: "302-567-8912",
        company: "Consultores del Valle"
    },
    {
        name: "Andrés Felipe Vargas",
        email: "andres.vargas@email.com",
        phone: "312-678-1234",
        company: "Construcciones Andinas"
    },
    {
        name: "Natalia Carolina Rojas",
        email: "natalia.rojas@email.com",
        phone: "317-789-4567",
        company: "Comercializadora Nacional"
    }
];


const renderizarUsuarios = (listaUsuarios) => {
    const tabla = $("#tabla-usuarios");

    tabla.empty();

    if (listaUsuarios.length === 0) {
        tabla.html(`
            <tr>
                <td colspan="3" class="mensaje">
                    No se encontraron usuarios.
                </td>
            </tr>
        `);

        return;
    }

    listaUsuarios.forEach((usuario) => {
        const fila = `
            <tr data-id="${usuario.id}">
                <td>${usuario.name}</td>
                <td>${usuario.email}</td>
                <td>${usuario.company.name}</td>
            </tr>
        `;

        tabla.append(fila);
    });
};


const cargarUsuarios = async () => {
    try {
        console.log("Cargando usuarios desde la API...");

        const respuesta = await axios.get(API_URL);

        usuarios = respuesta.data;

  
        usuarios = usuarios.map((usuario, index) => ({
            ...usuario,
            name: datosColombianos[index].name,
            email: datosColombianos[index].email,
            phone: datosColombianos[index].phone,
            company: {
                ...usuario.company,
                name: datosColombianos[index].company
            },
            address: {
                ...usuario.address,
                street: `Carrera ${10 + index}`,
                suite: `Apartamento ${101 + index}`,
                city: index % 2 === 0 ? "Medellín" : "Bogotá",
                zipcode: `0500${index + 1}`
            }
        }));

        console.log(`Usuarios cargados: ${usuarios.length}`);
        console.log("Primera fila:", usuarios[0]);

        renderizarUsuarios(usuarios);

        $("#contador").text(
            `Mostrando ${usuarios.length} usuarios`
        );

    } catch (error) {
        console.error("Error al cargar los usuarios:", error);

        $("#tabla-usuarios").html(`
            <tr>
                <td colspan="3" class="error">
                    No se pudieron cargar los usuarios.
                </td>
            </tr>
        `);
    }
};

const filtrarUsuarios = () => {
    const termino = $("#buscador").val().toLowerCase().trim();

    const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.name.toLowerCase().includes(termino)
    );

    console.log(
        `Filtro: "${termino}" | Coincidencias: ${usuariosFiltrados.length}`
    );

    renderizarUsuarios(usuariosFiltrados);

    $("#contador").text(
        `Mostrando ${usuariosFiltrados.length} de ${usuarios.length} usuarios`
    );
};


const mostrarDetalle = (usuario) => {
    const { name, email, phone, address } = usuario;

    console.log("Usuario seleccionado:", usuario);

    $("#detalle-usuario").html(`
        <h2>${name}</h2>

        <p>
            <strong>Email:</strong> ${email}
        </p>

        <p>
            <strong>Teléfono:</strong> ${phone}
        </p>

        <p>
            <strong>Dirección:</strong>
            ${address.street}, ${address.suite},
            ${address.city}, ${address.zipcode}
        </p>

        <button class="boton-cerrar" id="cerrar-detalle">
            Cerrar detalle
        </button>
    `);

    $("#detalle-usuario").removeClass("oculto");
};


$("#tabla-usuarios").on("click", "tr[data-id]", (evento) => {
    const idUsuario = Number($(evento.currentTarget).data("id"));

    const usuarioSeleccionado = usuarios.find(
        (usuario) => usuario.id === idUsuario
    );

    if (usuarioSeleccionado) {
        mostrarDetalle(usuarioSeleccionado);
    }
});


$("#buscador").on("input", () => {
    filtrarUsuarios();
});


$("#detalle-usuario").on("click", "#cerrar-detalle", () => {
    $("#detalle-usuario").addClass("oculto");
});

cargarUsuarios();