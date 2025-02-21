export default function ProfileSkeleton() {
    return (
      <div className="w-full  text-white">
        {/* Mobile Layout (default) */}
        <div className="block md:hidden animate-pulse">
          <div className="flex flex-col items-center p-4 gap-3">
            <div className="w-24 h-24 rounded-full bg-gray-700" />
            <div className="flex flex-col items-center gap-2 w-full">
              <div className="h-7 w-48 bg-gray-700 rounded-full" />
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-gray-700 rounded-sm" />
                <div className="h-5 w-64 bg-gray-700/60 rounded-full" />
                <div className="h-5 w-5 bg-gray-700/60 rounded-sm" />
              </div>
            </div>
          </div>
        </div>
  
        {/* Desktop Layout */}
        <div className="hidden md:block animate-pulse">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-32 h-32 rounded-full bg-gray-700 flex-shrink-0" />
            <div className="flex flex-col gap-3 pt-2">
              <div className="h-8 w-64 bg-gray-700 rounded-full" />
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-gray-700 rounded-sm" />
                <div className="h-5 w-80 bg-gray-700/60 rounded-full" />
                <div className="h-5 w-5 bg-gray-700/60 rounded-sm" />
              </div>
            </div>
            <div className="ml-auto">
              <div className="h-8 w-8 bg-gray-700 rounded-sm" />
            </div>
          </div>
        </div>
      </div>
    )
  }