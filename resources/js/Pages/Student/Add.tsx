import {
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	useToast
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import React from "react";

const AddStudentButton = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { data, setData, post, processing, errors,reset,clearErrors } = useForm({
		name: '',
	})
	const toast = useToast();

	function submit(e : React.FormEvent) {
		e.preventDefault()
		post('/students', {
			preserveScroll:true,
			onSuccess: () => {
				reset();
				onClose();
				toast ({
					title: 'Student Added',
					status: 'success',
					isClosable: true,
					duration: 2000,
				})
			}
		})
	}

	const handleClose = () => {
		reset();
		clearErrors();
		onClose();
	}

	return (
		<>
			<Button onClick={onOpen} colorScheme="teal">
				Add Student
			</Button>

			<Modal onClose={handleClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add Student</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={submit}>
						<ModalBody>
							<FormControl isInvalid={!!errors.name}>
								<FormLabel>Name</FormLabel>
								<Input type="text" value={data.name} onChange={e => setData('name', e.target.value)} />
								{!errors.name ? (
									<FormHelperText>
										Must be student's full name.
									</FormHelperText>
								) : (
									<FormErrorMessage>{errors.name}</FormErrorMessage>
								)}
							</FormControl>
						</ModalBody>
						<ModalFooter className="gap-2">
							<Button onClick={handleClose}>Close</Button>
							<Button type="submit" colorScheme="teal" isLoading={processing} disabled={processing} >Save</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddStudentButton;
