const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:/";

function formatTime(timeZone) {
    return new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: timeZone
    });
}

function scramble(element, targetText, duration = 1000) {
    let iteration = 0;
    const interval = setInterval(() => {
        element.innerText = targetText
            .split("")
            .map((char, index) => {
                if (index < iteration) return targetText[index];
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        if (iteration >= targetText.length) clearInterval(interval);
        iteration += 1 / 3;
    }, 30);
}

// Initialize Clocks
const visitorTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
const visitorCity = visitorTZ.split('/').pop().replace('_', ' ').substring(0, 3).toUpperCase();

const nycTimeEl = document.getElementById('nyc-time');
const visTimeEl = document.getElementById('visitor-time');
const visLabelEl = document.getElementById('visitor-label');

// Set labels
visLabelEl.innerText = visitorCity;

// Start Scramble on Load
scramble(visLabelEl, visitorCity);
scramble(visTimeEl, formatTime(visitorTZ));

// Update Loop
setInterval(() => {
    nycTimeEl.innerText = formatTime('America/New_York');
    visTimeEl.innerText = formatTime(visitorTZ);
}, 1000);
