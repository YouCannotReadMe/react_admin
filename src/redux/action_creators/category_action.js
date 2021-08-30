import {SAVE_CATEGORY} from '../action_types'
export const createSaveCategoryListAction = (value) => {
    return {type:SAVE_CATEGORY,data:value}
}