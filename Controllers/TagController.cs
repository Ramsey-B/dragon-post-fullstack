using System.Collections.Generic;
using dragon_post.Models;
using dragon_post.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dragon_post.Controllers
{
  [Route("[controller]")]
  public class TagController : Controller
  {
    private readonly TagRepository _db;
    public TagController(TagRepository repo)
    {
      _db = repo;  
    }

    [HttpPost]
    [Authorize]
    public Tag AddTag([FromBody]Tag newTag)
    {
      if(ModelState.IsValid)
      {
        return _db.AddTag(newTag);
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