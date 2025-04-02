import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Typing Clash. Created by{" "}
            <span className="text-indigo-400 font-medium">Hassan Rajput</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
