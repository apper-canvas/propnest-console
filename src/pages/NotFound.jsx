import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-surface-50 to-surface-100">
      <div className="text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
            <ApperIcon name="Home" className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-6xl font-bold text-surface-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-surface-700 mb-4">Property Not Found</h2>
          <p className="text-surface-600 mb-8">
            The page you're looking for seems to have moved to a new neighborhood.
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center space-x-2 action-button action-button-primary"
          >
            <ApperIcon name="ArrowLeft" className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound