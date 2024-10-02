import { createDirectus, graphql, rest } from "@directus/sdk";

import { IconFamily } from "@/components/DynamicIcon";

export interface User {
	id: number;
	name: string;
	email: string;
	github_username: string;
	twitter_username: string;
	instagram_username: string;
	discord_username: string;
}

interface Blog {
	id: number;
	status: string;
	date_created: string;
	tags: string[];
	title: string;
	content: string;
	author: User;
	read_time: string;
	slug: string;
}

interface Experience {
	id: number;
	status: string;
	Title: string;
	Company: string;
	Experience: string;
	Start_Date: string;
	End_Date: string;
}

interface TechStack {
	id: number;
	status: string;
	Name: string;
	Logo_Family: IconFamily;
	Logo_Name: string;
}

interface Socials {
	id: number;
	status: string;
	Name: string;
	Link: string;
	Logo_Family: IconFamily;
	Logo_Name: string;
}

export interface Schema {
	Blog: Blog[];
	user: User[];
	Experience: Experience[];
	TechStack: TechStack[];
	Socials: Socials[];
}

const client = createDirectus<Schema>("https://backend.bakaotaku.dev").with(
	rest({
		onRequest: (options) => ({ ...options, cache: "no-store" })
	})
);

export default client;
