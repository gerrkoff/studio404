using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Studio404.Web.Admin.Middleware;
using Microsoft.AspNetCore.Http;

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

            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.LoginPath = new PathString(LoginPath);
                });
            
            services.AddAuthorization(options =>
            {
                options.AddPolicy(AuthorizedUsersPolicyName, policy => policy.RequireAuthenticatedUser());
            });
            
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMiddleware<WhiteListMiddleware>(new WhiteListOptions()
            {
                PathStartsWith = LoginPath,
                PolicyName = AuthorizedUsersPolicyName
            });
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvc();
        }
    }
}
