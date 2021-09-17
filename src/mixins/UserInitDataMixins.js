export const UserInitDataMixins = {
  computed:{ 
    user(){
      return {
          id: this.currentUser.id,
          name: this.currentUser.name,
          email: this.currentUser.email,
          website: this.currentUser.website,
          phone: this.currentUser.phone,
          address: {
            street: this.currentUser.address.street,
            suite: this.currentUser.address.suite,
            city: this.currentUser.address.city,
            geo:{
              lat: parseFloat(this.currentUser.address.geo.lat),
              lng: parseFloat(this.currentUser.address.geo.lng),
            }
          },
          company: {
            name: this.currentUser.company.name,
          },          
      }      
    },
    location(){
      return {lat: this.user.address.geo.lat, lng: this.user.address.geo.lng}
    },
    address:{
      get: function(){
        return `${this.user.address.street}, ${this.user.address.suite}, ${this.user.address.city}`
      },
      set: function(address){
        this.user.address = {
          street: '',
          suite: '',
          city: address,
          geo:{
            lat: parseFloat(this.currentUser.address.geo.lat),
            lng: parseFloat(this.currentUser.address.geo.lng),
          }            
        }       
      }
    },
    company:{
      get: function(){
        return `${this.user.company.name}`
      },
      set: function(name){
        this.user.company = { name: name }
      }
    }        
  },

}