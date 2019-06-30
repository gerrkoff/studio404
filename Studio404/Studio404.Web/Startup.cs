using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NLog.Web;
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
            
            var logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
            
            app.Use(async (context, next) =>
            {
                // Request method, scheme, and path
                logger.Info("Request Method: {METHOD}", context.Request.Method);
                logger.Info("Request Scheme: {SCHEME}", context.Request.Scheme);
                logger.Info("Request Path: {PATH}", context.Request.Path);

                // Headers
                foreach (var header in context.Request.Headers)
                {
                    logger.Info("Header: {KEY}: {VALUE}", header.Key, header.Value);
                }

                // Connection: RemoteIp
                logger.Info("Request RemoteIp: {REMOTE_IP_ADDRESS}", 
                    context.Connection.RemoteIpAddress);

                await next();
            });

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