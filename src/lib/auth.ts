async function getServerSideProps(ctx: { req: { headers: { cookie: any } } }) {
	const res = await fetch('localhost', {
		headers: {
			cookie: ctx.req.headers.cookie || ''
		}
	})

	if (res.status === 401) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false
			}
		}
	}

	return { props: {} }
}
