const ServicesPageSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex justify-between items-center">
        <h2 className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-36 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Services count */}
      <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Service Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Time slot */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Days */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-6 w-16 bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>

          {/* Description */}
          <div className="h-16 w-full bg-gray-200 rounded animate-pulse" />

          {/* Buttons */}
          <div className="flex gap-2 mt-4">
            <div className="h-10 flex-grow bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>

        {/* Service Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div className="flex justify-between items-center">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Time slot */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-gray-200 rounded animate-pulse" />
            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Days */}
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-6 w-16 bg-gray-200 rounded animate-pulse"
              />
            ))}
          </div>

          {/* Description */}
          <div className="h-16 w-full bg-gray-200 rounded animate-pulse" />

          {/* Buttons */}
          <div className="flex gap-2 mt-4">
            <div className="h-10 flex-grow bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPageSkeleton;
