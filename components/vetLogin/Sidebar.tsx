import { menuItems } from "@/constants";
import Link from "next/link";
import { useSubscriptionStatus } from "../../hooks/useSubscriptionStatus";

const Sidebar = () => {
  const { isStatusDisabled: isDisabled } = useSubscriptionStatus();

  return (
    <div className="hidden md:block fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg">
      <div className="flex flex-col h-full">
        {menuItems.map((item) => {
          const isAllowed = !isDisabled || item.allowedWhenDisabled;

          return (
            <div
              key={item.href}
              className={`relative ${!isAllowed ? "opacity-50" : ""}`}
            >
              <Link
                href={isAllowed ? item.href : "#"}
                onClick={(e) => {
                  if (!isAllowed) {
                    e.preventDefault();
                  }
                }}
                className={`
                  flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100
                  ${!isAllowed ? "cursor-not-allowed" : "hover:text-indigo-600"}
                `}
              >
                {item.icon && <span className="mr-3">{item.icon}</span>}
                <span>{item.name}</span>
                {!isAllowed && (
                  <span className="ml-2 text-xs text-gray-500">
                    (No disponible)
                  </span>
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
