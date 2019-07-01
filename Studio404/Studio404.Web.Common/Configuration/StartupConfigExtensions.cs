using System;
using System.IO.Compression;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Studio404.Automapper;
using Studio404.Common.Settings;
using Studio404.Dal.Context;
using Studio404.Dal.Entity;
using Studio404.Dal.Repository;
using Studio404.Services.Implementation;
using Studio404.Services.Interface;

namespace Studio404.Web.Common.Configuration
{
    public static class StartupConfigExtensions
    {
        public static IServiceCollection ConfigCompression(this IServiceCollection services)
        {
            services.Configure<GzipCompressionProviderOptions>(options => options.Level = CompressionLevel.Optimal);
            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
                options.MimeTypes = new[]
                {
                    // Default
                    "text/plain",
                    "text/css",
                    "application/javascript",
                    "text/html",
                    // "application/xml",
                    // "text/xml",
                    // "application/json",
                    // "text/json",

                    // Custom
                    "image/svg+xml"
                };
            });

	        return services;
        }

	    public static IServiceCollection ConfigDb(this IServiceCollection services, IConfiguration configuration)
        {
            #region Connection String

            string databaseProvider = configuration.GetValue<string>("databaseProvider");
            string connectionString = configuration.GetConnectionString("appDb");

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

	        return services;
        }

	    public static IServiceCollection ConfigIdentity(this IServiceCollection services)
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

	        return services;
        }

	    public static IServiceCollection ConfigConfiguration(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<SmsServiceSettings>(options =>
	            configuration.GetSection("SmsServiceSettings").Bind(options));

            services.Configure<PayServiceSettings>(options =>
	            configuration.GetSection("PayServiceSettings").Bind(options));

            services.Configure<AuthSettings>(options =>
	            configuration.GetSection("Auth").Bind(options));

	        return services;
        }

	    public static IServiceCollection ConfigAutoMapper(this IServiceCollection services)
        {
            services.AddAutoMapper(cfg =>
            {
                cfg.AddProfile<MappingProfile>();
            });

	        return services;
        }

	    public static IServiceCollection ConfigAuthClient(this IServiceCollection services, IConfiguration configuration)
        {
            AuthSettings authSettings = configuration.GetSection("Auth").Get<AuthSettings>();
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
				.AddVkontakte(vkOptions => 
				{
					vkOptions.SignInScheme = IdentityConstants.ExternalScheme;
					vkOptions.ClientId = authSettings.AuthVkSettings.ClientId;
					vkOptions.ClientSecret = authSettings.AuthVkSettings.ClientSecret;
				});

	        return services;
        }

	    public static IServiceCollection ConfigDiServices(this IServiceCollection services, IConfiguration configuration)
	    {   
            services.AddScoped(typeof(IRepositoryNonDeletable<>), typeof(RepositoryNonDeletable<>));
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
			services.AddScoped<IHourCostManagerService, HourCostManagerService>();
			services.AddScoped<IPromoCodeManagerService, PromoCodeManagerService>();
			services.AddScoped<IBookingManagerService, BookingManagerService>();
			services.AddScoped<IUserManagerService, UserManagerService>();
			services.AddScoped<IAdminConfiguration, AdminConfiguration>();
			services.AddSingleton(configuration);

			#region SmsService

			SmsServiceSettings smsSettings = configuration.GetSection("SmsServiceSettings")?.Get<SmsServiceSettings>();

	        if (smsSettings == null)
	        {
		        services.AddScoped<ISmsService, SmsServiceMock>();
	        }
	        else
	        {
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
	        }

	        #endregion

	        return services;
        }
	    
	    public static IServiceCollection ConfigReverseProxy(this IServiceCollection services)
	    {
		    services.Configure<ForwardedHeadersOptions>(options =>
			    {
				    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
				    options.KnownProxies.Clear();
				    options.KnownNetworks.Clear();
			    });
		    
		    return services;
	    }
    }
}