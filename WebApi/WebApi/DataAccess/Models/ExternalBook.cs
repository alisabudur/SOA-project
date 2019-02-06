using System.Collections.Generic;
using Newtonsoft.Json;

namespace WebApi.DataAccess.Models
{
    public class ExternalBook
    {
        [JsonProperty("ISBN")]
        public string Isbn { get; set; }
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string Description { get; set; }
        public string CoverThumb { get; set; }
        public string LanguageCode { get; set; }
        public List<string> Subjects { get; set; }
        public List<ExternalAuthor> Authors { get; set; }
    }
}
