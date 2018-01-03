using Microsoft.AspNetCore.Mvc;
using Studio404.Services.Interface;
using Microsoft.Extensions.Logging;
using Studio404.Dto.Pay;
using Microsoft.AspNetCore.Http;
using System.Security.Cryptography;
using System.Text;
using System.Linq;
using Microsoft.Extensions.Options;
using Studio404.Common.Settings;
using System;

namespace Studio404.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class PayController : Controller
    {
        private readonly IPayService _payService;
        private readonly ILogger<PayController> _logger;
        private readonly PayServiceSettings _payServiceSettings;

        public PayController(IPayService payService, ILogger<PayController> logger, IOptions<PayServiceSettings> payServiceSettings)
        {
            _payService = payService;
            _logger = logger;
            _payServiceSettings = payServiceSettings.Value;
        }

        [HttpPost]
        public void Confirm(ConfirmBookingDto confirmBooking)
        {
			_logger.LogInformation($"Payment Confirmation request. Amount: [{confirmBooking.Amount}], CodePro: [{confirmBooking.CodePro}], Currency: [{confirmBooking.Currency}], DateTime: [{confirmBooking.DateTime}], Hash: [{confirmBooking.Hash}], Label: [{confirmBooking.Label}], NotificationType: [{confirmBooking.NotificationType}], OperationId: [{confirmBooking.OperationId}], Sender: [{confirmBooking.Sender}]");

			if (!ValidateConfirmForm(HttpContext.Request.Form, out string paramString))
            {
                _logger.LogWarning($"Payment Confirmation hash checking failed. Param string: {paramString}");
                return;
            }

            var guid = new Guid(confirmBooking.Label);
            _payService.ConfirmBooking(guid);

            _logger.LogInformation($"Payment Confirmation success. Guid: {guid}");
        }

        private bool ValidateConfirmForm(IFormCollection form, out string paramString)
        {
            string secret = _payServiceSettings.YandexSecret;
            paramString = $"{form["notification_type"]}&{form["operation_id"]}&{form["amount"]}&{form["currency"]}&{form["datetime"]}&{form["sender"]}&{form["codepro"]}&{secret}&{form["label"]}";
            string hash = Hash(paramString);
            return string.Equals(hash, form["sha1_hash"]);
        }

        private string Hash(string input)
        {
            using (var sha1 = new SHA1Managed())
            {
                byte[] hash = sha1.ComputeHash(Encoding.UTF8.GetBytes(input));
                return string.Join("", hash.Select(b => b.ToString("x2")).ToArray());
            }
        }
    }
}