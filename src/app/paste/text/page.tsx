import React from 'react';
import TextClient from './TextClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VoidBin | Text Paste",
  description: "Share text securely with end-to-end encryption - perfect for sensitive information and private notes",
  keywords: ["text", "paste", "encryption", "private", "secure sharing"],
  openGraph: {
    title: "VoidBin | Text Paste",
    description: "Share text securely with end-to-end encryption - perfect for sensitive information and private notes",
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

export default function TextPastePage() {
  return <TextClient />;
}
