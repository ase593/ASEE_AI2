<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ECOTEC | ASEE</title>
    <link rel="stylesheet" href="assets/css/style_asee.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
</head>
<body>

    <!-- PANTALLA DE LOGIN -->
<div id="asee-login-screen" class="overlay">
    <div class="login-card">
        <h1>ECOTEC-ASEE</h1>
        <p>Repuestos Automotrices</p>
        <form id="login-form">
            <input type="text" id="user-asee" class="asee-input" placeholder="Usuario" required>
            <input type="password" id="pass-asee" class="asee-input" placeholder="Contraseña" required>
            <button type="submit" class="btn-primary">Entrar al Sistema</button>
        </form>
    </div>
</div>

    <!-- APP PRINCIPAL -->
    <div id="app-asee" class="asee-wrapper" style="display:none;">
        <aside class="asee-sidebar">
            <div class="profile">
                <div class="avatar">ASEE</div>
                <p>Steve Espinoza E.</p>
            </div>
            <nav>
                <button onclick="switchTab('tab-dash')" class="nav-btn">📊 Dashboard</button>
                <button onclick="switchTab('tab-inv')" class="nav-btn">📦 Inventario</button>
                <button onclick="switchTab('tab-ventas')" class="nav-btn">💰 Ventas</button>
                <button onclick="logoutASEE()" class="nav-btn logout">🚪 Salir</button>
            </nav>
        </aside>

        <main class="asee-main">
            <!-- SECCIÓN: DASHBOARD -->
            <div id="tab-dash" class="tab-content active">
                <header>
                    <h1>Panel de Control</h1>
                    <p id="current-date" style="color: var(--accent);"></p>
                </header>
                <div class="asee-cards">
                    <div class="card"><span>Total Productos</span><h2 id="total-articulos">0</h2></div>
                    <div class="card warning"><span>Stock Crítico</span><h2 id="total-alerta">0</h2></div>
                    <div class="card success"><span>Ingresos Totales</span><h2 id="total-caja">$0.00</h2></div>
                </div>
                <div class="asee-glass-card" style="margin-top: 30px;">
                    <h3>🔔 Últimos Movimientos</h3>
                    <ul id="history-log" style="list-style: none; padding: 0; color: #94a3b8;"></ul>
                </div>
            </div>

            <!-- SECCIÓN: INVENTARIO -->
            <div id="tab-inv" class="tab-content">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h1>Inventario de Repuestos</h1>
                    <input type="text" id="search-asee" class="asee-input search" placeholder="🔍 Buscar..." onkeyup="searchProduct()">
                </div>
                
                <div class="asee-glass-card">
                    <form id="form-asee" class="grid-form">
                        <input type="hidden" id="edit-index" value="-1">
                        <input type="text" id="asee-name" class="asee-input" placeholder="Nombre (ej: Aceite (5w))" required>
                        <input type="number" id="asee-stock" class="asee-input" placeholder="Stock" min="0" required>
                        <input type="number" id="asee-price" class="asee-input" placeholder="Precio ($)" min="0.01" step="0.01" required>
                        <button type="submit" id="btn-save" class="btn-primary">Guardar Producto</button>
                    </form>
                </div>

                <div class="table-container">
                    <table class="asee-table">
                        <thead>
                            <tr><th>Producto</th><th>Estado</th><th>Stock</th><th>Precio</th><th>Acciones</th></tr>
                        </thead>
                        <tbody id="render-inventario"></tbody>
                    </table>
                </div>
            </div>

            <!-- SECCIÓN: VENTAS -->
            <div id="tab-ventas" class="tab-content">
                <h1>Módulo de Salidas</h1>
                <div class="asee-glass-card sale-box" style="max-width: 500px;">
                    <label style="display:block; margin-bottom: 10px;">Seleccionar Producto:</label>
                    <select id="select-venta" class="asee-input" style="width: 100%;"></select>
                    <label style="display:block; margin-top: 20px; margin-bottom: 10px;">Cantidad:</label>
                    <input type="number" id="cant-venta" class="asee-input" style="width: 100%;" placeholder="0" min="1">
                    <button onclick="procesarVenta_ASEE()" class="btn-success" style="width: 100%; margin-top: 20px; padding: 15px;">Confirmar Venta</button>
                </div>
            </div>
        </main>
    </div>

    <script src="assets/js/auth_asee.js"></script>
    <script src="assets/js/logic_asee.js"></script>
</body>
</html>