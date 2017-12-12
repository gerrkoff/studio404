using System.Collections.Generic;

namespace Studio404.Dto.Pay
{
    public class PrepareBookingPaymentDto
    {
        public string Url { get; set; }

        public ICollection<FormInput> Form { get; set; }

        public void AddFormInput(string name, string value)
        {
            Form.Add(new FormInput
            {
                Name = name,
                Value = value
            });
        }

        public class FormInput
        {
            public string Name { get; set; }
            public string Value { get; set; }
        }
    }
}