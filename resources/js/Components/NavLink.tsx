import { Link, InertiaLinkProps } from "@inertiajs/react";

export default function NavLink({
	active = false,
	className = "",
	children,
	expanded = false,
	...props
}: InertiaLinkProps & { active: boolean }) {
	return (
		<Link
			{...props}
			className={
				"inline-flex items-center py-4 px-6 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none w-full " + 
				(active
					? "bg-[#008080] dark:bg-white text-white font-bold  dark:text-[#008080] focus:bg-[#008080] rounded-2xl drop-shadow-custom "
					: "text-[#008080] dark:text-[#008080] hover:text-white dark:hover:text-[#008080] focus:text-white dark:focus:text-[#008080] rounded-2xl hover:bg-[#008080] dark:bg-white ") +
				className
			}
		>
			{children}
		</Link>
	);
}
