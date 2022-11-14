import { User } from '../../types/Types';
import { SET, UNSET } from './user.types';

const UserState: User | null = null;

const reducer = (user: User | null = null, action: any) => {

switch (action.type) {

  case SET:

    return action.payload;

  case UNSET:
    return UserState;

  default: return user;
}

};

export default reducer;