import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { RouteFooter, RouteHeader } from "@/components/App/route-chrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://libraryhub.vercel.app"),

  title: {
    default: "LibraryHub | Modern Library Management System",
    template: "%s | LibraryHub",
  },

  description:
    "LibraryHub is a modern cloud-powered Library Management System to browse books, check availability, and manage borrowing seamlessly.",

  keywords: [
    "Library Management System",
    "Digital Library",
    "Online Book Borrowing",
    "Library SaaS",
    "Next.js Library App",
  ],

  authors: [{ name: "Shwetank Morey" }],
  creator: "Shwetank Morey",
  applicationName: "LibraryHub",
  category: "Education",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://libraryhub.vercel.app",
  },

  manifest: "/manifest.json",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title: "LibraryHub | Modern Library Management System",
    description:
      "Browse books, check availability, and manage your reading digitally with LibraryHub.",
    url: "https://libraryhub.vercel.app",
    siteName: "LibraryHub",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png", // place in public/
        width: 1200,
        height: 630,
        alt: "LibraryHub Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "LibraryHub | Modern Library SaaS",
    description: "A cloud-powered digital platform to browse and borrow books.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f4efe7",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} flex min-h-screen flex-col bg-background antialiased`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <RouteHeader />
            <main className="flex-1">
              <TooltipProvider>{children}</TooltipProvider>
            </main>
            <Toaster />
            <RouteFooter />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
