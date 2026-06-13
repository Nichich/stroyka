import React from 'react'

export function CreateCategoryModal({
	isOpen,
	onClose,
	onCreate,
	isLoading
}: {
	isOpen: boolean
	onClose: () => void
	onCreate: (title: string) => void
	isLoading?: boolean
}) {
	const [title, setTitle] = React.useState('')
	const [error, setError] = React.useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (!title.trim()) {
			setError('Название категории не может быть пустым')
			return
		}
		onCreate(title.trim())
		setTitle('')
		setError('')
	}

	if (!isOpen) return null

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
			<div className='w-full max-w-md rounded-xl bg-white p-6 shadow-lg'>
				<h2 className='text-xl font-semibold text-black mb-4'>
					Создать категорию
				</h2>

				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							htmlFor='category-title'
							className='block text-sm font-medium text-gray-700 mb-1'
						>
							Название категории
						</label>
						<input
							id='category-title'
							type='text'
							value={title}
							onChange={e => setTitle(e.target.value)}
							className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#F0882B] focus:outline-none placeholder-gray-500 text-black'
							placeholder='Например: Тротуарная плитка'
						/>
						{error && (
							<p className='mt-1 text-sm text-red-600'>{error}</p>
						)}
					</div>

					<div className='flex justify-end gap-3'>
						<button
							type='button'
							onClick={onClose}
							disabled={isLoading}
							className='px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-50'
						>
							Отмена
						</button>
						<button
							type='submit'
							disabled={isLoading}
							className='px-4 py-2 bg-[#F0882B] text-white text-sm font-medium rounded-lg hover:bg-[#d97316] disabled:opacity-50'
						>
							{isLoading ? 'Создание...' : 'Создать'}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
