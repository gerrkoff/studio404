using Microsoft.EntityFrameworkCore;
using Studio404.Dal.Entity;

namespace Studio404.Dal.Context
{
    public class ApplicationContext : DbContext
    {
        public DbSet<BookingEntity> Bookings { get; set; }
    }
}