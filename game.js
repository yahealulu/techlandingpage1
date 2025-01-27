document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('player');
  const scoreElement = document.getElementById('score-value');
  const infoBox = document.getElementById('info-box');
  let score = 0;
  
  // Player movement
  document.addEventListener('mousemove', (e) => {
    const x = e.clientX - player.offsetWidth / 2;
    const y = e.clientY - player.offsetHeight / 2;
    
    player.style.transform = `translate(${x}px, ${y}px)`;
    
    // Trail effect
    const trail = document.createElement('div');
    trail.className = 'player';
    trail.style.transform = `translate(${x}px, ${y}px)`;
    trail.style.opacity = '0.5';
    document.body.appendChild(trail);
    
    setTimeout(() => {
      trail.remove();
    }, 200);
  });

  // Coin collection
  const coins = document.querySelectorAll('.coin');
  coins.forEach(coin => {
    coin.addEventListener('mouseenter', () => {
      score += 100;
      scoreElement.textContent = score;
      
      // Show info
      infoBox.textContent = coin.dataset.info;
      infoBox.style.display = 'block';
      
      // Particle effect
      createParticles(coin);
      
      setTimeout(() => {
        infoBox.style.display = 'none';
      }, 2000);
    });
  });

  // Particle effect
  function createParticles(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'player';
      particle.style.width = '10px';
      particle.style.height = '10px';
      particle.style.transform = `translate(${x}px, ${y}px)`;
      document.body.appendChild(particle);
      
      const angle = (i / 10) * Math.PI * 2;
      const velocity = 5;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      
      let frameCount = 0;
      
      function animate() {
        frameCount++;
        const scale = 1 - frameCount / 30;
        
        if (scale <= 0) {
          particle.remove();
          return;
        }
        
        const currentX = x + vx * frameCount;
        const currentY = y + vy * frameCount;
        
        particle.style.transform = `translate(${currentX}px, ${currentY}px) scale(${scale})`;
        requestAnimationFrame(animate);
      }
      
      animate();
    }
  }

  // Parallax effect
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      const scroll = window.pageYOffset;
      const speed = 0.5;
      section.style.transform = `translateY(${scroll * speed}px)`;
    });
  });

  // Form submission
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    score += 500;
    scoreElement.textContent = score;
    
    infoBox.textContent = 'Message sent! +500 points';
    infoBox.style.display = 'block';
    
    setTimeout(() => {
      infoBox.style.display = 'none';
    }, 2000);
    
    form.reset();
  });
});