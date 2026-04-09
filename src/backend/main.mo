import Map "mo:core/Map";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import PropertyTypes "types/property";
import ArticleTypes "types/article";
import LeadTypes "types/lead";
import ReviewTypes "types/review";
import Common "types/common";
import PropertyMixin "mixins/property-api";
import ArticleMixin "mixins/article-api";
import LeadMixin "mixins/lead-api";
import ReviewMixin "mixins/review-api";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage
  include MixinObjectStorage();

  // Properties
  let properties = Map.empty<Common.PropertyId, PropertyTypes.Property>();
  let propertySlugIndex = Map.empty<Common.Slug, Common.PropertyId>();
  var propertyCounterValue : Nat = 0;
  let propertyCounter = { var value = propertyCounterValue };
  include PropertyMixin(accessControlState, properties, propertySlugIndex, propertyCounter);

  // Articles
  let articles = Map.empty<Common.ArticleId, ArticleTypes.Article>();
  let articleSlugIndex = Map.empty<Common.Slug, Common.ArticleId>();
  var articleCounterValue : Nat = 0;
  let articleCounter = { var value = articleCounterValue };
  include ArticleMixin(accessControlState, articles, articleSlugIndex, articleCounter);

  // Leads
  let leads = List.empty<LeadTypes.Lead>();
  var leadCounterValue : Nat = 0;
  let leadCounter = { var value = leadCounterValue };
  include LeadMixin(accessControlState, leads, leadCounter);

  // Reviews
  let reviews = List.empty<ReviewTypes.Review>();
  var reviewCounterValue : Nat = 0;
  let reviewCounter = { var value = reviewCounterValue };
  include ReviewMixin(accessControlState, reviews, reviewCounter);
};
