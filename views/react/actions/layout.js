/**
 * Created by shengqiang.wu on 2017/2/24.
 */
export const TOGGLE_SIDEBAR="TOGGLE_SIDEBAR";

export function toggleSidebar(value) {
    return{
        type:TOGGLE_SIDEBAR,
        value:value
    }
}