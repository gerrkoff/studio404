namespace Studio404.Dto.Account
{
    public class CurrentUserDto
    {
        public bool UserLoggedIn { get; set; }
        public string Username { get; set; }
        public bool PhoneConfirmed { get; set; }
    }
}