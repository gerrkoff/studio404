using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Studio404.Dal.Context
{
    public class ApplicationContextDesignTimeFactory : IDesignTimeDbContextFactory<ApplicationContext>
    {
        public ApplicationContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationContext>();
            //optionsBuilder.UseSqlServer("Server=(local);Database=studio404;Trusted_Connection=True;");
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=studio404;Username=postgres;");
            
            return new ApplicationContext(optionsBuilder.Options);
        }
    }
}