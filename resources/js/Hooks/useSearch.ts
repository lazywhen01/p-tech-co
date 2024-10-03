import { router } from "@inertiajs/react";
import { useState } from "react";

const useSearch = (url: string) => {
	const [search, setSearch] = useState('');

	const onSearch = (e: any) => {
		const currSearch = e.target.value;
		setSearch(currSearch);
	
		const timer = setTimeout(() => {
			if (currSearch === '') {
				router.get(url, {}, { replace: true });
			} else {
				router.get(url, { search: currSearch }, { replace: true, preserveState: true });
			}
		}, 300);
	
		return () => clearTimeout(timer);
	};

	return { onSearch, search }
}

export default useSearch