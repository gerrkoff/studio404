namespace Studio404.Services.Interface
{
    public interface ICheckService
    {
        bool Check(int shiftMinutes, string code);
    }
}