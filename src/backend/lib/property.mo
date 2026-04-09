import Map "mo:core/Map";
import List "mo:core/List";
import PropertyTypes "../types/property";
import Common "../types/common";

module {
  public func generateId(counter : Nat) : Common.PropertyId {
    "prop-" # counter.toText();
  };

  // Generates a unique slug: if slug exists, appends -2, -3, etc.
  func resolveSlug(slugIndex : Map.Map<Common.Slug, Common.PropertyId>, baseSlug : Common.Slug, excludeId : ?Common.PropertyId) : Common.Slug {
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

  public func createProperty(
    properties : Map.Map<Common.PropertyId, PropertyTypes.Property>,
    slugIndex : Map.Map<Common.Slug, Common.PropertyId>,
    input : PropertyTypes.PropertyInput,
    id : Common.PropertyId,
    now : Common.Timestamp,
  ) : PropertyTypes.Property {
    let slug = resolveSlug(slugIndex, input.slug, null);
    let property : PropertyTypes.Property = {
      id;
      slug;
      title = input.title;
      description = input.description;
      propertyType = input.propertyType;
      price = input.price;
      heroImage = input.heroImage;
      galleryImages = input.galleryImages;
      amenities = input.amenities;
      floorplans = input.floorplans;
      overview = input.overview;
      address = input.address;
      city = input.city;
      bedrooms = input.bedrooms;
      bathrooms = input.bathrooms;
      areaSqft = input.areaSqft;
      status = input.status;
      createdAt = now;
      updatedAt = now;
      isFeatured = input.isFeatured;
    };
    properties.add(id, property);
    slugIndex.add(slug, id);
    property;
  };

  public func updateProperty(
    properties : Map.Map<Common.PropertyId, PropertyTypes.Property>,
    slugIndex : Map.Map<Common.Slug, Common.PropertyId>,
    id : Common.PropertyId,
    input : PropertyTypes.PropertyInput,
    now : Common.Timestamp,
  ) : ?PropertyTypes.Property {
    switch (properties.get(id)) {
      case null null;
      case (?existing) {
        // Handle slug change
        let newSlug = if (existing.slug == input.slug) {
          existing.slug;
        } else {
          let resolved = resolveSlug(slugIndex, input.slug, ?id);
          // Remove old slug mapping
          slugIndex.remove(existing.slug);
          slugIndex.add(resolved, id);
          resolved;
        };
        let updated : PropertyTypes.Property = {
          id;
          slug = newSlug;
          title = input.title;
          description = input.description;
          propertyType = input.propertyType;
          price = input.price;
          heroImage = input.heroImage;
          galleryImages = input.galleryImages;
          amenities = input.amenities;
          floorplans = input.floorplans;
          overview = input.overview;
          address = input.address;
          city = input.city;
          bedrooms = input.bedrooms;
          bathrooms = input.bathrooms;
          areaSqft = input.areaSqft;
          status = input.status;
          createdAt = existing.createdAt;
          updatedAt = now;
          isFeatured = input.isFeatured;
        };
        properties.add(id, updated);
        ?updated;
      };
    };
  };

  public func deleteProperty(
    properties : Map.Map<Common.PropertyId, PropertyTypes.Property>,
    slugIndex : Map.Map<Common.Slug, Common.PropertyId>,
    id : Common.PropertyId,
  ) : Bool {
    switch (properties.get(id)) {
      case null false;
      case (?existing) {
        slugIndex.remove(existing.slug);
        properties.remove(id);
        true;
      };
    };
  };

  public func getProperty(
    properties : Map.Map<Common.PropertyId, PropertyTypes.Property>,
    id : Common.PropertyId,
  ) : ?PropertyTypes.Property {
    properties.get(id);
  };

  public func getPropertyBySlug(
    properties : Map.Map<Common.PropertyId, PropertyTypes.Property>,
    slugIndex : Map.Map<Common.Slug, Common.PropertyId>,
    slug : Common.Slug,
  ) : ?PropertyTypes.Property {
    switch (slugIndex.get(slug)) {
      case null null;
      case (?id) properties.get(id);
    };
  };

  public func listProperties(
    properties : Map.Map<Common.PropertyId, PropertyTypes.Property>,
    filters : PropertyTypes.PropertyFilters,
  ) : PropertyTypes.PropertyPage {
    let all = List.fromIter<PropertyTypes.Property>(properties.values());
    let filtered = all.filter(func(p : PropertyTypes.Property) : Bool {
      let typeMatch = switch (filters.propertyType) {
        case null true;
        case (?pt) p.propertyType == pt;
      };
      let minPriceMatch = switch (filters.priceMin) {
        case null true;
        case (?min) p.price >= min;
      };
      let maxPriceMatch = switch (filters.priceMax) {
        case null true;
        case (?max) p.price <= max;
      };
      let bedroomsMatch = switch (filters.minBedrooms) {
        case null true;
        case (?minBeds) p.bedrooms >= minBeds;
      };
      let searchMatch = switch (filters.searchTerm) {
        case null true;
        case (?term) {
          let t = term.toLower();
          p.title.toLower().contains(#text t) or
          p.city.toLower().contains(#text t) or
          p.address.toLower().contains(#text t);
        };
      };
      typeMatch and minPriceMatch and maxPriceMatch and bedroomsMatch and searchMatch;
    });
    let total = filtered.size();
    let items = filtered.sliceToArray(filters.offset.toInt(), (filters.offset + filters.limit).toInt());
    { items; total; offset = filters.offset; limit = filters.limit };
  };

  public func getFeaturedProperties(
    properties : Map.Map<Common.PropertyId, PropertyTypes.Property>,
  ) : [PropertyTypes.Property] {
    let all = properties.values();
    let featured = all.filter(func(p : PropertyTypes.Property) : Bool { p.isFeatured and p.status == #active });
    featured.toArray();
  };
};
