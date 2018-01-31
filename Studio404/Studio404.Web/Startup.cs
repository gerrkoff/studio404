using System;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Studio404.Dal.Context;
using Studio404.Services.Interface;
using Studio404.Services.Implementation;
using Studio404.Dal.Repository;
using Microsoft.EntityFrameworkCore;
using Studio404.Automapper;
using Studio404.Common.Settings;
using Studio404.Dal.Entity;
using Studio404.Web.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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
            ConfigAuth(services);
            ConfigDb(services);
            ConfigIdentity(services);
            ConfigDiServices(services);
            ConfigAutoMapper(services);
            ConfigConfiguration(services);

            services.AddMvc(options =>
            {
                options.Filters.Add(typeof(JsonExceptionFilter));
            });
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
                case "Postgres":
                    services.AddDbContext<ApplicationContext>(options =>
                        options.UseNpgsql(connectionString));
                    break;
                default:
                    throw new ArgumentException("Argument value must be 'SqlServer' or 'Postgres'", nameof(databaseProvider));
            }

            #endregion

            services.AddScoped<DbContext, ApplicationContext>();

        }

        private void ConfigIdentity(IServiceCollection services)
        {
            IdentityBuilder builder = services.AddIdentityCore<UserEntity>(options =>
            {
                options.Password.RequiredLength = 5;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireDigit = false;
            });
            builder = new IdentityBuilder(builder.UserType, typeof(IdentityRole), builder.Services);
            builder
                .AddDefaultTokenProviders()
                .AddEntityFrameworkStores<ApplicationContext>();

			services.AddScoped<SignInManager<UserEntity>>();
            services.AddScoped<UserManager<UserEntity>>();
        }

        private void ConfigConfiguration(IServiceCollection services)
        {
            services.Configure<StudioSettings>(options =>
                Configuration.GetSection("StudioSettings").Bind(options));

            services.Configure<SmsServiceSettings>(options =>
                Configuration.GetSection("SmsServiceSettings").Bind(options));

            services.Configure<PayServiceSettings>(options =>
                Configuration.GetSection("PayServiceSettings").Bind(options));

            services.Configure<AuthSettings>(options =>
                Configuration.GetSection("Auth").Bind(options));
        }

        private void ConfigAutoMapper(IServiceCollection services)
        {
            services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });
        }

        private void ConfigAuth(IServiceCollection services)
        {
            AuthSettings authSettings = Configuration.GetSection("Auth").Get<AuthSettings>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidIssuer = authSettings.Issuer,
                            ValidateAudience = true,
                            ValidAudience = authSettings.Audience,
                            ValidateLifetime = true,
                            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(authSettings.Key)),
                            ValidateIssuerSigningKey = true,
                            ClockSkew = TimeSpan.Zero
                        };
                    });
			
			services.AddAuthentication()
				.AddCookie(IdentityConstants.ExternalScheme)
				.AddGoogle(googleOptions =>
				{
					googleOptions.SignInScheme = IdentityConstants.ExternalScheme;
					googleOptions.ClientId = authSettings.AuthGoogleSettings.ClientId;
					googleOptions.ClientSecret = authSettings.AuthGoogleSettings.ClientSecret;
				})
				.AddTwitter(twitterOptions =>
				{
					twitterOptions.SignInScheme = IdentityConstants.ExternalScheme;
					twitterOptions.ConsumerKey = authSettings.AuthTwitterSettings.ConsumerKey;
					twitterOptions.ConsumerSecret = authSettings.AuthTwitterSettings.ConsumerSecret;
				})
				.AddFacebook(facebookOptions =>
				{
					facebookOptions.SignInScheme = IdentityConstants.ExternalScheme;
					facebookOptions.AppId = authSettings.AuthFacebookSettings.AppId;
					facebookOptions.AppSecret = authSettings.AuthFacebookSettings.AppSecret;
				})
				.AddVKontakte(vkOptions => 
				{
					vkOptions.SignInScheme = IdentityConstants.ExternalScheme;
					vkOptions.ClientId = authSettings.AuthVkSettings.ClientId;
					vkOptions.ClientSecret = authSettings.AuthVkSettings.ClientSecret;
				});
		}

        private void ConfigDiServices(IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IBookingService, BookingService>();
            services.AddScoped<ICheckService, CheckService>();
            services.AddScoped<IPayService, PayService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<INotificationService, NotificationService>();
            services.AddScoped<IDateService, DateService>();
            services.AddScoped<ICostEvaluationService, CostEvaluationService>();
            services.AddScoped<ITokenService, TokenService>();
			services.AddScoped<IExternalService, ExternalService>();

			#region SmsService

			SmsServiceSettings smsSettings = Configuration.GetSection("SmsServiceSettings").Get<SmsServiceSettings>();
			switch (smsSettings.Provider)
			{
				case "mock":
					services.AddScoped<ISmsService, SmsServiceMock>();
					break;
                case "twilio":
                    services.AddScoped<ISmsService, SmsServiceTwilio>();
                    break;
				case "smsru":
					services.AddScoped<ISmsService, SmsServiceSmsRu>();
					break;
				default:
				    throw new ArgumentException("Argument value must be in ('mock', 'twilio', 'smsru')",
				        nameof(smsSettings.Provider));
			}

			#endregion
		}

		#endregion
	}
}