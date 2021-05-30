import { call, put } from 'redux-saga/effects'
import LoginActions from '../redux/LoginRedux'

export function* login(api, action) {
    try {
        const response = yield call(api.login, action.request);
        if (response.data.code === 200) {
            yield put(LoginActions.loginSuccess(response.data))
        } else {
            yield put(LoginActions.loginFailure(response.data))
        }
    } catch (error) {
        yield put(LoginActions.loginFailure(error))
    }
}

