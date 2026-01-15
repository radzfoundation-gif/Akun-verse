export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center">
                {/* Spinner */}
                <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 border-4 border-purple-200/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 rounded-full animate-spin"></div>
                </div>

                {/* Text */}
                <p className="text-gray-400 text-sm animate-pulse">
                    Memuat...
                </p>
            </div>
        </div>
    );
}
