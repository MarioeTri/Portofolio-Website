AOS.init({
  duration: 1000,
  once: true
});

var typed = new Typed("#typed-text", {
  strings: ["My Portfolio"],
  typeSpeed: 30,
  backSpeed: 40,
  loop: true
});

// Hamburger Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove('active');
  }
});

const projects = {
  1: {
    title: "CRUD Web Application",
    description: "Developed a CRUD-based web application to manage academic data using PHP and MySQL.",
    images: ["Project/SSIP/SSIP.png"]
  },
  2: {
    title: "Trash Object Detection",
    description: "Real-time garbage classification system using TensorFlow and OpenCV.",
    images: ["Project/ProjectTrash/ProjectTrash.png"]
  },
};

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerOffset = document.querySelector('nav').offsetHeight || 80;
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      setTimeout(() => {
        AOS.refresh();
      }, 1000); 
    } else {
      console.warn(`Target element ${targetId} not found.`);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });
});

const modal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-btn');

function showModal(projectId) {
  const project = projects[projectId];
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalGallery = document.getElementById('modal-gallery');

  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;

  modalGallery.innerHTML = '';
  project.images.forEach(imgSrc => {
    const img = document.createElement('img');
    img.src = imgSrc;
    modalGallery.appendChild(img);
  });

  modal.style.display = 'block';
}

closeModal.addEventListener('click', function () {
  modal.style.display = 'none';
});

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

let currentCertificate = 0;
const certificateContainer = document.querySelector('.certificate-container');
const certificates = document.querySelectorAll('.certificate-card');
const indicatorsContainer = document.querySelector('.certificate-indicators');
const totalCertificates = certificates.length;

function updateCertificate() {
  certificateContainer.style.transform = `translateX(-${currentCertificate * 100}%)`;
  document.querySelectorAll('.indicator').forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentCertificate);
  });
}

function nextCertificate() {
  currentCertificate = (currentCertificate + 1) % totalCertificates;
  updateCertificate();
}

function prevCertificate() {
  currentCertificate = (currentCertificate - 1 + totalCertificates) % totalCertificates;
  updateCertificate();
}

function goToCertificate(index) {
  currentCertificate = index;
  updateCertificate();
}

// Initialize indicators
for (let i = 0; i < totalCertificates; i++) {
  const indicator = document.createElement('div');
  indicator.classList.add('indicator');
  if (i === 0) indicator.classList.add('active');
  indicator.addEventListener('click', () => goToCertificate(i));
  indicatorsContainer.appendChild(indicator);
}

// Swipe functionality for mobile
let touchStartX = 0;
let touchEndX = 0;

certificateContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

certificateContainer.addEventListener('touchmove', (e) => {
  touchEndX = e.changedTouches[0].screenX;
}, { passive: true });

certificateContainer.addEventListener('touchend', () => {
  const swipeDistance = touchEndX - touchStartX;
  const minSwipeDistance = 50; // Minimum distance to register a swipe

  if (swipeDistance > minSwipeDistance) {
    prevCertificate(); // Swipe right
  } else if (swipeDistance < -minSwipeDistance) {
    nextCertificate(); // Swipe left
  }
}, { passive: true });

updateCertificate();

// CAPTCHA
const captchaModal = document.getElementById('captcha-modal');
const captchaCodeElement = document.getElementById('captcha-code');
const captchaInput = document.getElementById('captcha-input');
const captchaError = document.getElementById('captcha-error');
const verifyCaptchaButton = document.getElementById('verify-captcha');
const refreshCaptchaButton = document.getElementById('refresh-captcha');
let currentLink = '';
let generatedCode = '';

function generateCaptchaCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

function displayCaptchaCode() {
  generatedCode = generateCaptchaCode();
  captchaCodeElement.textContent = generatedCode;
  captchaInput.value = '';
  captchaError.style.display = 'none';
}

function showCaptchaModal(link) {
  currentLink = link;
  displayCaptchaCode();
  captchaModal.style.display = 'block';
}

function closeCaptchaModal() {
  captchaModal.style.animation = 'fadeOut 0.3s ease-out';
  setTimeout(() => {
    captchaModal.style.display = 'none';
    captchaModal.style.animation = 'fadeIn 0.3s ease-out';
    captchaInput.value = '';
    captchaError.style.display = 'none';
  }, 300);
}

document.querySelectorAll('.captcha-link').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    showCaptchaModal(this.getAttribute('data-link'));
  });
});

verifyCaptchaButton.addEventListener('click', () => {
  if (captchaInput.value === generatedCode) {
    window.open(currentLink, '_blank', 'noopener,noreferrer');
    closeCaptchaModal();
  } else {
    captchaError.style.display = 'block';
    captchaInput.value = '';
  }
});

refreshCaptchaButton.addEventListener('click', displayCaptchaCode);
window.addEventListener('click', function (event) {
  if (event.target === captchaModal) {
    closeCaptchaModal();
  }
});

// Chatbot Logic
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotVoice = document.getElementById('chatbot-voice');
const chatbotReset = document.getElementById('chatbot-reset');

// Enhanced system prompt with navigation only on explicit request
let conversationHistory = [
  {
    role: 'system',
    content: `
      You are a friendly and approachable assistant for Marioe Tri Wardhana's portfolio website. Your role is to help users navigate the website and answer questions about Marioe's portfolio, CV, projects, skills, education, certificates, and contact info in a casual, engaging tone, like chatting with a friend. Use the conversation history to maintain context for follow-up questions (e.g., "Could you explain more deeply?" refers to the previous topic). Provide detailed explanations when asked to elaborate without requiring the user to repeat the topic.

      **Key Instructions**:
      - **Navigation Guidance**: Only trigger navigation to a specific section (e.g., #cv, #project) if the user explicitly asks to go there (e.g., "Go to CV," "Take me to projects," "Navigate to skills"). In such cases, include a special instruction in your response like "[NAVIGATE: #cv]" to trigger scrolling to that section. For informational queries (e.g., "Tell me about the CV," "What are his projects?"), provide the information without suggesting navigation or including a [NAVIGATE] tag unless explicitly requested.
      - **Contextual Responses**: Use the website's structure (sections like #tentang, #pendidikan, #project, #keahlian, #cv, #certificates, #kontak) to provide accurate information. For example, if asked about projects, describe specific projects without navigating unless requested.
      - **Handle Unrelated Questions**: If the user asks something unrelated to the portfolio, gently redirect them to ask about Marioe's work or suggest the contact section without navigating unless explicitly requested.
      - **Detailed Explanations**: When asked for more details, provide in-depth information about the relevant topic (e.g., project technologies, specific skills used, or certificate details).
      - **Tone**: Keep responses short, friendly, and conversational. Avoid formal or robotic language.

      **Portfolio Details**:
      - **About Me**: Marioe Tri Wardhana is a 6th-semester Information Technology student at President University, specializing in Artificial Intelligence. He's passionate about software development, system analysis, and AI-based technologies. His academic and extracurricular activities have honed his technical, leadership, and collaboration skills. Notable projects include dynamic e-commerce systems, chatbot API integrations, and a Flutter-based attendance app. He's currently exploring NLP projects like voice-to-text summarization.

      - **Education**:
        - SMA Negeri 3 Wonogiri (Jul 2020 - May 2023): Graduated from the MIPA program, sparking his interest in science and technology. Active in academic activities.
        - President University (Sep 2023 - Present): Studying Informatics with an AI concentration, actively developing projects.

      - **Projects**:
        - **CRUD Web Application**: A PHP and MySQL-based app for managing academic data (majors, students, lecturers, records) with a clean interface and secure database connections. Team project focusing on backend development and collaboration.
        - **Trash Object Detection**: Real-time garbage classification system using TensorFlow and OpenCV, detecting six waste types with high accuracy via deep learning and background subtraction.
        - **Group Attendance Management**: Face recognition attendance system using Python, OpenCV, FaceNet, and Tkinter, featuring shift management, salary calculation, and Excel reports.
        - **Speech-to-Text Summarization**: Converts live voice to text using Google Speech Recognition, summarizes it with TextRank, and visualizes word count comparisons. Built with Python, NLTK, and Tkinter.
        - **CT Scan Edge Detection**: Applies Gaussian Blur and Sobel operator for medical image preprocessing, displaying original, filtered, and edge-detected images.
        - **Image Alignment with ORB**: Uses ORB and RANSAC for feature matching and image alignment, useful for image stitching and object tracking.
        - **Doctor AI Mobile**: A Flutter-based mobile app with an AI chatbot for medical queries, plus pharmacy/hospital search and drug recommendations.
        - **Enrollment Application**: Android Studio app for student enrollment with features like registration, login, subject selection, and enrollment summary.

      - **Skills**: Proficient in HTML, CSS, JavaScript, React, C++, MySQL, Python, Java, Excel, Flutter, Android Studio, PHP, Dart, SQLite, Netlify. Skilled in AI tools like TensorFlow, OpenCV, FaceNet, NLTK, and TextRank.

      - **CV**: Downloadable at "CV/With Enhancv/PDF/Marioe Tri Wardhana.pdf". Includes professional journey, skills, and achievements. Experience includes a project at Mattel (Mar 2025 - May 2025) developing a face recognition attendance system.

      - **Certificates**:
        - Volunteering in PROCEAN: Contributed to beach cleaning and environmental awareness campaigns.
        - Kids and Care Volunteer: Supported children's education and mentoring.
        - Seminar: The Art and Algorithms of Design: Explored design and algorithm integration.
        - Young On Top Leadership Program: Learned leadership and personal development skills.
        - Seminar: Coompsphere: Discussed IT trends like software development and AI.
        - Student Awarding Night Logistic Committee: Managed event logistics.

      - **Contact**: Email (mariotriwardhana07@gmail.com), LinkedIn (linkedin.com/in/MarioeTri), GitHub (github.com/MarioeTri), WhatsApp (+6285156684881). Users can also use the contact form on the website.

      **Example Responses**:
      - If asked, "Where can I see the CV?" or "Go to CV": "Marioe's CV is in the CV section, showing his skills and projects like the Mattel face recognition system. Want me to take you there? [NAVIGATE: #cv]"
      - If asked, "Tell me about his CV": "Marioe's CV covers his education, skills like Python and Flutter, and projects like a face recognition system for Mattel. You can download it from the CV section."
      - If asked, "Tell me about his projects": "Marioe's projects include a CRUD web app with PHP and MySQL, and a trash detection system using TensorFlow. Want details on one or to go to the projects section? [NAVIGATE: #project]" (Only include [NAVIGATE] if they say "go to" or similar.)
      - If asked, "Explain more deeply": Provide a detailed explanation of the last discussed topic (e.g., specific technologies or challenges in a project).
      - If asked, "Take me to projects": "Let’s head to the projects section to see Marioe’s work! [NAVIGATE: #project]"
      - If asked something unrelated: "That’s an interesting question! Want to know about Marioe’s projects or skills instead? Let me know if you’d like to go to the contact section."
    `
  }
];

// Debounce utility to prevent rapid submissions
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function toggleChatbot() {
  if (chatbotWindow.classList.contains('active')) {
    chatbotWindow.classList.add('closing');
    chatbotWindow.classList.remove('active');
    setTimeout(() => {
      chatbotWindow.classList.remove('closing');
      chatbotWindow.style.display = 'none';
    }, 300);
  } else {
    chatbotWindow.style.display = 'flex';
    void chatbotWindow.offsetWidth;
    chatbotWindow.classList.add('active');
  }
}

function addMessage(content, isUser, isLoading = false) {
  const message = document.createElement('div');
  message.classList.add('chatbot-message', isUser ? 'user' : 'bot');
  if (isLoading) {
    message.classList.add('loading');
    message.innerHTML = '<div class="loader"></div> Thinking...';
  } else {
    message.innerHTML = content.replace(/\n/g, '<br>'); // Support line breaks
  }
  chatbotMessages.appendChild(message);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  if (!isLoading && isUser) {
    conversationHistory.push({ role: 'user', content: content });
    if (conversationHistory.length > 11) {
      conversationHistory = [conversationHistory[0], ...conversationHistory.slice(-10)];
    }
  } else if (!isLoading && !isUser) {
    conversationHistory.push({ role: 'assistant', content: content });
    // Only navigate if the response contains [NAVIGATE: #section] and the user explicitly requested navigation
    const navigateMatch = content.match(/\[NAVIGATE: (#.*?)\]/);
    if (navigateMatch) {
      const sectionId = navigateMatch[1];
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}

function resetChat() {
  chatbotMessages.innerHTML = '';
  conversationHistory = [conversationHistory[0]];
  addMessage(
    'Hey there! I’m Marioe’s Portfolio Buddy. Ask me about his projects, skills, CV, or anything else on the site! You can type or use the microphone to talk.',
    false
  );
}

async function sendToGrok(message) {
  const apiKey = '';
  const apiUrl = '';
  let retries = 3;

  while (retries > 0) {
    try {
      addMessage('', false, true);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: conversationHistory
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const botResponse = data.choices[0].message.content;

      const messages = chatbotMessages.querySelectorAll('.chatbot-message.bot.loading');
      messages[messages.length - 1].remove();

      addMessage(botResponse, false);
      return;
    } catch (error) {
      console.error('Error communicating with Grok API:', error);
      retries--;
      if (retries === 0) {
        const messages = chatbotMessages.querySelectorAll('.chatbot-message.bot.loading');
        messages[messages.length - 1].remove();
        addMessage(
          'Oops, I’m having trouble connecting! Please try again or check out the contact section to reach Marioe directly.',
          false
        );
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

// Voice Command
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

let isRecording = false;

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  chatbotInput.value = transcript;
  chatbotSend.click();
};

recognition.onstart = () => {
  isRecording = true;
  chatbotVoice.classList.add('recording');
  chatbotInput.placeholder = 'Listening...';
  setTimeout(() => {
    if (isRecording) {
      recognition.stop();
      addMessage('Voice input timed out. Try again or type your question!', false);
    }
  }, 10000);
};

recognition.onend = () => {
  isRecording = false;
  chatbotVoice.classList.remove('recording');
  chatbotInput.placeholder = 'Ask about my portfolio, CV, or projects...';
};

recognition.onerror = (event) => {
  console.error('Speech recognition error:', event.error);
  addMessage('Sorry, I couldn’t catch that. Try speaking again or typing your question!', false);
  isRecording = false;
  chatbotVoice.classList.remove('recording');
  chatbotInput.placeholder = 'Ask about my portfolio, CV, or projects...';
};

chatbotVoice.addEventListener('click', () => {
  if (isRecording) {
    recognition.stop();
  } else {
    recognition.start();
  }
});

// Debounced send function
const debouncedSend = debounce(() => {
  const message = chatbotInput.value.trim();
  if (message) {
    addMessage(message, true);
    sendToGrok(message);
    chatbotInput.value = '';
  }
}, 300);

chatbotSend.addEventListener('click', debouncedSend);

chatbotReset.addEventListener('click', () => {
  resetChat();
});

chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    debouncedSend();
  }
});

addMessage(
  'Hey there! I’m Marioe’s Portfolio Buddy. Ask me about his projects, skills, CV, or anything else on the site! You can type or use the microphone to talk.',
  false
);

// Existing CV toggle function
function showSection(sectionId) {
  document.querySelectorAll('.cv-section-content').forEach(section => {
    section.classList.remove('active');
  });
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');
  document.querySelector(`button[onclick="showSection('${sectionId}')"]`).classList.add('active');
}
