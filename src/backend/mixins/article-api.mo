import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ArticleLib "../lib/article";
import ArticleTypes "../types/article";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  articles : Map.Map<Common.ArticleId, ArticleTypes.Article>,
  articleSlugIndex : Map.Map<Common.Slug, Common.ArticleId>,
  articleCounter : { var value : Nat },
) {
  public shared ({ caller }) func createArticle(input : ArticleTypes.ArticleInput) : async ArticleTypes.Article {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create articles");
    };
    articleCounter.value += 1;
    let id = ArticleLib.generateId(articleCounter.value);
    let now = Time.now();
    ArticleLib.createArticle(articles, articleSlugIndex, input, id, now);
  };

  public shared ({ caller }) func updateArticle(id : Common.ArticleId, input : ArticleTypes.ArticleInput) : async ?ArticleTypes.Article {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update articles");
    };
    let now = Time.now();
    ArticleLib.updateArticle(articles, articleSlugIndex, id, input, now);
  };

  public shared ({ caller }) func deleteArticle(id : Common.ArticleId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete articles");
    };
    ArticleLib.deleteArticle(articles, articleSlugIndex, id);
  };

  public query func getArticle(id : Common.ArticleId) : async ?ArticleTypes.Article {
    ArticleLib.getArticle(articles, id);
  };

  public query func getArticleBySlug(slug : Common.Slug) : async ?ArticleTypes.Article {
    ArticleLib.getArticleBySlug(articles, articleSlugIndex, slug);
  };

  public query func listArticles(offset : Nat, limit : Nat) : async ArticleTypes.ArticlePage {
    ArticleLib.listArticles(articles, offset, limit);
  };

  public query func getRecentArticles(count : Nat) : async [ArticleTypes.Article] {
    ArticleLib.getRecentArticles(articles, count);
  };
};
