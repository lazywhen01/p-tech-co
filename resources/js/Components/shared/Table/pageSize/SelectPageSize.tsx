import useChangePageSize from "@/Hooks/useChangePageSize";
import { Box, Select } from "@chakra-ui/react";

type Props = {
	url : string
}
const SelectPageSize = ({url} : Props) => {
	const {onPageSizeChange,pageSize} = useChangePageSize(url);

	return (
		<Box>
			<Select
				className="py-0"
				onChange={onPageSizeChange}
				defaultValue={pageSize}
			>
				<option value="5">5</option>
				<option value="10">10</option>
				<option value="20">20</option>
			</Select>
		</Box>
	);
};

export default SelectPageSize;
