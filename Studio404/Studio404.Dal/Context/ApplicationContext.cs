using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Studio404.Dal.Entity;

namespace Studio404.Dal.Context
{
    public class ApplicationContext : IdentityDbContext<UserEntity>
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }
        
        public DbSet<BookingEntity> Bookings { get; set; }
		public DbSet<HourCostEntity> HourCosts { get; set; }
		public DbSet<PromoCodeEntity> PromoCodes { get; set; }
	}
}