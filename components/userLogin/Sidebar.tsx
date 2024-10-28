import Link from "next/link";
import { MENU_ITEMS } from "@/constants";

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-400 shadow-lg h-[calc(100vh-4rem)] fixed">
      <nav className="mt-4">
        <ul className="space-y-2">
          {MENU_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-slate-300 hover:text-gray-900 transition-colors duration-200"
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
