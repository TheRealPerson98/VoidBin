import CodeEditor from '@/components/CodeEditor';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VoidBin | Create New Paste",
  description: "Create a new encrypted paste with VoidBin - your data stays private with end-to-end encryption",
  keywords: ["paste", "encryption", "private", "secure", "code sharing"],
  openGraph: {
    title: "VoidBin | Create New Paste",
    description: "Create a new encrypted paste with VoidBin - your data stays private with end-to-end encryption",
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

export default function PastePage() {
  return (
    <div>
      <CodeEditor />
    </div>
  );
} 