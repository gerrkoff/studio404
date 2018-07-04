export class User {
    constructor (
        public id: string,
        public phoneNumber: string,
        public userName: string,
        public displayName: string,
        public isAdmin: boolean
    ) {
    }
}
