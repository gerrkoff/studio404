using Microsoft.Extensions.Configuration;
using Studio404.Services.Interface;

namespace Studio404.Services.Implementation
{
    public class AdminConfiguration : IAdminConfiguration
    {
        private readonly IConfiguration _configuration;

        public AdminConfiguration(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public bool DemoStaging => bool.Parse(_configuration["DemoStaging"]);
    }
}