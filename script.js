// Language functionality
let currentLanguage = 'en'; // Default language is English

// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('language-toggle');
    const currentLangElement = document.getElementById('current-lang');
    const otherLangElement = document.getElementById('other-lang');

    // Load saved language preference or default to English
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    if (savedLanguage === 'es') {
        switchLanguage('es');
    }

    languageToggle.addEventListener('click', function() {
        const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
        switchLanguage(newLanguage);
    });

    function switchLanguage(lang) {
        currentLanguage = lang;
        
        // Update all elements with data attributes
        const elements = document.querySelectorAll('[data-en][data-es], [data-en-html], [data-es-html]');
        elements.forEach(element => {
            const htmlAttr = element.getAttribute(`data-${lang}-html`);
            const textAttr = element.getAttribute(`data-${lang}`);
            if (element.tagName === 'TITLE') {
                if (textAttr) {
                    document.title = textAttr;
                }
            } else if (htmlAttr) {
                element.innerHTML = htmlAttr;
            } else if (textAttr) {
                element.textContent = textAttr;
            }
        });

        // Update language toggle button
        if (lang === 'en') {
            currentLangElement.textContent = 'EN';
            otherLangElement.textContent = 'ES';
            document.documentElement.lang = 'en';
        } else {
            currentLangElement.textContent = 'ES';
            otherLangElement.textContent = 'EN';
            document.documentElement.lang = 'es';
        }

        // Save language preference
        localStorage.setItem('preferred-language', lang);

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (lang === 'es') {
            metaDescription.setAttribute('content', 'MySwiftApps ofrece software útil y divertido para mejorar tu vida y la de quienes amas.');
        } else {
            metaDescription.setAttribute('content', 'MySwiftApps offers useful and fun software to improve your life and the lives of those you love.');
        }
    }
});
