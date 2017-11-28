using Microsoft.EntityFrameworkCore;

namespace Studio404.Dal.Context
{
    public class SqlServerAppContext : ApplicationContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {   
            optionsBuilder.UseSqlServer("Server=(local);Database=studio404;Trusted_Connection=True;");
        }
    }
}