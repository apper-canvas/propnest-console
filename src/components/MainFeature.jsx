import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('search')
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    priceRange: [0, 1000000],
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    listingType: 'sale'
  })
  
  const [newProperty, setNewProperty] = useState({
    title: '',
    price: '',
    propertyType: 'house',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    address: '',
    description: '',
    listingType: 'sale',
    amenities: []
  })

  const [savedProperties, setSavedProperties] = useState([])
  const [searchResults, setSearchResults] = useState([])

  // Sample properties data
  const sampleProperties = [
    {
      id: 1,
      title: "Modern Downtown Loft",
      price: 850000,
      propertyType: "apartment",
      bedrooms: 2,
      bathrooms: 2,
      squareFootage: 1200,
      address: "123 Urban St, Downtown",
      listingType: "sale",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400",
      amenities: ["Gym", "Parking", "Balcony"]
    },
    {
      id: 2,
      title: "Suburban Family Home",
      price: 3200,
      propertyType: "house",
      bedrooms: 4,
      bathrooms: 3,
      squareFootage: 2500,
      address: "456 Maple Ave, Suburbia",
      listingType: "rent",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
      amenities: ["Garden", "Garage", "Pool"]
    },
    {
      id: 3,
      title: "Luxury Penthouse Suite",
      price: 2500000,
      propertyType: "apartment",
      bedrooms: 3,
      bathrooms: 3,
      squareFootage: 1800,
      address: "789 Sky Tower, Uptown",
      listingType: "sale",
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400",
      amenities: ["Rooftop", "Concierge", "Gym", "Spa"]
    }
  ]

  const propertyTypes = ['house', 'apartment', 'condo', 'townhouse', 'villa']
  const amenitiesList = ['Gym', 'Pool', 'Parking', 'Garden', 'Balcony', 'Garage', 'Rooftop', 'Concierge', 'Spa', 'Fireplace']

  const handleSearch = () => {
    // Filter properties based on search criteria
    const filtered = sampleProperties.filter(property => {
      const matchesLocation = !searchFilters.location || 
        property.address.toLowerCase().includes(searchFilters.location.toLowerCase())
      const matchesPrice = property.price >= searchFilters.priceRange[0] && 
        property.price <= searchFilters.priceRange[1]
      const matchesType = !searchFilters.propertyType || 
        property.propertyType === searchFilters.propertyType
      const matchesBedrooms = !searchFilters.bedrooms || 
        property.bedrooms >= parseInt(searchFilters.bedrooms)
      const matchesBathrooms = !searchFilters.bathrooms || 
        property.bathrooms >= parseInt(searchFilters.bathrooms)
      const matchesListingType = property.listingType === searchFilters.listingType

      return matchesLocation && matchesPrice && matchesType && 
             matchesBedrooms && matchesBathrooms && matchesListingType
    })

    setSearchResults(filtered)
    toast.success(`Found ${filtered.length} properties matching your criteria`)
  }

  const handlePropertySubmit = (e) => {
    e.preventDefault()
    
    // Validate required fields
    if (!newProperty.title || !newProperty.price || !newProperty.address) {
      toast.error('Please fill in all required fields')
      return
    }

    // Simulate property creation
    const property = {
      ...newProperty,
      id: Date.now(),
      price: parseInt(newProperty.price),
      bedrooms: parseInt(newProperty.bedrooms) || 0,
      bathrooms: parseInt(newProperty.bathrooms) || 0,
      squareFootage: parseInt(newProperty.squareFootage) || 0,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
      createdAt: new Date()
    }

    toast.success('Property listed successfully!')
    
    // Reset form
    setNewProperty({
      title: '',
      price: '',
      propertyType: 'house',
      bedrooms: '',
      bathrooms: '',
      squareFootage: '',
      address: '',
      description: '',
      listingType: 'sale',
      amenities: []
    })
  }

  const toggleSaveProperty = (property) => {
    const isAlreadySaved = savedProperties.find(p => p.id === property.id)
    
    if (isAlreadySaved) {
      setSavedProperties(savedProperties.filter(p => p.id !== property.id))
      toast.info('Property removed from favorites')
    } else {
      setSavedProperties([...savedProperties, property])
      toast.success('Property saved to favorites')
    }
  }

  const toggleAmenity = (amenity) => {
    const currentAmenities = newProperty.amenities || []
    const updatedAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity]
    
    setNewProperty({ ...newProperty, amenities: updatedAmenities })
  }

  const PropertyCard = ({ property }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="property-card group"
    >
      <div className="relative">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-48 sm:h-56 object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className={`property-badge ${
            property.listingType === 'sale' 
              ? 'bg-primary text-white' 
              : 'bg-secondary text-white'
          }`}>
            {property.listingType === 'sale' ? 'For Sale' : 'For Rent'}
          </span>
        </div>
        <button
          onClick={() => toggleSaveProperty(property)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <ApperIcon 
            name={savedProperties.find(p => p.id === property.id) ? "Heart" : "Heart"} 
            className={`w-5 h-5 ${
              savedProperties.find(p => p.id === property.id) 
                ? 'text-red-500 fill-current' 
                : 'text-surface-600'
            }`}
          />
        </button>
        <div className="absolute bottom-4 left-4">
          <div className="price-tag">
            ${property.price.toLocaleString()}
            {property.listingType === 'rent' && <span className="ml-1">/mo</span>}
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        <h3 className="font-bold text-lg sm:text-xl text-surface-900 mb-2 group-hover:text-primary transition-colors">
          {property.title}
        </h3>
        <p className="text-surface-600 text-sm sm:text-base mb-4 flex items-center">
          <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
          {property.address}
        </p>
        
        <div className="flex items-center space-x-4 sm:space-x-6 mb-4 text-sm sm:text-base">
          <div className="flex items-center space-x-1">
            <ApperIcon name="Bed" className="w-4 h-4 text-surface-500" />
            <span className="text-surface-700">{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="Bath" className="w-4 h-4 text-surface-500" />
            <span className="text-surface-700">{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="Square" className="w-4 h-4 text-surface-500" />
            <span className="text-surface-700">{property.squareFootage} sqft</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="property-badge bg-surface-100 text-surface-700">
              {amenity}
            </span>
          ))}
          {property.amenities.length > 3 && (
            <span className="property-badge bg-surface-100 text-surface-700">
              +{property.amenities.length - 3} more
            </span>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 action-button action-button-primary">
            <ApperIcon name="Eye" className="w-4 h-4 mr-2" />
            View Details
          </button>
          <button className="flex-1 action-button action-button-secondary">
            <ApperIcon name="Phone" className="w-4 h-4 mr-2" />
            Contact
          </button>
        </div>
      </div>
    </motion.div>
  )

  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center mb-8 lg:mb-12"
        >
          <div className="bg-white rounded-2xl p-2 shadow-soft border border-surface-200 inline-flex flex-col sm:flex-row">
            {[
              { id: 'search', label: 'Search Properties', icon: 'Search' },
              { id: 'list', label: 'List Property', icon: 'Plus' },
              { id: 'saved', label: 'Saved Properties', icon: 'Heart' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-lg'
                    : 'text-surface-700 hover:bg-surface-100'
                }`}
              >
                <ApperIcon name={tab.icon} className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Search Properties Tab */}
          {activeTab === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Search Filters */}
              <div className="bg-white rounded-3xl shadow-filter-panel border border-surface-200 p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-bold text-surface-900 mb-6 flex items-center">
                  <ApperIcon name="Search" className="w-6 h-6 mr-3 text-primary" />
                  Find Your Perfect Property
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Location</label>
                    <input
                      type="text"
                      placeholder="Enter city, neighborhood, or address"
                      value={searchFilters.location}
                      onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                      className="search-input"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Property Type</label>
                    <select
                      value={searchFilters.propertyType}
                      onChange={(e) => setSearchFilters({...searchFilters, propertyType: e.target.value})}
                      className="search-input"
                    >
                      <option value="">All Types</option>
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Listing Type</label>
                    <div className="flex space-x-2">
                      {['sale', 'rent'].map(type => (
                        <button
                          key={type}
                          onClick={() => setSearchFilters({...searchFilters, listingType: type})}
                          className={`flex-1 filter-button ${
                            searchFilters.listingType === type ? 'filter-button-active' : ''
                          }`}
                        >
                          {type === 'sale' ? 'For Sale' : 'For Rent'}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Min Bedrooms</label>
                    <select
                      value={searchFilters.bedrooms}
                      onChange={(e) => setSearchFilters({...searchFilters, bedrooms: e.target.value})}
                      className="search-input"
                    >
                      <option value="">Any</option>
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}+</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Min Bathrooms</label>
                    <select
                      value={searchFilters.bathrooms}
                      onChange={(e) => setSearchFilters({...searchFilters, bathrooms: e.target.value})}
                      className="search-input"
                    >
                      <option value="">Any</option>
                      {[1, 2, 3, 4].map(num => (
                        <option key={num} value={num}>{num}+</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-2">Max Price</label>
                    <input
                      type="number"
                      placeholder={searchFilters.listingType === 'rent' ? 'Monthly rent' : 'Purchase price'}
                      value={searchFilters.priceRange[1]}
                      onChange={(e) => setSearchFilters({
                        ...searchFilters, 
                        priceRange: [searchFilters.priceRange[0], parseInt(e.target.value) || 1000000]
                      })}
                      className="search-input"
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleSearch}
                  className="w-full sm:w-auto action-button action-button-primary"
                >
                  <ApperIcon name="Search" className="w-4 h-4 mr-2" />
                  Search Properties
                </button>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div>
                  <h4 className="text-xl lg:text-2xl font-bold text-surface-900 mb-6">
                    Search Results ({searchResults.length} properties)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    <AnimatePresence>
                      {searchResults.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* Default Properties Display */}
              {searchResults.length === 0 && (
                <div>
                  <h4 className="text-xl lg:text-2xl font-bold text-surface-900 mb-6">
                    Featured Properties
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {sampleProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* List Property Tab */}
          {activeTab === 'list' && (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="bg-white rounded-3xl shadow-filter-panel border border-surface-200 p-6 lg:p-8 max-w-4xl mx-auto">
                <h3 className="text-xl lg:text-2xl font-bold text-surface-900 mb-6 flex items-center">
                  <ApperIcon name="Plus" className="w-6 h-6 mr-3 text-primary" />
                  List Your Property
                </h3>
                
                <form onSubmit={handlePropertySubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-surface-700 mb-2">Property Title *</label>
                      <input
                        type="text"
                        placeholder="e.g., Modern Downtown Loft"
                        value={newProperty.title}
                        onChange={(e) => setNewProperty({...newProperty, title: e.target.value})}
                        className="search-input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">Price *</label>
                      <input
                        type="number"
                        placeholder="Enter price"
                        value={newProperty.price}
                        onChange={(e) => setNewProperty({...newProperty, price: e.target.value})}
                        className="search-input"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">Property Type</label>
                      <select
                        value={newProperty.propertyType}
                        onChange={(e) => setNewProperty({...newProperty, propertyType: e.target.value})}
                        className="search-input"
                      >
                        {propertyTypes.map(type => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">Bedrooms</label>
                      <input
                        type="number"
                        placeholder="Number of bedrooms"
                        value={newProperty.bedrooms}
                        onChange={(e) => setNewProperty({...newProperty, bedrooms: e.target.value})}
                        className="search-input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">Bathrooms</label>
                      <input
                        type="number"
                        placeholder="Number of bathrooms"
                        value={newProperty.bathrooms}
                        onChange={(e) => setNewProperty({...newProperty, bathrooms: e.target.value})}
                        className="search-input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">Square Footage</label>
                      <input
                        type="number"
                        placeholder="Property size in sqft"
                        value={newProperty.squareFootage}
                        onChange={(e) => setNewProperty({...newProperty, squareFootage: e.target.value})}
                        className="search-input"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-surface-700 mb-2">Listing Type</label>
                      <div className="flex space-x-2">
                        {['sale', 'rent'].map(type => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setNewProperty({...newProperty, listingType: type})}
                            className={`flex-1 filter-button ${
                              newProperty.listingType === type ? 'filter-button-active' : ''
                            }`}
                          >
                            {type === 'sale' ? 'For Sale' : 'For Rent'}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-surface-700 mb-2">Address *</label>
                      <input
                        type="text"
                        placeholder="Full property address"
                        value={newProperty.address}
                        onChange={(e) => setNewProperty({...newProperty, address: e.target.value})}
                        className="search-input"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-surface-700 mb-2">Description</label>
                      <textarea
                        placeholder="Describe your property..."
                        value={newProperty.description}
                        onChange={(e) => setNewProperty({...newProperty, description: e.target.value})}
                        rows={4}
                        className="search-input resize-none"
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-surface-700 mb-3">Amenities</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                        {amenitiesList.map(amenity => (
                          <button
                            key={amenity}
                            type="button"
                            onClick={() => toggleAmenity(amenity)}
                            className={`filter-button text-sm ${
                              newProperty.amenities?.includes(amenity) ? 'filter-button-active' : ''
                            }`}
                          >
                            {amenity}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button
                      type="submit"
                      className="flex-1 action-button action-button-primary"
                    >
                      <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                      List Property
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewProperty({
                        title: '', price: '', propertyType: 'house', bedrooms: '',
                        bathrooms: '', squareFootage: '', address: '', description: '',
                        listingType: 'sale', amenities: []
                      })}
                      className="action-button action-button-secondary"
                    >
                      <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
                      Reset Form
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* Saved Properties Tab */}
          {activeTab === 'saved' && (
            <motion.div
              key="saved"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-xl lg:text-2xl font-bold text-surface-900 mb-2 flex items-center justify-center">
                  <ApperIcon name="Heart" className="w-6 h-6 mr-3 text-red-500" />
                  Your Saved Properties
                </h3>
                <p className="text-surface-600">
                  {savedProperties.length === 0 
                    ? "You haven't saved any properties yet" 
                    : `You have ${savedProperties.length} saved ${savedProperties.length === 1 ? 'property' : 'properties'}`
                  }
                </p>
              </div>

              {savedProperties.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-surface-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <ApperIcon name="Heart" className="w-12 h-12 text-surface-400" />
                  </div>
                  <p className="text-surface-600 mb-6">Start exploring properties and save your favorites!</p>
                  <button
                    onClick={() => setActiveTab('search')}
                    className="action-button action-button-primary"
                  >
                    <ApperIcon name="Search" className="w-4 h-4 mr-2" />
                    Browse Properties
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  <AnimatePresence>
                    {savedProperties.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default MainFeature