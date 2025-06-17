// Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuIcone = document.getElementById('menu-icone');
    const menuLista = document.querySelector('.menu-navegacao ul');
    if (menuIcone && menuLista) {
        menuIcone.addEventListener('click', function() {
            menuLista.classList.toggle('menu-aberto');
        });
        // Fecha o menu ao clicar em um link
        menuLista.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuLista.classList.remove('menu-aberto');
            });
        });
    }
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"], a[href*="index.html#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        let targetId = href.startsWith('#') ? href : href.split('#')[1] ? '#' + href.split('#')[1] : null;
        if (targetId && document.querySelector(targetId)) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            const header = document.getElementById('main-header');
            const headerHeight = header ? header.offsetHeight : 0;
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

document.getElementById('form-whatsapp').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('wpp-nome').value.trim();
    const empresa = document.getElementById('wpp-empresa').value.trim();
    const msg = document.getElementById('wpp-msg').value.trim();
    let texto = `Olá, meu nome é ${nome}.`;
    if (empresa) texto += `\nEmpresa: ${empresa}`;
    if (msg) texto += `\n${msg}`;
    const url = `https://wa.me/5581985905864?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
});

// Efeito de esconder/mostrar a barra de menu
function ativaMenuEscondido() {
    const header = document.getElementById('main-header');
    let lastScrollTop = 0;
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 80) {
                header.classList.add('menu-escondido');
            } else {
                header.classList.remove('menu-escondido');
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }
}

// Se o header é carregado via JS, espere o carregamento:
document.addEventListener('DOMContentLoaded', function() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        // Aguarda o header ser inserido
        const observer = new MutationObserver(() => {
            if (document.getElementById('main-header')) {
                ativaMenuEscondido();
                observer.disconnect();
            }
        });
        observer.observe(headerPlaceholder, { childList: true });
    } else {
        ativaMenuEscondido();
    }
});

// Efeito folha flutuante 3D interagindo com o mouse
document.addEventListener('DOMContentLoaded', function() {
    const folha = document.getElementById('folhaFlutuante');
    if (folha) {
        folha.parentElement.addEventListener('mousemove', function(e) {
            const rect = folha.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateX = (y / rect.height) * 40; // Aumente para mais movimento
            const rotateY = -(x / rect.width) * 40;
            folha.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.04)`;
            folha.style.boxShadow = "0 28px 56px rgba(30,93,59,0.18), 0 2px 8px rgba(30,93,59,0.10)";
        });
        folha.parentElement.addEventListener('mouseleave', function() {
            folha.style.transform = "rotate(-10deg) translateY(-10px)";
            folha.style.boxShadow = "0 16px 40px rgba(30,93,59,0.15), 0 2px 8px rgba(30,93,59,0.08)";
        });
    }
});

