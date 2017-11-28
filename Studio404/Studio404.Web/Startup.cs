using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Studio404.Dal.Context;

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

            ConfigDiDb(services);
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
            app.UseMvc();
        }

        #region Config Services

        private void ConfigDiDb(IServiceCollection services)
        {
            string database = Configuration.GetValue<string>("database");
            switch (database)
            {
                case "mssql":
                    services.AddScoped<ApplicationContext, SqlServerAppContext>();
                    services.AddDbContext<SqlServerAppContext>();
                    break;
                case "postgre":
                    services.AddScoped<ApplicationContext, PostgreAppContext>();
                    services.AddDbContext<PostgreAppContext>();
                    break;
                default:
                    throw new ArgumentException("Argument value must be 'mssql' or 'postgre'", nameof(database));
            }
        }

        #endregion
    }
}