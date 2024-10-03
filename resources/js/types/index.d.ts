import { Config } from "ziggy-js";

export interface User {
	id: string;
	name: string;
	email: string;
	email_verified_at?: string;
}

export interface Student {
	id: string;
	name: string;
	created_at: string;
}
export interface PaginatedResponse<T> {
  data: T[];
	total: number;
	from: number;
	to: number;
	per_page: number;
	current_page: number;
	last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
  students: PaginatedResponse<Student>;
	studentCount: number;
};
