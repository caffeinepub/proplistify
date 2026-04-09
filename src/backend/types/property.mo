import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type PropertyType = {
    #rental;
    #sale;
    #resale;
    #newProject;
    #plotLand;
  };

  public type PropertyStatus = {
    #active;
    #pending;
    #sold;
    #inactive;
  };

  public type Property = {
    id : Common.PropertyId;
    slug : Common.Slug;
    title : Text;
    description : Text;
    propertyType : PropertyType;
    price : Float;
    heroImage : Storage.ExternalBlob;
    galleryImages : [Storage.ExternalBlob];
    amenities : [Text];
    floorplans : [Storage.ExternalBlob];
    overview : Text;
    address : Text;
    city : Text;
    bedrooms : Nat;
    bathrooms : Nat;
    areaSqft : Float;
    status : PropertyStatus;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
    isFeatured : Bool;
  };

  public type PropertyInput = {
    slug : Common.Slug;
    title : Text;
    description : Text;
    propertyType : PropertyType;
    price : Float;
    heroImage : Storage.ExternalBlob;
    galleryImages : [Storage.ExternalBlob];
    amenities : [Text];
    floorplans : [Storage.ExternalBlob];
    overview : Text;
    address : Text;
    city : Text;
    bedrooms : Nat;
    bathrooms : Nat;
    areaSqft : Float;
    status : PropertyStatus;
    isFeatured : Bool;
  };

  public type PropertyFilters = {
    propertyType : ?PropertyType;
    priceMin : ?Float;
    priceMax : ?Float;
    minBedrooms : ?Nat;
    searchTerm : ?Text;
    offset : Nat;
    limit : Nat;
  };

  public type PropertyPage = {
    items : [Property];
    total : Nat;
    offset : Nat;
    limit : Nat;
  };
};
