import { PageProps } from "@/types";
import { DeleteIcon } from "@chakra-ui/icons";
import {
	Button,
	IconButton,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import React from "react";

type Props = {
	studentId: string;
}
const DeleteStudent = ( { studentId }: Props ) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { delete: destroy, errors, processing, reset } = useForm();
	const toast = useToast();

	function onDelete(e: React.FormEvent) {
		e.preventDefault();
		destroy(`/students/${studentId}`, {
			preserveScroll: true,
			onSuccess: () => {
				reset();
				onClose();
				toast({
					title: "Student Deleted",
					status: "error",
					isClosable: true,
					duration: 2000,
				});
			},
		});
	}

	const handleClose = () => {
		reset();
		onClose();
	};

	return (
		<>
			<IconButton
				variant="ghost"
				colorScheme="red"
				aria-label="Call Sage"
				fontSize="16px"
				size="xs"
				icon={<DeleteIcon />}
				onClick={onOpen}
			/>

			<Modal onClose={handleClose} isOpen={isOpen} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Delete Student</ModalHeader>
					<ModalCloseButton />
					<form onSubmit={onDelete}>
						<ModalBody>
							Do you want to delete this student?
						</ModalBody>
						<ModalFooter className="gap-2">
							<Button onClick={handleClose}>Close</Button>
							<Button
								type="submit"
								colorScheme="red"
								isLoading={processing}
								disabled={processing}
							>
								Delete
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
};

export default DeleteStudent;
