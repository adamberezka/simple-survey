import { User } from '../../types/Types';
import { SET, UNSET } from './user.types';


export const setUser = (user: User) => {
    return {
        type: SET,
        payload: user
    };
};

export const unsetUser = (user: User) => {
    return {
       type: UNSET,
       payload: user
    };
};