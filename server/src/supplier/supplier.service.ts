import { Injectable } from '@nestjs/common';
import { PrismaClient, supplier } from '@prisma/client';
import { CreateSupplierDTO } from './dto/create-supplier.dto';
import { UpdateSupplierDTO } from './dto/update-supplier.dto';

@Injectable()
export class SupplierService {
    model = new PrismaClient();

    async getAllSupplier() {
        return this.model.supplier.findMany();
    }
    async getSupplierById(id: number) {
        return this.model.supplier.findUnique({
            where: {
                supplier_id: Number(id),
            }
        });
    }
    async getSupplierByName(name: string) {
        return this.model.supplier.findMany({
            where: {
                supplier_name: {
                    contains: name
                }
            }
        });
    }
    async createSupplier(sup: CreateSupplierDTO) {
        const existingSup = await this.model.supplier.findUnique({
            where: {
                supplier_id: sup.supplier_id
            }
        });
        if (existingSup) {
            throw new Error('Supplier_ID already exists');
        }
        return this.model.supplier.create({
            data: sup
        });
    }

    async updateSupplier(id: number, updateSupplierDto: UpdateSupplierDTO): Promise<supplier> {
        const existingSup = await this.model.supplier.findUnique({
            where: {
                supplier_id: Number(id)
            }
        });
        if (!existingSup) {
            throw new Error('Supplier not found');
        }
        return this.model.supplier.update({
            where: {
                supplier_id: Number(id)
            },
            data: updateSupplierDto
        });
    }

    async deleteSupplier(id: number) {
        const existingSup = await this.model.supplier.findUnique({
            where: {
                supplier_id: id
            }
        });
        if (!existingSup) {
            throw new Error('Supplier not found');
        } else {
            return this.model.supplier.delete({
                where: {
                    supplier_id: id
                }
            });
        }
    }
}
