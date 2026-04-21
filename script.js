// === 1. LocalStorage: Системна інформація ===
window.addEventListener('load', () => {
    const info = `Браузер: ${navigator.userAgent} | Платформа: ${navigator.platform}`;
    localStorage.setItem('browser_info', info);
    document.getElementById('system-info').innerText = "Системні дані: " + localStorage.getItem('browser_info');
});

// === 2. Запит на сервер (Fetch API) ===
async function getReviews() {
    const container = document.getElementById('reviews-container');
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/5/comments`);
        const data = await response.json();
        container.innerHTML = data.slice(0, 3).map(item => `
            <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                <strong style="font-size: 12px;">${item.email}</strong>
                <p style="font-style: italic; margin-top: 5px;">"${item.body}"</p>
            </div>
        `).join('');
    } catch (error) {
        container.innerText = "Помилка завантаження.";
    }
}
getReviews();

// === 3. Модальне вікно (Timer) ===
const modal = document.getElementById('modal-overlay');
const closeBtn = document.getElementById('close-modal');

setTimeout(() => {
    if (!sessionStorage.getItem('modal_was_closed')) {
        modal.style.display = 'flex';
    }
}, 1);

closeBtn.onclick = () => {
    modal.style.display = 'none';
    sessionStorage.setItem('modal_was_closed', 'true');
};

// === 4. Розумний перемикач теми (Пункт 4) ===
const themeBtn = document.getElementById('theme-toggle-btn');


themeBtn.onclick = () => {
    document.body.classList.toggle('dark-mode');

    // Змінюємо текст на кнопці залежно від режиму
    if (document.body.classList.contains('dark-mode')) {
        themeBtn.innerText = "Денний режим";
    } else {
        themeBtn.innerText = "Нічний режим";
    }
};


function applyAutoTheme() {
    const hours = new Date().getHours();
   
    if (hours < 7 || hours >= 21) {
        document.body.classList.add('dark-mode');
        themeBtn.innerText = "Денний режим";
    }
}
applyAutoTheme();