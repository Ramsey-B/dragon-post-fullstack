using System.Collections.Generic;
using System.Data;
using Dapper;
using dragon_post.Models;

namespace dragon_post.Repositories
{
  public class TagRepository : DbContext
  {
    public TagRepository(IDbConnection db) : base(db)
    {
    }
    public Tag AddTag(Tag newTag)
    {
      int id = _db.ExecuteScalar<int>(@"
                INSERT INTO tags (name, postId)
                VALUES (@Name, @PostId);
                SELECT LAST_INSERT_ID();
            ", newTag);
      newTag.Id = id;
      return newTag;
    }

    public IEnumerable<Tag> GetPostsTags(int postId)
    {
      return _db.Query<Tag>("SELECT * FROM tags WHERE postId = @postId", new { postId });
    }

    public bool RemoveTag(int id)
    {
      var i = _db.Execute(@"
      DELETE FROM tags
      WHERE id = @id
      LIMIT 1;
      ", new { id });
      return i > 0;
    }
  }
}