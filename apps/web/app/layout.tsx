import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/auth-context";
import { LoadingProvider } from "@/lib/contexts/loading-context";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ThemeTransitionInitializer } from "@/components/ThemeTransitionInitializer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "TaskFlow - Modern Task Management",
    template: "%s | TaskFlow"
  },
  description:
    "A beautiful, intuitive task management application built with Next.js and modern design principles. Organize your work, accomplish more, and boost productivity with intelligent features.",
  keywords: [
    "task management", 
    "productivity", 
    "organization", 
    "workflow", 
    "team collaboration",
    "project management",
    "todo list",
    "task tracking"
  ],
  authors: [{ name: "TaskFlow Team", url: "https://taskflow.app" }],
  creator: "TaskFlow Team",
  publisher: "TaskFlow",
  category: "productivity",
  applicationName: "TaskFlow",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://taskflow.app",
    title: "TaskFlow - Modern Task Management",
    description: "Organize your work, accomplish more with beautiful, intuitive task management.",
    siteName: "TaskFlow",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaskFlow - Modern Task Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskFlow - Modern Task Management",
    description: "Organize your work, accomplish more with beautiful, intuitive task management.",
    images: ["/og-image.png"],
    creator: "@taskflow",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body 
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary-foreground`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          storageKey="taskflow-theme"
        >
          <LoadingProvider>
            <AuthProvider>
              <ThemeTransitionInitializer />
              <div className="relative flex min-h-screen flex-col bg-background">
                <div className="flex-1 flex flex-col">
                  {children}
                </div>
              </div>
              <Toaster
                position="top-right"
                richColors
                closeButton
                duration={4000}
                expand={true}
                visibleToasts={5}
                toastOptions={{
                  className: "animate-in slide-in-from-top-2",
                  style: {
                    background: "hsl(var(--card))",
                    color: "hsl(var(--card-foreground))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius-lg)",
                    boxShadow: "var(--shadow-xl)",
                    backdropFilter: "blur(16px) saturate(180%)",
                  },
                }}
              />
            </AuthProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
