import type { Metadata } from 'next'
import { getSeoForPage, buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
	const seo = await getSeoForPage('contacts')

	return buildMetadata(seo, {
		title: 'Контакты завода Добрострой 25 - Адрес, телефон, график работы',
		description: 'Контакты завода Добрострой 25 во Владивостоке: адрес производства, телефон, email, график работы. Приморский край, г. Владивосток, ул Шошина, Дом 6, офис 3.',
		keywords: 'контакты Добрострой 25, адрес завода Владивосток, телефон завода плитки',
	})
}

export default function ContactsLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
