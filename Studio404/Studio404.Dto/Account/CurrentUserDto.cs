namespace Studio404.Dto.Account
{
    public class CurrentUserDto
    {
        public string Username { get; set; }
        public bool UserLoggedIn { get; set; }
        public string Phone { get; set; }
        public bool PhoneConfirmed { get; set; }
    }
}