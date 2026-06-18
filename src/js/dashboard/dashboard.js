import { getEmployees } from "./employees.js";

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
    const employees = await getEmployees();

    if (!employees || employees.length === 0) {
        dashboardGrid.innerHTML = `<p class="dashboard-grid__empty-state">No employee records found.</p>`;
        return;
    }
   
    const cardsHtml = employees.map(employee => {

        // Enlaces fijos de internet a ilustraciones de avatares planos y modernos
        const internetAvatars = [
            "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/1.png", // Mujer 1
            "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/1.png",   // Hombre 1
            "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/2.png", // Mujer 2
            "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/2.png",   // Hombre 2
            "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/3.png", // Mujer 3
            "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/3.png",   // Hombre 3
            "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/4.png", // Mujer 4
            "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/4.png",   // Hombre 4
            "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/female/5.png", // Mujer 5
            "https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/5.png"    // Hombre 5
        ];

        // Asignación por ID del empleado (del 1 al 10)
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
    }).join("");
    // ──────────────────────────────────────────────────────────────────

    // 4. Inyección final del bloque completo en el HTML
    dashboardGrid.innerHTML = cardsHtml;
}

// Inicialización automática del flujo modular
initializeDashboard();