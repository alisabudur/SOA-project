using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebApi.DataAccess.Models;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExternalBooksController : ControllerBase
    {
        [HttpGet("{isbn}")]
        public async Task<IActionResult> GetExternalBook([FromRoute] string isbn)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            var response = await client.GetAsync($"https://www.booknomads.com/api/v0/isbn/{isbn}");
            if (response.IsSuccessStatusCode)
            {
                var bookString = await response.Content.ReadAsStringAsync();
                var externalBook = JsonConvert.DeserializeObject<ExternalBook>(bookString);
                return Ok(ConvertToBook(externalBook));
            }

            return NotFound();
        }

        private Book ConvertToBook(ExternalBook externalBook)
        {
            var book = new Book
            {
                Title = externalBook.Title,
                Isbn = externalBook.Isbn,
                Author = string.Join(", ", externalBook.Authors.Select(a => a.Name).ToList()),
            };

            return book;
        }
    }
}