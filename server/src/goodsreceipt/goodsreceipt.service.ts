import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateGoodsreceipt, CreateGoodsreceiptDetail } from './dto/createGoodsreceipt.dto';
import { UpdategoodReceipt } from './dto/updateGoodsreceipt.dto';

@Injectable()
export class GoodsreceiptService {
    model = new PrismaClient();
    async getAllGoodsreceipt() {
        return this.model.goodsreceipt.findMany({
            include: {
                goodsreceipt_detail: {
                    include: {
                        product: true,
                    }
                },
                supplier: {
                    select: { supplier_name: true }
                },
                account: {
                    select: { full_name: true, email: true }
                },
            }
        });
    }
    async createGoodsreceipt(dto: CreateGoodsreceipt, full_name: string) {
        let totalPrice = 0;
        const supplier = await this.model.supplier.findUnique({
            where: { supplier_id: dto.supplier_id },
            select: { supplier_id: true },
        });
        if (!supplier) {
            throw new BadRequestException(`Nhà cung cấp với ID ${dto.supplier_id} không tồn tại.`);
        }
        const account = await this.model.account.findFirst({
            where: { account_id: dto.account_id },
            select: { account_id: true },
        });
        if (!account) {
            throw new BadRequestException(`Tài khoản ${full_name} không tồn tại.`);
        }
        for (const detail of dto.goodsreceipt_detail) {
            const product = await this.model.product.findUnique({
                where: { product_id: detail.product_id },
                select: { output_price: true, quantity: true },
            });
            if (!product) {
                throw new BadRequestException(`Product ID ${detail.product_id} không tồn tại.`);
            }
            if (detail.input_price > product.output_price) {
                throw new BadRequestException(
                    `Giá nhập (${detail.input_price}) không được cao hơn giá bán (${product.output_price}).`
                );
            }
            totalPrice += detail.quantity * detail.input_price;
        }
        if (!dto.goodsreceipt_detail || dto.goodsreceipt_detail.length === 0) {
            throw new BadRequestException(`Chi tiết phiếu nhập hàng không được trống.`);
        }
        // Tạo phiếu nhập hàng
        const goodsreceipt = await this.model.goodsreceipt.create({
            data: {
                goodsreceipt_name: dto.goodsreceipt_name,
                date: dto.date,
                total_price: totalPrice,
                supplier: { connect: { supplier_id: supplier.supplier_id } },
                account: { connect: { account_id: account.account_id } },
                goodsreceipt_detail: {
                    create: dto.goodsreceipt_detail.map((detail: CreateGoodsreceiptDetail) => ({
                        product: { connect: { product_id: detail.product_id } },
                        quantity: detail.quantity,
                        input_price: detail.input_price,
                    })),
                },
            },
            include: {
                goodsreceipt_detail: {
                    include: { product: true }
                },
                supplier: { select: { supplier_name: true } }
            },
        });

        for (const detail of dto.goodsreceipt_detail) {
            await this.model.product.update({
                where: { product_id: detail.product_id },
                data: {
                    quantity: { increment: detail.quantity },
                },
            });
        }
        return goodsreceipt;
    }
    // async updateGoodsreceipt(dto: UpdategoodReceipt, account_id: number) {
    //     let totalPrice = 0;
    //     //  B1: Kiểm tra phiếu nhập hàng có tồn tại không
    //     const existingGoodsReceipt = await this.model.goodsreceipt.findUnique({
    //         where: { receipt_id: dto.receipt_id },
    //         include: { goodsreceipt_detail: true },
    //     });
    //     if (!existingGoodsReceipt) {
    //         throw new BadRequestException(`Phiếu nhập hàng với ID ${dto.receipt_id} không tồn tại.`);
    //     }
    //     //  B2: Kiểm tra nhà cung cấp có tồn tại không
    //     const supplier = await this.model.supplier.findUnique({
    //         where: { supplier_id: dto.supplier_id },
    //     });
    //     if (!supplier) {
    //         throw new BadRequestException(`Nhà cung cấp với ID ${dto.supplier_id} không tồn tại.`);
    //     }
    //     //  B3: Hoàn trả số lượng sản phẩm cũ về kho (rollback nếu có lỗi)
    //     try {
    //         await this.model.$transaction(
    //             existingGoodsReceipt.goodsreceipt_detail.map(detail =>
    //                 this.model.product.update({
    //                     where: { product_id: detail.product_id },
    //                     data: { quantity: { decrement: detail.quantity } },
    //                 })
    //             )
    //         );
    //         //  B4: Kiểm tra chi tiết mới và tính tổng giá
    //         if (!dto.goodsreceipt_detail || dto.goodsreceipt_detail.length === 0) {
    //             throw new BadRequestException(`Chi tiết phiếu nhập hàng không được trống.`);
    //         }
    //         const newDetailsMap = new Map(dto.goodsreceipt_detail.map(detail => [detail.product_id, detail]));
    //         for (const detail of dto.goodsreceipt_detail) {
    //             const product = await this.model.product.findUnique({
    //                 where: { product_id: detail.product_id },
    //                 select: { output_price: true },
    //             });
    //             if (!product) {
    //                 throw new BadRequestException(`Sản phẩm với ID ${detail.product_id} không tồn tại.`);
    //             }
    //             if (detail.input_price > product.output_price) {
    //                 throw new BadRequestException(
    //                     `Giá nhập (${detail.input_price}) không được cao hơn giá bán (${product.output_price}).`
    //                 );
    //             }
    //             totalPrice += detail.quantity * detail.input_price;
    //         }
    //         //  B5: Cập nhật chi tiết phiếu nhập hàng 
    //         for (const oldDetail of existingGoodsReceipt.goodsreceipt_detail) {
    //             const newDetail = newDetailsMap.get(oldDetail.product_id);

    //             if (!newDetail) {
    //                 await this.model.goodsreceipt_detail.delete({ where: { receiptdetail_id: oldDetail.receiptdetail_id } });
    //             } else {
    //                 await this.model.goodsreceipt_detail.update({
    //                     where: { receiptdetail_id: oldDetail.receiptdetail_id },
    //                     data: { quantity: newDetail.quantity, input_price: newDetail.input_price },
    //                 });
    //                 newDetailsMap.delete(oldDetail.product_id);
    //             }
    //         }
    //         for (const newDetail of newDetailsMap.values()) {
    //             await this.model.goodsreceipt_detail.create({
    //                 data: {
    //                     receipt_id: dto.receipt_id,
    //                     product_id: newDetail.product_id,
    //                     quantity: newDetail.quantity,
    //                     input_price: newDetail.input_price,
    //                 },
    //             });
    //         }
    //         //  B6: Cập nhật thông tin phiếu nhập hàng (không sửa `receipt_id`)
    //         const updatedGoodsReceipt = await this.model.goodsreceipt.update({
    //             where: { receipt_id: dto.receipt_id },
    //             data: {
    //                 goodsreceipt_name: dto.goodsreceipt_name,
    //                 date: dto.date,
    //                 total_price: totalPrice,
    //                 supplier: { connect: { supplier_id: supplier.supplier_id } },
    //             },
    //             include: {
    //                 goodsreceipt_detail: { include: { product: true } },
    //                 supplier: { select: { supplier_name: true } },
    //             },
    //         });
    //         //  B7: Cập nhật số lượng sản phẩm trong kho bằng transaction
    //         await this.model.$transaction(
    //             dto.goodsreceipt_detail.map(detail =>
    //                 this.model.product.update({
    //                     where: { product_id: detail.product_id },
    //                     data: { quantity: { increment: detail.quantity } },
    //                 })
    //             )
    //         );
    //         return updatedGoodsReceipt;
    //     } catch (error) {
    //         throw new BadRequestException(`Lỗi cập nhật phiếu nhập hàng: ${error.message}`);
    //     }
    // }
    async updateGoodsreceipt(dto: UpdategoodReceipt, id: number) {
        let totalPrice = 0;
        //  B1: Check phiếu nhập hàng có tồn tại không
        const existingGoodsReceipt = await this.model.goodsreceipt.findUnique({
            where: { receipt_id: Number(id) },
            include: { goodsreceipt_detail: true },
        });
        if (!existingGoodsReceipt) {
            throw new BadRequestException(`Phiếu nhập hàng với ID ${id} không tồn tại.`);
        }

        //  B2: Check nhà cung cấp 
        if (dto.supplier_id !== existingGoodsReceipt.supplier_id) {
            const supplier = await this.model.supplier.findUnique({
                where: { supplier_id: dto.supplier_id },
            });
            if (!supplier) {
                throw new BadRequestException(`Nhà cung cấp với ID ${dto.supplier_id} không tồn tại.`);
            }
        }

        try {
            await this.model.$transaction(async (tx) => {
                // B3: CHECK chi tiết phiếu nhập mới
                if (!dto.goodsreceipt_detail || dto.goodsreceipt_detail.length === 0) {
                    throw new BadRequestException(`Chi tiết phiếu nhập hàng không được trống.`);
                }
                // Lấy danh sách sản phẩm mới từ dto
                const newDetailsMap = new Map(dto.goodsreceipt_detail.map(detail => [detail.product_id, detail]));

                //  B4: Kiểm tra dữ liệu và tính tổng giá
                for (const detail of dto.goodsreceipt_detail) {
                    const product = await tx.product.findUnique({
                        where: { product_id: detail.product_id },
                        select: { output_price: true },
                    });
                    if (!product) {
                        throw new BadRequestException(`Sản phẩm với ID ${detail.product_id} không tồn tại.`);
                    }
                    if (detail.input_price > product.output_price) {
                        throw new BadRequestException(
                            `Giá nhập (${detail.input_price}) không được cao hơn giá bán (${product.output_price}).`
                        );
                    }
                    totalPrice += detail.quantity * detail.input_price;
                }
                //  B5: Hoàn trả số lượng sản phẩm cũ về kho (rollback an toàn hơn)
                await Promise.all(
                    existingGoodsReceipt.goodsreceipt_detail.map(async (detail) => {
                        const newDetail = newDetailsMap.get(detail.product_id);
                        if (newDetail) {
                            await tx.goodsreceipt_detail.update({
                                where: { receiptdetail_id: detail.receiptdetail_id },
                                data: {
                                    quantity: newDetail.quantity,
                                    input_price: newDetail.input_price,
                                },
                            });
                            newDetailsMap.delete(detail.product_id);
                        } else {
                            await tx.goodsreceipt_detail.delete({
                                where: { receiptdetail_id: detail.receiptdetail_id },
                            });
                        }
                    })
                );

                //  B6: Cập nhật chi tiết phiếu nhập hàng mới
                for (const newDetail of newDetailsMap.values()) {
                    await tx.goodsreceipt_detail.create({
                        data: {
                            receipt_id: Number(id),
                            product_id: newDetail.product_id,
                            quantity: newDetail.quantity,
                            input_price: newDetail.input_price,
                        },
                    });
                }
                //  B7: Cập nhật tổng giá và thông tin phiếu nhập hàng
                await tx.goodsreceipt.update({
                    where: { receipt_id: Number(id) },
                    data: {
                        goodsreceipt_name: dto.goodsreceipt_name,
                        date: dto.date,
                        total_price: totalPrice,
                        ...(dto.supplier_id !== existingGoodsReceipt.supplier_id && {
                            supplier: { connect: { supplier_id: dto.supplier_id } },
                        }),
                    },
                });

                // B8: Cập nhật số lượng sản phẩm trong kho
                await Promise.all(
                    existingGoodsReceipt.goodsreceipt_detail.map(async (oldDetail) => {
                        await tx.product.update({
                            where: { product_id: oldDetail.product_id },
                            data: { quantity: { decrement: oldDetail.quantity } }, // Trừ số lượng cũ trước
                        });
                    })
                );

                await Promise.all(
                    dto.goodsreceipt_detail.map(async (newDetail) => {
                        await tx.product.update({
                            where: { product_id: newDetail.product_id },
                            data: { quantity: { increment: newDetail.quantity } }, // cộng số lượng mới
                        });
                    })
                );

            });

            return { message: 'Cập nhật phiếu nhập hàng thành công' };
        } catch (error) {
            throw new BadRequestException(`Lỗi cập nhật phiếu nhập hàng: ${error.message}`);
        }
    }

}   
