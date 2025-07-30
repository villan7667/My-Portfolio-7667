/**
 * element toggle function
 */

const elemToggleFunc = (elem) => {
  elem.classList.toggle("active")
}

document.addEventListener("mousemove", (e) => {
  createStar(e.clientX, e.clientY)
})

// === Background Glow Canvas Effect ===
const canvas = document.createElement("canvas")
const ctx = canvas.getContext("2d")
document.body.appendChild(canvas)
canvas.style.position = "fixed"
canvas.style.top = 0
canvas.style.left = 0
canvas.style.width = "100%"
canvas.style.height = "100%"
canvas.style.zIndex = -1
canvas.style.pointerEvents = "none"
canvas.width = window.innerWidth
canvas.height = window.innerHeight

const dots = []

for (let i = 0; i < 150; i++) {
  dots.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: Math.random() * 0.3 - 0.15,
    dy: Math.random() * 0.3 - 0.15,
  })
}

function animateBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let i = 0; i < dots.length; i++) {
    const p = dots[i]
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fillStyle = "rgba(242, 79, 15, 0.54)"
    ctx.fill()

    p.x += p.dx
    p.y += p.dy

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1
  }

  requestAnimationFrame(animateBackground)
}

animateBackground()

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]")
const goTopBtn = document.querySelector("[data-go-top]")

window.addEventListener("scroll", () => {
  if (window.scrollY >= 10) {
    header.classList.add("active")
    goTopBtn.classList.add("active")
  } else {
    header.classList.remove("active")
    goTopBtn.classList.remove("active")
  }
})

/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]")
const navbar = document.querySelector("[data-navbar]")

navToggleBtn.addEventListener("click", () => {
  elemToggleFunc(navToggleBtn)
  elemToggleFunc(navbar)
  elemToggleFunc(document.body)
})

/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]")
const toggleBtns = document.querySelectorAll("[data-toggle-btn]")
const skillsBox = document.querySelector("[data-skills-box]")

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", () => {
    elemToggleFunc(toggleBtnBox)
    for (let i = 0; i < toggleBtns.length; i++) {
      elemToggleFunc(toggleBtns[i])
    }
    elemToggleFunc(skillsBox)
  })
}

/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]")

themeToggleBtn.addEventListener("click", () => {
  elemToggleFunc(themeToggleBtn)

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme")
    document.body.classList.add("light_theme")

    localStorage.setItem("theme", "light_theme")
  } else {
    document.body.classList.add("dark_theme")
    document.body.classList.remove("light_theme")

    localStorage.setItem("theme", "dark_theme")
  }
})

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active")
  document.body.classList.remove("dark_theme")
  document.body.classList.add("light_theme")
} else {
  themeToggleBtn.classList.remove("active")
  document.body.classList.remove("light_theme")
  document.body.classList.add("dark_theme")
}
//  Initialize EmailJS
;(() => {
  emailjs.init("Ymm-HpQyACrzE_piL")
})()

document.addEventListener("DOMContentLoaded", () => {
  const SERVICE_ID = "service_dlw7nhe"
  const CONTACT_TEMPLATE_ID = "template_9azrumh"
  const HIRE_TEMPLATE_ID = "template_td5ciyn"

  //  Contact Form
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const params = {
        name: contactForm.name.value,
        email: contactForm.email.value,
        phone: contactForm.phone.value,
        message: contactForm.message.value,
      }

      emailjs
        .send(SERVICE_ID, CONTACT_TEMPLATE_ID, params)
        .then(() => {
          showCustomAlert("Thank you! Your message has been sent.")
          contactForm.reset()
        })
        .catch((err) => {
          showCustomAlert("❌ Failed to send message. Please try again.")
          console.error("Contact Form Error:", err)
        })
    })
  }

  //  Hire Me Form
  const hireMeForm = document.getElementById("hireMeForm")

  if (hireMeForm) {
    hireMeForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const params = {
        name: hireMeForm.hireName.value,
        email: hireMeForm.hireEmail.value,
        message: hireMeForm.hireMessage.value,
      }

      emailjs
        .send(SERVICE_ID, HIRE_TEMPLATE_ID, params)
        .then(() => {
          showCustomAlert("Thank you! I’ll connect with you soon.")
          hireMeForm.reset()
          document.getElementById("hireMeModal").style.display = "none"
        })
        .catch((err) => {
          showCustomAlert("❌ Failed to send message. Please try again.")
          console.error("Hire Me Form Error:", err)
        })
    })
  }

  // Hire Me Modal Controls
  const hireMeBtn = document.getElementById("hireMeBtn")
  const hireMeModal = document.getElementById("hireMeModal")
  const closeHireMe = document.getElementById("closeHireMe")
  const cancelHireMe = document.getElementById("cancelHireMe")

  if (hireMeBtn && hireMeModal && closeHireMe && cancelHireMe) {
    hireMeBtn.addEventListener("click", () => {
      hireMeModal.style.display = "flex"
    })

    closeHireMe.addEventListener("click", () => {
      hireMeModal.style.display = "none"
    })

    cancelHireMe.addEventListener("click", () => {
      hireMeModal.style.display = "none"
    })

    window.addEventListener("click", (e) => {
      if (e.target === hireMeModal) {
        hireMeModal.style.display = "none"
      }
    })
  }
})

//  Custom Alert Function
function showCustomAlert(message) {
  const alertBox = document.getElementById("customAlert")
  const alertText = document.getElementById("customAlertMessage")

  if (alertBox && alertText) {
    alertText.textContent = message
    alertBox.style.display = "block"
    alertBox.style.animation = "fadeInOut 3s ease forwards"
  }
}

//3d for about section

const aboutSection = document.querySelector(".about")
const aboutBanner = aboutSection.querySelector(".about-banner img")

aboutSection.addEventListener("mousemove", (e) => {
  const rect = aboutBanner.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  // Adjust the sensitivity of the rotation
  const rotateX = Math.min(Math.max((y - centerY) / 15, -20), 20)
  const rotateY = Math.min(Math.max((centerX - x) / 12, -30), 30)

  aboutBanner.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`
})

aboutSection.addEventListener("mouseleave", () => {
  aboutBanner.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"
})

// Hero Section 3D Effect

const heroSection = document.querySelector(".hero")
const heroBanner = heroSection.querySelector(".hero-banner")
const heroImage = heroBanner.querySelector("img")

heroSection.addEventListener("mousemove", (e) => {
  const rect = heroBanner.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  const rotateX = Math.min(Math.max((y - centerY) / 15, -10), 10)
  const rotateY = Math.min(Math.max((centerX - x) / 8, -30), 30)

  heroBanner.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`
  heroImage.style.transform = `translateZ(20px) scale(1)`
})

heroSection.addEventListener("mouseleave", () => {
  heroBanner.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"
  heroImage.style.transform = "translateZ(20px) scale(1)"
})
