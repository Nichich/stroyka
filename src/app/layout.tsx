import type { Metadata } from 'next'
import { Geist, Geist_Mono, Inter } from 'next/font/google'
import './globals.css'
import React from 'react'

import Header from "@/components/header";
import Footer from "@/components/footer";
import LayoutClient from './LayoutClient'
import { getSeoForPage, buildMetadata } from '@/lib/seo'

const inter = Inter({
	subsets: ['latin', 'cyrillic'],
	variable: '--font-inter',
	display: 'swap'
})

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
})

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoForPage('home')

  const baseMetadata = buildMetadata(seo, {
    title: "Добрострой 25 - Качественные вибропрессованные изделия",
    description: "Производство качественных вибропрессованных изделий на Дальнем Востоке. Цены производителя, все типоразмеры в наличии. Доставка по всему Дальнему Востоку.",
    keywords: "тротуарная плитка Владивосток, бордюры, стеновые блоки, производство плитки, цены на плитку, вибропрессованные изделия",
  })

  return {
    ...baseMetadata,
    title: {
      default: baseMetadata.title as string,
      template: "%s | Добрострой 25"
    },
    authors: [{ name: "Добрострой 25" }],
    creator: "Добрострой 25",
    publisher: "Добрострой 25",
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      ...baseMetadata.openGraph,
      type: "website",
      locale: "ru_RU",
      siteName: "Добрострой 25",
    },
    verification: {},
  }
}

export default function RootLayout({
									   children
								   }: Readonly<{
	children: React.ReactNode;
}>) {

  const path = typeof window === 'undefined' ? '' : window.location.pathname

  const hiddenRoutes = ['/auth']

  const hide = hiddenRoutes.includes(path)

  return (
    <html lang="ru">
      <body className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
