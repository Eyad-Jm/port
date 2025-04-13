// --- START OF FILE script.js ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
    const mobileMenuBtn = document.getElementById('menu-btn');
    const closeMobileMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link'); // Needs to be generated dynamically or selected within generateNavigation
    const themeToggleBtn = document.getElementById('theme-toggle');
    const langToggleBtn = document.getElementById('lang-toggle');
    const htmlElement = document.documentElement; // Target <html> element
    const currentYearSpan = document.getElementById('currentYear');
    const whatsappButton = document.getElementById('whatsapp-button');


    // --- Mobile Menu ---
    const openMenu = () => mobileMenu.classList.replace('mobile-menu-closed', 'mobile-menu-open');
    const closeMenu = () => mobileMenu.classList.replace('mobile-menu-open', 'mobile-menu-closed');

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMenu);
    if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeMenu);
    // Note: Event listeners for dynamically generated mobile links are added in generateNavigation


    // --- Theme Toggle ---
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            if (themeToggleBtn) themeToggleBtn.innerHTML = `<i class="fas fa-sun"></i><span class="sr-only">${siteConfig.themeSwitcher.toggleLight[currentLang] || 'Switch to light mode'}</span>`; // Sun icon
        } else {
            htmlElement.classList.remove('dark');
            if (themeToggleBtn) themeToggleBtn.innerHTML = `<i class="fas fa-moon"></i><span class="sr-only">${siteConfig.themeSwitcher.toggleDark[currentLang] || 'Switch to dark mode'}</span>`; // Moon icon
        }
        localStorage.setItem('theme', theme);
         // Update button aria-label/tooltip text based on new theme state
         if (themeToggleBtn) {
            const newTooltip = theme === 'dark'
                ? (siteConfig.themeSwitcher.toggleLight[currentLang] || 'Switch to light mode')
                : (siteConfig.themeSwitcher.toggleDark[currentLang] || 'Switch to dark mode');
            themeToggleBtn.setAttribute('aria-label', newTooltip);
         }
    };

    const toggleTheme = () => {
        const newTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(newTheme);
    };

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Initialize theme based on preference or system
    const preferredTheme = localStorage.getItem('theme') ||
                           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');


    // --- Language Toggle ---
    // ** CORRECTED: Declare currentLang only ONCE here in the outer scope **
    let currentLang = localStorage.getItem('language') || 'en'; // Default to English

    const updateTextContent = (lang) => {
        // ** REMOVED duplicate declaration of currentLang from inside this function **
        htmlElement.setAttribute('lang', lang);
        htmlElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

        // Update all elements with data-translate-key
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            const keys = key.split('.');
            let value = siteConfig;
            let translationFound = false;
            let finalText = key; // Default to key name if anything fails

            try {
                // Navigate to the target value in config using the key parts
                for (const k of keys) {
                    if (value === undefined || value === null) {
                        value = undefined; // Path broken
                        break;
                    }
                    value = value[k];
                }

                if (value !== undefined && value !== null) {
                    // CASE 1: Value is an object with language keys
                    if (typeof value === 'object' && !Array.isArray(value) && value.hasOwnProperty(lang)) {
                        finalText = value[lang];
                        translationFound = true;
                    }
                    // CASE 2: Value is a direct string (doesn't need translation)
                    else if (typeof value === 'string') {
                        finalText = value;
                        translationFound = true;
                    }
                    // CASE 3: Fallback - Value is an object, lang key missing, try 'en'
                    else if (typeof value === 'object' && !Array.isArray(value) && value.hasOwnProperty('en')) {
                         finalText = value['en'];
                         translationFound = true;
                         console.warn(`Translation key ${key} missing for lang '${lang}', using 'en' fallback.`);
                    } else {
                         console.warn(`Translation key ${key} found but has unexpected structure or missing language keys for element:`, el);
                         // Keep default fallback (key name)
                    }

                    // *** Use innerHTML to allow rendering tags from config ***
                    el.innerHTML = finalText;

                } else {
                    console.warn(`Translation key path invalid or value null/undefined: ${key} for element:`, el);
                    // *** Use innerHTML for fallback too ***
                    el.innerHTML = key; // Fallback to key name
                }

            } catch (e) {
                console.error(`Error accessing translation key: ${key} for element: ${el}`, e);
                 // *** Use innerHTML for error fallback ***
                el.innerHTML = key; // Show key as fallback on error
            }
        });

        // --- Specific Attribute Updates & Content Regeneration ---
        const titleElement = document.querySelector('title');
        if(titleElement) {
            titleElement.textContent = siteConfig.personalInfo.name + (siteConfig.personalInfo.title[lang] ? ` | ${siteConfig.personalInfo.title[lang]}` : '');
        }

        document.querySelector('meta[name="description"]')?.setAttribute('content', (siteConfig.personalInfo.title[lang] || '') + ' | ' + siteConfig.personalInfo.name);
        document.getElementById('profile-img')?.setAttribute('alt', `${siteConfig.personalInfo.name}'s profile`);
        document.getElementById('about-img')?.setAttribute('alt', `${siteConfig.personalInfo.name} working`);

        if (whatsappButton && siteConfig.personalInfo.whatsapp) {
             whatsappButton.setAttribute('href', `https://wa.me/${siteConfig.personalInfo.whatsapp.replace(/\D/g, '')}`);
        }

        // Update language toggle button text and accessibility label
        if (langToggleBtn) {
            langToggleBtn.textContent = lang === 'en' ? siteConfig.langSwitcher.ar : siteConfig.langSwitcher.en;
            const toggleLabel = lang === 'en'
                ? (siteConfig.langSwitcher.toggleArabic || 'Switch to Arabic')
                : (siteConfig.langSwitcher.toggleEnglish || 'Switch to English');
            langToggleBtn.setAttribute('aria-label', toggleLabel);
        }

        // Re-apply theme to update potential sr-only text in theme button based on new language
        const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
        applyTheme(currentTheme); // Re-call applyTheme to update texts based on new lang

        // Regenerate dynamic content sections
        generateProjects(lang);
        generateSkills(lang);
        generateNavigation(lang);
        generateContactInfo(lang);
        generateFooterSocials(lang);
    }; // --- End of updateTextContent function ---


    const toggleLanguage = () => {
         // This correctly UPDATES the existing currentLang variable
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        localStorage.setItem('language', currentLang);
        updateTextContent(currentLang); // Pass the updated value
    };

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', toggleLanguage);
    }

    // --- Dynamic Content Generation Functions ---

    // Generate Navigation
    const generateNavigation = (lang) => {
        const desktopNavContainer = document.getElementById('desktop-nav-links');
        const mobileNavContainer = document.getElementById('mobile-nav-links');
        if (!desktopNavContainer || !mobileNavContainer) return;

        desktopNavContainer.innerHTML = ''; // Clear existing
        mobileNavContainer.innerHTML = ''; // Clear existing

        siteConfig.navigation.forEach(item => {
            const text = item[lang] || item['en']; // Fallback to English if lang missing
            if (!text) return; // Skip if no text available

            // Desktop
            const aDesktop = document.createElement('a');
            aDesktop.href = item.href;
            aDesktop.className = 'hover:text-primary transition dark:hover:text-blue-400';
            aDesktop.textContent = text;
            desktopNavContainer.appendChild(aDesktop);

            // Mobile
            const aMobile = document.createElement('a');
            aMobile.href = item.href;
            aMobile.className = 'hover:text-primary transition block text-lg mobile-menu-link dark:hover:text-blue-400';
            aMobile.textContent = text;
            aMobile.addEventListener('click', closeMenu); // Ensure mobile links close menu
            mobileNavContainer.appendChild(aMobile);
        });
    };

    // Generate Skills
    const generateSkills = (lang) => {
        const devSkillsContainer = document.getElementById('development-skills-list');
        const designSkillsContainer = document.getElementById('design-skills-list');

        if (devSkillsContainer && siteConfig.skills.development?.items) {
            devSkillsContainer.innerHTML = ''; // Clear existing
            siteConfig.skills.development.items.forEach(skill => {
                const span = document.createElement('span');
                span.className = 'bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium dark:bg-blue-900 dark:text-blue-200';
                span.textContent = skill; // Skills are likely not translated individually
                devSkillsContainer.appendChild(span);
            });
        }

        if (designSkillsContainer && siteConfig.skills.design?.items) {
            designSkillsContainer.innerHTML = ''; // Clear existing
            siteConfig.skills.design.items.forEach(skill => {
                const span = document.createElement('span');
                span.className = 'bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium dark:bg-green-900 dark:text-green-200';
                span.textContent = skill; // Skills are likely not translated individually
                designSkillsContainer.appendChild(span);
            });
        }
    };

    // Generate Projects
    const generateProjects = (lang) => {
        const projectsContainer = document.getElementById('projects-grid');
        if (!projectsContainer || !siteConfig.projects?.items) return;

        projectsContainer.innerHTML = ''; // Clear existing projects
        siteConfig.projects.items.forEach(project => {
            const titleText = project.title[lang] || project.title['en'];
            const categoryText = project.category[lang] || project.category['en'];
            const descriptionText = project.description[lang] || project.description['en'];
            if (!titleText || !categoryText || !descriptionText) return; // Skip if essential text missing

            const card = document.createElement('div');
            card.className = 'project-card bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md transition duration-300 flex flex-col';

            const imgDiv = document.createElement('div');
            imgDiv.className = 'h-48 overflow-hidden';
            const img = document.createElement('img');
            img.src = project.image || 'assets/images/placeholder.jpg'; // Add a placeholder image path
            img.alt = titleText;
            img.className = 'w-full h-full object-cover';
            img.loading = 'lazy'; // Improve performance
            imgDiv.appendChild(img);

            const contentDiv = document.createElement('div');
            contentDiv.className = 'p-6 flex flex-col flex-grow';

            const headerDiv = document.createElement('div');
            headerDiv.className = 'flex justify-between items-start mb-2';
            const titleH3 = document.createElement('h3');
            titleH3.className = 'text-xl font-bold text-gray-800 dark:text-gray-100';
            titleH3.textContent = titleText;
            const categorySpan = document.createElement('span');
            categorySpan.className = `text-xs px-2 py-1 rounded font-semibold ${project.categoryClass || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}`;
            categorySpan.textContent = categoryText;
            headerDiv.appendChild(titleH3);
            headerDiv.appendChild(categorySpan);

            const descriptionP = document.createElement('p');
            descriptionP.className = 'text-gray-600 dark:text-gray-400 mb-4 text-sm flex-grow';
            descriptionP.textContent = descriptionText;

            const tagsDiv = document.createElement('div');
            tagsDiv.className = 'flex flex-wrap gap-2 mt-auto';
            if (project.tags && Array.isArray(project.tags)) {
                project.tags.forEach(tag => {
                    const tagSpan = document.createElement('span');
                    tagSpan.className = 'text-xs bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 px-2 py-1 rounded';
                    tagSpan.textContent = tag; // Tags are likely not translated
                    tagsDiv.appendChild(tagSpan);
                });
            }

            contentDiv.appendChild(headerDiv);
            contentDiv.appendChild(descriptionP);
            contentDiv.appendChild(tagsDiv);

            card.appendChild(imgDiv);
            card.appendChild(contentDiv);
            projectsContainer.appendChild(card);
        });
    };

    // Generate Contact Info Details
    const generateContactInfo = (lang) => {
        const container = document.getElementById('contact-info-details');
        if (!container) return;
        container.innerHTML = ''; // Clear existing

        const locationTitle = siteConfig.contact.locationTitle[lang] || siteConfig.contact.locationTitle['en'];
        const locationValue = siteConfig.personalInfo.location[lang] || siteConfig.personalInfo.location['en'];
        const emailTitle = siteConfig.contact.emailTitle[lang] || siteConfig.contact.emailTitle['en'];
        const emailValue = siteConfig.personalInfo.email; // Email is usually not translated
        const whatsappTitle = siteConfig.contact.whatsappTitle[lang] || siteConfig.contact.whatsappTitle['en'];
        const whatsappValue = siteConfig.personalInfo.whatsapp; // Phone number not translated

        const locationInfo = locationTitle && locationValue ? `
            <div class="flex flex-col items-center text-center md:items-start md:text-left">
                <div class="flex items-center justify-center md:justify-start mb-2 w-full">
                    <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded-full shrink-0 ${lang === 'ar' ? 'ml-3' : 'mr-3'}">
                        <i class="fas fa-map-marker-alt text-primary dark:text-blue-300 text-lg"></i>
                    </div>
                    <h4 class="font-semibold text-gray-800 dark:text-gray-200">${locationTitle}</h4>
                </div>
                <p class="text-gray-600 dark:text-gray-400 ${lang === 'ar' ? 'md:mr-12' : 'md:ml-12'}">${locationValue}</p>
            </div>` : '';

        const emailInfo = emailTitle && emailValue ? `
            <div class="flex flex-col items-center text-center md:items-start md:text-left">
                <div class="flex items-center justify-center md:justify-start mb-2 w-full">
                    <div class="bg-green-100 dark:bg-green-900 p-3 rounded-full shrink-0 ${lang === 'ar' ? 'ml-3' : 'mr-3'}">
                         <i class="fas fa-envelope text-accent dark:text-emerald-300 text-lg"></i>
                    </div>
                    <h4 class="font-semibold text-gray-800 dark:text-gray-200">${emailTitle}</h4>
                </div>
               <a href="mailto:${emailValue}" class="text-primary hover:underline dark:text-blue-400 dark:hover:text-blue-300 ${lang === 'ar' ? 'md:mr-12' : 'md:ml-12'} break-all">${emailValue}</a>
            </div>` : '';

        const whatsappInfo = whatsappTitle && whatsappValue ? `
            <div class="flex flex-col items-center text-center md:items-start md:text-left">
                <div class="flex items-center justify-center md:justify-start mb-2 w-full">
                    <div class="bg-teal-100 dark:bg-teal-900 p-3 rounded-full shrink-0 ${lang === 'ar' ? 'ml-3' : 'mr-3'}">
                         <i class="fab fa-whatsapp text-teal-600 dark:text-teal-300 text-lg"></i>
                    </div>
                    <h4 class="font-semibold text-gray-800 dark:text-gray-200">${whatsappTitle}</h4>
                </div>
               <a href="https://wa.me/${whatsappValue.replace(/\D/g, '')}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline dark:text-blue-400 dark:hover:text-blue-300 ${lang === 'ar' ? 'md:mr-12' : 'md:ml-12'} dir-ltr">${whatsappValue}</a>
            </div>` : '';

        container.innerHTML = locationInfo + emailInfo + whatsappInfo;
    };

    // Generate Footer & Contact Social Links
    const generateFooterSocials = (lang) => { // lang parameter isn't strictly needed here but keeps pattern consistent
         const footerSocialContainer = document.getElementById('footer-social-links');
         const contactSocialContainer = document.getElementById('contact-social-links');

         const generateLinks = (container) => {
             if (!container || !siteConfig.personalInfo.socialLinks) return;
             container.innerHTML = ''; // Clear existing
             siteConfig.personalInfo.socialLinks.forEach(link => {
                const a = document.createElement('a');
                a.href = link.url || '#';
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                // Use text-gray-500 for light, text-gray-400 for dark
                a.className = "text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-blue-400 transition text-xl";
                a.setAttribute("aria-label", link.name); // Accessibility
                const i = document.createElement('i');
                i.className = `${link.icon} ${container.id === 'footer-social-links' ? 'fa-lg' : ''}`; // Larger in footer
                a.appendChild(i);
                container.appendChild(a);
            });
         }
         generateLinks(footerSocialContainer);
         generateLinks(contactSocialContainer);
    };


    // --- Initial Load ---
    applyTheme(preferredTheme); // Set theme first
    updateTextContent(currentLang); // Then set language and content

    // Update footer year
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();

}); // --- End of DOMContentLoaded listener ---
// --- END OF FILE script.js ---