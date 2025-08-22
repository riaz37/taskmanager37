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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
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
                <div className="flex-1 flex flex-col">{children}</div>
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
                    boxShadow: "var(--shadow-lg)",
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
