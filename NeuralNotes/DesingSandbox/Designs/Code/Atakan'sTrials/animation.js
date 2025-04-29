// Animation Constants
const ANIMATION_DURATION = 300;
const EASING = 'cubic-bezier(0.4, 0, 0.2, 1)';

// Animation Functions
function animateSidebarToggle() {
    const sidebar = document.querySelector('.sidebar');

    sidebar.classList.toggle('collapsed');
    if (sidebar.classList.contains('collapsed')) {
        sidebar.style.transform = 'translateX(-100%)';
    } else {
        sidebar.style.transform = 'translateX(0)';
    }
}

function animateAiPanelToggle() {
    const aiPanel = document.querySelector('.ai-panel');
    const mainContent = document.querySelector('.main-content');

    aiPanel.style.transition = `transform ${ANIMATION_DURATION}ms ${EASING}`;
    mainContent.style.transition = `margin-right ${ANIMATION_DURATION}ms ${EASING}`;

    if (aiPanel.classList.contains('active')) {
        aiPanel.style.transform = 'translateX(0)';
        mainContent.style.marginRight = '300px';
    } else {
        aiPanel.style.transform = 'translateX(100%)';
        mainContent.style.marginRight = '0';
    }
}

function animateNoteCreation(noteElement) {
    noteElement.style.opacity = '0';
    noteElement.style.transform = 'translateY(20px)';

    requestAnimationFrame(() => {
        noteElement.style.transition = `all ${ANIMATION_DURATION}ms ${EASING}`;
        noteElement.style.opacity = '1';
        noteElement.style.transform = 'translateY(0)';
    });
}

function animateNoteDeletion(noteElement, callback) {
    noteElement.style.transition = `all ${ANIMATION_DURATION}ms ${EASING}`;
    noteElement.style.opacity = '0';
    noteElement.style.transform = 'translateX(-100%)';

    setTimeout(() => {
        callback();
    }, ANIMATION_DURATION);
}

function animateMessageAppearance(messageElement) {
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(10px)';

    requestAnimationFrame(() => {
        messageElement.style.transition = `all ${ANIMATION_DURATION}ms ${EASING}`;
        messageElement.style.opacity = '1';
        messageElement.style.transform = 'translateY(0)';
    });
}

// Responsive Animation Handlers
function handleResponsiveAnimations() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
        sidebar.style.transform = 'translateX(-100%)';
    } else {
        sidebar.classList.remove('collapsed');
        sidebar.style.transform = 'translateX(0)';
    }
}

// Event Listeners
window.addEventListener('resize', handleResponsiveAnimations);
window.addEventListener('load', handleResponsiveAnimations);

// Sidebar açma/kapama butonları yönetimi
window.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    const openBtn = document.getElementById('openSidebarBtn');
    const closeBtn = document.querySelector('.close-sidebar-btn');
    const mainContent = document.querySelector('.main-content');

    function updateSidebarButtons() {
        if (sidebar.classList.contains('collapsed')) {
            openBtn.style.display = 'block';
            closeBtn.style.display = 'none';
        } else {
            openBtn.style.display = 'none';
            closeBtn.style.display = 'block';
        }
    }

    if (openBtn) {
        openBtn.addEventListener('click', function() {
            sidebar.classList.remove('collapsed');
            sidebar.style.transform = 'translateX(0)';
            updateSidebarButtons();
        });
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            sidebar.classList.add('collapsed');
            sidebar.style.transform = 'translateX(-100%)';
            updateSidebarButtons();
        });
    }

    // Butonları ilk yüklemede ve sidebar animasyonunda güncelle
    updateSidebarButtons();
    window.animations._originalSidebarToggle = window.animations.animateSidebarToggle;
    window.animations.animateSidebarToggle = function() {
        window.animations._originalSidebarToggle();
        updateSidebarButtons();
    };
});

// Export animation functions
window.animations = {
    animateSidebarToggle,
    animateAiPanelToggle,
    animateNoteCreation,
    animateNoteDeletion,
    animateMessageAppearance
};