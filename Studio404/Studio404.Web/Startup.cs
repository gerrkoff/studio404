using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Studio404.Web.Common.Configuration;
using Studio404.Web.Common.Filters;
using Studio404.Web.Common.Middleware;

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
            services
                .ConfigAuthClient(Configuration)
                .ConfigDb(Configuration)
                .ConfigIdentity()
                .ConfigDiServices(Configuration)
                .ConfigAutoMapper()
                .ConfigConfiguration(Configuration)
                .ConfigCompression()
                .ConfigReverseProxy();

            services.AddMvc(options =>
            {
                options.Filters.Add(typeof(JsonExceptionFilter));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseForwardedHeaders();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

	        app.UseMiddleware<HealthCheckMiddleware>();
            app.UseResponseCompression();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseMvc();
        }
	}
}