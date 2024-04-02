import { Map, LocateIcon, Grid, User, Book, Settings } from "lucide-svelte"

import type { Icon } from "lucide-svelte";
import type { ComponentType } from "svelte";

export type Route = {
	href: string,
	title: string;
	label: string;
	icon: ComponentType<Icon>;
	variant: "default" | "ghost";
};

export const primaryRoutes: Route[] = [
	{
		href: "/dashboard",
		title: "Dashboard",
		label: "",
		icon: Grid,
		variant: "default",
	},
	{
		href: "/map",
		title: "Map",
		label: "",
		icon: Map,
		variant: "ghost",
	},
	{
		href: "/markings",
		title: "Pontos Mapeados",
		label: "",
		icon: LocateIcon,
		variant: "ghost",
	},
	{
		href: "/utentes",
		title: "Utentes",
		label: "",
		icon: User,
		variant: "ghost",
	},
	{
		href: "/licencas",
		title: "Licenças",
		label: "",
		icon: Book,
		variant: "ghost",
	},

];

export const secondaryRoutes: Route[] = [
	{
		href: "/settings",
		title: "Social",
		label: "",
		icon: Settings,
		variant: "ghost",
	}
];
