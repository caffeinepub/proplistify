import List "mo:core/List";
import LeadTypes "../types/lead";
import Common "../types/common";

module {
  public func generateId(counter : Nat) : Common.LeadId {
    "lead-" # counter.toText();
  };

  public func submitLead(
    leads : List.List<LeadTypes.Lead>,
    input : LeadTypes.LeadInput,
    id : Common.LeadId,
    now : Common.Timestamp,
  ) : LeadTypes.Lead {
    let lead : LeadTypes.Lead = {
      id;
      name = input.name;
      email = input.email;
      phone = input.phone;
      message = input.message;
      inquiryType = input.inquiryType;
      propertyId = input.propertyId;
      propertyTitle = input.propertyTitle;
      createdAt = now;
      isRead = false;
    };
    leads.add(lead);
    lead;
  };

  public func listLeads(
    leads : List.List<LeadTypes.Lead>,
  ) : [LeadTypes.Lead] {
    leads.toArray();
  };

  public func markLeadRead(
    leads : List.List<LeadTypes.Lead>,
    id : Common.LeadId,
  ) : Bool {
    var found = false;
    leads.mapInPlace(func(lead : LeadTypes.Lead) : LeadTypes.Lead {
      if (lead.id == id) {
        found := true;
        { lead with isRead = true };
      } else {
        lead;
      };
    });
    found;
  };

  public func deleteLead(
    leads : List.List<LeadTypes.Lead>,
    id : Common.LeadId,
  ) : Bool {
    let before = leads.size();
    let filtered = leads.filter(func(lead : LeadTypes.Lead) : Bool { lead.id != id });
    let after = filtered.size();
    if (before != after) {
      leads.clear();
      leads.append(filtered);
      true;
    } else {
      false;
    };
  };
};
