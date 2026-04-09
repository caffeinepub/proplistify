import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import ReviewLib "../lib/review";
import ReviewTypes "../types/review";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  reviews : List.List<ReviewTypes.Review>,
  reviewCounter : { var value : Nat },
) {
  public shared func submitReview(input : ReviewTypes.ReviewInput) : async ReviewTypes.Review {
    reviewCounter.value += 1;
    let id = ReviewLib.generateId(reviewCounter.value);
    let now = Time.now();
    ReviewLib.submitReview(reviews, input, id, now);
  };

  public query func listReviewsByProperty(propertyId : Common.PropertyId) : async [ReviewTypes.Review] {
    ReviewLib.listReviews(reviews, propertyId);
  };

  public shared ({ caller }) func listAllReviews() : async [ReviewTypes.Review] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all reviews");
    };
    ReviewLib.listAllReviews(reviews);
  };

  public shared ({ caller }) func approveReview(id : Common.ReviewId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can approve reviews");
    };
    ReviewLib.approveReview(reviews, id);
  };

  public shared ({ caller }) func deleteReview(id : Common.ReviewId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete reviews");
    };
    ReviewLib.deleteReview(reviews, id);
  };

  public query func getPropertyAverageRating(propertyId : Common.PropertyId) : async Float {
    ReviewLib.getPropertyAverageRating(reviews, propertyId);
  };
};
