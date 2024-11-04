import Link from "next/link";
import { MENU_ITEMS } from "@/constants";

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-400 shadow-lg fixed top-16 bottom-0 left-0">
      <nav className="h-full overflow-y-auto">
        <ul className="space-y-2 py-4">
          {MENU_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-slate-300 hover:text-gray-900 transition-colors duration-200"
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
