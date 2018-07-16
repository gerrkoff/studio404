using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Security.Permissions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Linq;

namespace Studio404.Common.Exceptions
{
    [Serializable]
    public class ModelValidationException : Exception
    {
        public ICollection<ModelError> Errors { get; }

		public ModelValidationException(string message) : base("Model validation exception")
		{
			Errors = new List<ModelError> { new ModelError(message) };
		}
        
        public ModelValidationException(ModelStateDictionary modeState) : base("Model validation exception")
        {
            var errors = new List<ModelError>();
            foreach (ModelStateEntry modelStateEntry in modeState.Values)
            {
                errors.AddRange(modelStateEntry.Errors);
            }
            Errors = errors;
        }
        
        [SecurityPermission(SecurityAction.Demand, SerializationFormatter = true)]
        public override void GetObjectData(SerializationInfo info, StreamingContext context)
        {
            info?.AddValue(nameof(Errors), Errors);

            base.GetObjectData(info, context);
        }

        public override IDictionary Data => Errors.ToDictionary(x => x.ErrorMessage);
    }
}