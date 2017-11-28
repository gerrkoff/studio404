using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Studio404.Dal.Entity;

namespace Studio404.Dal.Context
{
    public class ApplicationContext : DbContext
    {
        protected readonly IConfiguration _configuration;

        public ApplicationContext(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DbSet<BookingEntity> Bookings { get; set; }
    }
}