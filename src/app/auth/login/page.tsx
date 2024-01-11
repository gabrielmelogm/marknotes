'use client'

import { ErrorSpan } from '@/components/ErrorSpan'
import { Spinner } from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/api'
import { ErrorProps } from '@/lib/error'
import { IFormInputsProps, formSchema } from '@/services/login.service'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

export default function Login() {
	const { LogIn } = useAuth()
	const { toast } = useToast()
	const { control, handleSubmit } = useForm<IFormInputsProps>({
		defaultValues: {
			email: '',
			password: '',
		},
	})
	const router = useRouter()

	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<ErrorProps>([])

	const onSubmit: SubmitHandler<IFormInputsProps> = async (data) => {
		setError([])
		setLoading(true)

		try {
			const fields = formSchema.parse(data)
			await LogIn(fields.email, fields.password)
				.then(() => {
					router.push('/')
				})
				.catch((error) => console.error(error))
		} catch (err) {
			if (err?.response.status === 401) {
				toast({
					variant: 'destructive',
					title: 'Email or password is incorrect',
					description: 'Check that yours are correct',
				})
			}

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
		} finally {
			setLoading(false)
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
					<Button type="submit" className="w-full mt-8" isLoading={loading}>
						{loading ? <Spinner /> : 'LOG IN'}
					</Button>
				</form>
			</div>
		</main>
	)
}
