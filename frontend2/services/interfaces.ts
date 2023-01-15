
export interface DefaultPhone {
    ID: number;
    BusinessRelationID: number;
    CountryCode: string;
    Description: string;
    Number: string;
    Type: string;
}

export interface DefaultEmail {
    ID: number;
    BusinessRelationID: number;
    Deleted: boolean;
    Description?: any;
    EmailAddress: string;
}

export interface InvoiceAddress {
    ID: number;
    AddressLine1: string;
    AddressLine2: string;
    AddressLine3: string;
    BusinessRelationID: number;
    City: string;
    Country: string;
    CountryCode: string;
    PostalCode: string;
    Region?: any;
}

export interface Info {
    ID: number;
    DefaultEmailID: number;
    DefaultPhoneID: number;
    InvoiceAddressID: number;
    Name: string;
    DefaultPhone: DefaultPhone;
    DefaultEmail: DefaultEmail;
    InvoiceAddress: InvoiceAddress;
}

export interface ContactListDto {
    ID: number;
    InfoID: number;
    Info: Info;
    Comment: string;
}
