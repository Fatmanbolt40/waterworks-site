/**
 * WaterWorks - Main Application
 */

document.addEventListener('DOMContentLoaded', () => {
    // Connect wallet button
    const connectBtn = document.getElementById('connectWallet');
    const connectInForm = document.getElementById('connectInForm');
    const airdropForm = document.getElementById('airdropForm');
    const signupCount = document.getElementById('signupCount');

    // Initialize signup counter animation
    if (signupCount) {
        animateCounter(signupCount, 0, 1847, 2000);
    }

    // Connect wallet handlers
    if (connectBtn) {
        connectBtn.addEventListener('click', async () => {
            await window.wallet.connect();
        });
    }

    if (connectInForm) {
        connectInForm.addEventListener('click', async () => {
            await window.wallet.connect();
        });
    }

    // Airdrop form submission
    if (airdropForm) {
        airdropForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const walletAddress = document.getElementById('walletAddress').value;

            if (!email) {
                showNotification('Please enter your email address', 'error');
                return;
            }

            if (!walletAddress) {
                showNotification('Please connect your wallet', 'error');
                return;
            }

            // Sign message to verify wallet ownership
            const message = `WaterWorks Pre-Airdrop Registration\n\nEmail: ${email}\nTimestamp: ${Date.now()}`;
            
            try {
                const signature = await window.wallet.signMessage(message);
                
                if (signature) {
                    // In production, send to backend
                    const registration = {
                        email,
                        wallet: walletAddress,
                        signature,
                        timestamp: Date.now()
                    };

                    // Store locally for demo
                    saveRegistration(registration);
                    
                    showNotification('🎉 You\'re registered for the $HLTH pre-airdrop!', 'success');
                    airdropForm.reset();
                    document.getElementById('walletAddress').value = walletAddress;
                    
                    // Update counter
                    const current = parseInt(signupCount.textContent.replace(/,/g, ''));
                    signupCount.textContent = (current + 1).toLocaleString();
                }
            } catch (error) {
                showNotification('Registration failed. Please try again.', 'error');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(10, 15, 28, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 15, 28, 0.9)';
        }
        
        lastScroll = currentScroll;
    });
});

// Utility Functions
function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    let current = start;
    
    const timer = setInterval(() => {
        current += increment * Math.ceil(range / 100);
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = current.toLocaleString();
    }, stepTime);
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #00d4aa, #00a0ff); color: #0a0f1c;' : ''}
        ${type === 'error' ? 'background: #ff6b6b; color: white;' : ''}
        ${type === 'info' ? 'background: #00a0ff; color: white;' : ''}
    `;
    
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function saveRegistration(data) {
    // Get existing registrations
    const existing = JSON.parse(localStorage.getItem('waterworks_registrations') || '[]');
    existing.push(data);
    localStorage.setItem('waterworks_registrations', JSON.stringify(existing));
    
    console.log('Registration saved:', data);
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
    }
`;
document.head.appendChild(style);
