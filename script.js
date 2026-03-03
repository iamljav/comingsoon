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

function scramble(element, targetText) {
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

// Refined Detection Logic
const visitorTZ = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
const cityPart = visitorTZ.split('/').pop().replace(/_/g, ' ');

// Logic to create a better 3-letter code
let visitorCity = "";
const words = cityPart.split(' ');
if (words.length > 1) {
    // If "Los Angeles", take "L" and "A" -> LA
    visitorCity = words.map(w => w[0]).join('').substring(0, 3).toUpperCase();
} else {
    // If "London", take "LON"
    visitorCity = cityPart.substring(0, 3).toUpperCase();
}

const nycTZ = "America/New_York";

const visLabelEl = document.getElementById('visitor-label');
const visTimeEl = document.getElementById('visitor-time');
const nycLabelEl = document.getElementById('nyc-label');
const nycTimeEl = document.getElementById('nyc-time');

// Initial Scramble
scramble(visLabelEl, visitorCity);
scramble(visTimeEl, formatTime(visitorTZ));
scramble(nycLabelEl, "NYC");
scramble(nycTimeEl, formatTime(nycTZ));

// Update Loop
setInterval(() => {
    visTimeEl.innerText = formatTime(visitorTZ);
    nycTimeEl.innerText = formatTime(nycTZ);
}, 1000);
