const initialState = {
    route: 'home',
    options: null
}

export const CHANGE_ROUTE = 'router/CHANGE_ROUTE'

export const changeRoute = ({route, options = null}) => ({ type: CHANGE_ROUTE, route, options })

export default (state = initialState, action) => {
    switch(action.type){
        case CHANGE_ROUTE:
            return { route: action.route, options: action.options }
        default:
            return state
    }
}