import { getEmployees } from "./employees.js";

// Guardamos los empleados globalmente en este módulo para poder filtrarlos sin volver a hacer peticiones a la API
let allEmployees = [];

/**
 * Generates the internal HTML structure for a single employee card.
 */
function createCardHtml(employee) {
    const internetAvatars = [
        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/1.png",
        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/1.png",
        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/2.png",
        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/2.png",
        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/3.png",
        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/3.png",
        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/4.png",
        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png",
        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/5.png",
        "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/5.png"
    ];

    const avatarUrl = internetAvatars[(employee.id - 1) % internetAvatars.length];

    return `
    <article class="card-employee">
        <header class="card-employee__header">
            <div class="card-employee__avatar-wrapper">
                <img class="card-employee__avatar" src="${avatarUrl}" alt="${employee.name}">
            </div>
            <div class="card-employee__header-text">
                <h3 class="card-employee__title">${employee.name}</h3>
                <span class="card-employee__username">📧 ${employee.email}</span>
            </div>
        </header>
        <div class="card-employee__body">
            <span class="card-employee__label">Dirección</span>
            <div class="card-employee__address">
                <p class="card-employee__address-line">
                    <span class="card-employee__address-strong">${employee.address.street}</span>, ${employee.address.suite}
                </p>
                <p class="card-employee__address-sub">
                    ${employee.address.city} (${employee.address.zipcode})
                </p>
            </div>
        </div>
    </article>
    `;
}

/**
 * Renders the filtered array of employees or shows the empty state message.
 */
function renderEmployees(container, employeesList) {
    if (!employeesList || employeesList.length === 0) {
        container.innerHTML = `
            <div class="dashboard-grid__empty-state">
                <p>⚠️ No hay resultados para esta búsqueda.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = employeesList.map(emp => createCardHtml(emp)).join("");
}

/**
 * Creates the alphabet button container and hooks the filtering logic.
 */
function initializeAlphabetFilter(dashboardGrid) {
    const filterContainer = document.querySelector(".alphabet-filter");
    if (!filterContainer) return;

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    
    // Generamos los botones dinámicamente de la A a la Z + un botón de "Todos"
    let alphabetHtml = `<button class="alphabet-btn alphabet-btn--active" data-letter="all">Todos</button>`;
    alphabetHtml += alphabet.map(letter => `<button class="alphabet-btn" data-letter="${letter}">${letter}</button>`).join("");
    
    filterContainer.innerHTML = alphabetHtml;

    // Escuchador de eventos (Event Delegation) para capturar los clics en las letras
    filterContainer.addEventListener("click", (e) => {
        const button = e.target.closest(".alphabet-btn");
        if (!button) return;

        // Cambiar estado visual del botón activo
        document.querySelectorAll(".alphabet-btn").forEach(btn => btn.classList.remove("alphabet-btn--active"));
        button.classList.add("alphabet-btn--active");

        const selectedLetter = button.dataset.letter;

        if (selectedLetter === "all") {
            renderEmployees(dashboardGrid, allEmployees);
        } else {
            // Filtramos comparando la primera letra del nombre (pasando todo a mayúsculas)
            const filtered = allEmployees.filter(emp => 
                emp.name.trim().toUpperCase().startsWith(selectedLetter)
            );
            renderEmployees(dashboardGrid, filtered);
        }
    });
}

/**
 * Orchestrates the data fetching and rendering inside the dashboard layout.
 */
async function initializeDashboard() {
    // 1. Guard de Seguridad (Auth check)
    const loggedUser = localStorage.getItem("loggedUser");
    if (!loggedUser) {
        window.location.href = "./"; 
        return;
    }

    // 2. Selección del contenedor en el DOM
    const dashboardGrid = document.querySelector(".dashboard-grid");
    if (!dashboardGrid) {
        console.error("Target container '.dashboard-grid' was not found in the DOM.");
        return;
    }

    // 3. Obtención de datos asíncronos desde la API (JSONPlaceholder)
    allEmployees = await getEmployees();

    // 4. Inicializar barra alfabética y renderizado inicial
    initializeAlphabetFilter(dashboardGrid);
    renderEmployees(dashboardGrid, allEmployees);
}

// Inicialización automática del flujo modular
initializeDashboard();