using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Studio404.Dal.Context;
using Studio404.Dal.Entity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Studio404.Dal;
using Studio404.Web.Common.Configuration;
using Studio404.Web.Common.Filters;
using Studio404.Web.Common.Middleware;

namespace Studio404.Web.Admin
{
    public class Startup
    {
        private const string AuthorizedUsersPolicyName = "IsAdmin";
        private const string LoginPath = "/login";
        
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .ConfigDiServices(Configuration)
                .ConfigDb(Configuration)
				.ConfigAutoMapper();

			services.AddIdentity<UserEntity, IdentityRole>()
				.AddEntityFrameworkStores<ApplicationContext>()
				.AddDefaultTokenProviders()
				.AddClaimsPrincipalFactory<AdminUserClaimsPrincipalFactory>();

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.HttpOnly = true;
                options.ExpireTimeSpan = TimeSpan.FromMinutes(60);
                options.LoginPath = LoginPath;
                options.SlidingExpiration = true;
            });

            services.AddAuthorization(options =>
            {
                options.AddPolicy(AuthorizedUsersPolicyName, policy => policy.RequireRole(Roles.ADMINISTRATOR_ROLE_NAME));
            });
            
            services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");

            services.AddMvc(options =>
            {
                options.Filters.Add(typeof(JsonExceptionFilter));
                options.Filters.Add(typeof(ActionLoggingFilter));
                options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
				options.Filters.Add(new AuthorizeFilter(AuthorizedUsersPolicyName));
			});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMiddleware<HealthCheckMiddleware>();
            app.UseAuthentication();
            app.UseMiddleware<WhiteListMiddleware>(new WhiteListOptions
            {
                PathStartsWith = LoginPath,
                PolicyName = AuthorizedUsersPolicyName
            });
            app.UseMiddleware<AntiforgeryMiddleware>("XSRF-TOKEN");
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
