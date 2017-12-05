using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Studio404.Common.Exceptions
{
    [Serializable]
    public class ModelValidationException : Exception
    {
        public ICollection<ModelError> Errors { get; private set; }
        
        public ModelValidationException(ModelStateDictionary modeState) : base("Model validation exception")
        {
            var errors = new List<ModelError>();
            foreach (ModelStateEntry modelStateEntry in modeState.Values)
            {
                errors.AddRange(modelStateEntry.Errors);
            }
            Errors = errors;
        }
    }
}