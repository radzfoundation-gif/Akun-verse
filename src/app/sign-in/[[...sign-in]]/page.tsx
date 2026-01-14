import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-400/20 via-purple-500/20 to-blue-500/20 backdrop-blur-3xl flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
            <div className="relative z-10">
                <SignIn
                    appearance={{
                        elements: {
                            rootBox: 'mx-auto',
                            card: 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl',
                            formButtonPrimary: 'bg-orange-500 hover:bg-orange-600',
                            headerTitle: 'text-gray-900',
                            headerSubtitle: 'text-gray-600',
                            socialButtonsBlockButton: 'bg-white/50 border-gray-200 text-gray-700 hover:bg-white/80',
                            formFieldLabel: 'text-gray-700',
                            formFieldInput: 'bg-white/70 border-gray-200 text-gray-900',
                            footerActionLink: 'text-orange-500 hover:text-orange-600',
                            dividerLine: 'bg-gray-200',
                            dividerText: 'text-gray-500',
                        }
                    }}
                />
            </div>
        </div>
    )
}
