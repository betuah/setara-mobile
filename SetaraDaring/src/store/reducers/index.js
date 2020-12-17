import { combineReducers } from 'redux';

import ThemeReducer from './ThemeReducer';
import AuthReducer from './AuthReducer';
import HomeReducer from './HomeReducer';
import LibraryReducer from './LibraryReducer';
import NotifReducer from './NotifReducer';
import ProfileReducer from './ProfileReducer';
import ClassReducer from './ClassReducer';
import MateriReducer from './MateriReducer';
import TugasReducer from './TugasReducer';

const rootReducer = combineReducers({
    theme: ThemeReducer,
    auth: AuthReducer,
    home: HomeReducer,
    library: LibraryReducer,
    notif: NotifReducer,
    profile: ProfileReducer,
    class: ClassReducer,
    materi: MateriReducer,
    tugas: TugasReducer
});

export default rootReducer