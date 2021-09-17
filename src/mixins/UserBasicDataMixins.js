export const UserBasicDataMixins = {
  data(){
    return {
      user: {
        name: null,
        email: null,
        website: null,
        address: {
          street: null,
          suite: null,
          city: null,
          geo:{
            lat: null,
            lng: null,
          }
        },
        phone: null,
        company: {
          name: null,
        }, 
      }    
    }
  },
}