import ApiService from '../services/ApiService'
import { takeEvery } from 'redux-saga/effects'

import { loginTypes } from "../redux/LoginRedux";
import { login } from "./LoginSaga";

const api = ApiService.create()

export default function* root() {
    //login
    yield takeEvery(loginTypes.LOGIN_REQUEST, login, api)

}
