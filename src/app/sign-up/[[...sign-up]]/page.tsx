import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-400/20 via-purple-500/20 to-blue-500/20 backdrop-blur-3xl flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-white/30 backdrop-blur-sm"></div>
            <div className="relative z-10">
                <SignUp
                    appearance={{
                        elements: {
                            rootBox: 'mx-auto max-w-sm',
                            card: 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl py-4 px-4',
                            formButtonPrimary: 'bg-orange-500 hover:bg-orange-600 py-2',
                            headerTitle: 'text-gray-900 text-lg',
                            headerSubtitle: 'text-gray-600 text-sm',
                            socialButtonsBlockButton: 'bg-white/50 border-gray-200 text-gray-700 hover:bg-white/80 py-2',
                            formFieldLabel: 'text-gray-700 text-sm',
                            formFieldInput: 'bg-white/70 border-gray-200 text-gray-900 py-2',
                            footerActionLink: 'text-orange-500 hover:text-orange-600',
                            dividerLine: 'bg-gray-200',
                            dividerText: 'text-gray-500 text-sm',
                            formFieldRow: 'mb-2',
                            footer: 'pt-2',
                        }
                    }}
                />
            </div>
        </div>
    )
}
