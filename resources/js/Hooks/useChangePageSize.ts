import { router } from "@inertiajs/react";
import { useState } from "react";

const useChangePageSize = (url: string) => {	
	const [pageSize, setPageSize] = useState(5);

	const onPageSizeChange = (e: any) => {
		e.preventDefault();
		const currPageSize = e.target.value;
		setPageSize(parseInt(currPageSize));
		router.get(url, {
			paginate: parseInt(currPageSize)
		}, {preserveState: true, replace: true});
	} 

	return { onPageSizeChange, pageSize };

}

export default useChangePageSize;