export const navigationLinks = [
  { label: "Home", path: "/", key: "home" },
  { label: "About", path: "/about", key: "about" },
  {
    label: "Projects",
    path: "/projects",
    key: "projects",
    children: [
      { label: "App Marketplace", path: "/projects#app-marketplace", icon: "fas fa-store" },
      { label: "Patient Fusion", path: "/projects#patient-fusion", icon: "fas fa-user-injured" },
      { label: "Practice Fusion", path: "/projects#practice-fusion", icon: "fas fa-clinic-medical" },
    ],
  },
  {
    label: "Services",
    path: "/services",
    key: "services",
    children: [
      {
        label: "Transcription Support",
        path: "/services/transcription",
        icon: "fas fa-headset",
        children: [
          { label: "Medical", path: "/services/transcription/medical", icon: "fas fa-stethoscope" },
          { label: "Legal", path: "/services/transcription/legal", icon: "fas fa-balance-scale" },
          { label: "General", path: "/services/transcription/general", icon: "fas fa-file-alt" },
          { label: "Academic", path: "/services/transcription/academic", icon: "fas fa-graduation-cap" },
          { label: "Corporate/Business", path: "/services/transcription/corporate", icon: "fas fa-building" },
        ],
      },
      {
        label: "Data Entry",
        path: "/services/data-entry",
        icon: "fas fa-keyboard",
        children: [
          { label: "Waybill/Invoice/Charge", path: "/services/data-entry/waybill-invoice", icon: "fas fa-file-invoice" },
          { label: "Batch Proof Report", path: "/services/data-entry/batch-proof", icon: "fas fa-clipboard-check" },
        ],
      },
      {
        label: "EMR",
        path: "/services/emr",
        icon: "fas fa-laptop-medical",
        children: [
          { label: "Data Entry & Digitalization", path: "/services/emr/data-entry", icon: "fas fa-database" },
          { label: "Data Migration", path: "/services/emr/data-migration", icon: "fas fa-exchange-alt" },
          { label: "EMR Management", path: "/services/emr/management", icon: "fas fa-tasks" },
        ],
      },
      {
        label: "Document Conversion",
        path: "/services/document-conversion",
        icon: "fas fa-file-export",
        children: [
          { label: "OCR & Data Extraction", path: "/services/document-conversion/ocr-data-extraction", icon: "fas fa-search-plus" },
          { label: "File Format Conversion", path: "/services/document-conversion/file-format-conversion", icon: "fas fa-file-import" },
          { label: "Book and Ebook Conversion", path: "/services/document-conversion/book-ebook-conversion", icon: "fas fa-book" },
          { label: "Indexing & Redaction", path: "/services/document-conversion/indexing-redaction", icon: "fas fa-highlighter" },
        ],
      },
      {
        label: "CAD",
        path: "/services/cad",
        icon: "fas fa-drafting-compass",
        children: [
          { label: "Architectural Drafting", path: "/services/cad/architectural-drafting", icon: "fas fa-building" },
          { label: "Structural Drafting", path: "/services/cad/structural-drafting", icon: "fas fa-hard-hat" },
          { label: "MEP & HVAC", path: "/services/cad/mep-hvac", icon: "fas fa-fan" },
          { label: "3D Visualization", path: "/services/cad/3d-visualization", icon: "fas fa-cube" },
        ],
      },
      {
        label: "E-commerce Product Listing",
        path: "/services/product-listing",
        icon: "fas fa-shopping-cart",
        children: [
          { label: "Data Cleaning & Validation", path: "/services/product-listing/data-cleaning-validation", icon: "fas fa-broom" },
          { label: "Data Extraction", path: "/services/product-listing/data-extraction", icon: "fas fa-download" },
        ],
      },
    ],
  },
];
