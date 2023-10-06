import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/shared/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Books App',
  description: 'A Next.js 13 Books Application with Supabase'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-row ">
          <div className="w-full min-h-screen bg-[#877676]">
            <Navbar />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
