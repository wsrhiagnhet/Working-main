/* ========== DEBUGGING & DEVELOPMENT TOOLS ==========
 * Chrome DevTools was used extensively in initial stages to debug DOM manipulation, event handling,
 * and form validation issues.
 * 
 * AI Assistants (Claude Haiku 4.5 from Anthropic and Grok from xAI) were integrated as debugging tools
 * as the code became more complex, especially during JavaScript implementation and cross-page functionality.
 * AI provided advanced debugging for:
 * - Form validation and submission handling
 * - DOM manipulation and dynamic content replacement
 * - Event listeners and user interaction debugging
 * - Video player controls and media autoplay
 * - Cross-browser compatibility issues
 * - Code consolidation and refactoring for efficiency and maintainability
 * 
 * VS Code's IntelliSense and predictive tab completion were utilized for improved code efficiency
 * . The JS file has extensive comments throughout to explain functionality, as JavaScript
 * was new territory during this project.
 * ========================================== */

/* ========== COVER LETTER GENERATOR ==========
 * Updates DOM elements:
 * - cover-letter-title: Sets page title to job position
 * - letter-content: Renders full personalized cover letter HTML
 * Displays confirmation alert on successful update.
 */
function updateCoverLetter() {
    const managerName = document.getElementById('manager-name').value || 'Hiring Manager';
    const companyName = document.getElementById('company-name').value || '[Company Name]';
    const jobPosition = document.getElementById('job-position').value || 'Cover Letter';
    const customBody = document.getElementById('cover-letter-body').value;
    const managerEmail = document.getElementById('manager-email').value;

    // Validate that a valid email has been entered
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!managerEmail || !emailRegex.test(managerEmail)) {
        alert('Please enter a valid email address for the hiring manager before updating the cover letter.');
        return;
    }

    // Update the h2 title with job position //
    document.getElementById('cover-letter-title').textContent = jobPosition;

    // Create mailto link if email is provided, otherwise use placeholder //
    const emailSubject = encodeURIComponent(`Application for ${jobPosition} Position at ${companyName}`);
    // Build the full cover letter as plain text for inclusion in the email body
    const fullLetterText = `Dear ${managerName},\n\n${customBody}\n\nI am excited to apply for the ${jobPosition} position at ${companyName}. With my extensive background in customer service and administrative support, I am confident in my ability to contribute effectively to your team.\n\nThroughout my career, I have developed expertise in customer service, communication, and administrative support. My experience has equipped me with the skills necessary to excel in this position and make a meaningful impact on your organization.\n\nI am particularly drawn to ${companyName} because of its reputation for excellence and innovation. I am excited about the opportunity to bring my unique skills and perspective to your team.\n\nThank you for considering my application. I would welcome the opportunity to discuss how my qualifications align with your needs. Please feel free to contact me at 706-392-3887 or wsrhiagnhet@gmail.com at your convenience.\n\nSincerely,\nShane Wright`;
    const emailBody = encodeURIComponent(fullLetterText);
    const emailLink = managerEmail ? `<a href="mailto:${managerEmail}?subject=${emailSubject}&body=${emailBody}" class="dynamic-content">${managerEmail}</a>` : '<span class="dynamic-content">[Manager Email]</span>';

    // Update the greeting with full info //
    const letterContent = document.querySelector('.letter-content');
    letterContent.innerHTML = `
        <p><mark>Dear <span class="dynamic-content">${managerName}</span>,</mark></p>
        <p><span class="indent-spacer"></span>I am excited to apply for the <span class="dynamic-content">${jobPosition}</span> position at <span class="dynamic-content">${companyName}</span>. With my extensive background in customer service and administrative support, I am confident in my ability to contribute effectively to your team.</p>
        <p>Throughout my career, I have developed expertise in customer service, communication, and administrative support. My experience has equipped me with the skills necessary to excel in this position and make a meaningful impact on your organization.</p>
        <p>I am particularly drawn to <span class="dynamic-content">${companyName}</span> because of its reputation for excellence and innovation. I am excited about the opportunity to bring my unique skills and perspective to your team.</p>
        <p>${customBody}</p>
        <p>Thank you for considering my application. I would welcome the opportunity to discuss how my qualifications align with your needs. Please feel free to contact me at <span class="dynamic-content">706-392-3887</span> or <span class="dynamic-content">wsrhiagnhet@gmail.com</span> at your convenience.</p>
        <p class="signature-text"><span class="indent-spacer"></span><mark>Sincerely,<br><br>Shane Wright</mark></p>
        <br>
        <br>
        <p><strong>Send this resume to the hiring manager by clicking <a href="mailto:${managerEmail}?subject=${emailSubject}&body=${emailBody}">here</a> or email ${emailLink}.</strong></p>
    `;

    alert('Cover letter updated successfully!');
}


/* ========== UTILITY FUNCTIONS ==========
   Helper functions for formatting and
   general page functionality.
   ========================================== */

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Allow Enter key to trigger cover letter update on Cover Letter page
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        updateCoverLetter();
    }
});

/** PAGE INITIALIZATION 
 * DOMContentLoaded event listener initializes:
 * - Advertisement modal (appears after 2-second delay)
 * - Custom video player controls (play/pause, seek, time display)
 * - Background music autoplay
 * 
 * Ensures all DOM elements are loaded before
 * attaching event listeners and setting up interactive features.
 */
document.addEventListener('DOMContentLoaded', function() {
    
    /* ========== ADVERTISEMENT MODAL SETUP ==========
       Modal displays after 2-second delay with close button.
       Adds 'show' class to trigger CSS animation/display.
    */
    const adModal = document.getElementById('adModal');
    const closeAdBtn = document.getElementById('closeAdBtn');
    
    if (adModal) {
        // Delay ad appearance by 2 seconds for better UX
        setTimeout(function() {
            adModal.classList.add('show');
        }, 2000);
        
        if (closeAdBtn) {
            closeAdBtn.addEventListener('click', function() {
                adModal.classList.remove('show');
            });
        }
    }

    /* ========== VIDEO PLAYER CONTROLS SETUP ==========
       Custom video player with play/pause button,
       seek slider, and time display.
       Handles autoplay and updates UI during playback.
    */
    const video = document.getElementById('careerVideo');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const videoSlider = document.getElementById('videoSlider');
    const timeDisplay = document.getElementById('timeDisplay');

    if (video && playPauseBtn) {
        // Play/Pause button listener - toggles video playback
        playPauseBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = 'Pause';
            } else {
                video.pause();
                playPauseBtn.textContent = 'Play';
            }
        });

        // Time update listener - updates slider position and time display during playback
        video.addEventListener('timeupdate', function() {
            const percent = (video.currentTime / video.duration) * 100;
            videoSlider.value = percent;
            timeDisplay.textContent = formatTime(video.currentTime) + ' / ' + formatTime(video.duration);
        });

        // Slider input listener - allows user to seek through video
        videoSlider.addEventListener('input', function() {
            const seekTime = (this.value / 100) * video.duration;
            video.currentTime = seekTime;
        });

        // Loaded metadata listener - sets slider max value when video metadata is ready
        video.addEventListener('loadedmetadata', function() {
            videoSlider.max = 100;
        });

        // Attempt autoplay with error handling for browser restrictions
        video.play().catch(function(error) {
            console.log('Video autoplay failed:', error);
        });
    }

    /* ========== BACKGROUND AUDIO AUTOPLAY SETUP ==========
       Configures background music to play on page load.
       Volume is set to maximum; includes autoplay error handling.
    */
    const audio = document.getElementById('bgMusic');
    if (audio) {
        audio.muted = false;
        audio.volume = 1.0;
        audio.play().catch(function(error) {
            console.log('Audio autoplay failed:', error);
        });
    }

    /* ========== CONTACT FORM SUBMISSION HANDLER ==========
       Intercepts form submission to:
       1. Prevent default form behavior
       2. Collect form data and build query string with parameters
       3. Open form URL with parameters in new tab
       4. Replace contact form with success message
    */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form action URL
            const formUrl = this.action;
            const formData = new FormData(this);
            
            // Build query string from form data with all parameters
            const queryParams = new URLSearchParams(formData).toString();
            const fullUrl = formUrl + '?' + queryParams;
            
            // Open the form submission URL with all parameters in a new tab
            window.open(fullUrl, '_blank');
            
            // Replace the contact form with success message
            const successMessage = document.createElement('div');
            successMessage.className = 'submission-success';
            successMessage.innerHTML = `
                <h3>✓ Submission Successfully Sent!</h3>
                <p>Thank you for reaching out. I appreciate your interest and will get back to you soon.</p>
            `;

            // Actually replace the form with the success message
            contactForm.replaceWith(successMessage);
        });
    }
});


