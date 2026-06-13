import type { Metadata } from 'next'
import { getSeoForPage, buildMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
	const seo = await getSeoForPage('certificates')

	return buildMetadata(seo, {
		title: 'Сертификаты качества продукции - Добрострой 25',
		description: 'Сертификаты соответствия и качества на тротуарную плитку, блоки и бордюры. Вся продукция сертифицирована и соответствует ГОСТ.',
		keywords: 'сертификаты на плитку, сертификаты качества, ГОСТ тротуарная плитка',
	})
}

export default function CertificatesLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
