// PERSISTENCIA
let db_asee = JSON.parse(localStorage.getItem('ASEE_DATA')) || [];
let total_ventas_asee = parseFloat(localStorage.getItem('ASEE_VENTAS')) || 0;
let logs_asee = JSON.parse(localStorage.getItem('ASEE_LOGS')) || [];

// NAVEGACIÓN
function switchTab(id) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

// FECHA
document.getElementById('current-date').innerText = new Date().toLocaleDateString('es-EC', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

// CRUD: GUARDAR / EDITAR
document.getElementById('form-asee').addEventListener('submit', function(e) {
    e.preventDefault();
    const n = document.getElementById('asee-name').value;
    const s = parseInt(document.getElementById('asee-stock').value);
    const p = parseFloat(document.getElementById('asee-price').value);
    const idx = parseInt(document.getElementById('edit-index').value);

    if(n.trim() === "" || s < 0 || p <= 0) return alert("Valores no permitidos");

    const item = { nombre: n, stock: s, precio: p };

    if(idx === -1) {
        db_asee.push(item);
        addLog(`Nuevo producto: ${n}`);
    } else {
        db_asee[idx] = item;
        document.getElementById('edit-index').value = "-1";
        document.getElementById('btn-save').innerText = "Guardar Producto";
        addLog(`Editado: ${n}`);
    }

    guardarYRefrescar();
    this.reset();
});

// RENDERIZADO
function renderInventario() {
    const listado = document.getElementById('render-inventario');
    const select = document.getElementById('select-venta');
    listado.innerHTML = "";
    select.innerHTML = "<option value=''>-- Seleccionar Repuesto --</option>";

    let critico = 0;

    db_asee.forEach((prod, i) => {
        const bajoStock = prod.stock <= 5;
        if(bajoStock) critico++;

        listado.innerHTML += `
            <tr>
                <td><strong>${prod.nombre}</strong></td>
                <td><span style="color:${bajoStock ? '#f87171' : '#34d399'}">${bajoStock ? '⚠️ Crítico' : '✅ Ok'}</span></td>
                <td>${prod.stock}</td>
                <td>$${prod.precio.toFixed(2)}</td>
                <td>
                    <button onclick="editarASEE(${i})" style="cursor:pointer; background:none; border:none;">✏️</button>
                    <button onclick="eliminarASEE(${i})" style="cursor:pointer; background:none; border:none;">🗑️</button>
                </td>
            </tr>
        `;
        if(prod.stock > 0) select.innerHTML += `<option value="${i}">${prod.nombre} (Stock: ${prod.stock})</option>`;
    });

    document.getElementById('total-articulos').innerText = db_asee.length;
    document.getElementById('total-alerta').innerText = critico;
    document.getElementById('total-caja').innerText = `$${total_ventas_asee.toFixed(2)}`;
    renderLogs();
}

// VENTAS
function procesarVenta_ASEE() {
    const i = document.getElementById('select-venta').value;
    const c = parseInt(document.getElementById('cant-venta').value);

    if(i === "" || isNaN(c) || c <= 0) return alert("Datos de venta inválidos");
    if(db_asee[i].stock < c) return alert("Sin stock suficiente");

    db_asee[i].stock -= c;
    total_ventas_asee += (db_asee[i].precio * c);
    addLog(`Venta: ${c} unidades de ${db_asee[i].nombre}`);
    guardarYRefrescar();
    alert("Venta realizada");
}

// AUXILIARES
function guardarYRefrescar() {
    localStorage.setItem('ASEE_DATA', JSON.stringify(db_asee));
    localStorage.setItem('ASEE_VENTAS', total_ventas_asee);
    renderInventario();
}

function eliminarASEE(i) {
    if(confirm("¿Eliminar?")) {
        db_asee.splice(i, 1);
        guardarYRefrescar();
    }
}

function editarASEE(i) {
    const p = db_asee[i];
    document.getElementById('asee-name').value = p.nombre;
    document.getElementById('asee-stock').value = p.stock;
    document.getElementById('asee-price').value = p.precio;
    document.getElementById('edit-index').value = i;
    document.getElementById('btn-save').innerText = "Actualizar Datos";
    switchTab('tab-inv');
}

function searchProduct() {
    const txt = document.getElementById('search-asee').value.toLowerCase();
    const rows = document.querySelectorAll('#render-inventario tr');
    rows.forEach(r => r.style.display = r.innerText.toLowerCase().includes(txt) ? '' : 'none');
}

function addLog(msg) {
    logs_asee.unshift(`${new Date().toLocaleTimeString()} - ${msg}`);
    if(logs_asee.length > 5) logs_asee.pop();
    localStorage.setItem('ASEE_LOGS', JSON.stringify(logs_asee));
}

function renderLogs() {
    document.getElementById('history-log').innerHTML = logs_asee.map(l => `<li>${l}</li>`).join('');
}

// Inicio
renderInventario();