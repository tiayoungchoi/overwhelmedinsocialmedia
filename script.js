let popupCloseCount = 0; // Initialize the popup close counter
let lastPopupTop = 0; // Track the last popup's top position
let workNotificationInterval; // Interval for showing work notifications
let currentNotification = null; // Store the current notification to fade out

// List of events for the work notification
const workEvents = [
    '24/05/13 1:30PM Maths assignment due',
    '24/05/14 5:00PM Meeting with the tutor',
    '24/05/15 9:00AM Physics exam',
    '24/05/16 3:30PM Group study session',
    '24/05/17 10:00AM Project submission deadline',
    '24/05/18 7:00PM Dinner with classmates'
];

let eventIndex = 0; // To track the current event

// Function to create popups
function createPopup() {
    let popup = document.createElement('div');
    popup.className = 'popup';

    // Ensure equal probabilities for each ad
    let ads = ['ad1.png', 'ad2.png', 'ad3.png', 'ad4.png', 'ad5.png'];
    let randomAd = ads[Math.floor(Math.random() * ads.length)];

    let img = document.createElement('img');
    img.src = randomAd;
    img.alt = 'Advertisement Image';
    img.style.width = '200px';

    img.onload = function() {
        popup.style.width = '200px';
        popup.style.height = (img.height / img.width) * 200 + 'px';

        let phoneElement = document.querySelector('.phone');
        let phoneTop = phoneElement.offsetTop;
        let phoneHeight = phoneElement.offsetHeight;
        let headerHeight = document.querySelector('.header').offsetHeight;
        let availableSpace = phoneHeight - headerHeight;

        let randomGap = Math.random() * 50 + 20;

        let randomTop = lastPopupTop + randomGap;
        lastPopupTop = randomTop + parseFloat(popup.style.height);

        if (randomTop + parseFloat(popup.style.height) > availableSpace) {
            randomTop = availableSpace - parseFloat(popup.style.height);
        }

        let randomLeft = Math.random() * (phoneElement.offsetWidth - parseFloat(popup.style.width));

        popup.style.top = `${phoneTop + headerHeight + randomTop}px`;
        popup.style.left = `${phoneElement.offsetLeft + randomLeft}px`;
    };

    let closeButton = document.createElement('button');
    closeButton.className = 'close-btn';
    closeButton.textContent = 'X';
    closeButton.onclick = function() {
        popup.remove();
        updateScore();
    };

    popup.appendChild(img);
    popup.appendChild(closeButton);
    document.body.appendChild(popup);
}

function updateScore() {
    popupCloseCount++;
    document.getElementById('scoreboard').textContent = 'Score: ' + popupCloseCount;

    if (popupCloseCount === 3 && !workNotificationInterval) {
        startWorkNotificationInterval();
    }    
    
    if (popupCloseCount === 35) {
        showExitLink();
        setTimeout(showWorkNotification, 1000);
        clearInterval(workNotificationInterval);
    }
}

function showExitLink() {
    let exitLink = document.createElement('a');
    exitLink.href = 'exit.html';
    exitLink.textContent = 'Exit';
    exitLink.style.position = 'fixed';
    exitLink.style.top = '50%';
    exitLink.style.left = '50%';
    exitLink.style.transform = 'translate(-50%, -50%)';
    exitLink.style.backgroundColor = 'red';
    exitLink.style.color = 'white';
    exitLink.style.padding = '10px';
    exitLink.style.textDecoration = 'none';

    document.body.appendChild(exitLink);
}

function showWorkNotification() {
    if (currentNotification) {
        currentNotification.style.transition = 'opacity 2s ease-out';
        currentNotification.style.opacity = 0;

        setTimeout(() => {
            currentNotification.remove();
            currentNotification = null;
            displayNewNotification();
        }, 2000);
    } else {
        displayNewNotification();
    }
}

function displayNewNotification() {
    let notification = document.createElement('div');
    notification.className = 'work-notification';
    
    notification.textContent = workEvents[eventIndex];
    eventIndex = (eventIndex + 1) % workEvents.length;

    document.body.appendChild(notification);

    let phoneElement = document.querySelector('.phone');
    let phoneWidth = phoneElement.offsetWidth;

    notification.style.position = 'fixed';
    notification.style.top = `${document.querySelector('.header').offsetHeight + 10}px`;
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.transition = 'opacity 1s ease-in';
    notification.style.opacity = 0;

    notification.style.width = `${phoneWidth * 0.8}px`;
    notification.style.height = '60px';
    notification.style.borderRadius = '8px';
    notification.style.backgroundColor = '#f44336';
    notification.style.color = 'white';
    notification.style.fontSize = '16px';
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.justifyContent = 'center';
    notification.style.padding = '10px';

    setTimeout(() => {
        notification.style.opacity = 1;
    }, 10);

    currentNotification = notification;

    setTimeout(() => {
        notification.style.transition = 'opacity 2s ease-out';
        notification.style.opacity = 0;

        setTimeout(() => {
            notification.remove();
            currentNotification = null;
        }, 2000);
    }, 4000);
}

function startWorkNotificationInterval() {
    workNotificationInterval = setInterval(showWorkNotification, 4000);
}

let clockInterval;
let simulatedTime = 0;

function startClock() {
    clockInterval = setInterval(() => {
        simulatedTime++;
        if (simulatedTime >= 1440) simulatedTime = 0;

        let hours = Math.floor(simulatedTime / 60);
        let minutes = simulatedTime % 60;
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        document.getElementById('clock').textContent = `${hours}:${minutes} ${ampm}`;
    }, 100);
}

function startPopups() {
    setInterval(createPopup, 1000);
}

startClock();
startPopups();
