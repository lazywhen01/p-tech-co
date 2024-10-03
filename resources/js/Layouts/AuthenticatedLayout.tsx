import { useState, PropsWithChildren, ReactNode, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { User } from "@/types";
import { Box, Icon, IconButton, Image, Text } from "@chakra-ui/react";
import logo from "../../../public/images/sidebar/logo.png";
import {
	AiFillHome,
	AiOutlineAlignLeft,
	AiOutlineCalendar,
	AiOutlineClose,
} from "react-icons/ai";
import { useRecoilState } from "recoil";
import { sidebarState } from "@/State/sidebarState";
export default function Authenticated({
	user,
	children,
}: PropsWithChildren<{ user: User; }>) {
	const [showingNavigationDropdown, setShowingNavigationDropdown] =
		useState(false);
	const [expanded, setExpanded] = useRecoilState(sidebarState);

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 flex">
			<aside
				className={
					"bg-white dark:bg-[#008080] py-6 hidden sm:block transition-all duration-150 ease-in-out space-y-10" +
					(expanded ? " w-64" : " w-[102px]")
				}
			>
				<nav
					className={
						"flex flex-col space-y-4 transition-all duration-150 ease-in-out px-5 items-center justify-center"
					}
				>
					<Box className="flex items-center justify-center">
						<Image
							src={logo}
							alt="Dan Abramov"
							boxSize="50px"
							objectFit="cover"
						/>
						<Text
							fontSize="lg"
							className={
								"transition-all ease-in-out duration-100 whitespace-nowrap" +
								(expanded ? " " : " hidden")
							}
							color="teal"
							fontWeight={"bold"}
						>
							P Tech Co.
						</Text>
					</Box>
					<NavLink
						href={route("dashboard")}
						active={route().current("dashboard")}
						className="flex space-x-2"
						expanded={expanded}
					>
						<Icon as={AiFillHome} w={4} h={4} />
						{expanded && <h4 className="text-sm">Dashboard</h4>}
					</NavLink>

					<NavLink
						href={route("students.index")}
						active={route().current("students.*")}
						className="flex space-x-2"
					>
						<Icon as={AiOutlineCalendar} w={4} h={4} />
						{expanded && <h4 className="text-sm">Students</h4>}
					</NavLink>
				</nav>
			</aside>

			<div className="w-full">
				<nav className="bg-white">
					<div className="max-w-full px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between items-center h-16">
							<IconButton
								aria-label="Responsive Menu"
								icon={<AiOutlineAlignLeft />}
								onClick={() =>
									setExpanded((expanded: boolean) => {
										return !expanded;
									})
								}
								variant={"outline"}
								colorScheme="teal"
								className="p-2 rounded-md"
							/>

							<div className="hidden sm:flex sm:items-center sm:ms-6">
								<div className="ms-3 relative">
									<Dropdown>
										<Dropdown.Trigger>
											<span className="inline-flex rounded-md">
												<button
													type="button"
													className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
												>
													{user.name}

													<svg
														className="ms-2 -me-0.5 h-4 w-4"
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
															clipRule="evenodd"
														/>
													</svg>
												</button>
											</span>
										</Dropdown.Trigger>

										<Dropdown.Content>
											<Dropdown.Link href={route("profile.edit")}>
												Profile
											</Dropdown.Link>
											<Dropdown.Link
												href={route("logout")}
												method="post"
												as="button"
											>
												Log Out
											</Dropdown.Link>
										</Dropdown.Content>
									</Dropdown>
								</div>
							</div>

							<div className="-me-2 flex items-center sm:hidden">
								<IconButton
									aria-label="Responsive Menu"
									icon={
										!showingNavigationDropdown ? (
											<AiOutlineAlignLeft />
										) : (
											<AiOutlineClose />
										) // or any other icon
									}
									onClick={() =>
										setShowingNavigationDropdown(
											(previousState) => !previousState
										)
									}
									variant={"outline"}
									className="inline-flex items-center justify-center p-2 rounded-md transition duration-150 ease-in-out"
								/>
							</div>
						</div>
					</div>

					<div
						className={
							(showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"
						}
					>
						<div className="pt-2 pb-3 space-y-1">
							<ResponsiveNavLink
								href={route("dashboard")}
								active={route().current("dashboard")}
							>
								Dashboard
							</ResponsiveNavLink>
						</div>

						<div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
							<div className="px-4">
								<div className="font-medium text-base text-gray-800 dark:text-gray-200">
									{user.name}
								</div>
								<div className="font-medium text-sm text-gray-500">
									{user.email}
								</div>
							</div>

							<div className="mt-3 space-y-1">
								<ResponsiveNavLink href={route("profile.edit")}>
									Profile
								</ResponsiveNavLink>
								<ResponsiveNavLink
									method="post"
									href={route("logout")}
									as="button"
								>
									Log Out
								</ResponsiveNavLink>
							</div>
						</div>
					</div>
				</nav>

				<main>{children}</main>
			</div>
		</div>
	);
}
