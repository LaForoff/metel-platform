import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar";

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [canExpandSidebar, setCanExpandSidebar] = useState(() => window.innerWidth >= 1100);

  useEffect(() => {
    function updateSidebarRoom() {
      setCanExpandSidebar(window.innerWidth >= 1100);
    }

    updateSidebarRoom();
    window.addEventListener("resize", updateSidebarRoom);

    return () => window.removeEventListener("resize", updateSidebarRoom);
  }, []);

  return (
    <main className="app-viewport w-screen overflow-hidden bg-[#F7F7F8]">
      <div className="flex h-full min-h-0 w-full overflow-hidden bg-white">
        <Sidebar
          collapsed={!canExpandSidebar || sidebarCollapsed}
          canToggle={canExpandSidebar}
          onToggle={() => {
            if (canExpandSidebar) {
              setSidebarCollapsed((collapsed) => !collapsed);
            }
          }}
        />
        <Outlet />
      </div>
    </main>
  );
}
