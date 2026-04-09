import List "mo:core/List";
import Runtime "mo:core/Runtime";
import ReviewTypes "../types/review";
import Common "../types/common";

module {
  public func generateId(counter : Nat) : Common.ReviewId {
    "rev-" # counter.toText();
  };

  public func submitReview(
    reviews : List.List<ReviewTypes.Review>,
    input : ReviewTypes.ReviewInput,
    id : Common.ReviewId,
    now : Common.Timestamp,
  ) : ReviewTypes.Review {
    if (input.rating < 1 or input.rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    // Rate-limit: one review per email+propertyId combination
    let existing = reviews.find(func(r : ReviewTypes.Review) : Bool {
      r.email == input.email and r.propertyId == input.propertyId;
    });
    switch existing {
      case (?_) Runtime.trap("You have already submitted a review for this property");
      case null {};
    };
    let review : ReviewTypes.Review = {
      id;
      propertyId = input.propertyId;
      name = input.name;
      email = input.email;
      rating = input.rating;
      comment = input.comment;
      createdAt = now;
      isApproved = false;
    };
    reviews.add(review);
    review;
  };

  public func listReviews(
    reviews : List.List<ReviewTypes.Review>,
    propertyId : Common.PropertyId,
  ) : [ReviewTypes.Review] {
    let filtered = reviews.filter(func(r : ReviewTypes.Review) : Bool {
      r.propertyId == propertyId and r.isApproved;
    });
    filtered.toArray();
  };

  public func listAllReviews(
    reviews : List.List<ReviewTypes.Review>,
  ) : [ReviewTypes.Review] {
    reviews.toArray();
  };

  public func approveReview(
    reviews : List.List<ReviewTypes.Review>,
    id : Common.ReviewId,
  ) : Bool {
    var found = false;
    reviews.mapInPlace(func(r : ReviewTypes.Review) : ReviewTypes.Review {
      if (r.id == id) {
        found := true;
        { r with isApproved = true };
      } else {
        r;
      };
    });
    found;
  };

  public func deleteReview(
    reviews : List.List<ReviewTypes.Review>,
    id : Common.ReviewId,
  ) : Bool {
    let before = reviews.size();
    let filtered = reviews.filter(func(r : ReviewTypes.Review) : Bool { r.id != id });
    let after = filtered.size();
    if (before != after) {
      reviews.clear();
      reviews.append(filtered);
      true;
    } else {
      false;
    };
  };

  public func getPropertyAverageRating(
    reviews : List.List<ReviewTypes.Review>,
    propertyId : Common.PropertyId,
  ) : Float {
    let approved = reviews.filter(func(r : ReviewTypes.Review) : Bool {
      r.propertyId == propertyId and r.isApproved;
    });
    let count = approved.size();
    if (count == 0) { return 0.0 };
    let total = approved.foldLeft(0, func(acc : Nat, r : ReviewTypes.Review) : Nat {
      acc + r.rating;
    });
    total.toFloat() / count.toFloat();
  };
};
