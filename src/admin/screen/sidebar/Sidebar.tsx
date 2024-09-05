import SidebarContent from "./SidebarContent";

const Sidebar = () => {
  return (
    <aside
      id="default-sidebar"
      className="hidden h-screen w-64 sm:px-6 md:block lg:px-8"
      aria-label="Sidebar"
    >
      <SidebarContent />
    </aside>
  );
};

export default Sidebar;
