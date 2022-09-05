import { createStore } from 'vuex'

export default createStore(
    {
        state: {
            login: "not logged",
            view: "Main Menu",
            UserView: "User",
            ipApi: 'http://127.0.0.1:5000'

        },
        mutations: {
            updateView(state, vars) {
                state.view = vars.view
            },
            updateUserView(state, vars) {
                state.UserView = vars.view
                if (vars.user != "") { state.currentUser = vars.user }
            },
            setLoginStatus(state, login) {
                state.login = login
            }
        },
        getters: {
            getIP(state) { return state.ipApi },
            getView(state) { return state.view },
            getUserView(state) { return state.UserView },
            getLoginStatus(state) { return state.login },
        },

    })

