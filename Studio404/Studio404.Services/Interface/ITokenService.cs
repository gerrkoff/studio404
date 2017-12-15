using Studio404.Dal.Entity;

namespace Studio404.Services.Interface
{
    public interface ITokenService
    {
        string GetToken(UserEntity user);
    }
}