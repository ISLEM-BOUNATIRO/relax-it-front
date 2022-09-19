import { createStore } from 'vuex'

export default createStore(
    {
        state: {
            login: "not logged",
            view: "Main Menu",
            UserView: "User",
            ipApi: 'http://192.168.217.1:5000',
            we_are_excuting: false,


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
            getWeAreExecuting(state) { return state.we_are_excuting },

        },

    })

