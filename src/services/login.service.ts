import z from 'zod'

export const formSchema = z.object({
	email: z
		.string({
			required_error: 'E-mail field is required',
		})
		.email({
			message: 'Invalid e-mail',
		}),
	password: z
		.string()
		.regex(
			new RegExp(
				/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
			),
			{
				message:
					'passwords must be at least 8 characters and contain 1 uppercase, 1 lowercase and 1 number',
			},
		),
})

export type IFormInputsProps = z.infer<typeof formSchema>
