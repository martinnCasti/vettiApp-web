const SidebarSkeleton = () => {
  return (
    <div className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg">
      <div className="flex flex-col h-full">
        {/* Simulamos 6 items del menú */}
        {[...Array(6)].map((_, index) => (
          <div key={index} className="px-6 py-3">
            <div className="flex items-center">
              {/* Skeleton para el icono */}
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mr-3" />
              {/* Skeleton para el texto del menú */}
              <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarSkeleton;
