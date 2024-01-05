'use client'

import { ErrorSpan } from '@/components/ErrorSpan'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ErrorProps } from '@/lib/error'
import { IFormInputsProps, formSchema } from '@/services/login.service'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function Login() {
	const [error, setError] = useState<ErrorProps>([])

	const { control, handleSubmit } = useForm<IFormInputsProps>({
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit: SubmitHandler<IFormInputsProps> = (data) => {
		setError([])

		try {
			const fields = formSchema.parse(data)
			console.log(fields)
		} catch (err) {
			if (err instanceof z.ZodError) {
				err.issues.map((field) => {
					setError([
						...error,
						{
							id: `${field.path[0]}`,
							message: field.message,
						},
					])
				})
			}
		}
	}

	return (
		<main className="w-full min-h-[100vh] flex items-center justify-center bg-slate-200">
			<div className="w-[400px] h-[400px] shadow-sm py-8 px-8 bg-white">
				<h1 className="text-2xl">
					Mark<strong>notes</strong>
				</h1>
				<h2 className="text-xs font-light mt-2 mb-2">
					Please enter your login and password to continue
				</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex flex-col gap-4 mt-8"
				>
					<Controller
						name="email"
						control={control}
						rules={{
							required: true,
						}}
						render={({ field }) => (
							<>
								<Input placeholder="E-mail" {...field} />
								<ErrorSpan inputId="email" errorObject={error} />
							</>
						)}
					/>
					<Controller
						name="password"
						control={control}
						rules={{
							required: true,
						}}
						render={({ field }) => (
							<>
								<Input type="password" placeholder="Password" {...field} />
								<ErrorSpan inputId="password" errorObject={error} />
							</>
						)}
					/>
					<Button type="submit" className="w-full mt-8">
						LOG IN
					</Button>
				</form>
			</div>
		</main>
	)
}
