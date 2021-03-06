﻿using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Studio404.Dto.Misc;
using Studio404.Services.Interface;
using Studio404.Web.Admin.Controllers.Base;

namespace Studio404.Web.Admin.Controllers
{
    [Route("api/[controller]")]
    public class MiscController : BaseUserController
    {
	    private readonly IAdminConfiguration _configuration;

	    public MiscController(IAdminConfiguration configuration)
	    {
		    _configuration = configuration;
	    }

	    [HttpGet]
        public MiscInfoAdminDto Get()
        {
			return new MiscInfoAdminDto
			{
				Version = Assembly.GetExecutingAssembly().GetCustomAttribute<AssemblyInformationalVersionAttribute>()
					.InformationalVersion,
				UserDisplayName = GetUser().DisplayName,
				DemoStaging = _configuration.DemoStaging
			};
        }
    }
}