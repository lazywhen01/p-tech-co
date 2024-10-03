import { EditIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { useForm } from '@inertiajs/react';
import React from 'react'

type Props = {
	students : {
		id: string;
		name : string;
		created_at : string;
	}
}
const UpdateStudent = ( { students }: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { data, setData, patch, processing, errors,reset,clearErrors,setDefaults } = useForm({
		name: students.name,
	});
	const toast = useToast();

	function onUpdate(e : React.FormEvent) {
		e.preventDefault()
		patch(`/students/${students.id}`, {
			preserveScroll:true,
			onSuccess: () => {
				reset();
				onClose();
				toast ({
					title: 'Student Updated',
					status: 'info',
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
			<IconButton
				variant="outline"
				colorScheme="teal"
				aria-label="Call Sage"
				fontSize="16px"
				size="xs"
				icon={<EditIcon />}
				onClick={onOpen}
			/>

			<Modal onClose={handleClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Update Student</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={onUpdate}>
						<ModalBody>
							<FormControl isInvalid={!!errors.name}>
								<FormLabel>Name</FormLabel>
								<Input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
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
}

export default UpdateStudent