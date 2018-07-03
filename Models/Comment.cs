namespace dragon_post.Models
{
  public class Comment 
  {
    public int Id { get; set; }
    public string Body { get; set; }
    public string AuthorId { get; set; }
    public int PostId { get; set; }
  }
}