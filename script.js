// const carousel = document.querySelector(".container");
// const cards = document.querySelectorAll(".card");
// let isDragging = false;
// let startX;
// let currentX;
// let initialX;
// let activeIndex = 0;


// function animateCards() {
//   const totalCards = cards.length;

//   cards.forEach((card, i) => {
//     let offset = i - activeIndex;

//     // Wrap around using modulo
//     if (offset > totalCards / 2) offset -= totalCards;
//     if (offset < -totalCards / 2) offset += totalCards;

//     const abs = Math.abs(offset);
//     const zIndex = totalCards - abs;

//     // Perspective and positioning
//     let translateX = offset * 80;
//     let translateY = offset * -30;  // up as it goes right
//     let translateZ = abs === 0 ? 300 : -abs * 100;

//     let scale = abs === 0 ? 1 : 0.9;

//     // Add rotation to make it pop out
//     let rotateY = offset * 10;
//     let rotateX = abs * -2;

//     // Styling
//     card.style.opacity = abs < 5 ? 1 : 0; // fade out far cards
//     card.style.zIndex = zIndex;

//     card.style.transform = `
//       translateX(${translateX}px)
//       translateY(${translateY}px)
//       translateZ(${translateZ}px)
//       scale(${scale})
//       rotateY(${rotateY}deg)
//       rotateX(${rotateX}deg)
//     `;
//   });
// }


// function startDragging(e) {
//   if (e.target.closest(".card")) {
//     isDragging = true;
//     startX = e.type === "mousedown" ? e.pageX : e.touches[0].pageX;
//     currentX = startX;
//     initialX = startX;
//     document.body.style.cursor = "grabbing";
//     requestAnimationFrame(animateCards);
//   }
// }

// function drag(e) {
//   if (!isDragging) return;
//   e.preventDefault();

//   currentX = e.type === "mousemove" ? e.pageX : e.touches[0].pageX;
//   const diff = currentX - startX;

//   // Reduced threshold for smoother transitions
//   if (Math.abs(diff) > 20) {
//     if (diff > 0) {
//       activeIndex = (activeIndex + 1) % cards.length;
//       startX = currentX;
//     } else if (diff < 0) {
//       activeIndex = (activeIndex - 1 + cards.length) % cards.length;
//       startX = currentX;
//     }

//     // Add subtle haptic feedback if available
//     if (window.navigator.vibrate) {
//       window.navigator.vibrate(50);
//     }

//     requestAnimationFrame(animateCards);
//   }
// }

// function stopDragging() {
//   isDragging = false;
//   document.body.style.cursor = "";
//   requestAnimationFrame(animateCards);
// }

// carousel.addEventListener("mousedown", startDragging);
// carousel.addEventListener("mousemove", drag);
// carousel.addEventListener("mouseup", stopDragging);
// carousel.addEventListener("mouseleave", stopDragging);
// carousel.addEventListener("touchstart", startDragging);
// carousel.addEventListener("touchmove", drag);
// carousel.addEventListener("touchend", stopDragging);

// // Initialize cards
// animateCards();




// let container = document.querySelector('.container');
//     let number = 12;
//     for (let i = 0; i < number; i++) {
//     let card = document.createElement('div');
//     card.className = 'card';
//     card.textContent = `${i + 1}`;
//     let zPos = i * -120;
//     let yPos = i * -20;
//     card.style.transform = `translateZ(${zPos}px) translateY(${yPos}px)`;
//     card.style.filter = `hue-rotate(${i * 30}deg)`;
//     container.appendChild(card);
// }

let container = document.querySelector('.container');
let number = 12;
let cards = [];

// Create and push cards to array
for (let i = 0; i < number; i++) {
    let card = document.createElement('div');
    card.className = 'card';
    card.textContent = `${i + 1}`;
    container.appendChild(card);
    cards.push(card);
}

function updateCardTransforms() {
    cards.forEach((card, i) => {
        let zPos = i * -120;
        let yPos = i * -20;
        card.style.transition = 'transform 0.6s ease, filter 0.3s ease, opacity 0.3s';
        card.style.zIndex = number - i;
        card.style.filter = `hue-rotate(${i * 30}deg)`;

        // Reset styles first
        card.classList.remove("pop");

        // Set transform
        card.style.transform = `translateZ(${zPos}px) translateY(${yPos}px)`;

        // Add pop effect to the SECOND card
        if (i === 1) {
            card.classList.add("pop");
        }
    });
}

updateCardTransforms();

// Drag interaction
let startX = 0;
let isDragging = false;

container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});

document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    let endX = e.clientX;

    if (endX < startX) {
        let firstCard = cards[0];
        firstCard.style.transform += ' translateZ(200px)';
        firstCard.style.opacity = '0.5';

        setTimeout(() => {
            firstCard.style.opacity = '1';
            cards.shift();
            cards.push(firstCard);
            updateCardTransforms();
        }, 300);
    } else if (endX > startX) {
        let lastCard = cards[cards.length - 1];
        lastCard.style.transform = `translateZ(200px) translateY(-20px)`;
        lastCard.style.opacity = '0.5';

        setTimeout(() => {
            lastCard.style.opacity = '1';
            cards.pop();
            cards.unshift(lastCard);
            updateCardTransforms();
        }, 300);
    }
});

