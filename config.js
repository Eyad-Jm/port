// --- START OF FILE config.js ---
const siteConfig = {
    personalInfo: {
        name: "Eyad",
        title: {
            en: "Software Engineer & 3D Artist",
            ar: "مهندس برمجيات ومصمم ثلاثي الأبعاد"
        },
        location: {
            en: "Syria",
            ar: "سوريا"
        },
        email: "pactube1@gmail.com", // Replace with your actual email
        whatsapp: "+963968167947", // Your WhatsApp number
        socialLinks: [
            { name: "github", icon: "fab fa-facebook", url: "https://www.facebook.com/MoEyadJm" }, // Replace # with actual URL
        ],
        profileImage: "assets/images/profile.jpg",
        aboutImage: "assets/images/working.jpg"
    },
    navigation: [
        { key: "about", href: "#about", en: "About", ar: "عني" },
        { key: "skills", href: "#skills", en: "Skills", ar: "المهارات" },
        { key: "projects", href: "#projects", en: "Projects", ar: "المشاريع" },
        { key: "contact", href: "#contact", en: "Contact", ar: "التواصل" }
    ],
    hero: {
        greeting: {
            en: "Hi, I'm",
            ar: "مرحباً، أنا"
        },
        subtitle: {
            en: "Full Stack Developer & 3D Artist",
            ar: "مطور تطبيقات ويب ومصمم ثلاثي الأبعاد"
        },
        description: {
            en: "I build robust web applications and create stunning 3D visuals. Based in Syria, I'm passionate about merging technology and art to deliver exceptional digital experiences.",
            ar: "أقوم ببناء تطبيقات ويب قوية وإنشاء المؤثرات البصرية ثلاثية الأبعاد. مقيم في سوريا، وشغوف بدمج التكنولوجيا والفن لتقديم تجارب رقمية استثنائية."
        },
        button1: {
            en: "View My Work",
            ar: "شاهد أعمالي"
        },
        button2: {
            en: "Contact Me",
            ar: "تواصل معي"
        }
    },
    about: {
        titlePart1: { en: "About", ar: "نبذة" },
        titlePart2: { en: "Me", ar: "عني" },
        p1: {
            en: "I'm Eyad, a passionate Software Engineer from Syria with expertise in full stack web development and 3D art creation. My journey in technology began with programming and expanded to include digital art and design, allowing me to create comprehensive digital solutions.",
            ar: " أنا إياد، مهندس برمجيات شغوف من سوريا ولدي خبرة في تطوير الويب المتكامل(Full Stack) وإنشاء الفن ثلاثي الأبعاد. بدأت رحلتي في التكنولوجيا بالبرمجة وتوسعت لتشمل الفن الرقمي والتصميم، مما سمح لي بإنشاء حلول رقمية شامل "
        },
        p2: {
            en: "As a full stack developer, I specialize in building robust, scalable web applications with clean code and intuitive user interfaces. My 3D art skills using Blender enable me to create stunning visuals and CGI commercials that bring ideas to life.",
            ar: "كمطور ويب متكامل، أتخصص في بناء تطبيقات ويب قوية وقابلة للتطوير بكود نظيف وواجهات مستخدم بديهية. تمكنني مهاراتي في الفن ثلاثي الأبعاد باستخدام Blender من إنشاء مؤثرات بصرية مذهلة وإعلانات CGI تجعل الأفكار تنبض بالحياة."
        },
        p3: {
            en: "When I'm not coding or modeling, you can find me exploring new design techniques, contributing to open source projects, or mentoring aspiring developers and artists in my community.",
            ar: "عندما لا أكون أبرمج أو أصمم نماذج ثلاثية الأبعاد، تجدني أستكشف تقنيات تصميم جديدة، أساهم في مشاريع مفتوحة المصدر، أو أقوم بتوجيه المطورين والفنانين الطموحين في مجتمعي."
        }
    },
    skills: {
        titlePart1: { en: "My", ar: "مهاراتي" },
        titlePart2: { en: "Skills", ar: "" }, // Arabic title combined in part 1
        development: {
            title: { en: "Development", ar: "التطوير" },
            description: { en: "Full stack development with focus on performance, security, and maintainability.", ar: "تطوير ويب متكامل مع التركيز على الأداء والأمان وقابلية الصيانة." },
            items: ["JavaScript", "React", "Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs", "Docker", "AWS"]
        },
        design: {
            title: { en: "3D & Design", ar: "التصميم ثلاثي الأبعاد والرسم" },
            description: { en: "Creating stunning visuals and brand identities through 3D modeling and graphic design.", ar: "إنشاء مؤثرات بصرية مذهلة وهويات تجارية من خلال النمذجة ثلاثية الأبعاد والتصميم الجرافيكي." },
            items: ["Blender", "3D Modeling", "CGI", "Animation", "Photoshop", "Illustrator", "Logo Design", "Brand Identity", "UI/UX Design", "Typography"]
        }
    },
    projects: {
        titlePart1: { en: "Featured", ar: "أبرز" },
        titlePart2: { en: "Projects", ar: "المشاريع" },
        items: [
            {
                title: { en: "Cloud Rendering Platform for Blender", ar: "منصة حوسبة سحابية لمشاريع Blender" },
                category: { en: "Web Dev", ar: "تطوير ويب" },
                description: { en: "Full-featured online cloud rendering platform that can process blender projects on multiple cloud devices, project management, and admin dashboard.", ar: "منصة إظهار سحابي بميزات كاملة لمعالجة مشاريع Blender على عدة أجهزة سحابية، واجهة لإدارة المشاريع،  وواجهة للمشرف على المشاريع" },
                tags: ["React", "Node.js", "MongoDB", "Stripe", "Python", "Linux"],
                image: "assets/images/project1.jpeg",
                categoryClass: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            },
            {
                title: { en: "Lenovo Legion Visualization", ar: "تصميم وعرض لابتوب Lenovo Legion " },
                category: { en: "3D Art", ar: "فن ثلاثي الأبعاد" },
                description: { en: "High-quality 3D renders for Lenovo Laptop with realistic materials and lighting.", ar: "تصميم ثلاثي الأبعاد عالي الجودة للابتوب Legion بمواد وإضاءة واقعية." },
                tags: ["Blender", "Cycles", "Substance Painter"],
                image: "assets/images/project2.jpeg",
                categoryClass: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            },
            {
                title: { en: "Brand Identity", ar: "هوية تجارية" },
                category: { en: "Design", ar: "تصميم" },
                description: { en: "Complete brand package including logo, color palette, typography, and brand guidelines.", ar: "حزمة هوية تجارية كاملة تشمل الشعار ولوحة الألوان والخطوط وإرشادات العلامة التجارية." },
                tags: ["Illustrator", "Photoshop", "Typography"],
                image: "assets/images/project3.jpeg",
                categoryClass: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            }
        ]
        // viewAll: { en: "View All Projects", ar: "عرض كل المشاريع" } // Optional
    },
    contact: {
        titlePart1: { en: "Get In", ar: "تواصل" },
        titlePart2: { en: "Touch", ar: "معي" },
        formDescription: { en: "Have a project in mind or just want to say hello? Feel free to reach out!", ar: "هل لديك مشروع في ذهنك أو تريد فقط أن تقول مرحباً؟ لا تتردد في التواصل!" },
        formLabels: {
            name: { en: "Name", ar: "الاسم" },
            email: { en: "Email", ar: "البريد الإلكتروني" },
            subject: { en: "Subject", ar: "الموضوع" },
            message: { en: "Message", ar: "الرسالة" }
        },
        submitButton: { en: "Send Message", ar: "إرسال الرسالة" },
        locationTitle: { en: "Location", ar: "الموقع" },
        emailTitle: { en: "Email", ar: "البريد الإلكتروني" },
        whatsappTitle: { en: "WhatsApp", ar: "واتساب" },
        socialTitle: { en: "Social", ar: "التواصل الاجتماعي" }
    },
    footer: {
        copyright: { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." }
    },
    themeSwitcher: {
        toggleLight: { en: "Switch to light mode", ar: "التبديل إلى الوضع الفاتح" },
        toggleDark: { en: "Switch to dark mode", ar: "التبديل إلى الوضع الداكن" }
    },
    langSwitcher: {
        en: "EN",
        ar: "AR"
    }
};
// --- END OF FILE config.js ---
