export class User {
    constructor (
        public Id: string,
        public PhoneNumber: string,
        public UserName: string,
        public DisplayName: string,
        public IsAdmin: boolean
    ) {
    }
}
