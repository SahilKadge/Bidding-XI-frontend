"use client"

import { Link } from "react-router-dom"
import { Lock, Home } from "lucide-react"

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary to-transparent opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary to-transparent opacity-20"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
            <Lock size={40} className="text-primary" />
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-primary mb-6">403</h1>
          <div className="h-1 w-16 mx-auto rounded-full bg-primary mb-8"></div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Access Denied</h2>

        <p className="text-base md:text-lg text-muted-foreground mb-12 leading-relaxed max-w-md mx-auto">
          You don't have permission to access this page. If you believe this is a mistake, please contact your
          administrator.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-200 bg-primary text-primary-foreground hover:opacity-90 active:scale-95"
          >
            <Home size={18} />
            Go To Login
          </Link>

          
        </div>
      </div>
    </div>
  )
}

export default Unauthorized
