// Floating hearts background
const heartsBg = document.getElementById('heartsBg');
const heartEmojis = ['\u{1F495}', '\u{1F496}', '\u{1F497}', '\u{1F498}', '\u{1F49D}', '\u2764\uFE0F'];

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (15 + Math.random() * 20) + 'px';
    heart.style.animationDuration = (6 + Math.random() * 8) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    heartsBg.appendChild(heart);
    setTimeout(() => heart.remove(), 16000);
}

setInterval(createFloatingHeart, 600);
for (let i = 0; i < 8; i++) setTimeout(createFloatingHeart, i * 200);

// Helper: get bounding rect of Yes button relative to viewport
function getYesRect(yesBtn) {
    return yesBtn.getBoundingClientRect();
}

// Helper: check if two rects overlap
function rectsOverlap(r1, r2) {
    return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
}

// Dodge logic that avoids overlapping the Yes button
function dodgeButton(noBtn, yesBtn) {
    const padding = 20;
    const buffer = 40; // extra margin so No never lands near Yes
    const noW = noBtn.offsetWidth;
    const noH = noBtn.offsetHeight;
    const maxX = window.innerWidth - noW - padding;
    const maxY = window.innerHeight - noH - padding;
    const yesRect = getYesRect(yesBtn);
    const safeZone = {
        left: yesRect.left - buffer,
        right: yesRect.right + buffer,
        top: yesRect.top - buffer,
        bottom: yesRect.bottom + buffer,
    };

    let newX, newY, attempts = 0;
    do {
        newX = padding + Math.random() * (maxX - padding);
        newY = padding + Math.random() * (maxY - padding);
        attempts++;
    } while (
        rectsOverlap(
            { left: newX, right: newX + noW, top: newY, bottom: newY + noH },
            safeZone
        ) && attempts < 50
    );

    noBtn.style.position = 'fixed';
    noBtn.style.left = newX + 'px';
    noBtn.style.top = newY + 'px';
}

// --- Page 1: Potito King question ---
const btnNo1 = document.getElementById('btnNo1');
const btnYes1 = document.getElementById('btnYes1');
const questionPage = document.getElementById('questionPage');
const talentPage = document.getElementById('talentPage');

function dodge1() { dodgeButton(btnNo1, btnYes1); }

btnNo1.addEventListener('mouseenter', dodge1);
btnNo1.addEventListener('touchstart', (e) => { e.preventDefault(); dodge1(); });
btnNo1.addEventListener('click', (e) => { e.preventDefault(); dodge1(); });

btnYes1.addEventListener('click', () => {
    questionPage.classList.add('hidden');
    talentPage.classList.remove('hidden');
});

// --- Page 2: Talents question ---
const btnNo2 = document.getElementById('btnNo2');
const btnYes2 = document.getElementById('btnYes2');
const celebrationPage = document.getElementById('celebrationPage');

function dodge2() { dodgeButton(btnNo2, btnYes2); }

btnNo2.addEventListener('mouseenter', dodge2);
btnNo2.addEventListener('touchstart', (e) => { e.preventDefault(); dodge2(); });
btnNo2.addEventListener('click', (e) => { e.preventDefault(); dodge2(); });

btnYes2.addEventListener('click', () => {
    talentPage.classList.add('hidden');
    celebrationPage.classList.add('active');
    launchConfetti();
    burstHearts();
});

// --- Celebration effects ---
function launchConfetti() {
    const colors = ['#ff6b8a', '#ff2d6b', '#ffb8cb', '#ff85a2', '#ffd4e0', '#ff4081', '#e91e63', '#fff'];
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.width = (6 + Math.random() * 8) + 'px';
            confetti.style.height = (6 + Math.random() * 8) + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

function burstHearts() {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'burst-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        const angle = (Math.PI * 2 * i) / 15;
        const dist = 100 + Math.random() * 200;
        heart.style.left = cx + 'px';
        heart.style.top = cy + 'px';
        heart.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
        heart.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1500);
    }
}
