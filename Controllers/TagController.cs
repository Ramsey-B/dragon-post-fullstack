using System.Collections.Generic;
using dragon_post.Models;
using dragon_post.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dragon_post.Controllers
{
  [Route("api/[controller]")]
  public class TagController : Controller
  {
    private readonly TagRepository _db;
    public TagController(TagRepository repo)
    {
      _db = repo;  
    }

    [HttpPost("{id}")]
    [Authorize]
    public Tag AddTag([FromBody]Tag newTag, int id)
    {
      newTag.Name.Replace(" ", "+");
      var user = HttpContext.User.Identity.Name;
      if(ModelState.IsValid)
      {
        return _db.AddTag(newTag, user, id);
      }
      return null;
    }

    [HttpPost("multi/{id}")]
    [Authorize]
    public IEnumerable<Tag> AddTags([FromBody]List<Tag> tags, int id)
    {
      tags.ForEach(tag => {
        tag.Name.Replace(" ", "+");
      });
      var user = HttpContext.User.Identity.Name;
      if(ModelState.IsValid)
      {
        return _db.AddTags(tags, user, id);
      }
      return null;
    }

    [HttpGet("{id}")]
    public IEnumerable<Tag> GetPostsTags(int id)
    {
      return _db.GetPostsTags(id);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public string RemoveTag(int id)
    {
      bool result = _db.RemoveTag(id);
      if(result)
      {
        return "Tag Successfully Removed!";
      }
      return "An Error Occurred! Try Again!";
    }
  }
}