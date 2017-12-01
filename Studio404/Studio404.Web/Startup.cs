using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Studio404.Dal.Context;
using Studio404.Services.Interface;
using Studio404.Services.Implementation;
using Studio404.Dal.Repository;
using Microsoft.EntityFrameworkCore;
using Studio404.Common.Settings;
using Studio404.Dal.Entity;

namespace Studio404.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.Configure<StudioSettings>(options =>
                Configuration.GetSection("StudioSettings").Bind(options));

            ConfigDb(services);
            ConfigIdentity(services);
            ConfigDiServices(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvc();
        }

        #region Config Services

        private void ConfigDb(IServiceCollection services)
        {
            #region Connection String
            
            string databaseProvider = Configuration.GetValue<string>("databaseProvider");
            string connectionString = Configuration.GetConnectionString("appDb");
            
            switch (databaseProvider)
            {
                case "SqlServer":
                    services.AddDbContext<ApplicationContext>(options =>
                        options.UseSqlServer(connectionString));
                    break;
                case "Postgre":
                    services.AddDbContext<ApplicationContext>(options =>
                        options.UseNpgsql(connectionString));
                    break;
                default:
                    throw new ArgumentException("Argument value must be 'SqlServer' or 'Postgre'", nameof(databaseProvider));
            }
            
            #endregion
            
            services.AddScoped<DbContext, ApplicationContext>();
            
        }

        private void ConfigIdentity(IServiceCollection services)
        {
            services.AddIdentity<UserEntity, IdentityRole>(options =>
                {
                    options.Password.RequiredLength = 5;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequireDigit = false;
                })
                .AddEntityFrameworkStores<ApplicationContext>();
        }

        private void ConfigDiServices(IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IBookingService, BookingService>();
            services.AddScoped<ICheckService, CheckService>();
            services.AddScoped<IPayService, PayService>();
            services.AddScoped<IUserService, UserService>();
        }

        #endregion
    }
}