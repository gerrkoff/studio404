﻿using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Security.Permissions;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Studio404.Common.Exceptions
{
    [Serializable]
    public class ServiceException : Exception
    {   
        public ServiceException(string message) : base(message)
        {
        }
    }

    public class ServiceExceptionCreator
    {
        public static ServiceException InvalidEntity(string name)
        {
            return new ServiceException($"{name} is invalid for this operation");
        }
    }
}