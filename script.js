// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation and submission
    const form = document.querySelector('.application-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            const requiredFields = ['name', 'furigana', 'department', 'email'];
            let isValid = true;
            let errorMessage = '';
            
            requiredFields.forEach(field => {
                const input = form.querySelector(`[name="${field}"]`);
                if (!input || !input.value.trim()) {
                    isValid = false;
                    errorMessage += `${getFieldLabel(field)}は必須項目です。\n`;
                }
            });
            
            // Email validation
            const emailInput = form.querySelector('[name="email"]');
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    isValid = false;
                    errorMessage += '有効なメールアドレスを入力してください。\n';
                }
            }
            
            if (!isValid) {
                alert(errorMessage);
                return;
            }
            
            // Simulate form submission
            showLoadingState();
            
            setTimeout(() => {
                hideLoadingState();
                showSuccessMessage();
                form.reset();
            }, 2000);
        });
    }

    // Radio button change handler
    const radioButtons = document.querySelectorAll('input[name="date_type"]');
    const dateSelection = document.querySelector('.date-selection');
    
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'ondemand') {
                dateSelection.style.display = 'none';
            } else {
                dateSelection.style.display = 'flex';
            }
        });
    });

    // Scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            scrollIndicator.style.transform = `translateY(${rate}px)`;
        });
    }

    // Parallax effect for hero background
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.problem-item, .reason-card, .info-item, .step');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Form step indicator
    updateFormStep(1);
});

// Helper functions
function getFieldLabel(fieldName) {
    const labels = {
        'name': 'お名前',
        'furigana': 'ふりがな',
        'department': '部署',
        'email': 'メールアドレス'
    };
    return labels[fieldName] || fieldName;
}

function showLoadingState() {
    const submitBtn = document.querySelector('.form-submit');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '送信中...';
    }
}

function hideLoadingState() {
    const submitBtn = document.querySelector('.form-submit');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '確認する <svg width="11" height="19" viewBox="0 0 11 19" fill="none"><path d="M1 9.5H10M10 9.5L6 5.5M10 9.5L6 13.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    }
}

function showSuccessMessage() {
    // Create success modal
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-icon">✓</div>
            <h3>お申込みありがとうございます</h3>
            <p>後日、担当者より日程と参加URLの連絡があります。</p>
            <button class="modal-close">閉じる</button>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .success-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 20px;
            text-align: center;
            max-width: 400px;
            margin: 0 1rem;
            animation: slideIn 0.3s ease;
        }
        
        .modal-icon {
            width: 60px;
            height: 60px;
            background: #12B3B3;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin: 0 auto 1rem;
        }
        
        .modal-content h3 {
            color: #000;
            margin-bottom: 1rem;
        }
        
        .modal-content p {
            color: #666;
            margin-bottom: 2rem;
        }
        
        .modal-close {
            background: #12B3B3;
            color: white;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
        }
        
        .modal-close:hover {
            background: #0fa3a3;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.remove();
        style.remove();
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });
}

function updateFormStep(step) {
    const steps = document.querySelectorAll('.form-step');
    steps.forEach((stepEl, index) => {
        if (index < step) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    });
}

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .problem-item,
    .reason-card,
    .info-item,
    .step {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .problem-item.animate-in,
    .reason-card.animate-in,
    .info-item.animate-in,
    .step.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .reason-card:nth-child(even) {
        animation-delay: 0.2s;
    }
    
    .reason-card:nth-child(odd) {
        animation-delay: 0.4s;
    }
`;
document.head.appendChild(animationStyles);

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('mobile-open');
}

// Add mobile menu styles
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 768px) {
        .nav {
            position: fixed;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            transition: top 0.3s ease;
        }
        
        .nav.mobile-open {
            top: 100%;
        }
        
        .mobile-menu-toggle {
            display: block;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
        }
    }
    
    @media (min-width: 769px) {
        .mobile-menu-toggle {
            display: none;
        }
    }
`;
document.head.appendChild(mobileStyles);
