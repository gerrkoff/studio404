import Http from "./Http";

const AccountService = {

    GetCurrentUser: () => {
        return Http.Get("api/account/current");
    },

    Login: (loginInfo) => {
        return Http.Post("api/account/login", loginInfo);
    },

    Logoff: () => {
        return Http.Post("api/account/logoff");
    }
}

export default AccountService;