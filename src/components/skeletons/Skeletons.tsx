export function ProductCardSkeleton() {
    return (
        <div className="bg-white/5 rounded-2xl overflow-hidden animate-pulse">
            {/* Image skeleton */}
            <div className="aspect-square bg-gray-700/50" />

            {/* Content skeleton */}
            <div className="p-4 space-y-3">
                {/* Title */}
                <div className="h-4 bg-gray-700/50 rounded w-3/4" />

                {/* Category */}
                <div className="h-3 bg-gray-700/50 rounded w-1/2" />

                {/* Price */}
                <div className="flex items-center gap-2">
                    <div className="h-5 bg-gray-700/50 rounded w-20" />
                    <div className="h-4 bg-gray-700/50 rounded w-16" />
                </div>

                {/* Button */}
                <div className="h-10 bg-gray-700/50 rounded-xl" />
            </div>
        </div>
    );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function CategoryCardSkeleton() {
    return (
        <div className="bg-white/5 rounded-2xl p-6 animate-pulse">
            <div className="w-12 h-12 bg-gray-700/50 rounded-xl mb-4" />
            <div className="h-4 bg-gray-700/50 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-700/50 rounded w-1/2" />
        </div>
    );
}

export function CategoryGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <CategoryCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function BannerSkeleton() {
    return (
        <div className="w-full h-48 md:h-64 bg-gray-700/50 rounded-2xl animate-pulse" />
    );
}

export function TextSkeleton({ className = '' }: { className?: string }) {
    return (
        <div className={`bg-gray-700/50 rounded animate-pulse ${className}`} />
    );
}
