using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Studio404.Dal.Context
{
    public class PostgreAppContext : ApplicationContext
    {
        public PostgreAppContext(IConfiguration configuration) : base(configuration)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Postgre"));
        }
    }
}