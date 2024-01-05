import { z } from 'zod'

export const errorSchema = z
	.object({
		id: z.string(),
		message: z.string(),
	})
	.array()

export type ErrorProps = z.infer<typeof errorSchema>

export interface IGetErrorProps {
	inputId: string
	errorObject: ErrorProps
}

export function getError({ inputId, errorObject }: IGetErrorProps): ErrorProps {
	const idValidate = z.string().min(1)

	const id = idValidate.parse(inputId)
	const error = errorSchema.parse(errorObject)

	return error.filter((err) => err.id === id)
}
