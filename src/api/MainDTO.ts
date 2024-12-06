export interface SelectDTO {
  readonly label: string;
  readonly value: string;
}
export interface PaginationProps {
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly pageCount: number;
  readonly total: number;
}
export interface PaginatorQuery {
  pageNumber?: number;
  pageSize?: number;
  title?: string | null;
  status?: string | null;
  categoryId?: string | null;
  providerId?: string | null;
}
export enum Status {
  Active = "active",
  Inactive = "inactive",
  Maintenance = "maintenance",
}
export interface Dict<T> {
  readonly [key: string]: T;
}

export const testDto = {
  id: "ee5e1cc2-33dc-421e-937c-0c7e013b8735",
  slug: "check__fileds31dwdsswsww23",
  title: "Category",
  pattern: "boolean",
  position: 1,
  type: "list",
  hint: "Hint",
  prefix: ["Prefix"],
  defaultValue: "Default value",
  scan: true,
  required: true,
  readonly: true,
  searchable: true,
  serviceId: "70656f2e-075a-4458-8e88-386032c33c97",
  createdAt: "2023-05-23T12:42:30.000Z",
  updatedAt: "2023-05-23T12:42:30.000Z",
  serviceFieldList: [
    {
      id: "50eae26d-8983-406d-ab2c-e9af981c815d",
      externalId: "12432",
      serviceFieldId: "ee5e1cc2-33dc-421e-937c-0c7e013b8735",
      createdAt: "2023-05-23T12:42:30.000Z",
      updatedAt: "2023-05-23T12:42:30.000Z",
    },
    {
      id: "5c0c6979-6ab8-49d3-9358-c7ea667899ef",
      externalId: "3522353",
      serviceFieldId: "ee5e1cc2-33dc-421e-937c-0c7e013b8735",
      createdAt: "2023-05-23T12:42:30.000Z",
      updatedAt: "2023-05-23T12:42:30.000Z",
    },
    {
      id: "1d5a07b1-6eb6-49ba-87c3-02734cbd7e33",
      externalId: "12432",
      serviceFieldId: "ee5e1cc2-33dc-421e-937c-0c7e013b8735",
      createdAt: "2023-05-23T12:42:30.000Z",
      updatedAt: "2023-05-23T12:42:30.000Z",
    },
  ],
};
export interface TranslateData {
  readonly code: string;
  readonly content: {
    readonly language: string;
    readonly value: string;
  }[];
  readonly id: string;
}

export interface TranslationProps {
  readonly pageCount: number;
  readonly translation: TranslateData[];
}
export interface Devices {
  readonly deviceAgent: string;
  readonly deviceStatus: boolean;
  readonly deviceType: string;
  readonly deviceOs: string;
  readonly firebaseToken: string;
  readonly appVersion: string;
  readonly deviceId: string;
  readonly id: string;
  readonly updatedAt: string;
  readonly deviceModel: string;
}
export interface UserListProps {
  readonly firstName: string;
  readonly lastName: string;
  readonly birthday: string;
  readonly lang: string;
  readonly avatar: string;
  readonly document: {
    readonly issuedBy: string;
    readonly number: string;
    readonly pinfl: string;
    readonly type: string;
    readonly issuedAt: string;
    readonly expiredAt: string;
  };
  readonly deliveryAddresses: {
    readonly address: string;
    readonly house: string;
    readonly id: string;
    readonly floor: string;
    readonly entrance: string;
    readonly flat: string;
    readonly latitude: number;
    readonly longitude: number;
  }[];
  readonly address: {
    readonly permanentCadastre: string;
    readonly permanentCountry: string;
    readonly permanentDistrict: string;
    readonly permanentRegion: string;
    readonly permanentTitle: string;
    readonly permanentRegisteredAt: string;
  };
  readonly email: string;
  readonly username: string;
  readonly gender: string;
  readonly profile: {
    readonly birthday: string;
    readonly firstName: string;
    readonly gender: string;
    readonly lastName: string;
    readonly middleName: string;
  };
  readonly id: string;
  readonly devices: Devices[];
  readonly phone: string;
  readonly status: string;
  readonly verified: boolean;
  readonly updatedAt: string;
}
export interface UserListData extends PaginationProps {
  readonly users: UserListProps[];
}
export interface ChatRoomsMessageProps {
  readonly content: string | null;
  readonly createdAt: string;
  readonly id: string;
  readonly text: string;
  readonly type: string;
}
export interface ChatRoomsUserProps {
  readonly avatar: string | null;
  readonly username: string;
  readonly id: string;
}
export interface ChatRoomsProps {
  readonly appName: string;
  readonly id: string;
  readonly message: ChatRoomsMessageProps;
  readonly user: ChatRoomsUserProps;
}

export interface ChatRoomsMessagesUserMesProps extends ChatRoomsMessageProps {
  readonly avatar: string;
  readonly read: boolean;
  readonly roomId: string;
  readonly userId: string;
  readonly username: string;
}

export interface ChatRoomsMessagesUserProps {
  readonly id: string;
  readonly createdAt: string;
  readonly appName: string;
  readonly status: string;
  readonly userId: string;
  readonly messages: ChatRoomsMessagesUserMesProps[];
}
