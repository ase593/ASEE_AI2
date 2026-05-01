document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const u = document.getElementById('user-asee').value;
    const p = document.getElementById('pass-asee').value;

    if(u === "admin" && p === "asee2026") {
        document.getElementById('asee-login-screen').style.display = 'none';
        document.getElementById('app-asee').style.display = 'flex';
        sessionStorage.setItem('asee_session', 'active');
    } else {
        alert("Acceso denegado.");
    }
});

function logoutASEE() {
    sessionStorage.removeItem('asee_session');
    location.reload();
}

if(sessionStorage.getItem('asee_session') === 'active') {
    document.getElementById('asee-login-screen').style.display = 'none';
    document.getElementById('app-asee').style.display = 'flex';
}