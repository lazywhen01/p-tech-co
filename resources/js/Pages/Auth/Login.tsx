import { FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import {
	Box,
	Card,
	CardBody,
	Input,
	Text,
	Checkbox,
	Link,
	Button,
	FormControl,
	FormLabel,
	FormErrorMessage,
	CardHeader,
	Heading,
} from "@chakra-ui/react";

export default function Login({
	status,
	canResetPassword,
}: {
	status?: string;
	canResetPassword: boolean;
}) {
	const { data, setData, post, processing, errors, reset } = useForm({
		email: "",
		password: "",
		remember: false,
	});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route("login"), {
			onFinish: () => reset("password"),
		});
	};

	return (
		<GuestLayout>
			<Head title="Log in" />

			{status && (
				<div className="mb-4 font-medium text-sm text-green-600">{status}</div>
			)}
			<form onSubmit={submit}>
				<Card>
					<CardHeader>
						<Heading size='md'>Sign In</Heading>
					</CardHeader>
					<CardBody className="flex flex-col space-y-4">
						<Box>
							<FormControl isInvalid={!!errors.email}>
								<FormLabel fontSize='sm'>Email</FormLabel>
								<Input type="text" value={data.email} onChange={e => setData('email', e.target.value)} />
								{!errors.email ? (
									''
								) : (
									<FormErrorMessage>{errors.email}</FormErrorMessage>
								)}
							</FormControl>
						</Box>
						<Box>
							<FormControl isInvalid={!!errors.password}>
								<FormLabel fontSize='sm'>Password</FormLabel>
								<Input type="password" value={data.password} onChange={e => setData('password', e.target.value)} />
								{!errors.password ? (
									''
								) : (
									<FormErrorMessage>{errors.password}</FormErrorMessage>
								)}
							</FormControl>
						</Box>
						<Button colorScheme="teal" type="submit">Sign In</Button>
						<Box className="flex justify-between">
							<Checkbox
								name="remember"
								size="xs"
								fontSize="xs"
								colorScheme="teal"
								onChange={(e) => setData("remember", e.target.checked)}
								checked={data.remember}
							>
								Remember Me
							</Checkbox>
							{canResetPassword && (
								<Link href={route("password.request")} fontSize="sm">
									Forgot Password?
								</Link>
							)}
						</Box>
					</CardBody>
				</Card>
			</form>
		</GuestLayout>
	);
}
