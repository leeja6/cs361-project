using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

//Used Microsoft sample code as a starting point
//https://github.com/MicrosoftTranslator/Text-Translation-API-V3-C-Sharp/blob/master/Translate.cs#L34

namespace cs361_language_microservice.Controllers
{
    [Route("/")]
    [ApiController]
    public class TranslationController : ControllerBase
    {
        public class TranslationRequest
        {
            public string Text { get; set; }
        }
        public class TranslationResult
        {
            public Translation[] Translations { get; set; }
        }

        public class Translation
        {
            public string Text { get; set; }
            public string To { get; set; }
        }

        [HttpPost]
        public async Task<string> GetTest([FromBody]TranslationRequest translationRequest, string toLanguageCode, string fromLanguageCode)
        {
            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage())
            {
                TranslationRequest[] requestForApiCall = new TranslationRequest[1];
                requestForApiCall[0] = translationRequest;
                string requestBody = JsonConvert.SerializeObject(requestForApiCall);
                
                request.Method = HttpMethod.Post;
                request.RequestUri = new Uri("https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to="+toLanguageCode+"&from="+fromLanguageCode);
                request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
                request.Headers.Add("Ocp-Apim-Subscription-Key", "");
                request.Headers.Add("Ocp-Apim-Subscription-Region", "westus2");

                // Send the request and get response.
                HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);

                // Read response as a string.
                string result = await response.Content.ReadAsStringAsync();
                TranslationResult[] deserializedOutput = JsonConvert.DeserializeObject<TranslationResult[]>(result);
                return deserializedOutput[0].Translations[0].Text;
            }
        }

    }
}
