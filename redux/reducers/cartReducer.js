const initialState = {
  cartItems: [],
 };
 
 const cartReducer = (state = initialState, action) => {
  switch (action.type) {
     case 'UPDATE_CART_COUNT':
       return {
         ...state,
         cartCount: action.payload,
       };
 
     case 'ADD_TO_CART':
       const item = state.cartItems.find(item => item.id === action.payload.id);
       if (item) {
         return {
           ...state,
           cartItems: state.cartItems.map(item => item.id === action.payload.id
             ? { ...item, quantity: item.quantity + 1 }
             : item),
         };
       }
       return {
         ...state,
         cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
       };
 
     case 'UPDATE_QUANTITY':
       return {
         ...state,
         cartItems: state.cartItems.map(item => item.id === action.payload.id
           ? { ...item, quantity: action.payload.quantity }
           : item),
       };
 
     case 'REMOVE_FROM_CART':
       return {
         ...state,
         cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
       };
 
     default:
       console.log('Unknown action:', action);
       return state;
  }
 };
 
 export default cartReducer;
 