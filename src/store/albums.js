export default {
  state: {
    AlbumsData: [],
  },
  actions: {
    async AlbumsData(ctx) {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/albums"
      );
      const albumsArray = await res.json();

      albumsArray.forEach(async function (album){
        const res_images = await fetch(
          "https://jsonplaceholder.typicode.com/albums/"+album.id+"/photos?limit=2"
        );
        const imagesArray = await res_images.json();
        album.images =  imagesArray.slice(0,3);
      })

      ctx.commit("updateAlbums", albumsArray);
    },
  },
  mutations: {
    updateAlbums(state, AlbumsData) {
      state.AlbumsData = AlbumsData;
    },
  },
  getters: {
    AlbumsData(state) {
      return state.AlbumsData;
    },
  },
};
