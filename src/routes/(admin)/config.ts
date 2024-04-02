import { Inbox, File, Send } from "lucide-svelte"

import type { Icon } from "lucide-svelte";
import type { ComponentType } from "svelte";

export type Route = {
	title: string;
	label: string;
	icon: ComponentType<Icon>;
	variant: "default" | "ghost";
};

export const primaryRoutes: Route[] = [
	{
		title: "Inbox",
		label: "128",
		icon: Inbox,
		variant: "default",
	},
	{
		title: "Drafts",
		label: "9",
		icon: File,
		variant: "ghost",
	},
	{
		title: "Sent",
		label: "",
		icon: Send,
		variant: "ghost",
	},

];

export const secondaryRoutes: Route[] = [
	{
		title: "Social",
		label: "972",
		icon: Send,
		variant: "ghost",
	}
];
