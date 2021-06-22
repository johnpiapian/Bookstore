using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Bookstore.Models
{
    public class Book
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ISBN { get; set; }
    }
}