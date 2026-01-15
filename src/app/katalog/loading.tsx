import { ProductGridSkeleton } from '@/components/skeletons/Skeletons';

export default function KatalogLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Header Skeleton */}
            <div className="bg-gray-800/50 py-6 mb-8">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="h-8 bg-gray-700/50 rounded w-48 mb-2 animate-pulse" />
                    <div className="h-4 bg-gray-700/50 rounded w-64 animate-pulse" />
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <ProductGridSkeleton count={12} />
            </div>
        </div>
    );
}
