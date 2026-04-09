import Common "common";

module {
  public type Review = {
    id : Common.ReviewId;
    propertyId : Common.PropertyId;
    name : Text;
    email : Text;
    rating : Nat;
    comment : Text;
    createdAt : Common.Timestamp;
    isApproved : Bool;
  };

  public type ReviewInput = {
    propertyId : Common.PropertyId;
    name : Text;
    email : Text;
    rating : Nat;
    comment : Text;
  };
};
