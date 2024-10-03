import SidebarContent from "./SidebarContent";

const Sidebar = () => {
	return (
		<aside
			id="default-sidebar"
			className="fixed top-[4rem] z-50 hidden h-[calc(100vh-4rem)] w-64 overflow-hidden bg-foreground/5 sm:px-6 lg:block"
			aria-label="Sidebar"
		>
			<SidebarContent />
		</aside>
	);
};

export default Sidebar;
