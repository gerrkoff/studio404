using Microsoft.EntityFrameworkCore;
using Studio404.Dal.Entity;

namespace Studio404.Dal
{
    public class ApplicationContext : DbContext
    {
        public DbSet<BookingEntity> Bookings { get; set; }
 
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=studio404;Username=antonprokofev");
        }
    }
}