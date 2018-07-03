using System.Collections.Generic;
using System.Data;
using Dapper;
using dragon_post.Models;

namespace dragon_post.Repositories
{
  public class PostRepository : DbContext
  {
    public PostRepository(IDbConnection db) : base(db)
    {
    }

    public Post CreatePost(Post newPost)
    {
      int id = _db.ExecuteScalar<int>(@"
                INSERT INTO posts (title, body, authorId)
                VALUES (@Title, @Body, @AuthorId);
                SELECT LAST_INSERT_ID();
            ", newPost);
      newPost.Id = id;
      return newPost;
    }

    public IEnumerable<Post> GetAll()
    {
      return _db.Query<Post>("SELECT * FROM posts;");
    }

    public IEnumerable<Post> GetByUserId(string id)
    {
      return _db.Query<Post>("SELECT * FROM posts WHERE authorId = @id", new { id });
    }

    public Post GetbyPostId(int id)
    {
      return _db.QueryFirstOrDefault<Post>("SELECT * FROM posts WHERE id = @id;", new { id });
    }

    public IEnumerable<Post> GetByTag(string tag)
    {
      var check = _db.Query<Post>(@"
      SELECT * FROM tags
      INNER JOIN posts ON posts.id = tags.postId 
      WHERE (name = @tag)", new{tag});
      return check;
    }

    public Post EditPost(int id, Post post)
    {
      post.Id = id;
      var i = _db.Execute(@"
                UPDATE posts SET
                    title = @Title,
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

    public bool DeletePost(int id)
    {
      var i = _db.Execute(@"
      DELETE FROM posts
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