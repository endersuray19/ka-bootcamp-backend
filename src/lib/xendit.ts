import axios from "axios";

type Address = {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  streetLine1?: string;
  streetLine2?: string;
};

type User = {
  name: string;
  email: string;
  phoneNumber: string;
};

type OrderItemsQuantity = {
  name: string;
  price: number;
  quantity: number;
  color: string;
  category: string;
};

export async function generateXenditUrl(
  address: Address,
  orderId: number,
  user: User,
  items: OrderItemsQuantity[],
): Promise<string | null> {
  const totalAmount = items.reduce((a, b) => a + b.price * b.quantity, 0);

  try {
    const { data } = await axios.post(
      "https://api.xendit.co/v2/invoices",
      {
        external_id: orderId.toString(),
        amount: totalAmount,
        description: "Invoice Demo #123",
        invoice_duration: 86400,
        customer: {
          given_names: user.name,
          email: user.email,
          mobile_number: user.phoneNumber,
          addresses: [
            {
              city: address.city,
              country: address.country,
              postal_code: address.postalCode,
              state: address.state,
              street_line1: address.streetLine1,
              street_line2: address.streetLine2,
            },
          ],
        },
        currency: "IDR",
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          category: item.category,
        })),
        fees: [
          {
            type: "ADMIN",
            value: 5000,
          },
        ],
        payment_methods: [
          "CREDIT_CARD",
          "BCA",
          "BNI",
          "BSI",
          "BRI",
          "MANDIRI",
          "PERMATA",
          "SAHABAT_SAMPOERNA",
          "BNC",
          "ALFAMART",
          "INDOMARET",
          "OVO",
          "DANA",
          "SHOPEEPAY",
          "LINKAJA",
          "JENIUSPAY",
          "DD_BRI",
          "DD_BCA_KLIKPAY",
          "KREDIVO",
          "AKULAKU",
          "UANGME",
          "ATOME",
          "QRIS",
        ],
      },
      {
        auth: {
          username: process.env.XENDIT_API_KEY!,
          password: "",
        },
      },
    );

    return data.invoice_url as string;
  } catch (err: any) {
    console.log(err);
    return null;
  }
}
