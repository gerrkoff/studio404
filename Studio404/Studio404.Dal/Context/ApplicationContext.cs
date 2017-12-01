using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Studio404.Dal.Entity;

namespace Studio404.Dal.Context
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }
        
        public DbSet<BookingEntity> Bookings { get; set; }
    }
}