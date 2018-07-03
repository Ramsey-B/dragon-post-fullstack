using System.Collections.Generic;
using dragon_post.Models;
using dragon_post.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dragon_post.Controllers
{
  [Route("[controller]")]
  public class PostController : Controller
  {
    private readonly PostRepository _db;
    public PostController(PostRepository repo)
    {
      _db = repo;  
    }

    [HttpPost]
    [Authorize]
    public Post CreatePost([FromBody]Post newPost)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        newPost.AuthorId = user.Identity.Name;
        return _db.CreatePost(newPost);
      }
      return null;
    }
    [HttpGet]
    public IEnumerable<Post> GetAll()
    {
      return _db.GetAll();
    }

    [HttpGet("{id}")]
    public Post GetById(int id)
    {
      return _db.GetbyPostId(id);
    }
    [HttpGet("author/{id}")]
    public IEnumerable<Post> GetByUserId(string id)
    {
      return _db.GetByUserId(id);
    }

    [HttpGet("tags/{name}")]
    public IEnumerable<Post> GetByTag(string name)
    {
      return _db.GetByTag(name);
    }

    [HttpPut("{id}")]
    [Authorize]
    public Post EditPost(int id, [FromBody]Post editPost)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        editPost.AuthorId = user.Identity.Name;
        return _db.EditPost(id, editPost);
      }
      return null;
    }

    [HttpDelete("{id}")]
    [Authorize]
    public string DeletePost(int id)
    {
      bool delete = _db.DeletePost(id);
      if (delete)
      {
        return "Successfully Deleted!";
      }
      return "An Error Occurred, try again!";
    }
  }
}