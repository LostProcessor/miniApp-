import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	name:null,
	email:null,
	token:null,
	interests:[],
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers:{
		login:(state,action) => {
			state.name = action.payload.name,
			state.email = action.payload.email
			state.token = action.payload.token
		},
		setInterests:(state,action)=>{
			state.interests=action.payload
		},
	},
})


export  const {login,setInterests} = userSlice.actions
export default userSlice.reducer