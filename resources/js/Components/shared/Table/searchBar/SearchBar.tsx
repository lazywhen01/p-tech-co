import useSearch from "@/Hooks/useSearch";
import { Box, Input } from "@chakra-ui/react";

type Props = {
	url: string;
}
const SearchBar = ({ url } : Props) => {
	const { onSearch, search } = useSearch(url);
	return (
		<Box>
			<Input
				placeholder="Search"
				size="md"
				onChange={onSearch}
				className="w-96"
				value={search}
				type="search"
			/>
		</Box>
	);
};

export default SearchBar;
