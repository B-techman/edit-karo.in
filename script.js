/* ==========================================================================
   Editkaro.in Interactive Logic & Backend Integration
   ========================================================================== */

// TODO: Replace this URL with your deployed Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "YOUR_SCRIPT_URL_HERE";

document.addEventListener('DOMContentLoaded', () => {

  // Get current page from body data attribute
  const pageId = document.body.getAttribute('data-page');

  /* ---------------------------------------------------------
     1. Mobile Menu Toggle
     --------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navbar = document.getElementById('navbar');
  const header = document.getElementById('main-header');

  if (mobileToggle && navbar) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navbar.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navbar.classList.remove('active');
      });
    });
  }

  // Header shrink on scroll
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        // If not home, keep it scrolled slightly or leave as is based on styling
        if (pageId === 'home' && window.scrollY <= 50) {
          header.classList.remove('scrolled');
        }
      }
    });
  }

  /* ---------------------------------------------------------
     2. Stats Counting Animation (Intersection Observer)
     --------------------------------------------------------- */
  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const statNumbers = document.querySelectorAll('.stat-number');
    let countsAnimated = false;

    const animateCounters = () => {
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'), 10);
        const suffix = stat.id === 'stat-views' ? 'M+' : stat.id === 'stat-videos' ? '+' : stat.id === 'stat-retention' ? '%' : '+';
        let current = 0;
        const duration = 1500; 
        const steps = 60;
        const increment = target / steps;
        const intervalTime = duration / steps;

        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            stat.innerText = target + suffix;
            clearInterval(counter);
          } else {
            stat.innerText = Math.ceil(current) + suffix;
          }
        }, intervalTime);
      });
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countsAnimated) {
          animateCounters();
          countsAnimated = true;
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    statsObserver.observe(statsSection);
  }

  /* ---------------------------------------------------------
     3. Newsletter Form (AJAX to Google Sheets)
     --------------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('newsletter-email').value;
      const submitBtn = document.getElementById('newsletter-submit');
      const successMsg = document.getElementById('newsletter-success');
      const errorMsg = document.getElementById('newsletter-error');
      
      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = 'Subscribing...';
      submitBtn.disabled = true;
      successMsg.style.display = 'none';
      errorMsg.style.display = 'none';

      // Create form data
      const formData = new URLSearchParams();
      formData.append('formType', 'subscribe');
      formData.append('email', email);

      try {
        if (GOOGLE_SCRIPT_URL === "YOUR_SCRIPT_URL_HERE") {
          // Simulation for development
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          // Actual request
          await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData
          });
        }
        newsletterForm.reset();
        successMsg.style.display = 'block';
      } catch (error) {
        console.error("Newsletter submission error:", error);
        errorMsg.style.display = 'block';
      } finally {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }

  /* ---------------------------------------------------------
     4. Portfolio Filter System
     --------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          if (filterValue === 'all' || itemCategory === filterValue) {
            item.classList.remove('hidden');
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.classList.add('hidden');
            }, 400);
          }
        });
      });
    });
  }

  /* ---------------------------------------------------------
     5. Play Video on Hover (Portfolio Cards)
     --------------------------------------------------------- */
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  if (portfolioCards.length > 0) {
    portfolioCards.forEach(card => {
      const video = card.querySelector('.card-video');
      if (video) {
        card.addEventListener('mouseenter', () => {
          video.currentTime = 0;
          video.play().catch(error => console.log("Hover video play blocked:", error));
        });
        card.addEventListener('mouseleave', () => {
          video.pause();
          video.currentTime = 0;
        });
      }
    });
  }

  /* ---------------------------------------------------------
     6. Before/After Color Grading Comparison Slider
     --------------------------------------------------------- */
  const sliderContainer = document.getElementById('grading-slider-container');
  const sliderHandle = document.getElementById('slider-handle');

  if (sliderContainer && sliderHandle) {
    let isDragging = false;

    const handleSliderMove = (clientX) => {
      const rect = sliderContainer.getBoundingClientRect();
      let positionX = clientX - rect.left;
      positionX = Math.max(0, Math.min(positionX, rect.width));
      const percent = (positionX / rect.width) * 100;
      sliderContainer.style.setProperty('--split-percent', `${percent}%`);
    };

    const startDrag = (e) => {
      isDragging = true;
      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', endDrag);
      document.addEventListener('touchmove', drag, { passive: false });
      document.addEventListener('touchend', endDrag);
    };

    const drag = (e) => {
      if (!isDragging) return;
      let clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      if (e.type === 'touchmove') e.preventDefault();
      handleSliderMove(clientX);
    };

    const endDrag = () => {
      isDragging = false;
      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', drag);
      document.removeEventListener('touchend', endDrag);
    };

    sliderHandle.addEventListener('mousedown', startDrag);
    sliderHandle.addEventListener('touchstart', startDrag, { passive: true });
  }

  /* ---------------------------------------------------------
     7. Package quote estimator
     --------------------------------------------------------- */
  const volumeSlider = document.getElementById('volume-slider');
  const volumeVal = document.getElementById('volume-val');
  const serviceRadios = document.querySelectorAll('input[name="service"]');
  const addonThumbnails = document.getElementById('addon-thumbnails');
  const addonGrading = document.getElementById('addon-grading');
  
  const calcPrice = document.getElementById('calc-price');
  const summaryVolume = document.getElementById('summary-volume');
  const summaryAddons = document.getElementById('summary-addons');
  const summaryAddonsText = document.getElementById('summary-addons-text');
  const messageField = document.getElementById('message');

  let currentQuoteSummary = "";

  const calculateEstimate = () => {
    if (!volumeSlider) return;
    
    const volume = parseInt(volumeSlider.value, 10);
    let serviceType = 'short';
    serviceRadios.forEach(radio => { if(radio.checked) serviceType = radio.value; });
    
    // Base Rates
    const rateShort = 100;
    const rateLong = 350;
    
    // Addon Rates
    const rateThumbnail = 25;
    const rateGrading = 50;

    // Calculate Price
    const baseRate = serviceType === 'short' ? rateShort : rateLong;
    let total = baseRate * volume;

    let activeAddons = [];
    if (addonThumbnails && addonThumbnails.checked) {
      total += (rateThumbnail * volume);
      activeAddons.push("Thumbnails");
    }
    if (addonGrading && addonGrading.checked) {
      total += (rateGrading * volume);
      activeAddons.push("Grading");
    }

    // Apply Volume Discount (10% off for 30+ videos)
    if (volume >= 30) {
      total = Math.floor(total * 0.9);
    }

    // Update UI
    volumeVal.innerText = `${volume} Videos`;
    calcPrice.innerText = total.toLocaleString();
    
    const serviceName = serviceType === 'short' ? 'Short Form' : 'Long Form';
    summaryVolume.innerText = `${volume}x ${serviceName} videos`;

    if (activeAddons.length > 0) {
      summaryAddons.style.display = 'flex';
      summaryAddonsText.innerText = `Includes: ${activeAddons.join(', ')}`;
    } else {
      summaryAddons.style.display = 'none';
    }

    // Store summary for contact form
    currentQuoteSummary = `$${total.toLocaleString()} /mo for ${volume}x ${serviceName}` + (activeAddons.length > 0 ? ` with ${activeAddons.join(', ')}` : '');
    
    // Update contact form message placeholder logic
    if (messageField && messageField.value === '') {
        // Just keeping the quote ready
    }
  };

  // Attach estimators event listeners
  if (volumeSlider) {
    volumeSlider.addEventListener('input', calculateEstimate);
    serviceRadios.forEach(r => r.addEventListener('change', calculateEstimate));
    addonThumbnails.addEventListener('change', calculateEstimate);
    addonGrading.addEventListener('change', calculateEstimate);
    calculateEstimate(); // Initial run
  }

  /* ---------------------------------------------------------
     8. Testimonials Carousel Slider
     --------------------------------------------------------- */
  const track = document.getElementById('carousel-track');
  const dots = document.querySelectorAll('.carousel-dots .dot');
  
  if (track && dots.length > 0) {
    const slideCount = dots.length;
    let currentSlide = 0;
    let carouselInterval;

    const showSlide = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
      currentSlide = index;
    };

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        showSlide(idx);
        resetCarouselTimer();
      });
    });

    const startCarouselTimer = () => {
      carouselInterval = setInterval(() => {
        let nextSlide = (currentSlide + 1) % slideCount;
        showSlide(nextSlide);
      }, 6000);
    };

    const resetCarouselTimer = () => {
      clearInterval(carouselInterval);
      startCarouselTimer();
    };

    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', () => clearInterval(carouselInterval));
      carouselContainer.addEventListener('mouseleave', startCarouselTimer);
    }

    startCarouselTimer();
  }

  /* ---------------------------------------------------------
     9. Lightbox Dialog Video Player
     --------------------------------------------------------- */
  const lightbox = document.getElementById('video-lightbox');
  
  if (lightbox) {
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPlayer = document.getElementById('lightbox-video-player');
    const lightboxBadge = document.getElementById('lightbox-badge');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxViews = document.getElementById('lightbox-views');

    portfolioCards.forEach(card => {
      card.addEventListener('click', () => {
        const video = card.querySelector('.card-video');
        const title = card.querySelector('.card-title').innerText;
        const badge = card.querySelector('.card-badge');
        const views = card.querySelector('.card-meta').innerText;

        if (video) {
          lightboxPlayer.src = video.src;
          lightboxTitle.innerText = title;
          lightboxBadge.innerText = badge.innerText;
          lightboxBadge.className = 'card-badge ' + badge.className.split(' ').find(cls => cls.startsWith('badge-'));
          lightboxViews.innerText = views;

          lightbox.showModal();
          lightboxPlayer.play().catch(err => console.log("Lightbox autoplay blocked:", err));
        }
      });
    });

    const closeLightbox = () => {
      lightboxPlayer.pause();
      lightboxPlayer.src = '';
      lightbox.close();
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  /* ---------------------------------------------------------
     10. Contact Form (AJAX to Google Sheets)
     --------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const channel = document.getElementById('channel').value;
      const message = document.getElementById('message').value;
      
      const submitBtn = document.getElementById('submit-btn');
      const successOverlay = document.getElementById('form-success');
      const errorMsg = document.getElementById('form-error');

      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span>';
      submitBtn.disabled = true;
      errorMsg.style.display = 'none';

      // Create form data
      const formData = new URLSearchParams();
      formData.append('formType', 'contact');
      formData.append('name', name);
      formData.append('email', email);
      formData.append('channel', channel);
      formData.append('message', message);
      formData.append('quoteSummary', currentQuoteSummary || 'N/A');

      try {
        if (GOOGLE_SCRIPT_URL === "YOUR_SCRIPT_URL_HERE") {
          // Simulation for development
          await new Promise(resolve => setTimeout(resolve, 1500));
        } else {
          // Actual request
          await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData
          });
        }
        contactForm.reset();
        
        // Show success state
        successOverlay.classList.add('active');
        
        // Reset after 4 seconds
        setTimeout(() => {
           successOverlay.classList.remove('active');
        }, 4000);
        
      } catch (error) {
        console.error("Contact form submission error:", error);
        errorMsg.style.display = 'block';
      } finally {
        submitBtn.innerHTML = originalBtnHtml;
        submitBtn.disabled = false;
      }
    });
  }

});
