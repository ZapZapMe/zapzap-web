export default function LoadingSkeleton() {
    return (
      <div className="flex flex-col gap-1.5 sm:gap-2 p-3 sm:p-4  text-white animate-pulse rounded-md">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-700" />
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="h-3 sm:h-4 w-20 sm:w-24 bg-gray-700 rounded" />
              <div className="h-3 sm:h-4 w-14 sm:w-16 bg-gray-700/50 rounded" />
            </div>
            <div className="h-7 sm:h-8 w-28 sm:w-32 mt-1 bg-gray-800 rounded" />
          </div>
        </div>
      </div>
    )
  }
  