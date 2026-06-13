export interface IFeedback {
	id: string
	name: string
	email: string
	phone: string
	text?: string
}

export interface IFeedbackCreate extends Omit<IFeedback, 'id'> {}
