import React from 'react';
import DupeClient from './DupeClient';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VoidBin | Duplicate Paste",
  description: "Create a copy of an existing paste with optional modifications - maintain the same security with a new instance",
  keywords: ["duplicate", "copy", "paste", "encryption", "private"],
  openGraph: {
    title: "VoidBin | Duplicate Paste",
    description: "Create a copy of an existing paste with optional modifications - maintain the same security with a new instance",
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

export default function DupePage() {
  return <DupeClient />;
}
