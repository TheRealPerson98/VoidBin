import React from 'react';
import Main from './Main';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VoidBin | Secure & Private Pastebin Alternative",
  description: "Share code and text with end-to-end encryption. Your data never touches our servers in readable form.",
  keywords: ["pastebin", "encryption", "private", "secure", "code sharing", "end-to-end"],
  openGraph: {
    title: "VoidBin | Secure & Private Pastebin Alternative",
    description: "Share code and text with end-to-end encryption. Your data never touches our servers in readable form.",
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

export default function MainPage() {
  return <Main />;
}
