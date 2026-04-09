import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import PropertyLib "../lib/property";
import PropertyTypes "../types/property";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  properties : Map.Map<Common.PropertyId, PropertyTypes.Property>,
  propertySlugIndex : Map.Map<Common.Slug, Common.PropertyId>,
  propertyCounter : { var value : Nat },
) {
  public shared ({ caller }) func createProperty(input : PropertyTypes.PropertyInput) : async PropertyTypes.Property {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can create properties");
    };
    propertyCounter.value += 1;
    let id = PropertyLib.generateId(propertyCounter.value);
    let now = Time.now();
    PropertyLib.createProperty(properties, propertySlugIndex, input, id, now);
  };

  public shared ({ caller }) func updateProperty(id : Common.PropertyId, input : PropertyTypes.PropertyInput) : async ?PropertyTypes.Property {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update properties");
    };
    let now = Time.now();
    PropertyLib.updateProperty(properties, propertySlugIndex, id, input, now);
  };

  public shared ({ caller }) func deleteProperty(id : Common.PropertyId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete properties");
    };
    PropertyLib.deleteProperty(properties, propertySlugIndex, id);
  };

  public shared ({ caller }) func toggleFeatured(id : Common.PropertyId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can toggle featured status");
    };
    switch (properties.get(id)) {
      case null false;
      case (?existing) {
        let updated : PropertyTypes.Property = { existing with isFeatured = not existing.isFeatured };
        properties.add(id, updated);
        true;
      };
    };
  };

  public query func getProperty(id : Common.PropertyId) : async ?PropertyTypes.Property {
    PropertyLib.getProperty(properties, id);
  };

  public query func getPropertyBySlug(slug : Common.Slug) : async ?PropertyTypes.Property {
    PropertyLib.getPropertyBySlug(properties, propertySlugIndex, slug);
  };

  public query func listProperties(filters : PropertyTypes.PropertyFilters) : async PropertyTypes.PropertyPage {
    PropertyLib.listProperties(properties, filters);
  };

  public query func getFeaturedProperties() : async [PropertyTypes.Property] {
    PropertyLib.getFeaturedProperties(properties);
  };
};
