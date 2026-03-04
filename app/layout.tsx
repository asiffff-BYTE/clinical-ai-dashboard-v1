import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import { PatientProvider } from '@/contexts/patient-context'
import './globals.css'

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: 'ClinicalAI - AI-Based Clinical Decision Support',
  description: 'Revolutionizing ICU monitoring with predictive analytics to identify patient risks before they become critical.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_inter.variable} ${_geistMono.variable} font-sans antialiased`}>
        <PatientProvider>
          {children}
        </PatientProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
