import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
});

export const metadata: Metadata = {
  title: "TaskFlow - Modern Task Management",
  description:
    "A beautiful, intuitive task management application built with Next.js and modern design principles. Organize your work, accomplish more.",
  keywords: ["task management", "productivity", "organization", "workflow"],
  authors: [{ name: "TaskFlow Team" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LoadingProvider>
            <AuthProvider>
              <ThemeTransitionInitializer />
              <div className="relative flex min-h-screen flex-col">
                {children}
              </div>
              <Toaster
                position="top-right"
                richColors
                closeButton
                duration={4000}
                expand={true}
                visibleToasts={5}
                toastOptions={{
                  style: {
                    background: "hsl(var(--card))",
                    color: "hsl(var(--card-foreground))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
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
