import { categoryConstants } from "../actions/constants";

const initState = {
    categories:[],
    loading: false,
    error: null
};
{/*const buildNewCategories = (parentId,categories, category) => {
    let myCategories = [];
    for (let cat of categories) {
        if (cat._id == parentId) {
            myCategories.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ? buildNewCategories(parentId, [...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category._children,
                }], category) : null
            })
        }else {
            myCategories.push({
                ...cat,
                children: cat.children && cat.children.length > 0 ? buildNewCategories(parentId,cat.children, category) : null 
            })
        }
    }
    return myCategories;
}*/}
const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: false,
                
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORIES_SUCCESS:
            //const updateCategories = buildNewCategories(action.payload.category.parentId, state.categories, action.payload.category)
            //console.log('akkk')
            //console.log (up)
                state = {
                    ...state,
                 // categories:updateCategories,
                  loading: true,
                    
                }
            break;
            case categoryConstants.ADD_NEW_CATEGORIES_FAILURE:
                state = {
                    ...initState
                    
                }
                break;
        
    }
    return state;
    
}
export default categoryReducer;