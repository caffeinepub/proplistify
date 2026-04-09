import Common "common";

module {
  public type InquiryType = {
    #viewingRequest;
    #information;
    #offer;
    #general;
  };

  public type Lead = {
    id : Common.LeadId;
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    inquiryType : InquiryType;
    propertyId : ?Common.PropertyId;
    propertyTitle : ?Text;
    createdAt : Common.Timestamp;
    isRead : Bool;
  };

  public type LeadInput = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    inquiryType : InquiryType;
    propertyId : ?Common.PropertyId;
    propertyTitle : ?Text;
  };
};
