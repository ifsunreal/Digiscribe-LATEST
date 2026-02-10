/**
 * Service category data extracted from the static HTML service pages.
 * Each key is a slug corresponding to a service category page.
 *
 * Image paths are prefixed with "/images/" for use with the React public folder.
 * Link paths use React Router conventions (e.g. "/services/transcription/medical").
 */

const serviceCategories = {
  /* ------------------------------------------------------------------ */
  /*  TRANSCRIPTION SUPPORT                                             */
  /* ------------------------------------------------------------------ */
  transcription: {
    pageTitle: "Transcription Support",
    backLink: "/services",
    backLabel: "Services",

    /* ---------- description section ---------- */
    description: {
      image: "/images/services/canva transcription.jpg",
      subtitle: "OUR EXPERTISE",
      heading:
        'Delivering <em class="text-primary font-normal">Professional</em> Transcription',
      paragraphs: [
        "We provide comprehensive transcription solutions that deliver exceptional quality and reliability. Our dedicated team works with precision to meet your documentation needs across various industries and applications.",
        "Each project is handled with strict confidentiality protocols while maintaining industry-leading accuracy standards. We serve healthcare, legal, academic, and business sectors with specialized expertise.",
      ],
      badges: [
        { icon: "fas fa-shield-check", text: "HIPAA Compliant" },
        { icon: "fas fa-clock", text: "Fast Delivery" },
        { icon: "fas fa-check-double", text: "99%+ Accuracy" },
      ],
    },

    /* ---------- services section header ---------- */
    sectionTitle: "Our Transcription Services",
    sectionSubtitle:
      "Explore our specialized transcription services tailored to meet your specific needs",

    /* ---------- sub-service cards ---------- */
    services: [
      {
        title: "Medical Transcription",
        image:
          "/images/services/Tanscription Services/Medical Trans.jpg",
        icon: "fas fa-stethoscope",
        description:
          "Professional transcription services designed to support healthcare providers with accurate documentation of medical records and reports.",
        link: "/services/transcription/medical",
      },
      {
        title: "Legal Transcription",
        image:
          "/images/services/Tanscription Services/Legal Trans.jpg",
        icon: "fas fa-gavel",
        description:
          "Accurate transcription of depositions, court proceedings, and legal documents with strict confidentiality and precision.",
        link: "/services/transcription/legal",
      },
      {
        title: "General Transcription",
        image:
          "/images/services/Tanscription Services/General Trans.png",
        icon: "fas fa-file-alt",
        description:
          "Professional transcription for interviews, podcasts, meetings, and various audio content with quick turnaround times.",
        link: "/services/transcription/general",
      },
      {
        title: "Academic Transcription",
        image: "/images/services/Academic Transcription.jpg",
        icon: "fas fa-graduation-cap",
        description:
          "Specialized transcription services for lectures, research interviews, focus groups, and academic presentations.",
        link: "/services/transcription/academic",
      },
      {
        title: "Corporate/Business Transcription",
        image:
          "/images/services/Corporate_Business Transcription.png",
        icon: "fas fa-briefcase",
        description:
          "Business meeting transcription, conference calls, webinars, and corporate training materials with professional accuracy.",
        link: "/services/transcription/corporate",
      },
    ],

    /* ---------- CTA card ---------- */
    cta: {
      icon: "fas fa-headphones",
      title: "Need Custom Transcription?",
      description:
        "Get a personalized quote for your specific transcription needs today.",
    },
  },

  /* ------------------------------------------------------------------ */
  /*  DATA ENTRY                                                        */
  /* ------------------------------------------------------------------ */
  "data-entry": {
    pageTitle: "Data Entry",
    backLink: "/services",
    backLabel: "Services",

    /* ---------- description section ---------- */
    description: {
      image: "/images/services/Data Entry.png",
      subtitle: "OUR EXPERTISE",
      heading:
        'Delivering <em class="text-primary font-normal">Accurate</em> Data Processing',
      paragraphs: [
        "Our professional data entry specialists deliver accurate, efficient, and cost-effective data processing solutions for businesses across all industries. From simple document digitization to complex database management, we handle your data entry needs with precision and confidentiality.",
        "With years of experience, our team utilizes advanced validation protocols and quality control measures to guarantee 99.9% accuracy rates. We work with various software platforms, databases, and file formats.",
      ],
      badges: [
        { icon: "fas fa-bullseye", text: "99% Accuracy" },
        { icon: "fas fa-clock", text: "Fast Processing" },
        { icon: "fas fa-shield-alt", text: "Secure & Confidential" },
      ],
    },

    /* ---------- services section header ---------- */
    sectionTitle: "Our Data Entry Services",
    sectionSubtitle:
      "Explore our specialized data entry services tailored to meet your specific needs",

    /* ---------- sub-service cards ---------- */
    services: [
      {
        title: "Waybill / Invoice / Charge",
        image: "/images/services/Data entry/Waybill.jpg",
        icon: "fas fa-file-invoice",
        description:
          "Professional data entry for waybills, invoices, and charge documents ensuring accurate tracking, billing, and regulatory compliance.",
        link: "/services/data-entry/waybill-invoice",
      },
      {
        title: "Batch Proof Report",
        image: "/images/services/Data entry/Batch Proof Report.jpg",
        icon: "fas fa-clipboard-check",
        description:
          "Comprehensive quality assurance documenting batch accuracy, validation results, and data integrity for large-scale processing projects.",
        link: "/services/data-entry/batch-proof",
      },
    ],

    /* ---------- CTA card ---------- */
    cta: {
      icon: "fas fa-keyboard",
      title: "Need Custom Data Entry?",
      description:
        "Get a personalized quote for your specific data entry needs today.",
    },
  },

  /* ------------------------------------------------------------------ */
  /*  EMR                                                               */
  /* ------------------------------------------------------------------ */
  emr: {
    pageTitle: "EMR",
    backLink: "/services",
    backLabel: "Services",

    /* ---------- description section ---------- */
    description: {
      image: "/images/services/EMR.png",
      subtitle: "OUR EXPERTISE",
      heading:
        'Seamless <span class="gradient-text">EMR</span> Solutions',
      paragraphs: [
        "We specialize in seamless EMR data migration, ensuring your patient records are accurately transferred between systems. Our chart building services create complete, organized patient charts from legacy records.",
        "Our team of experts ensures data integrity throughout the migration process, with comprehensive quality assurance validation and post-migration support to guarantee a smooth transition for your healthcare organization.",
      ],
      badges: [
        { icon: "fas fa-check-circle", text: "100% Data Integrity" },
        { icon: "fas fa-headset", text: "24/7 Support" },
        { icon: "fas fa-shield-alt", text: "Secure Transfer" },
      ],
    },

    /* ---------- services section header ---------- */
    sectionTitle: "Our EMR Services",
    sectionSubtitle:
      "Comprehensive EMR solutions tailored to meet your healthcare organization's needs",

    /* ---------- sub-service cards ---------- */
    services: [
      {
        title: "Data Entry & Digitalization",
        image:
          "/images/services/EMR Services/Patient Enrollment.jpg",
        icon: "fas fa-keyboard",
        description:
          "Transform paper records into organized digital files with accuracy and efficiency.",
        link: "/services/emr/data-entry",
      },
      {
        title: "Data Migration",
        image: "/images/services/Data Migration.jpg",
        icon: "fas fa-exchange-alt",
        description:
          "Seamlessly transfer patient records between EMR systems with zero data loss.",
        link: "/services/emr/data-migration",
      },
      {
        title: "EMR Management",
        image: "/images/services/EMR Management.jpg",
        icon: "fas fa-cogs",
        description:
          "Comprehensive EMR system management and optimization services.",
        link: "/services/emr/management",
      },
    ],

    /* ---------- CTA card ---------- */
    cta: {
      icon: "fas fa-laptop-medical",
      title: "Need Custom EMR Solutions?",
      description:
        "Get a personalized quote for your healthcare organization's unique requirements.",
    },
  },

  /* ------------------------------------------------------------------ */
  /*  DOCUMENT CONVERSION                                               */
  /* ------------------------------------------------------------------ */
  "document-conversion": {
    pageTitle: "Document Conversion",
    backLink: "/services",
    backLabel: "Services",

    /* ---------- description section ---------- */
    description: {
      image: "/images/services/Documnt Conversion.png",
      subtitle: "OUR EXPERTISE",
      heading:
        'Professional Document <span class="text-primary">Conversion</span>',
      paragraphs: [
        "Our document conversion services transform your files into the formats you need. Whether converting paper documents to digital, or transforming between file formats, we ensure accuracy and maintain data integrity throughout the process.",
      ],
      badges: [
        { icon: null, text: "Multiple Format Support" },
        { icon: null, text: "High Accuracy OCR" },
        { icon: null, text: "Fast Processing" },
      ],
    },

    /* ---------- services section header ---------- */
    sectionTitle: "Our Document Conversion Services",
    sectionSubtitle:
      "Comprehensive document conversion solutions tailored to meet your business needs with precision and efficiency.",

    /* ---------- sub-service cards ---------- */
    services: [
      {
        title: "OCR & Data Extraction",
        image: "/images/services/OCR & Data Extraction.jpg",
        icon: "fas fa-eye",
        description:
          "Transform scanned documents and images into editable, searchable text with high accuracy.",
        link: "/services/document-conversion/ocr-data-extraction",
      },
      {
        title: "File Format Conversion",
        image: "/images/services/File Format Conversion.png",
        icon: "fas fa-file-contract",
        description:
          "Convert documents between various formats while maintaining formatting and data integrity.",
        link: "/services/document-conversion/file-format-conversion",
      },
      {
        title: "Book and Ebook Conversion",
        image: "/images/services/Book_Ebook Conversion.jpg",
        icon: "fas fa-book",
        description:
          "Professional conversion of books to digital formats for publishing and distribution.",
        link: "/services/document-conversion/book-ebook-conversion",
      },
      {
        title: "Indexing & Redaction",
        image: "/images/services/Indexing and Redaction.jpg",
        icon: "fas fa-search",
        description:
          "Organize documents with proper indexing and secure sensitive information through redaction.",
        link: "/services/document-conversion/indexing-redaction",
      },
    ],

    /* ---------- CTA card ---------- */
    cta: {
      icon: "fas fa-file-export",
      title: "Need Custom Document Conversion?",
      description:
        "Let us help you with your specific document conversion requirements.",
    },
  },

  /* ------------------------------------------------------------------ */
  /*  CAD                                                               */
  /* ------------------------------------------------------------------ */
  cad: {
    pageTitle: "CAD",
    backLink: "/services",
    backLabel: "Services",

    /* ---------- description section ---------- */
    description: {
      image: "/images/services/CAD.png",
      subtitle: "OUR EXPERTISE",
      heading:
        'Professional <span class="text-primary">CAD</span> Services',
      paragraphs: [
        "Our CAD services provide professional technical drawing and design support for various industries. From precise 2D drafting to detailed 3D modeling, we deliver high-quality technical drawings and design documentation that meet industry standards and project requirements.",
      ],
      badges: [
        { icon: "fas fa-ruler-combined", text: "Precision Drafting" },
        { icon: "fas fa-cubes", text: "2D & 3D Support" },
        { icon: "fas fa-clock", text: "Fast Turnaround" },
      ],
    },

    /* ---------- services section header ---------- */
    sectionTitle: "Our CAD Services",
    sectionSubtitle:
      "Explore our comprehensive range of CAD services designed to meet your drafting and design needs.",

    /* ---------- sub-service cards ---------- */
    services: [
      {
        title: "Architectural Drafting",
        image: "/images/services/Architectural Drafting.jpg",
        icon: "fas fa-building",
        description:
          "Professional architectural drawings and floor plans for residential and commercial projects.",
        link: "/services/cad/architectural-drafting",
      },
      {
        title: "Structural Drafting",
        image: "/images/services/Structural Drafting.jpg",
        icon: "fas fa-hammer",
        description:
          "Detailed structural drawings and engineering documentation for construction projects.",
        link: "/services/cad/structural-drafting",
      },
      {
        title: "MEP & HVAC",
        image: "/images/services/MEP & HVAC.png",
        icon: "fas fa-tools",
        description:
          "Mechanical, electrical, plumbing, and HVAC system drawings and documentation.",
        link: "/services/cad/mep-hvac",
      },
      {
        title: "3D Visualization",
        image: "/images/services/3D Visualization.jpg",
        icon: "fas fa-cube",
        description:
          "Realistic 3D models and renderings for design visualization and presentations.",
        link: "/services/cad/3d-visualization",
      },
    ],

    /* ---------- CTA card ---------- */
    cta: {
      icon: "fas fa-drafting-compass",
      title: "Need Custom CAD Solutions?",
      description:
        "Contact us for tailored CAD services that meet your specific project requirements.",
    },
  },

  /* ------------------------------------------------------------------ */
  /*  E-COMMERCE PRODUCT LISTING                                        */
  /* ------------------------------------------------------------------ */
  "product-listing": {
    pageTitle: "E-commerce Product Listing",
    backLink: "/services",
    backLabel: "Services",

    /* ---------- description section ---------- */
    description: {
      image: "/images/services/Product Listing.png",
      subtitle: "OUR EXPERTISE",
      heading:
        'Professional <span class="text-primary">Product Listing</span>',
      paragraphs: [
        "Our e-commerce product listing services help businesses maximize their online presence. We provide comprehensive catalog management, including product data entry, image optimization, SEO-friendly descriptions, and multi-platform listing to ensure your products reach the widest audience possible.",
      ],
      badges: [
        { icon: "fas fa-store", text: "Multi-Platform Support" },
        { icon: "fas fa-search", text: "SEO Optimized" },
        { icon: "fas fa-images", text: "Quality Images" },
      ],
    },

    /* ---------- services section header ---------- */
    sectionTitle: "Our Product Listing Services",
    sectionSubtitle:
      "Comprehensive e-commerce solutions to help your business thrive in the digital marketplace.",

    /* ---------- sub-service cards ---------- */
    services: [
      {
        title: "Data Cleaning & Validation",
        image: "/images/services/Data Cleaning & Validation.jpg",
        icon: "fas fa-broom",
        description:
          "Ensure your product data is accurate, consistent, and ready for listing across all platforms.",
        link: "/services/product-listing/data-cleaning-validation",
      },
      {
        title: "Data Extraction",
        image: "/images/services/Data Extraction.jpg",
        icon: "fas fa-magnet",
        description:
          "Extract product information from various sources for seamless catalog population.",
        link: "/services/product-listing/data-extraction",
      },
    ],

    /* ---------- CTA card ---------- */
    cta: {
      icon: "fas fa-tags",
      title: "Need Custom Product Listing?",
      description:
        "Get tailored solutions for your specific e-commerce needs.",
    },
  },
};

export default serviceCategories;
