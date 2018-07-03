using System.Collections.Generic;
using System.Data;
using Dapper;
using dragon_post.Models;

namespace dragon_post.Repositories
{
  public class CommentRepository : DbContext
  {
    public CommentRepository(IDbConnection db) : base(db)
    {
    }

    public Comment CreateComment(Comment newComment)
    {
      int id = _db.ExecuteScalar<int>(@"
                INSERT INTO comments (body, authorId, postId)
                VALUES (@Body, @AuthorId, @PostId);
                SELECT LAST_INSERT_ID();
            ", newComment);
      newComment.Id = id;
      return newComment;
    }

    public IEnumerable<Comment> getComments(int id) 
    {
      return _db.Query<Comment>("SELECT * FROM comments WHERE postId = @id", new { id });
    }

    public IEnumerable<Comment> GetByUserId(string id)
    {
      return _db.Query<Comment>("SELECT * FROM comments WHERE authorId = @id", new { id });
    }

    public Comment GetbyCommentId(int id)
    {
      return _db.QueryFirstOrDefault<Comment>("SELECT * FROM comments WHERE id = @id;", new { id });
    }

    public Comment EditComment(int id, Comment post)
    {
      post.Id = id;
      var i = _db.Execute(@"
                UPDATE comments SET
                  body = @Body
                WHERE id = @Id
                AND authorId = @AuthorId
            ", post);
      if (i > 0)
      {
        return post;
      }
      return null;
    }

    public bool DeleteComment(int id)
    {
      var i = _db.Execute(@"
      DELETE FROM comments
      WHERE id = @id
      LIMIT 1;
      ", new { id });
      if (i > 0)
      {
        return true;
      }
      return false;
    }
  }
}