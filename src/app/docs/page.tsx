import React from 'react';
import DocsClient from './DocsClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VoidBin | Documentation & Usage Guide",
  description: "Learn how to use VoidBin's secure paste sharing features, encryption details, and API documentation",
  keywords: ["documentation", "guide", "tutorial", "encryption", "API", "VoidBin"],
  openGraph: {
    title: "VoidBin | Documentation & Usage Guide",
    description: "Learn how to use VoidBin's secure paste sharing features, encryption details, and API documentation",
    type: "website",
    images: [
      {
        url: "/logo_text.png",
        width: 1200,
        height: 630,
        alt: "VoidBin"
      }
    ]
  }
};

export default function DocsPage() {
  return <DocsClient />;
}
