import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: 'RenderCV - Professional LaTeX Resume Generator',
  description: 'Create a polished, ATS-friendly resume in LaTeX format with ease.',
  keywords: ['resume', 'latex', 'CV', 'generator', 'ATS-friendly', 'professional resume'],
  openGraph: {
    title: 'RenderCV - Professional LaTeX Resume Generator',
    description: 'Create a polished, ATS-friendly resume in LaTeX format with ease.',
    url: '/image.png',
    siteName: 'RenderCV',
    images: [
      {
        url:  '/image.png', 
        width: 800,
        height: 600,
        alt: 'RenderCV Resume Generator',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RenderCV - Professional LaTeX Resume Generator',
    description: 'Create a polished, ATS-friendly resume in LaTeX format with ease.',
    creator: '@yourtwitterhandle', // Your Twitter handle
    images: [ '/image.png'], // Replace with your actual Twitter image
  },
  // Add more as needed, e.g., viewport, theme-color
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#1A3636',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
