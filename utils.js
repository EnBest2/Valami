// Touch események kezelése
function setupTouchEvents() {
    const mindmap = document.getElementById('mindmap-canvas');
    let startX, startY;
    let isDragging = false;

    mindmap.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        isDragging = false;
    }, { passive: true });

    mindmap.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            const touch = e.touches[0];
            const dx = touch.clientX - startX;
            const dy = touch.clientY - startY;
            // Pánikolás logika
            updatePan(dx, dy);
            startX = touch.clientX;
            startY = touch.clientY;
        }
    }, { passive: true });

    mindmap.addEventListener('touchend', (e) => {
        if (!isDragging && e.changedTouches.length === 1) {
            const touch = e.changedTouches[0];
            handleNodeTap(touch.clientX, touch.clientY);
        }
    }, { passive: true });
}

// Dupla koppintás zoom
function setupDoubleTapZoom() {
    let lastTap = 0;
    const mindmap = document.getElementById('mindmap-canvas');
    
    mindmap.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 300 && tapLength > 0) {
            // Dupla koppintás
            const touch = e.changedTouches[0];
            zoomToPoint(touch.clientX, touch.clientY);
            e.preventDefault();
        }
        
        lastTap = currentTime;
    }, { passive: false });
}

// iOS specifikus beállítások
function setupIOSFeatures() {
    // Teljes képernyős mód
    if (window.navigator.standalone) {
        document.documentElement.style.setProperty('--status-bar-height', '0px');
    } else {
        document.documentElement.style.setProperty('--status-bar-height', '20px');
    }
    
    // Safari 100vh hack
    document.documentElement.style.setProperty('--app-height', window.innerHeight + 'px');
    window.addEventListener('resize', () => {
        document.documentElement.style.setProperty('--app-height', window.innerHeight + 'px');
    });
}
