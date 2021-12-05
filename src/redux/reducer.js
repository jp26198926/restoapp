const initialState = {
  products: [
    {
      id:1,
      name:"Burger",
      price:50,
      category:"Food",
      image:"https://www.seekpng.com/png/detail/19-194645_download-svg-download-png-burger-emoji.png"
    },
    {
      id:2,
      name:"Pizza",
      price:100,
      category:"Food",
      image:"https://www.pikpng.com/pngl/m/21-212291_svg-transparent-pizza-vector-gallery-yopriceville-high-food.png"
    },
    {
      id:3,
      name:"Fries",
      price:25,
      category:"Food",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Fries.svg/1200px-Fries.svg.png"
    },
    {
      id:4,
      name:"Coffee",
      price:35,
      category:"Drink",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Coffee_cup_flat.svg/1200px-Coffee_cup_flat.svg.png"
    },
    {
      id:5,
      name:"IcedTea",
      price:45,
      category:"Drink",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Glass_of_iced_tea.svg/1200px-Glass_of_iced_tea.svg.png"
    },
    {
      id:6,
      name:"HotTea",
      price:45,
      category:"Drink",
      image:"https://cdn2.iconfinder.com/data/icons/coffee-and-tea-set-filled-color/300/205719481Untitled-3-512.png"
    }
  ],
  categories: ['Food', 'Drink', 'Dessert'],
  filter: 'All',
  filterProducts:[],
  carts: [],
  totalOrder: 0,
  totalAmount: 0,
  editID: 0,
  selectedProduct: {
    id: 0,
    name: '',
    price: '',
    category: '',
    image: '',
  },
  message: '',
};

const reducer = (state=initialState, action) => {
  switch(action.type){
    case 'PRODUCT_ADD':
      return { ...state, products: [...state.products, action.payload] }
    
    case 'PRODUCT_UPDATE':
      const updatedProduct = state.products.map(product => {
        if (product.id === action.payload.id) {
          product = action.payload;
        }
        return product;
      });

      const updatedCart = state.carts.map(product => {
        if (product.id === action.payload.id) {
          product = { ...action.payload, qty: product.qty };
        }
        return product
      });
      
      return { ...state, products: updatedProduct, carts: updatedCart}
      
    case 'PRODUCT_FILTER':
      return{
        ...state,
        filter: action.payload,
        filterProducts: action.payload === "All" ? [...state.products] : [...state.products.filter(product => product.category === action.payload)]
      }
      
    case 'PRODUCT_DELETE':
      return{
        ...state,
        products: [...state.products.filter(product => product.id !== action.payload)],
        filterProducts: [...state.filterProducts.filter(product => product.id !== action.payload)],
        carts: [...state.carts.filter(product => product.id !== action.payload)]
      }
    
    case 'PRODUCT_SELECTED':
      return {
        ...state,
        selectedProduct: action.payload
      }
    
    case 'PRODUCT_SELECTED_CLEAR':
      return {
        ...state,
        selectedProduct: {id:0, name: '', price: '', category: '', image: ''}
      }
    
    case 'CART_ADD':
      if (state.carts.find(product => product.id === action.payload.id)) {
        
        const updatedCart = state.carts.map(product => {
          if (product.id === action.payload.id) {
            product = {...product, qty: product.qty + 1}
          }
          return product;
        })

        return { ...state, carts: updatedCart }
        
      } else {
        return { ...state, carts: [...state.carts, { ...action.payload, qty: 1 } ]}
      }
    
    case 'CART_QTY':
      return {
        ...state,
        totalOrder: action.payload
      }
    
    case 'CART_AMOUNT':
      return {
        ...state,
        totalAmount: action.payload
      }
  
    case 'CART_CLEAR':
      return {
        ...state,
        carts: [],
        totalOrder: 0,
        totalAmount: 0
      }
    
    case 'CART_CANCEL_ITEM':
      return {
        ...state,
        carts: [...state.carts.filter(product => product.id !== action.payload)],
      }
  
    case 'SET_QTY':
      const { id, qty } = action.payload;
      return {
        ...state,
        carts: [...state.carts.map(product => {
          if (product.id === id) {
            product = {...product, qty: qty}      
          }
          return product;

        })]
      }
    
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.payload
      }
    
    default:
      return state;
  }
}

export default reducer;