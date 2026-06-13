import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	typescript: { ignoreBuildErrors: true },
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 's3.ru1.storage.beget.cloud',
				pathname: '/5495456e8eff-dobrostroy25/**'
			}
		]
	}
}

export default nextConfig
