import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, Link, router } from "@inertiajs/react";
import {
	Box,
	Button,
	Flex,
	Input,
	TableContainer,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/Components/shared/Table";
import AddStudentButton from "./Add";
import useFormatDate from "@/Hooks/useFormatDate";
import DeleteStudent from "./Delete";
import UpdateStudent from "./Update";
import "../../../css/table.css";
import SelectPageSize from "@/Components/shared/Table/pageSize/SelectPageSize";
import { useState } from "react";
import SearchBar from "@/Components/shared/Table/searchBar/SearchBar";

const StudentDashboard = ({ auth, students }: PageProps) => {

	const { formatDate } = useFormatDate();

	return (
		<AuthenticatedLayout
			user={auth.user}
		>
			<Head title="Student Dashboard" />

			<Box className="py-12">
				<Box className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					<Box className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4">
						<Flex justifyContent="space-between">
							<SearchBar url="/students" />
							<AddStudentButton />
						</Flex>
						<Flex justifyContent="end" className="mt-4">
							<SelectPageSize url="/students" />
						</Flex>

						<TableContainer className="my-16">
							<Table variant="striped" size={"sm"}>
								<Thead>
									<Tr>
										<Th>Name</Th>
										<Th>Created At</Th>
										<Th>Action</Th>
									</Tr>
								</Thead>
								<Tbody>
									{students.data.map(
										(student: {
											id: string;
											name: string;
											created_at: string;
										}) => (
											<>
												<Tr key={student.id}>
													<Td>{student.name}</Td>
													<Td>{formatDate(student.created_at)}</Td>
													<Td className="space-x-4">
														<UpdateStudent students={student} />
														<DeleteStudent studentId={student.id}  />
													</Td>
												</Tr>
											</>
										)
									)}
								</Tbody>
							</Table>
						</TableContainer>

						<Flex justifyContent={"space-between"}>
							<Box>
								Showing {students.from} to {students.to} of {students.total} entries
							</Box>
							<Flex justifyContent='end'>
								{students.links.map((link) =>
									link.url ? (
										<Flex className="mx-1">
											<Button
												colorScheme="teal"
												variant={link.active ? "solid" : "outline"}
												key={link.label}
												size="sm"
												borderRadius={"full"}
											>
												<Link
													key={link.label}
													href={link.url}
													dangerouslySetInnerHTML={{ __html: link.label }}
												/>
											</Button>
										</Flex>
									) : (
										<Button className="mx-1" size="sm">
											<span
												key={link.label}
												className="mx-1 p-1 text-slate-200"
												dangerouslySetInnerHTML={{ __html: link.label }}
											/>
										</Button>
									)
								)}
							</Flex>
						</Flex>
					</Box>
				</Box>
			</Box>
		</AuthenticatedLayout>
	);
};

export default StudentDashboard;
