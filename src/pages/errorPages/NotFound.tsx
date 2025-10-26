"use client"

import { Link } from "react-router-dom"
import { ArrowRight, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-20"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="mb-12">
          <h1 className="text-8xl md:text-9xl font-bold text-primary mb-6">404</h1>
          <div className="h-1 w-16 mx-auto rounded-full bg-primary mb-8"></div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Page Not Found</h2>

        <p className="text-base md:text-lg text-muted-foreground mb-12 leading-relaxed max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's help you get back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 bg-primary text-primary-foreground hover:opacity-90 active:scale-95"
          >
            <Home size={18} />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 border border-primary text-primary hover:bg-primary/5 active:scale-95"
          >
            Go Back
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
