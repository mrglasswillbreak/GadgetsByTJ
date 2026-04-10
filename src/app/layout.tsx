import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "GadgetsByTJ - Mobile Electronics & Accessories",
  description: "Your one-stop shop for premium phones, tablets, cases, chargers, and mobile accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of unstyled content (FOUC) by applying dark mode class before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: [
              '(function(){',
              '  try {',
              "    var t = localStorage.getItem('theme');",
              "    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;",
              "    if (t === 'dark' || (t === null && prefersDark)) {",
              "      document.documentElement.classList.add('dark');",
              '    }',
              '  } catch(e) {}',
              '})();',
            ].join('\n'),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

