 document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("reloadOverlay");

    // Disable scroll while overlay is showing
    document.body.style.overflow = "hidden";

    // Small delay for nice effect
    setTimeout(() => {
      overlay.classList.add("fade-out");

      // Re-enable scroll after transition
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 800); // match transition time
    }, 1500); // how long overlay stays before fading
  });

// Reload animation end

//hover nav links

 //active animation link
// Active animation link
document.addEventListener("DOMContentLoaded", () => {
  // Only get nav links that actually point to a section (start with # and not just '#')
  const navLinks = Array.from(document.querySelectorAll('.navbar-nav .nav-link'))
    .filter(link => link.getAttribute('href').startsWith('#') && link.getAttribute('href') !== '#');

  // Map to actual section elements
  const sections = navLinks.map(link => {
    const id = link.getAttribute('href').slice(1);
    return document.getElementById(id);
  }).filter(Boolean); // remove nulls

  function activateOnScroll() {
    const scrollPos = window.scrollY + window.innerHeight / 3;

    // Special case: if near the top, make Home active
    if (window.scrollY < 100) {
      navLinks.forEach(link => link.classList.remove('active'));
      const homeLink = document.querySelector('.navbar-nav .nav-link[href="#home"]');
      if (homeLink) homeLink.classList.add('active');
      return;
    }

    sections.forEach((section, idx) => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        navLinks.forEach(l => l.classList.remove('active'));
        navLinks[idx].classList.add('active');
      }
    });
  }

  window.addEventListener("scroll", activateOnScroll);
  window.addEventListener("load", activateOnScroll);
});

// end nav links

//smooth scroll animation
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.getElementById('NavBar');
    const navbar = document.querySelector('.navbar');

    // Smooth scroll
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 70, // adjust if you have a fixed navbar height
        behavior: 'smooth'
      });
    }

    // Close mobile menu
    if (navbarCollapse.classList.contains('show')) {
      new bootstrap.Collapse(navbarCollapse).hide();
      navbarToggler.classList.remove('active');
      navbar.classList.remove('nav-bg');
    }
  });
});

//hover nav links end 

// animated text
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["UI/UX DESIGNER", "MOTION GRAPHICS DESIGNER", "LOGO DESIGNER", "PHOTO MANIPULATION"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// text dissapeared hero sec 
  window.addEventListener('scroll', function () {
    const heroContent = document.getElementById('heroContent');
    const scrollY = window.scrollY;

    if (scrollY > 500) {
      heroContent.classList.add('removed');
    } else {
      heroContent.classList.remove('removed');
    }
  });
// background raining hero sec

const canvas = document.getElementById("universe");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let stars = [];
let planets = [];

class Star {
  constructor(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
  }
  draw() {
    ctx.fillStyle = "#ff0066";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#4CAF50";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  update(scrollY) {
    this.y += this.speed + scrollY * 0.002; // scroll makes stars drift
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * canvas.width;
    }
    this.draw();
  }
}

class Planet {
  constructor(radius, size, speed, color) {
    this.radius = radius;
    this.size = size;
    this.speed = speed;
    this.color = color;
    this.angle = Math.random() * Math.PI * 2;
  }
  draw() {
    let x = canvas.width / 2 + Math.cos(this.angle) * this.radius;
    let y = canvas.height / 2 + Math.sin(this.angle) * this.radius;

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;
    ctx.arc(x, y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  update(scrollY) {
    this.angle += this.speed + scrollY * 0.00000001; // scroll influences orbit speed
    this.draw();
  }
}

// Init stars + planets
function init() {
  stars = [];
  planets = [];

  for (let i = 0; i < 150; i++) {
    stars.push(new Star(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, Math.random() * 0.5 + 0.2));
  }

  planets.push(new Planet(80, 8, 0.01, "#ffcc00"));  // yellow
  planets.push(new Planet(150, 12, 0.008, "#4CAF50")); // teal
  planets.push(new Planet(220, 6, 0.006, "#ff0066"));  // pink
}
init();

let scrollY = 0;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

// Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => star.update(scrollY));
  planets.forEach(planet => planet.update(scrollY));

  requestAnimationFrame(animate);
}
animate();

// Prevent browser from remembering scroll position
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Smooth transition back to hero on refresh/load
window.addEventListener('load', function () {
  setTimeout(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // reset after scroll so other instant jumps aren't forced smooth
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = "";
    }, 1000);
  }, 100);
});
// Navbar scroll effects
window.addEventListener('scroll', function () {
  const heroContent = document.getElementById('heroContent');
  const navbar = document.querySelector('.navbar');
  const scrollY = window.scrollY;

  if (scrollY > 800) {
    heroContent.classList.add('removed');
  } else {
    heroContent.classList.remove('removed');
  }

  // Navbar shrink effect + background
  if (scrollY > 100) {
    navbar.classList.add('shrink', 'shadow');
  } else {
    navbar.classList.remove('shrink', 'shadow');
  }
});

// Close mobile navbar on link click
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.getElementById('NavBar');
    const navbar = document.querySelector('.navbar');

    if (navbarCollapse.classList.contains('show')) {
      new bootstrap.Collapse(navbarCollapse).hide();
      navbarToggler.classList.remove('active');
      navbar.classList.remove('nav-bg'); // remove background when closed
    }
  });
});

// Toggle hamburger animation + background
const toggler = document.getElementById('NavBar');
const navbarCollapse = document.querySelector('.navbar-collapse');
const navbar = document.querySelector('.navbar');

toggler.addEventListener('click', function () {
  this.classList.toggle('active');
  navbar.classList.toggle('nav-bg'); // ✅ add/remove bg on toggle
});

// Reset hamburger when Bootstrap collapse hides
navbarCollapse.addEventListener('hidden.bs.collapse', () => {
  toggler.classList.remove('active');
  navbar.classList.remove('nav-bg'); // remove bg when closed
});


// navbar end


// Count-up function
function animateCounter(counter) {
  const target = +counter.getAttribute("data-target");
  const speed = 150; // lower = faster
  let count = 0;

  function updateCounter() {
    const increment = target / speed;
    count += increment;

    if (count < target) {
      counter.innerText = Math.ceil(count);
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target;
    }
  }

  updateCounter();
}

// Trigger animation on scroll
const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const counter = entry.target;

    if (entry.isIntersecting) {
      // Start counting up
      animateCounter(counter);
    } else {
      // Reset to 0 when out of view
      counter.innerText = '0';
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => {
  observer.observe(counter);
});


// for page animation 
  AOS.init({
     
    once: false // set to true if you want the animation only once
  });


  //carousel projects 

  document.addEventListener("DOMContentLoaded", function () {
  let itemsPerSlide = window.innerWidth < 720 ? 1 : 3;
  let currentIndex = 0;
  const carouselInner = document.getElementById("carouselInner");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  function getVisibleItems(){
    return Array.from(document.querySelectorAll(".multi-carousel-item")).filter(i=>i.style.display!=="none");
  }
  function updateConfig(){ itemsPerSlide = window.innerWidth < 720 ? 1 : 3; }
  function updateCarousel(){
    const offset = (currentIndex * -100) / itemsPerSlide;
    carouselInner.style.transform = `translateX(${offset}%)`;
    document.querySelectorAll(".multi-carousel-item").forEach((item,i)=>{
      item.classList.toggle("", i >= currentIndex && i < currentIndex+itemsPerSlide);
    });
  }

  function next(){
    const visibleItems = getVisibleItems();
    const totalItems = visibleItems.length;
    currentIndex++;
    if(currentIndex > totalItems - itemsPerSlide){ currentIndex = 0; } // loop
    updateCarousel();
  }
  function prev(){
    const visibleItems = getVisibleItems();
    const totalItems = visibleItems.length;
    currentIndex--;
    if(currentIndex < 0){ currentIndex = totalItems - itemsPerSlide; } // loop back
    updateCarousel();
  }

  prevBtn.addEventListener("click", prev);
  nextBtn.addEventListener("click", next);

  // Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn=>{
    btn.addEventListener("click",()=>{
      filterBtns.forEach(b=>b.classList.remove("btn-dark"));
      filterBtns.forEach(b=>b.classList.add("btn-outline-dark"));
      btn.classList.add("btn-dark");
      btn.classList.remove("btn-outline-dark");
      const filter=btn.getAttribute("data-filter");
      document.querySelectorAll(".multi-carousel-item").forEach(item=>{
        if(filter==="all" || item.dataset.category===filter){ item.style.display="block"; }
        else{ item.style.display="none"; }
      });
      currentIndex=0;
      updateCarousel();
    });
  });

  updateCarousel();
  window.addEventListener("resize",()=>{ updateConfig(); updateCarousel(); });
});

// dropdown

// Update dropdown button text when an option is clicked
const dropdownBtn = document.getElementById("filterDropdown");
document.querySelectorAll(".dropdown-menu .filter-btn").forEach(option => {
  option.addEventListener("click", function () {
    dropdownBtn.textContent = this.textContent;
  });
});

  // emoji hi
  

  // about page image hover


document.querySelectorAll('.about-img-wrap').forEach(w => {
  w.addEventListener('touchstart', function(e) {
    // toggle class so CSS .hover rules apply; single tap toggles, second tap follows link if any
    this.classList.toggle('hover');
    // allow the tap through if needed
  }, {passive: true});
});


// <!-- JavaScript -->
document.addEventListener("DOMContentLoaded", () => {
  const icons = document.querySelectorAll(".service-icon");

  // Assign different animations
  if (icons[0]) icons[0].classList.add("animate-bounce");
  if (icons[1]) icons[1].classList.add("animate-pulse");
  if (icons[2]) icons[2].classList.add("animate-rotate");
});

//experience
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".timeline-content");

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    items.forEach(item => {
      const boxTop = item.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        item.classList.add("show");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // run once on load
});

//skills 

// Animate progress bars on scroll (reset when out of view)
document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress-bar");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const bar = entry.target;
      const fill = bar.querySelector(".progress-fill");
      const percent = bar.getAttribute("data-percent");

      if (entry.isIntersecting) {
        // Animate to target %
        fill.style.width = percent + "%";
      } else {
        // Reset back to 0 when not visible
        fill.style.width = "0%";
      }
    });
  }, { threshold: 0.3 });

  progressBars.forEach(bar => observer.observe(bar));
});


//second page portfolio

 const cards = document.querySelectorAll("#portfolio .multi-carousel-item");
  const portfolio = document.querySelector("#portfolio");
  const defaultBg = "linear-gradient(rgba(22,24,49,0.95), rgba(22,24,49,0.8), rgba(22,24,49,0.95)), #161831";

  cards.forEach(card => {
    const bg = card.getAttribute("data-bg");
    card.addEventListener("mouseenter", () => {
      portfolio.style.background = `linear-gradient(rgba(22,24,49,0.95), rgba(22,24,49,0.8), rgba(22,24,49,0.95)), url(${bg}) center/cover no-repeat fixed`;
    });
    card.addEventListener("mouseleave", () => {
      portfolio.style.background = defaultBg;
    });
  });

// Fade effect for filtering
// const items = document.querySelectorAll(".multi-carousel-item");

// filterBtns.forEach(btn => {
//   btn.addEventListener("click", () => {
//     const filter = btn.getAttribute("data-filter");

//     items.forEach(item => {
//       item.style.transition = "all 0.4s ease";
//       if (filter === "all" || item.dataset.category === filter) {
//         item.style.opacity = "1";
//         item.style.transform = "scale(1)";
//         item.style.display = "block";
//       } else {
//         item.style.opacity = "0";
//         item.style.transform = "scale(0.9)";
//         setTimeout(() => (item.style.display = "none"), 400);
//       }
//     });

//     // Update dropdown text
//     const dropdownBtn = document.getElementById("filterDropdown2");
//     dropdownBtn.textContent = btn.textContent;
//   });
// });
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default jump

    const targetId = this.getAttribute('href').substring(1); // remove #
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
      // Remove hash from URL without affecting scroll
      history.replaceState(null, null, ' ');
    }
  });
});


//reload for contact form

const form = document.getElementById("contactForm");
const messageBox = document.getElementById("formMessage");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const data = new FormData(form);
  
  fetch(form.action, {
    method: form.method,
    body: data,
    redirect: "follow"
  })
  .then(response => response.json())
  .then(result => {
    // Web3Forms returns result.success = true/false
    if(result.success){
      showMessage("Form submitted successfully!", "#ff0066");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        messageBox.style.display = "none";
        form.reset();
      }, 2000);
    } else {
      showMessage("Submission failed. Try again.", "#ff0066");
      setTimeout(() => messageBox.style.display = "none", 3000);
    }
  })
  .catch(error => {
    console.error(error);
    showMessage("Submission failed. Try again.", "#ff0066");
    setTimeout(() => messageBox.style.display = "none", 3000);
  });
});

function showMessage(text, bgColor){
  messageBox.textContent = text;
  messageBox.style.background = bgColor;
  messageBox.style.display = "block";
}

//footer 
 // kunin yung current year
  document.getElementById("year").textContent = new Date().getFullYear();


  // for backgeound song 

  //  const music = document.getElementById("bg-music");
  //   const toggleBtn = document.getElementById("musicToggle");
  //   let isPlaying = false;

  //   toggleBtn.addEventListener("click", () => {
  //     if (isPlaying) {
  //       music.pause();
  //       toggleBtn.textContent = "▶️"; // play icon
  //     } else {
  //       music.play().then(() => {
  //         toggleBtn.textContent = "🔊"; // sound icon
  //       }).catch(err => {
  //         console.error("Playback failed:", err);
  //       });
  //     }
  //     isPlaying = !isPlaying;
  //   });