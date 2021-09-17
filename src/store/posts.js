export default {
  state: {
    postsData: [],
    postsByUser: [],
    postData: [],
    PostComments: [],
  },
  actions: {
    async postsData(ctx, postsArray = []) {
      if(postsArray.length == 0){
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        postsArray = await res.json();
      }
      ctx.commit("updatePosts", postsArray);
    },

    async postData(ctx, post_id){
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts/"+post_id
      );
      const postsDataArray = await res.json();      
      ctx.commit("updatePost", postsDataArray);
    },

    async postsByUser(ctx, postsArray = []) {
      if(postsArray.length == 0){
        const user_id = localStorage.getItem('current_user_id');
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users/"+user_id+"/posts"
        );
        postsArray = await res.json();
      }
      ctx.commit("updatePostsByUser", postsArray);
    }, 

    async PostComments(ctx, post_id){
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/posts/"+post_id+'/comments'
      );
      const CommentsArray = await res.json();      
      ctx.commit("updatePostComments", CommentsArray);
    },

    async removePostComment(ctx, postsArray){
      ctx.commit("updatePostComments", postsArray);
    },    
  },

  mutations: {
    updatePosts(state, postsData) {
      state.postsData = postsData;
    },
    updatePostsByUser(state, postsData){
      state.postsByUser = postsData;
    },
    updatePost(state, postData){
      state.postData = postData;
    },
    updatePostComments(state, PostComments){
      state.PostComments = PostComments;
    },
  },
  getters: {
    postsData(state) {
      return state.postsData;
    },
    postsByUser(state){
      return state.postsByUser;
    },
    postData(state){
      return state.postData;
    },
    PostComments(state){
      return state.PostComments;
    }
  },
};
