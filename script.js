document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const addExperienceBtn = document.getElementById('add-experience-btn');
    const addEducationBtn = document.getElementById('add-education-btn');
    const experienceFields = document.getElementById('experience-fields');
    const educationFields = document.getElementById('education-fields');
    const skillInput = document.getElementById('skill-input');
    const addSkillBtn = document.getElementById('add-skill-btn');
    const skillsTags = document.getElementById('skills-tags');
    const languageInput = document.getElementById('language-input');
    const addLanguageBtn = document.getElementById('add-language-btn');
    const languageTags = document.getElementById('language-tags');
    const generatePreviewBtn = document.getElementById('generate-preview-btn');
    const resetBtn = document.getElementById('reset-btn');
    const downloadBtn = document.getElementById('downloadBtn');
    const templateSelectBtns = document.querySelectorAll('.template-select-btn');
    const startBuildingBtn = document.querySelector('.start-building-btn');

  document.addEventListener("contextmenu", event => event.preventDefault());

<script>
  document.onkeydown = function(e) {
    if (e.keyCode == 123) return false; // F12
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false; // Ctrl+Shift+I
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false; // Ctrl+Shift+J
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false; // Ctrl+U
  }
</script>

    // Tab Switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });

    // Add Experience Field
    addExperienceBtn.addEventListener('click', () => {
        const experienceItem = document.createElement('div');
        experienceItem.classList.add('experience-item');
        experienceItem.innerHTML = `
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" class="exp-title" placeholder="Senior Developer">
            </div>
            <div class="form-group">
                <label>Employer</label>
                <input type="text" class="exp-employer" placeholder="Tech Company Inc.">
            </div>
            <div class="form-row">
                <div class="form-group half-width">
                    <label>Start Date</label>
                    <input type="text" class="exp-start" placeholder="MM/YYYY">
                </div>
                <div class="form-group half-width">
                    <label>End Date</label>
                    <input type="text" class="exp-end" placeholder="MM/YYYY or Present">
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="exp-description" rows="3" placeholder="Describe your responsibilities and achievements..."></textarea>
            </div>
            <button class="btn secondary-btn remove-exp-btn">
                <i class="fas fa-trash"></i> Remove
            </button>
        `;
        experienceFields.appendChild(experienceItem);

        // Add event listener to the new remove button
        experienceItem.querySelector('.remove-exp-btn').addEventListener('click', () => {
            experienceItem.remove();
        });
    });

    // Add Education Field
    addEducationBtn.addEventListener('click', () => {
        const educationItem = document.createElement('div');
        educationItem.classList.add('education-item');
        educationItem.innerHTML = `
            <div class="form-group">
                <label>Degree</label>
                <input type="text" class="edu-degree" placeholder="Bachelor of Science">
            </div>
            <div class="form-group">
                <label>Institution</label>
                <input type="text" class="edu-institution" placeholder="University of Technology">
            </div>
            <div class="form-row">
                <div class="form-group half-width">
                    <label>Start Date</label>
                    <input type="text" class="edu-start" placeholder="MM/YYYY">
                </div>
                <div class="form-group half-width">
                    <label>End Date</label>
                    <input type="text" class="edu-end" placeholder="MM/YYYY or Present">
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="edu-description" rows="2" placeholder="Relevant coursework, honors..."></textarea>
            </div>
            <button class="btn secondary-btn remove-edu-btn">
                <i class="fas fa-trash"></i> Remove
            </button>
        `;
        educationFields.appendChild(educationItem);

        // Add event listener to the new remove button
        educationItem.querySelector('.remove-edu-btn').addEventListener('click', () => {
            educationItem.remove();
        });
    });



    // Add Skill
    function addSkill(skill, container) {
        if (skill.trim() === '') return;

        const skillTag = document.createElement('span');
        skillTag.classList.add('skill-tag');
        skillTag.innerHTML = `${skill}<i class="fas fa-times remove-skill"></i>`;
        container.appendChild(skillTag);

        // Add event listener to remove button
        skillTag.querySelector('.remove-skill').addEventListener('click', () => {
            skillTag.remove();
        });
    }

    addSkillBtn.addEventListener('click', () => {
        const skill = skillInput.value.trim();
        addSkill(skill, skillsTags);
        skillInput.value = '';
    });

    skillInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const skill = skillInput.value.trim();
            addSkill(skill, skillsTags);
            skillInput.value = '';
        }
    });

    // Add Language
    addLanguageBtn.addEventListener('click', () => {
        const language = languageInput.value.trim();
        addSkill(language, languageTags);
        languageInput.value = '';
    });

    languageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const language = languageInput.value.trim();
            addSkill(language, languageTags);
            languageInput.value = '';
        }
    });

    // Generate Resume Preview
    function generateResumePreview() {
        const resumePreview = document.getElementById('resume-preview');

        // Get personal information
        const fullName = document.getElementById('fullName').value || 'Your Name';
        const jobTitle = document.getElementById('jobTitle').value || 'Professional Title';
        const email = document.getElementById('email').value || 'email@example.com';
        const phone = document.getElementById('phone').value || '(123) 456-7890';
        const address = document.getElementById('address').value || 'City, Country';
        const summary = document.getElementById('summary').value || 'Professional summary highlighting your experience and skills.';
        const linkedin = document.getElementById('linkedin').value;
        const github = document.getElementById('github').value;

        // Get experience
        let experienceHTML = '';
        const experienceItems = document.querySelectorAll('.experience-item');
        experienceItems.forEach(item => {
            const title = item.querySelector('.exp-title').value || 'Job Title';
            const employer = item.querySelector('.exp-employer').value || 'Company Name';
            const start = item.querySelector('.exp-start').value || 'Start Date';
            const end = item.querySelector('.exp-end').value || 'End Date';
            const description = item.querySelector('.exp-description').value || 'Description of responsibilities and achievements.';

            experienceHTML += `
                <div class="experience-item-preview">
                    <div class="experience-header">
                        <div>
                            <div class="experience-title">${title}</div>
                            <div class="experience-company">${employer}</div>
                        </div>
                        <div class="experience-dates">${start} - ${end}</div>
                    </div>
                    <div class="experience-description">
                        ${description.replace(/\n/g, '<br>')}
                    </div>
                </div>
            `;
        });

        // Get education
        let educationHTML = '';
        const educationItems = document.querySelectorAll('.education-item');
        educationItems.forEach(item => {
            const degree = item.querySelector('.edu-degree').value || 'Degree';
            const institution = item.querySelector('.edu-institution').value || 'Institution';
            const start = item.querySelector('.edu-start').value || 'Start Date';
            const end = item.querySelector('.edu-end').value || 'End Date';
            const description = item.querySelector('.edu-description').value || 'Relevant coursework, honors, etc.';

            educationHTML += `
                <div class="education-item-preview">
                    <div class="education-header">
                        <div>
                            <div class="education-degree">${degree}</div>
                            <div class="education-institution">${institution}</div>
                        </div>
                        <div class="education-dates">${start} - ${end}</div>
                    </div>
                    <div class="education-description">
                        ${description.replace(/\n/g, '<br>')}
                    </div>
                </div>
            `;
        });

        // Get skills
        let skillsHTML = '';
        const skillTags = document.querySelectorAll('#skills-tags .skill-tag');
        skillTags.forEach(tag => {
            skillsHTML += `<span class="skill-pill">${tag.textContent.replace('×', '')}</span> `;
        });

        // Get languages
        let languagesHTML = '';
        const languageTags = document.querySelectorAll('#language-tags .skill-tag');
        languageTags.forEach(tag => {
            languagesHTML += `<span class="skill-pill">${tag.textContent.replace('×', '')}</span> `;
        });

        // Build the resume preview
        resumePreview.innerHTML = `
            <div class="resume-header">
                <div>
                    <div class="resume-name">${fullName}</div>
                    <div class="resume-title">${jobTitle}</div>
                </div>
                <div class="resume-contact">
                    <p>${email}</p>
                    <p>${phone}</p>
                    <p>${address}</p>
                    ${linkedin ? `<p>${linkedin}</p>` : ''}
                    ${github ? `<p>${github}</p>` : ''}
                </div>
            </div>
            
            <div class="resume-section">
                <div class="section-title">PROFESSIONAL SUMMARY</div>
                <div class="resume-summary">
                    <p>${summary.replace(/\n/g, '<br>')}</p>
                </div>
            </div>
            
            ${experienceItems.length > 0 ? `
            <div class="resume-section">
                <div class="section-title">WORK EXPERIENCE</div>
                ${experienceHTML}
            </div>
            ` : ''}
            
            ${educationItems.length > 0 ? `
            <div class="resume-section">
                <div class="section-title">EDUCATION</div>
                ${educationHTML}
            </div>
            ` : ''}
            
            <div class="resume-section">
    <div class="section-title">SKILLS</div>
    <div class="skills-list">
        ${skillsHTML || '<span class="skill-pill">Add your skills</span>'}
    </div>
</div>

<div class="resume-section">
    <div class="section-title">LANGUAGES</div>
    <div class="skills-list">
        ${languagesHTML || '<span class="skill-pill">Add languages you know</span>'}
    </div>
</div>
        `;

        // Enable download button
        downloadBtn.disabled = false;
    }

    generatePreviewBtn.addEventListener('click', generateResumePreview);

    // Reset Form
    resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all fields? This cannot be undone.')) {
            // Clear all form fields
            document.querySelectorAll('input, textarea').forEach(field => {
                field.value = '';
            });

            // Clear all experience and education items except the first one
            while (experienceFields.children.length > 1) {
                experienceFields.lastChild.remove();
            }

            while (educationFields.children.length > 1) {
                educationFields.lastChild.remove();
            }

            // Clear all skills and languages
            skillsTags.innerHTML = '';
            languageTags.innerHTML = '';

            // Reset preview
            document.getElementById('resume-preview').innerHTML = '';

            // Disable download button
            downloadBtn.disabled = true;
        }
    });

    // Download as PDF
    downloadBtn.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: 'a4'
        });

        // Get the resume content
        const resumeContent = document.getElementById('resume-preview');

        // Create a temporary container to style the content for PDF
        const tempContainer = document.createElement('div');
        tempContainer.style.width = '595px'; // A4 width in pixels (595pt)
        tempContainer.style.padding = '40px';
        tempContainer.style.fontFamily = 'Helvetica, Arial, sans-serif';
        tempContainer.style.fontSize = '12px';
        tempContainer.style.lineHeight = '1.5';
        tempContainer.innerHTML = resumeContent.innerHTML;

        // Add to body to calculate dimensions
        document.body.appendChild(tempContainer);

        // Set styles for PDF
        const elements = tempContainer.querySelectorAll('*');
        elements.forEach(el => {
            el.style.margin = '0';
            el.style.padding = '0';
            el.style.boxShadow = 'none';
            el.style.borderRadius = '0';
        });

        // Style headings
        const sectionTitles = tempContainer.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            title.style.fontSize = '16px';
            title.style.fontWeight = 'bold';
            title.style.marginBottom = '10px';
            title.style.paddingBottom = '5px';
            title.style.borderBottom = '1px solid #333';
            title.style.color = '#4361ee';
        });

        // Style name
        const resumeName = tempContainer.querySelector('.resume-name');
        if (resumeName) {
            resumeName.style.fontSize = '24px';
            resumeName.style.fontWeight = 'bold';
            resumeName.style.marginBottom = '5px';
        }

        // Style job title
        const resumeTitle = tempContainer.querySelector('.resume-title');
        if (resumeTitle) {
            resumeTitle.style.fontSize = '16px';
            resumeTitle.style.color = '#666';
            resumeTitle.style.marginBottom = '15px';
        }

        // Style contact info
        const resumeContact = tempContainer.querySelector('.resume-contact');
        if (resumeContact) {
            resumeContact.style.textAlign = 'right';
            resumeContact.style.fontSize = '10px';
            resumeContact.style.lineHeight = '1.4';
        }

        // Style experience items
        const experienceItems = tempContainer.querySelectorAll('.experience-item-preview');
        experienceItems.forEach(item => {
            const header = item.querySelector('.experience-header');
            if (header) {
                header.style.display = 'flex';
                header.style.justifyContent = 'space-between';
                header.style.marginBottom = '5px';
            }

            const title = item.querySelector('.experience-title');
            if (title) {
                title.style.fontWeight = 'bold';
                title.style.fontSize = '14px';
            }

            const company = item.querySelector('.experience-company');
            if (company) {
                company.style.fontStyle = 'italic';
                company.style.color = '#666';
            }

            const dates = item.querySelector('.experience-dates');
            if (dates) {
                dates.style.color = '#666';
            }

            const description = item.querySelector('.experience-description');
            if (description) {
                description.style.marginLeft = '10px';
                description.style.paddingLeft = '10px';
                description.style.borderLeft = '1px solid #ddd';
                description.style.marginBottom = '15px';
            }
        });

        // Style education items
        const educationItems = tempContainer.querySelectorAll('.education-item-preview');
        educationItems.forEach(item => {
            const header = item.querySelector('.education-header');
            if (header) {
                header.style.display = 'flex';
                header.style.justifyContent = 'space-between';
                header.style.marginBottom = '5px';
            }

            const degree = item.querySelector('.education-degree');
            if (degree) {
                degree.style.fontWeight = 'bold';
                degree.style.fontSize = '14px';
            }

            const institution = item.querySelector('.education-institution');
            if (institution) {
                institution.style.fontStyle = 'italic';
                institution.style.color = '#666';
            }

            const dates = item.querySelector('.education-dates');
            if (dates) {
                dates.style.color = '#666';
            }

            const description = item.querySelector('.education-description');
            if (description) {
                description.style.marginLeft = '10px';
                description.style.paddingLeft = '10px';
                description.style.borderLeft = '1px solid #ddd';
                description.style.marginBottom = '15px';
            }
        });

        // Style skills
        const skillsList = tempContainer.querySelector('.skills-list');
        if (skillsList) {
            skillsList.style.display = 'flex';
            skillsList.style.flexWrap = 'wrap';
            skillsList.style.gap = '5px';
            skillsList.style.marginBottom = '15px';
        }

        const skillPills = tempContainer.querySelectorAll('.skill-pill');
        skillPills.forEach(pill => {
            pill.style.display = 'inline-block';
            pill.style.padding = '3px 8px';
            pill.style.backgroundColor = '#f0f0f0';
            pill.style.borderRadius = '3px';
            pill.style.fontSize = '10px';
        });

        // Generate PDF from HTML
        html2canvas(tempContainer, {
            scale: 2,
            logging: false,
            useCORS: true
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = doc.internal.pageSize.getWidth() - 40;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            doc.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
            doc.save(`${document.getElementById('fullName').value || 'resume'}.pdf`);

            // Remove temporary container
            document.body.removeChild(tempContainer);
        });
    });

    // Template Selection
    templateSelectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const template = btn.getAttribute('data-template');
            alert(`Selected ${template} template. In a full implementation, this would change the resume layout.`);
            // Scroll to builder section
            document.getElementById('builder').scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Start Building Button
    startBuildingBtn.addEventListener('click', () => {
        document.getElementById('builder').scrollIntoView({ behavior: 'smooth' });
    });

    // Initialize with first tab active
    document.querySelector('.tab-btn').click();

    // Generate initial preview with placeholder data
    generateResumePreview();

});

// Add touch support for form tabs
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('touchstart', function() {
        this.click();
    }, { passive: true });
});

// Prevent zooming on input focus
document.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('focus', function() {
        window.scrollTo(0, 0);
        document.body.style.zoom = "100%";
    });
});

// Better mobile viewport handling
function handleViewport() {
    let viewport = document.querySelector('meta[name="viewport"]');
    if (window.innerWidth <= 768) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    } else {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    }
}

window.addEventListener('resize', handleViewport);
handleViewport(); // Initial call

// Add this to your script.js
document.addEventListener('DOMContentLoaded', function() {
    // Store the active element before any potential scroll
    let activeElement = null;
    
    // Detect when an input is focused
    document.querySelectorAll('input, textarea').forEach(element => {
        element.addEventListener('focus', function() {
            activeElement = this;
            // Add a small delay to allow for natural scrolling
            setTimeout(() => {
                if (document.activeElement === activeElement) {
                    smoothScrollToElement(activeElement);
                }
            }, 300);
        });
    });
    
    // Prevent form submission from causing scroll
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            return false;
        });
    });
    
    // Smooth scroll to element without jumping
    function smoothScrollToElement(element) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const middle = absoluteElementTop - (window.innerHeight / 2.5);
        
        window.scrollTo({
            top: middle,
            behavior: 'smooth'
        });
    }
    
    // Handle Android keyboard issues
    if (/Android/.test(navigator.userAgent)) {
        const viewport = document.querySelector('meta[name="viewport"]');
        window.addEventListener('resize', function() {
            if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
                setTimeout(() => {
                    smoothScrollToElement(document.activeElement);
                }, 100);
            } else {
                viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
            }
        });
    }
});

// Add this to handle iOS specifically
if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    document.body.addEventListener('focusin', function() {
        // iOS focusing fix
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
    });
    
    document.body.addEventListener('focusout', function() {
        // Allow normal scrolling after input is done
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 200);
    });
}


