import { account, supplier } from "@prisma/client";


interface GoodsreceiptDetail {
    receiptdetail_id: number;
    product_id: number;
    quantity: number;
    receipt_id: number;
    intput_price: number;
}
export class Goodsreceipt {
    receipt_id: number;
    goodsreceipt_name: string;
    date: Date;
    total_price: number;
    supplier_id: number;
    account_id: number;
    account: account;
    supplier: supplier;
    goodsreceipt_detail: GoodsreceiptDetail[];
}

