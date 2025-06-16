const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const PropertyService = {
  async getAll(filters = {}) {
    await delay(300)
    
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        Fields: [
          'Name', 'title', 'price', 'property_type', 'bedrooms', 'bathrooms', 
          'square_footage', 'address', 'description', 'listing_type', 
          'amenities', 'image', 'created_at', 'Tags'
        ]
      }
      
      // Add filtering if provided
      if (filters.location || filters.propertyType || filters.listingType || filters.priceRange) {
        params.where = []
        
        if (filters.location) {
          params.where.push({
            FieldName: 'address',
            Operator: 'Contains',
            Values: [filters.location]
          })
        }
        
        if (filters.propertyType) {
          params.where.push({
            FieldName: 'property_type',
            Operator: 'ExactMatch',
            Values: [filters.propertyType]
          })
        }
        
        if (filters.listingType) {
          params.where.push({
            FieldName: 'listing_type',
            Operator: 'ExactMatch',
            Values: [filters.listingType]
          })
        }
        
        if (filters.priceRange && filters.priceRange[1] < 1000000) {
          params.where.push({
            FieldName: 'price',
            Operator: 'LessThanOrEqualTo',
            Values: [filters.priceRange[1]]
          })
        }
        
        if (filters.bedrooms) {
          params.where.push({
            FieldName: 'bedrooms',
            Operator: 'GreaterThanOrEqualTo',
            Values: [parseInt(filters.bedrooms)]
          })
        }
        
        if (filters.bathrooms) {
          params.where.push({
            FieldName: 'bathrooms',
            Operator: 'GreaterThanOrEqualTo',
            Values: [parseInt(filters.bathrooms)]
          })
        }
      }
      
      const response = await apperClient.fetchRecords('property', params)
      
      if (!response.success) {
        throw new Error(response.message)
      }
      
      // Transform database fields to UI format
      const transformedData = (response.data || []).map(property => ({
        id: property.Id,
        title: property.title || property.Name,
        price: property.price,
        propertyType: property.property_type,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        squareFootage: property.square_footage,
        address: property.address,
        description: property.description,
        listingType: property.listing_type,
        amenities: property.amenities ? property.amenities.split(',') : [],
        image: property.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
        createdAt: property.created_at
      }))
      
      return transformedData
    } catch (error) {
      console.error('Error fetching properties:', error)
      throw error
    }
  },

  async getById(id) {
    await delay(200)
    
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        fields: [
          'Name', 'title', 'price', 'property_type', 'bedrooms', 'bathrooms', 
          'square_footage', 'address', 'description', 'listing_type', 
          'amenities', 'image', 'created_at', 'Tags'
        ]
      }
      
      const response = await apperClient.getRecordById('property', id, params)
      
      if (!response.success) {
        throw new Error(response.message)
      }
      
      if (!response.data) {
        return null
      }
      
      // Transform database fields to UI format
      const property = response.data
      return {
        id: property.Id,
        title: property.title || property.Name,
        price: property.price,
        propertyType: property.property_type,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        squareFootage: property.square_footage,
        address: property.address,
        description: property.description,
        listingType: property.listing_type,
        amenities: property.amenities ? property.amenities.split(',') : [],
        image: property.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
        createdAt: property.created_at
      }
    } catch (error) {
      console.error(`Error fetching property with ID ${id}:`, error)
      throw error
    }
  },

  async create(propertyData) {
    await delay(400)
    
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Transform UI fields to database fields (only Updateable fields)
      const dbProperty = {
        Name: propertyData.title,
        title: propertyData.title,
        price: parseInt(propertyData.price),
        property_type: propertyData.propertyType,
        bedrooms: parseInt(propertyData.bedrooms) || 0,
        bathrooms: parseInt(propertyData.bathrooms) || 0,
        square_footage: parseInt(propertyData.squareFootage) || 0,
        address: propertyData.address,
        description: propertyData.description || '',
        listing_type: propertyData.listingType,
        amenities: Array.isArray(propertyData.amenities) ? propertyData.amenities.join(',') : '',
        image: propertyData.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400",
        created_at: new Date().toISOString()
      }
      
      const params = {
        records: [dbProperty]
      }
      
      const response = await apperClient.createRecord('property', params)
      
      if (!response.success) {
        throw new Error(response.message)
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create property: ${JSON.stringify(failedRecords)}`)
          const firstError = failedRecords[0]
          throw new Error(firstError.message || 'Failed to create property')
        }
        
        const successfulRecord = response.results.find(result => result.success)
        if (successfulRecord) {
          // Transform back to UI format
          const created = successfulRecord.data
          return {
            id: created.Id,
            title: created.title || created.Name,
            price: created.price,
            propertyType: created.property_type,
            bedrooms: created.bedrooms,
            bathrooms: created.bathrooms,
            squareFootage: created.square_footage,
            address: created.address,
            description: created.description,
            listingType: created.listing_type,
            amenities: created.amenities ? created.amenities.split(',') : [],
            image: created.image,
            createdAt: created.created_at
          }
        }
      }
      
      throw new Error('No successful creation result returned')
    } catch (error) {
      console.error('Error creating property:', error)
      throw error
    }
  },

  async update(id, propertyData) {
    await delay(400)
    
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      // Transform UI fields to database fields (only Updateable fields)
      const dbProperty = {
        Id: id,
        Name: propertyData.title,
        title: propertyData.title,
        price: parseInt(propertyData.price),
        property_type: propertyData.propertyType,
        bedrooms: parseInt(propertyData.bedrooms) || 0,
        bathrooms: parseInt(propertyData.bathrooms) || 0,
        square_footage: parseInt(propertyData.squareFootage) || 0,
        address: propertyData.address,
        description: propertyData.description || '',
        listing_type: propertyData.listingType,
        amenities: Array.isArray(propertyData.amenities) ? propertyData.amenities.join(',') : '',
        image: propertyData.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400"
      }
      
      const params = {
        records: [dbProperty]
      }
      
      const response = await apperClient.updateRecord('property', params)
      
      if (!response.success) {
        throw new Error(response.message)
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update property: ${JSON.stringify(failedRecords)}`)
          const firstError = failedRecords[0]
          throw new Error(firstError.message || 'Failed to update property')
        }
        
        const successfulRecord = response.results.find(result => result.success)
        if (successfulRecord) {
          // Transform back to UI format
          const updated = successfulRecord.data
          return {
            id: updated.Id,
            title: updated.title || updated.Name,
            price: updated.price,
            propertyType: updated.property_type,
            bedrooms: updated.bedrooms,
            bathrooms: updated.bathrooms,
            squareFootage: updated.square_footage,
            address: updated.address,
            description: updated.description,
            listingType: updated.listing_type,
            amenities: updated.amenities ? updated.amenities.split(',') : [],
            image: updated.image,
            createdAt: updated.created_at
          }
        }
      }
      
      throw new Error('No successful update result returned')
    } catch (error) {
      console.error('Error updating property:', error)
      throw error
    }
  },

  async delete(id) {
    await delay(300)
    
    try {
      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })
      
      const params = {
        RecordIds: [id]
      }
      
      const response = await apperClient.deleteRecord('property', params)
      
      if (!response.success) {
        throw new Error(response.message)
      }
      
      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success)
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete property: ${JSON.stringify(failedRecords)}`)
          const firstError = failedRecords[0]
          throw new Error(firstError.message || 'Failed to delete property')
        }
        
        return true
      }
      
      return false
    } catch (error) {
      console.error('Error deleting property:', error)
      throw error
    }
  }
}