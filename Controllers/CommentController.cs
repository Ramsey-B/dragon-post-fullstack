using System.Collections.Generic;
using dragon_post.Models;
using dragon_post.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dragon_post.Controllers
{
  [Route("[controller]")]
  public class CommentController : Controller 
  {
    private readonly CommentRepository _db;
    public CommentController(CommentRepository repo)
    {
        _db = repo;
    }

    [HttpPost]
    [Authorize]
    public Comment CreateComment([FromBody]Comment newComment)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        newComment.AuthorId = user.Identity.Name;
        return _db.CreateComment(newComment);
      }
      return null;
    }

    [HttpGet("post/{id}")]
    public IEnumerable<Comment> GetByPostId(int id)
    {
      return _db.getComments(id);
    }

    [HttpGet("user/{id}")]

    public IEnumerable<Comment> GetByUserId(string id)
    {
      return _db.GetByUserId(id);
    }

    [HttpGet("{id}")]
    public Comment GetById(int id)
    {
      return _db.GetbyCommentId(id);
    }

    [HttpPut("{id}")]
    [Authorize]
    public Comment EditComment(int id, [FromBody]Comment editComment)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        editComment.AuthorId = user.Identity.Name;
        return _db.EditComment(id, editComment);
      }
      return null;
    }

    [HttpDelete("{id}")]
    [Authorize]
    public string DeleteComment(int id)
    {
      bool delete = _db.DeleteComment(id);
      if(delete)
      {
        return "Successfully deleted!";
      }
      return "An Error Occurred! Try Again!";
    }
  }
}