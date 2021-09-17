export default{
	state:{
		usersData: [],
		currentUser: null,
	},
	actions: {
    async usersData(ctx, usersArray = []) {
      if(usersArray.length == 0){
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        usersArray = await res.json();
      }

      ctx.commit("updateUsers", usersArray);
    },
    currentUser(ctx, user){
      console.log(user)
      ctx.commit("SetCurrentUser", user);
    },
    addToUsers(ctx, user){
      ctx.commit("addToUsers", user);
    },
	},
	mutations: {
    updateUsers(state, usersData) {
      state.usersData = usersData;
    },  
    SetCurrentUser(state, user){
      state.currentUser = user
      localStorage.setItem('current_user_id', user.id);
    },
    addToUsers(state, user){
      state.usersData.push(user)
    }
	},
	getters: {
    usersData(state) {
      return state.usersData;
    },	
    currentUser(state){
      return state.currentUser;
    }	
	},
};