"use client";

// This page reuses the same form component as the edit page
// The form component handles both create and edit modes based on the presence of an ID

import dynamic from "next/dynamic";

// Import the form page component
const ContactFormPage = dynamic(() => import("../[id]/page"), { ssr: false });

export default ContactFormPage;
