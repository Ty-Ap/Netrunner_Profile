const introLine = document.getElementById("introLine");
const introCursor = document.getElementById("introCursor");
const breachMessage = document.getElementById("breachMessage");
const resumeContent = document.getElementById("resumeContent");

const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}<>?";
let targetLength = 240;


function runIntro() {
    let ticks = 0;

    let interval = setInterval(() => {
        let scramble = "";
        for (let i = 0; i < targetLength; i++) {
            scramble += charset[Math.floor(Math.random() * charset.length)];
        }
        introLine.textContent = "> " + scramble;

        ticks++;
        if (ticks > 27) {
            clearInterval(interval);
            showBreach();
        }
    }, 80);
}

/* STEP 2 — SYSTEM BREACHED (lasting longer) */
function showBreach() {
    introCursor.style.display = "none";
    introLine.style.display = "none";

    breachMessage.style.display = "block";

    setTimeout(() => {
        breachMessage.style.display = "none";
        document.getElementById("terminalIntro").style.display = "none";
        revealResume();
    }, 2000);  // was 1500ms, now 4 seconds
}

function typeLine(element, text, callback) {
    let i = 0;
    let interval = setInterval(() => {
        element.textContent = text.substring(0, i);
        i++;
        if (i > text.length) {
            clearInterval(interval);
            callback();
        }
    }, 35);
}

/* SEQUENTIAL REVEAL OF SECTIONS, 3 SECONDS APART */
function revealResume() {
    resumeContent.style.display = "block";

    const headers = document.querySelectorAll(".typed-header");
    let index = 0;

    function nextHeader() {
        if (index >= headers.length) return;

        const h = headers[index];
        const content = h.nextElementSibling;

        typeLine(h, "$ " + h.dataset.command, () => {
            content.style.display = "block";
            index++;

            setTimeout(nextHeader, 3000); // 3 seconds between sections
        });
    }

    nextHeader();
}

runIntro();
