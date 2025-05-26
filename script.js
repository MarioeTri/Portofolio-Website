AOS.init({
    duration: 1000,
    once: true
  });
  
  var typed = new Typed("#typed-text", {
    strings: [
      "My Portofolio",
    ],
    typeSpeed: 30,
    backSpeed: 40,
    loop: true
  });
const projects = {
    1: {
      title: "Proyek 1",
      description: "Deskripsi lengkap proyek 1.",
      images: [
        "assets/profile.jpg.jpg",
        "assets/profile.jpg.jpg",
        "assets/profile.jpg.jpg"
      ]
    },
    2: {
      title: "Proyek 2",
      description: "Deskripsi lengkap proyek 2.",
      images: [
        "assets/project2-img1.jpg",
        "assets/project2-img2.jpg",
        "assets/project2-img3.jpg"
      ]
    },
  };
  
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
  
  
  