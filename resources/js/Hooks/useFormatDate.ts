import { format } from "date-fns";

const useFormatDate = () => {
  const formatDate = (dateString: string): string => {
    if (!dateString) return ""; // Handle empty or invalid date strings
    return format(new Date(dateString), "MMMM do 'of' yyyy");
  };

  return { formatDate };
};

export default useFormatDate;