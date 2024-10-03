import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import { Card, CardBody, CardHeader, Grid, GridItem, Heading, Icon, Text } from '@chakra-ui/react'
import { FaUserGraduate } from "react-icons/fa";

export default function Dashboard({ auth, studentCount }: PageProps) {
	return (
		<AuthenticatedLayout user={auth.user}>
			<Head title="Dashboard" />

			<div className="py-12 mx-40">
				<div className="grid grid-cols-6 gap-10">
					<Card className="col-span-4">
						<CardHeader>
							<Heading size='md'>Client Report</Heading>
							<Text fontSize='sm' color={'gray.500'}>Report summary</Text>
						</CardHeader>
						<CardBody>
							<Grid templateColumns='repeat(5, 1fr)' gap={6}>
								<GridItem w='100%' bg='red.100' rounded={'lg'} padding={4}>
									<Icon as={FaUserGraduate} w={8} h={8} color='red.500' backgroundColor={'red.300'} padding={2} rounded={'full'}/>
									<Text fontWeight={'bold'} fontSize={'2xl'} margin={'2'}>{studentCount}</Text>
									<Text fontWeight={'regular'} color={'gray.500'} fontSize={'sm'}>Total Students</Text>
								</GridItem>
							</Grid>
						</CardBody>
					</Card>
				</div>
			</div>
		</AuthenticatedLayout>
	);
}
