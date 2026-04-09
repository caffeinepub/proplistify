import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type Article = {
    id : Common.ArticleId;
    slug : Common.Slug;
    title : Text;
    metaDescription : Text;
    content : Text;
    featuredImage : Storage.ExternalBlob;
    publishedAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
    author : Text;
    isPublished : Bool;
  };

  public type ArticleInput = {
    slug : Common.Slug;
    title : Text;
    metaDescription : Text;
    content : Text;
    featuredImage : Storage.ExternalBlob;
    author : Text;
    isPublished : Bool;
  };

  public type ArticlePage = {
    items : [Article];
    total : Nat;
    offset : Nat;
    limit : Nat;
  };
};
