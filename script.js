// Animações de scroll
document.addEventListener('DOMContentLoaded', function() {
    // Efeito de revelação ao fazer scroll
    const revealElements = document.querySelectorAll('.card, .conclusion-box, .risk-category');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Executar na carga
});

// Suavizar cliques em links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#home') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Efeito de parallax nas partículas do hero
window.addEventListener('mousemove', function(e) {
    const particles = document.getElementById('particles');
    if (particles) {
        const xValue = e.clientX / window.innerWidth;
        const yValue = e.clientY / window.innerHeight;
        particles.style.transform = `translate(${xValue * 10}px, ${yValue * 10}px)`;
    }
});

// Fazer navbar responsive
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

// Esconder menu ao fazer scroll para baixo
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop + 100) {
        // Scroll para baixo
        navbar.style.transform = 'translateY(-100%)';
        navbar.style.transition = 'transform 0.3s ease';
    } else if (currentScroll < lastScrollTop - 50) {
        // Scroll para cima
        navbar.style.transform = 'translateY(0)';
        navbar.style.transition = 'transform 0.3s ease';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Destacar seção ativa na navegação
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Efeito de digitação para o título hero (opcional)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Ativar animações customizadas
document.addEventListener('DOMContentLoaded', function() {
    // Animar cards ao carregar
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Função para criar um efeito de ondulação ao clicarem em botões
document.querySelectorAll('.cta-button, .card').forEach(element => {
    element.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Detectar prefers-reduced-motion para acessibilidade
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
    document.documentElement.style.scrollBehavior = 'auto';
    const style = document.createElement('style');
    style.textContent = `
        * {
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Funções do Mini Audio Player
function toggleAudioMenu() {
    const audioMenu = document.getElementById('audioMenu');
    const audioPlayer = document.getElementById('audioPlayerCompact');
    
    audioMenu.classList.toggle('show');
    
    // Se abriu o menu, fecha o player
    if (audioMenu.classList.contains('show')) {
        audioPlayer.classList.remove('show');
    }
}

function closeAudioMenu() {
    const audioMenu = document.getElementById('audioMenu');
    audioMenu.classList.remove('show');
}

function playAudio(audioFile, audioTitle) {
    const audioElement = document.getElementById('audioElement');
    const playerTitle = document.querySelector('.player-title');
    const audioMenu = document.getElementById('audioMenu');
    const audioPlayer = document.getElementById('audioPlayerCompact');
    
    // Fechar o menu de áudios
    audioMenu.classList.remove('show');
    
    // Definir o arquivo e título
    audioElement.src = audioFile;
    playerTitle.textContent = audioTitle;
    
    // Mostrar o player compacto
    audioPlayer.classList.add('show');
    
    // Reproduzir o áudio
    audioElement.play();
}

function stopAudio() {
    const audioElement = document.getElementById('audioElement');
    const audioPlayer = document.getElementById('audioPlayerCompact');
    
    audioElement.pause();
    audioElement.currentTime = 0;
    audioPlayer.classList.remove('show');
}

function closeAudioPlayer() {
    stopAudio();
}

// Event listeners para o mini audio player
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleAudioMenu');
    const closeMenuBtn = document.querySelector('.audio-menu-close');
    const audioMenuItems = document.querySelectorAll('.audio-menu-item');
    const closePlayerBtn = document.querySelector('.player-close-compact');
    const audioElement = document.getElementById('audioElement');
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleAudioMenu);
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeAudioMenu);
    }
    
    audioMenuItems.forEach(item => {
        item.addEventListener('click', function() {
            const audioFile = this.getAttribute('data-audio');
            const audioTitle = this.getAttribute('data-title');
            playAudio(audioFile, audioTitle);
        });
    });
    
    if (closePlayerBtn) {
        closePlayerBtn.addEventListener('click', closeAudioPlayer);
    }
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const audioMenu = document.getElementById('audioMenu');
        const toggleBtn = document.getElementById('toggleAudioMenu');
        const miniAudioPlayer = document.getElementById('miniAudioPlayer');
        
        if (miniAudioPlayer && !miniAudioPlayer.contains(event.target)) {
            audioMenu.classList.remove('show');
        }
    });
    
    // Fechar player ao pressionar ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAudioMenu();
            closeAudioPlayer();
            closeDocumentModal();
        }
    });
});

// Funções para Modais de Documentos
const documentContent = {
    sistema: {
        title: 'O Sistema Mundial Sem Fio (World Wireless System) de Nikola Tesla',
        content: `
            <h1>O Sistema Mundial Sem Fio (World Wireless System) de Nikola Tesla</h1>
            
            <p>O <strong>Sistema Mundial Sem Fio</strong> (<em>World Wireless System</em>) concebido por Nikola Tesla foi idealizado como uma infraestrutura global para a transmissão instantânea de informações e energia industrial sem a necessidade de fios. Diferente dos sistemas de rádio modernos, que utilizam radiação eletromagnética, a proposta de Tesla baseava-se na <strong>condução elétrica através do meio natural</strong>.</p>
            
            <p>Os princípios físicos fundamentais que sustentavam essa visão são apresentados a seguir.</p>
            
            <h2>1. A Terra como um Condutor Esférico</h2>
            
            <p>Tesla acreditava que o planeta Terra não era apenas um suporte físico, mas um vasto <strong>condutor esférico isolado no espaço</strong>. Em vez de enviar ondas pelo ar, como luz ou rádio (ondas transversais ou hertzianas), ele planejava <strong>injetar correntes elétricas diretamente na crosta terrestre</strong> para excitar a carga elétrica do planeta.</p>
            
            <p>Segundo suas teorias, a resistência interna da Terra para essas correntes seria inferior a <strong>1 Ohm</strong>, permitindo o transporte de energia com perdas mínimas em escala planetária.</p>
            
            <h2>2. Ondas Estacionárias Terrestres</h2>
            
            <p>O sistema operaria por meio da criação de <strong>ondas elétricas estacionárias</strong>. Ao injetar impulsos elétricos na frequência de ressonância da Terra, as ondas viajariam até o antípoda (o ponto diametralmente oposto no globo), seriam refletidas e retornariam à fonte.</p>
            
            <p>Esse fenômeno criaria padrões fixos de interferência, com regiões de máximos e mínimos elétricos (<em>ventres</em> e <em>nodos</em>), que poderiam ser calculados matematicamente e localizados em qualquer ponto do planeta para extração de energia.</p>
            
            <h2>3. A Atmosfera Superior como Caminho de Retorno</h2>
            
            <p>Para fechar o circuito elétrico, Tesla planejava utilizar a <strong>ionosfera ou a atmosfera superior rarefeita</strong> como um caminho condutivo de retorno. Ele enxergava a Terra e a ionosfera como as duas placas de um <strong>capacitor gigantesco de dimensões planetárias</strong>.</p>
            
            <p>Para isso, pretendia romper a rigidez dielétrica do ar utilizando torres de altíssima voltagem, criando <strong>canais de plasma condutivos</strong> capazes de alcançar essas camadas superiores da atmosfera.</p>
            
            <h2>4. Ondas Longitudinais de Compressão</h2>
            
            <p>Tesla rejeitava o uso de ondas transversais convencionais (rádio e micro-ondas) para transmissão de energia, pois elas se dissipam no espaço conforme a <strong>lei do inverso do quadrado</strong>.</p>
            
            <p>Em seu lugar, propunha o uso de <strong>ondas longitudinais de compressão</strong>, semelhantes a ondas sonoras de pressão, que ele chamava de <em>vibrations</em> ou <em>compressional waves</em>. Para Tesla, o verdadeiro sistema sem fio consistia em <strong>pulsar o meio elástico da Terra e da atmosfera</strong>, e não irradiar energia livremente para o vácuo.</p>
            
            <h2>5. Ressonância e Individualização</h2>
            
            <p>A transmissão e extração de energia e informação dependeriam da <strong>sintonia ressonante</strong>. Apenas receptores ajustados exatamente à mesma frequência do transmissor seriam capazes de captar o sinal, conceito que Tesla chamava de <strong>"Arte da Individualização"</strong>.</p>
            
            <p>Esse princípio permitiria múltiplos canais de comunicação operando simultaneamente sem interferência mútua, funcionando como <strong>vibradores elétricos privados</strong> sintonizados de forma independente.</p>
            
            <h2>Tecnologias-Chave</h2>
            
            <p>Para materializar esses princípios, Tesla desenvolveu dois dispositivos centrais:</p>
            
            <ul>
                <li><strong>Bobina de Tesla (Transformador Ressonante):</strong> utilizada para gerar as altas frequências e tensões necessárias.</li>
                <li><strong>Transmissor Magnificador (TMT):</strong> uma versão avançada do transformador, projetada especificamente para "agarrar a Terra" e fazê-la vibrar eletricamente.</li>
            </ul>
            
            <h2>Metáfora Explicativa</h2>
            
            <p>Para explicar o conceito, Tesla utilizava a metáfora de uma <strong>bolsa de borracha cheia de água</strong>: se a pressão for alternada ritmicamente em uma extremidade, toda a bolsa se expandirá e se contrairá simultaneamente. Qualquer pessoa tocando a bolsa em outro ponto sentiria essa vibração e poderia utilizar essa força para realizar trabalho.</p>
        `
    },
    riscos: {
        title: 'Impactos Ambientais e Riscos da Eletricidade sem Fio',
        content: `
            <h1>Impactos Ambientais e Riscos da Eletricidade sem Fio</h1>
            
            <p>A implementação da eletricidade sem fio, tanto nos moldes visionários de Nikola Tesla quanto nas tecnologias modernas de <strong>Transferência de Energia Sem Fio (WPT)</strong>, traria impactos ambientais significativos e diversos riscos de segurança. De acordo com as fontes, esses efeitos variam desde a redução de resíduos tóxicos até perigos biológicos e interferências tecnológicas.</p>
            
            <h2>Riscos de Segurança e Saúde Humana</h2>
            
            <p>Os principais riscos de segurança identificados incluem:</p>
            
            <ul>
                <li><strong>Exposição a Campos Eletromagnéticos (EMF):</strong> A preocupação central é o impacto biológico de preencher a atmosfera com altos potenciais elétricos. A exposição a campos de alta intensidade pode causar fadiga, dores de cabeça, distúrbios de sono e interferir em mecanismos celulares e nervosos.</li>
                <li><strong>Objetos Metálicos Energizados:</strong> Em sistemas de grande escala, qualquer objeto metálico (como escadas, carros, bicicletas ou corrimãos) que se assemelhe a uma antena poderia captar energia e se tornar tão perigoso quanto um fio desencapado, criando armadilhas fatais em ambientes urbanos.</li>
            </ul>
            
            <h3>Perigos Específicos por Tecnologia</h3>
            
            <ul>
                <li><strong>Micro-ondas:</strong> Radiação de micro-ondas em alta frequência é extremamente prejudicial a organismos vivos.</li>
                <li><strong>Lasers:</strong> Feixes de laser usados para transmissão de energia podem causar cegueira imediata ou queimaduras se seres vivos cruzarem o caminho do feixe.</li>
                <li><strong>Acoplamento Capacitivo:</strong> O uso de tensões muito elevadas pode gerar ozônio nocivo à saúde.</li>
            </ul>
            
            <p><strong>Interferência Tecnológica:</strong> A eletricidade sem fio em larga escala poderia gerar um ruído eletromagnético massivo, capaz de bloquear sinais de rádio, GPS, Wi-Fi e telefonia móvel, tornando as comunicações sem fio atuais impraticáveis.</p>
            
            <h2>Impactos Ambientais</h2>
            
            <p>A eletricidade sem fio apresenta uma dualidade entre benefícios e danos potenciais ao meio ambiente:</p>
            
            <ul>
                <li><strong>Redução de Resíduos Tóxicos:</strong> Um dos principais benefícios seria a diminuição significativa da dependência de baterias, reduzindo o descarte de aproximadamente 6 bilhões de unidades por ano, uma das maiores fontes de contaminação do solo e dos lençóis freáticos.</li>
                <li><strong>Eliminação de Infraestrutura Física:</strong> O sistema poderia dispensar milhares de quilômetros de linhas de transmissão metálicas e a necessidade de medidores elétricos individuais.</li>
                <li><strong>Reações Atmosféricas:</strong> Em transmissões de altíssima voltagem, como as propostas por Tesla, a energia dissipada no ar poderia aquecer a atmosfera a ponto de incendiar o nitrogênio na presença de oxigênio, alterando as cores do céu e simulando auroras boreais artificiais.</li>
                <li><strong>Impacto na Fauna:</strong> Campos magnéticos fortes e onipresentes poderiam causar efeitos imprevisíveis no comportamento e na saúde de animais.</li>
            </ul>
            
            <h2>Mitigações e Tecnologias Modernas</h2>
            
            <p>Sistemas contemporâneos buscam mitigar esses riscos abandonando a transmissão onidirecional em favor de feixes direcionados. Tecnologias modernas utilizam mecanismos de segurança, como <strong>cortinas de desligamento automático</strong>, que interrompem instantaneamente a transmissão caso um pássaro, pessoa ou objeto atravesse o feixe de energia.</p>
            
            <p>Além disso, o <strong>acoplamento magnético ressonante de curto alcance</strong> é considerado seguro, pois interage de forma fraca com objetos não ressonantes, como o corpo humano.</p>
            
            <h2>Analogia Explicativa</h2>
            
            <p>Para compreender os riscos da eletricidade sem fio em larga escala, pode-se usar a metáfora de um forno de micro-ondas aberto: enquanto a energia contida é extremamente útil, sua dispersão descontrolada no ambiente transformaria o espaço de convivência em um local onde tanto a biologia quanto a eletrônica sensível seriam constantemente aquecidas, danificadas ou inutilizadas.</p>
        `
    }
};

function openDocumentModal(docType) {
    const modalId = docType === 'sistema' ? 'sistemaModal' : 'riscosModal';
    const contentId = docType === 'sistema' ? 'sistemaContent' : 'riscosContent';
    
    const modal = document.getElementById(modalId);
    const contentDiv = document.getElementById(contentId);
    
    contentDiv.innerHTML = documentContent[docType].content;
    modal.classList.add('show');
    
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
}

function closeDocumentModal() {
    const modals = document.querySelectorAll('.document-modal');
    modals.forEach(modal => modal.classList.remove('show'));
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.document-modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            closeDocumentModal();
        }
    });
});
