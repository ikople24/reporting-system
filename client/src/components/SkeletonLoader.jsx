const SkeletonLoader = () => {
  return (
    <div className="animate-pulse flex flex-col space-y-4 p-4">
      <div className="h-6 bg-gray-300 rounded"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-48 bg-gray-300 rounded"></div>
    </div>
  );
};

export default SkeletonLoader;
