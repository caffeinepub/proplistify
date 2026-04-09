import Map "mo:core/Map";
import List "mo:core/List";
import ArticleTypes "../types/article";
import Common "../types/common";

module {
  public func generateId(counter : Nat) : Common.ArticleId {
    "art-" # counter.toText();
  };

  func resolveSlug(slugIndex : Map.Map<Common.Slug, Common.ArticleId>, baseSlug : Common.Slug, excludeId : ?Common.ArticleId) : Common.Slug {
    var candidate = baseSlug;
    var suffix = 2;
    label search loop {
      switch (slugIndex.get(candidate)) {
        case null { break search };
        case (?existingId) {
          switch excludeId {
            case (?eid) {
              if (existingId == eid) { break search };
            };
            case null {};
          };
          candidate := baseSlug # "-" # suffix.toText();
          suffix += 1;
        };
      };
    };
    candidate;
  };

  public func createArticle(
    articles : Map.Map<Common.ArticleId, ArticleTypes.Article>,
    slugIndex : Map.Map<Common.Slug, Common.ArticleId>,
    input : ArticleTypes.ArticleInput,
    id : Common.ArticleId,
    now : Common.Timestamp,
  ) : ArticleTypes.Article {
    let slug = resolveSlug(slugIndex, input.slug, null);
    let article : ArticleTypes.Article = {
      id;
      slug;
      title = input.title;
      metaDescription = input.metaDescription;
      content = input.content;
      featuredImage = input.featuredImage;
      publishedAt = now;
      updatedAt = now;
      author = input.author;
      isPublished = input.isPublished;
    };
    articles.add(id, article);
    slugIndex.add(slug, id);
    article;
  };

  public func updateArticle(
    articles : Map.Map<Common.ArticleId, ArticleTypes.Article>,
    slugIndex : Map.Map<Common.Slug, Common.ArticleId>,
    id : Common.ArticleId,
    input : ArticleTypes.ArticleInput,
    now : Common.Timestamp,
  ) : ?ArticleTypes.Article {
    switch (articles.get(id)) {
      case null null;
      case (?existing) {
        let newSlug = if (existing.slug == input.slug) {
          existing.slug;
        } else {
          let resolved = resolveSlug(slugIndex, input.slug, ?id);
          slugIndex.remove(existing.slug);
          slugIndex.add(resolved, id);
          resolved;
        };
        let updated : ArticleTypes.Article = {
          id;
          slug = newSlug;
          title = input.title;
          metaDescription = input.metaDescription;
          content = input.content;
          featuredImage = input.featuredImage;
          publishedAt = existing.publishedAt;
          updatedAt = now;
          author = input.author;
          isPublished = input.isPublished;
        };
        articles.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteArticle(
    articles : Map.Map<Common.ArticleId, ArticleTypes.Article>,
    slugIndex : Map.Map<Common.Slug, Common.ArticleId>,
    id : Common.ArticleId,
  ) : Bool {
    switch (articles.get(id)) {
      case null false;
      case (?existing) {
        slugIndex.remove(existing.slug);
        articles.remove(id);
        true;
      };
    };
  };

  public func getArticle(
    articles : Map.Map<Common.ArticleId, ArticleTypes.Article>,
    id : Common.ArticleId,
  ) : ?ArticleTypes.Article {
    articles.get(id);
  };

  public func getArticleBySlug(
    articles : Map.Map<Common.ArticleId, ArticleTypes.Article>,
    slugIndex : Map.Map<Common.Slug, Common.ArticleId>,
    slug : Common.Slug,
  ) : ?ArticleTypes.Article {
    switch (slugIndex.get(slug)) {
      case null null;
      case (?id) articles.get(id);
    };
  };

  public func listArticles(
    articles : Map.Map<Common.ArticleId, ArticleTypes.Article>,
    offset : Nat,
    limit : Nat,
  ) : ArticleTypes.ArticlePage {
    let all = List.fromIter<ArticleTypes.Article>(articles.values());
    let total = all.size();
    let items = all.sliceToArray(offset.toInt(), (offset + limit).toInt());
    { items; total; offset; limit };
  };

  public func getRecentArticles(
    articles : Map.Map<Common.ArticleId, ArticleTypes.Article>,
    count : Nat,
  ) : [ArticleTypes.Article] {
    let all = List.fromIter<ArticleTypes.Article>(articles.values());
    let published = all.filter(func(a : ArticleTypes.Article) : Bool { a.isPublished });
    let sorted = published.sort(func(a : ArticleTypes.Article, b : ArticleTypes.Article) : { #less; #equal; #greater } {
      if (a.publishedAt > b.publishedAt) { #less }
      else if (a.publishedAt < b.publishedAt) { #greater }
      else { #equal };
    });
    sorted.sliceToArray(0, count.toInt());
  };
};
