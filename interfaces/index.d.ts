interface AuthenticationTypeOAuth2 {
  type: "OAUTH2";
  user: string | undefined;
  oauth2: XOAuth2;
  method: "XOAUTH2";
  clientId: string | undefined;
  clientSecret: string | undefined;
  refresh_token: string | undefined;
  accessToken: any;
}

interface User {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  facebook: string;
  idUser: string;
  id: string;
  query: string;
}

interface Users {
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  facebook: string;
}

interface user {
  userName: string;
  email: string;
  password: string;
}

interface VerifyEmail {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

interface Qr {
  textQr: string;
}

interface Qrs {
  itemId: string;
  buyerId: string;
}

interface LineItem {
  quantity: number;
  externalId: string;
  price: string;
  orderId: string;
  address: string;
  image: string | null;
  content: string | null;
  name: string;
}

interface Order {
  shopName: string;
  customer: {
    id: string;
  };
  orderName: string;
}

interface MyQr {
  id: number;
  code: string;
  createdAt: Date;
  url: string;
  ownerId: string;
  buyerId: string;
}

interface Role {
  id: string;
  role: boolean;
}

interface InterfaceErrorLogin {
  auth: {
    login: {
      error: string;
    };
  };
}
interface InterfaceErrorRegister {
  auth: {
    register: {
      error: string;
    };
  };
}

interface ListItem {
  itemName: string;
  quantity: number;
  externalId: string;
  price: string;
  orderId: string;
  name: string;
  address: string;
  createdAt: Date;
  order: {
    shopName: string;
    name: string;
    customer: {
      email?: string;
      phone?: string;
      default_address: {
        country_name: string;
        name: string;
      };
    };
  };
  image: string;
  content: string;
  Qr: [
    {
      id: number;
      code: string;
      createdAt: Date;
      url: string;
      ownerId: string;
      buyerId: string;
      sku: string;
    }
  ];
}

interface ListUser {
  id: string;
  email: string;
  emailVerify: boolean;
  admin: boolean;
  createdAt: Date;
}

interface ItemsShopify {
  properties: Properties;
  id: string;
  quantity: number;
  price: string;
  name: string;
}

interface QrCreate {
  id: string;
}

interface Properties {
  [index: number]: { value: string };
}

interface ReduxUser {
  auth: {
    token: {
      user: {
        id: string;
        email: string;
        admin: boolean;
        iat: number;
      };
    };
  };
}

interface ListExport {
  sku: string | null;
  Qr: string | null;
  image: {
    data: string;
    url: string;
  };
  itemName: string;
  quantity: number;
  externalId: string;
  price: string;
  orderId: string;
  name: string;
  address: string;
  createdAt: Date | string;
  order: Orders;
  content: string;
}

interface Orders {
  shopName: string;
  name: string;
}
