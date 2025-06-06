import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-50 bg-white/90 backdrop-blur-lg border-b border-surface-200 sticky top-0"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
                  <ApperIcon name="Home" className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                  PropNest
                </h1>
                <p className="text-xs text-surface-600 hidden sm:block">Premium Real Estate 1</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-surface-700 hover:text-primary transition-colors font-medium">Properties</a>
              <a href="#" className="text-surface-700 hover:text-primary transition-colors font-medium">Agents</a>
              <a href="#" className="text-surface-700 hover:text-primary transition-colors font-medium">About</a>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-surface-100 hover:bg-surface-200 transition-colors"
              >
                <ApperIcon name={isDarkMode ? "Sun" : "Moon"} className="w-5 h-5 text-surface-700" />
              </button>
              <button className="hidden sm:flex items-center space-x-2 action-button action-button-secondary">
                <ApperIcon name="User" className="w-4 h-4" />
                <span className="hidden lg:inline">Sign In</span>
              </button>
              <button className="action-button action-button-primary">
                <span className="hidden sm:inline">List Property</span>
                <ApperIcon name="Plus" className="w-4 h-4 sm:hidden" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-8 lg:pt-16 pb-12 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-property-hero"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-surface-900 mb-4 lg:mb-6">
              Find Your
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent block sm:inline sm:ml-3">
                Dream Home
              </span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-surface-600 max-w-2xl mx-auto leading-relaxed">
              Discover exceptional properties with our AI-powered search and expert curation
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mb-12 lg:mb-16"
          >
            {[
              { icon: 'Building2', value: '10K+', label: 'Properties' },
              { icon: 'Users', value: '5K+', label: 'Happy Clients' },
              { icon: 'MapPin', value: '50+', label: 'Cities' },
              { icon: 'Award', value: '4.9', label: 'Rating' }
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 lg:p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-surface-200">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <ApperIcon name={stat.icon} className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-surface-900 mb-1">{stat.value}</div>
                <div className="text-sm lg:text-base text-surface-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Feature */}
      <MainFeature />

      {/* Footer */}
      <footer className="bg-surface-900 text-white py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <ApperIcon name="Home" className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold">PropNest</h3>
              </div>
              <p className="text-surface-300 mb-6 max-w-md">
                Your trusted partner in finding the perfect property. We make real estate simple, transparent, and accessible.
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'Linkedin'].map((social) => (
                  <button key={social} className="w-10 h-10 bg-surface-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors">
                    <ApperIcon name={social} className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['Properties', 'Agents', 'About Us', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-surface-300 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3 text-surface-300">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Phone" className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Mail" className="w-4 h-4" />
                  <span>hello@propnest.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="MapPin" className="w-4 h-4" />
                  <span>123 Real Estate Ave</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-surface-800 mt-8 lg:mt-12 pt-6 lg:pt-8 text-center text-surface-400">
            <p>&copy; 2024 PropNest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
