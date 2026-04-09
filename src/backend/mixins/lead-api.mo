import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import LeadLib "../lib/lead";
import LeadTypes "../types/lead";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  leads : List.List<LeadTypes.Lead>,
  leadCounter : { var value : Nat },
) {
  public shared func submitLead(input : LeadTypes.LeadInput) : async LeadTypes.Lead {
    leadCounter.value += 1;
    let id = LeadLib.generateId(leadCounter.value);
    let now = Time.now();
    LeadLib.submitLead(leads, input, id, now);
  };

  public shared ({ caller }) func listLeads() : async [LeadTypes.Lead] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view leads");
    };
    LeadLib.listLeads(leads);
  };

  public shared ({ caller }) func markLeadRead(id : Common.LeadId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can mark leads as read");
    };
    LeadLib.markLeadRead(leads, id);
  };

  public shared ({ caller }) func deleteLead(id : Common.LeadId) : async Bool {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete leads");
    };
    LeadLib.deleteLead(leads, id);
  };
};
