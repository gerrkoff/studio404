using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Studio404.Dal.Context
{
    public class SqlServerAppContext : ApplicationContext
    {
        public SqlServerAppContext(IConfiguration configuration) : base(configuration)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("SqlServer"));
        }
    }
}