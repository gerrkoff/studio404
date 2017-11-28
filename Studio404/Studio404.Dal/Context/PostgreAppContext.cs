using Microsoft.EntityFrameworkCore;

namespace Studio404.Dal.Context
{
    public class PostgreAppContext : ApplicationContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=studio404;Username=antonprokofev");
        }
    }
}