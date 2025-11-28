'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('Error Boundary Caught:', error)
    }, [error])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex items-center justify-center p-5">
            <div className="max-w-md w-full">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    {/* Header with icon */}
                    <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-8 text-white">
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-5 mb-4">
                                <AlertCircle className="w-12 h-12" />
                            </div>
                            <h1 className="text-3xl font-bold">Oops! Something went wrong</h1>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-6">
                        <div className="text-center space-y-3">
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                We encountered an unexpected error while loading this page.
                            </p>
                            {process.env.NODE_ENV === 'development' && error?.message && (
                                <div className="mt-4 p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-lg">
                                    <code className="text-sm text-rose-700 dark:text-rose-400 break-all font-mono">
                                        {error.message}
                                    </code>
                                    {error.digest && (
                                        <p className="text-xs mt-2 text-slate-600 dark:text-slate-500">
                                            Digest: {error.digest}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => reset()}
                                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <RefreshCw className="w-5 h-5" />
                                Try Again
                            </button>

                            <a
                                href="/"
                                className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium py-3 px-6 rounded-xl transition-all duration-200 border border-slate-300 dark:border-slate-700"
                            >
                                <Home className="w-5 h-5" />
                                Back to Home
                            </a>
                        </div>

                        {/* Footer help text */}
                        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                            If the problem persists, please{' '}
                            <a
                                href="mailto:support@yourapp.com"
                                className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                            >
                                contact support
                            </a>
                            .
                        </p>
                    </div>
                </div>

                {/* Optional: Fun little decorative element */}
                <div className="text-center mt-8">
                    <p className="text-sm text-slate-500 dark:text-slate-600">
                        Error ID: {error.digest || 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    )
}