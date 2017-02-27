/**
 * Created by shengqiang.wu on 2017/2/24.
 */
import {TOGGLE_SIDEBAR} from "../actions/layout"
export default function toggleSidebar(state={collapsed:false},action) {
    switch (action.type){
        case TOGGLE_SIDEBAR:
            return{
                collapsed:action.value
            }
        default:
            return state;
    }
}