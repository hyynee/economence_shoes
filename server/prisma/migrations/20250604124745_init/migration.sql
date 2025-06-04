-- CreateTable
CREATE TABLE `account` (
    `account_id` INTEGER NOT NULL AUTO_INCREMENT,
    `full_name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role_id` VARCHAR(45) NOT NULL,

    INDEX `role_id_idx`(`role_id`),
    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bill` (
    `bill_id` INTEGER NOT NULL,
    `account_id` INTEGER NOT NULL,
    `date` DATE NOT NULL,
    `total_price` INTEGER NOT NULL,
    `address` VARCHAR(45) NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `discount_code` VARCHAR(45) NOT NULL,
    `discounted_price` VARCHAR(45) NULL,

    INDEX `account_id_idx`(`account_id`),
    INDEX `customer_id_idx`(`customer_id`),
    INDEX `discoutn_code_idx`(`discount_code`),
    PRIMARY KEY (`bill_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `brand` (
    `brand_id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand_name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`brand_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `category` (
    `category_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer` (
    `customer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_name` VARCHAR(45) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart` (
    `cart_id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,

    INDEX `account_id_idx`(`account_id`),
    INDEX `product_id_idx`(`product_id`),
    UNIQUE INDEX `cart_account_id_product_id_key`(`account_id`, `product_id`),
    PRIMARY KEY (`cart_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `discount` (
    `discount_code` VARCHAR(45) NOT NULL,
    `condition` VARCHAR(45) NOT NULL,
    `discount` VARCHAR(45) NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `active` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`discount_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `order_id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `stripe_session_id` VARCHAR(191) NULL,
    `order_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `total_price` INTEGER NOT NULL,
    `delivery_status` VARCHAR(45) NOT NULL DEFAULT 'pending',
    `payment_status` VARCHAR(45) NOT NULL,
    `payment_method` VARCHAR(45) NOT NULL DEFAULT 'stripe',
    `shipping_address` VARCHAR(191) NOT NULL,

    INDEX `account_id_idx`(`account_id`),
    PRIMARY KEY (`order_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_item` (
    `order_item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,

    INDEX `order_item_order_id_idx`(`order_id`),
    INDEX `order_item_product_id_idx`(`product_id`),
    PRIMARY KEY (`order_item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `goodsreceipt` (
    `receipt_id` INTEGER NOT NULL AUTO_INCREMENT,
    `goodsreceipt_name` VARCHAR(45) NOT NULL,
    `date` DATE NOT NULL,
    `total_price` INTEGER NOT NULL,
    `supplier_id` INTEGER NOT NULL,
    `account_id` INTEGER NOT NULL,

    INDEX `goodsreceipt_account_id_idx`(`account_id`),
    INDEX `goodsreceipt_supplier_id_idx`(`supplier_id`),
    PRIMARY KEY (`receipt_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `goodsreceipt_detail` (
    `receiptdetail_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `receipt_id` INTEGER NOT NULL,
    `input_price` INTEGER NOT NULL,

    INDEX `goodsreceipt_detail_product_id_idx`(`product_id`),
    INDEX `goodsreceipt_detail_receipt_id_idx`(`receipt_id`),
    PRIMARY KEY (`receiptdetail_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ResetToken` (
    `id` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `expiryDate` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ResetToken_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `khuyenmai` (
    `STT` INTEGER NOT NULL,
    `TEN` VARCHAR(45) NOT NULL,
    `MA` VARCHAR(45) NOT NULL,
    `DIEUKIEN` VARCHAR(45) NOT NULL,
    `GIAMGIA` VARCHAR(45) NOT NULL,
    `NGAYBD` DATE NOT NULL,
    `NGAYKT` DATE NOT NULL,
    `TRANGTHAI` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`STT`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `category_id` INTEGER NOT NULL,
    `brand_id` INTEGER NOT NULL,
    `product_name` VARCHAR(45) NOT NULL,
    `output_price` INTEGER NOT NULL,
    `input_price` INTEGER NOT NULL,
    `country` VARCHAR(45) NOT NULL,
    `year_of_product` INTEGER NOT NULL,
    `discount_percent` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `image_path` VARCHAR(255) NOT NULL,
    `supplier_id` INTEGER NULL,

    INDEX `brand_id_idx`(`brand_id`),
    INDEX `category_id_idx`(`category_id`),
    INDEX `supplier_id_idx`(`supplier_id`),
    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_entry` (
    `entry_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `supplier_id` INTEGER NOT NULL,
    `quantity_added` INTEGER NOT NULL,
    `entry_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `product_id_idx`(`product_id`),
    INDEX `supplier_id_idx`(`supplier_id`),
    PRIMARY KEY (`entry_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_group` (
    `product_group_id` INTEGER NOT NULL,
    `product_group_name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`product_group_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `return` (
    `return_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `date_return` DATE NOT NULL,
    `reason` VARCHAR(45) NOT NULL,

    INDEX `product_id_idx`(`product_id`),
    PRIMARY KEY (`return_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `role_id` VARCHAR(45) NOT NULL,
    `role_name` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier` (
    `supplier_id` INTEGER NOT NULL,
    `supplier_name` VARCHAR(45) NOT NULL,
    `address` VARCHAR(45) NOT NULL,
    `phone_number` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`supplier_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `warrantydetail` (
    `warranty_detai_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `start_date` DATE NOT NULL,
    `end_date` DATE NOT NULL,
    `warranty_date` DATE NOT NULL,
    `reason` VARCHAR(45) NOT NULL,
    `warranty_status` VARCHAR(45) NOT NULL,

    INDEX `warrantydetail_product_id_idx`(`product_id`),
    PRIMARY KEY (`warranty_detai_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `review_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `account_id` INTEGER NOT NULL,
    `rating` INTEGER NOT NULL,
    `comment` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `reviews_product_id_idx`(`product_id`),
    INDEX `reviews_account_id_idx`(`account_id`),
    UNIQUE INDEX `reviews_account_id_product_id_key`(`account_id`, `product_id`),
    PRIMARY KEY (`review_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` VARCHAR(191) NOT NULL,
    `invoiceName` VARCHAR(191) NOT NULL,
    `total` INTEGER NOT NULL,
    `status` ENUM('PAID', 'PENDING') NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `dueDate` INTEGER NOT NULL,
    `fromName` VARCHAR(191) NOT NULL,
    `fromEmail` VARCHAR(191) NOT NULL,
    `formAddress` VARCHAR(191) NOT NULL,
    `toName` VARCHAR(191) NOT NULL,
    `toEmail` VARCHAR(191) NOT NULL,
    `toAddress` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL,
    `invoiceNumber` INTEGER NOT NULL,
    `note` VARCHAR(191) NULL,
    `invoiceItemDesc` VARCHAR(191) NOT NULL,
    `invoiceItemQuantity` INTEGER NOT NULL,
    `invoiceItemRate` INTEGER NOT NULL,
    `accountId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `role_id` FOREIGN KEY (`role_id`) REFERENCES `role`(`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bill` ADD CONSTRAINT `account_id` FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bill` ADD CONSTRAINT `customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer`(`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bill` ADD CONSTRAINT `discoutn_code` FOREIGN KEY (`discount_code`) REFERENCES `discount`(`discount_code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart` ADD CONSTRAINT `cart_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_account_id` FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_item` ADD CONSTRAINT `order_order_id` FOREIGN KEY (`order_id`) REFERENCES `order`(`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_item` ADD CONSTRAINT `order_item_product_id` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `goodsreceipt` ADD CONSTRAINT `fk_goodsreceipt_account_id` FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `goodsreceipt` ADD CONSTRAINT `fk_goodsreceipt_supplier_id` FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `goodsreceipt_detail` ADD CONSTRAINT `fk_goodsreceipt_detail_product_id` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `goodsreceipt_detail` ADD CONSTRAINT `fk_goodsreceipt_detail_receipt_id` FOREIGN KEY (`receipt_id`) REFERENCES `goodsreceipt`(`receipt_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `brand_id` FOREIGN KEY (`brand_id`) REFERENCES `brand`(`brand_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category`(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `product_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_entry` ADD CONSTRAINT `product_entry_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `product_entry` ADD CONSTRAINT `product_entry_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `supplier`(`supplier_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `return` ADD CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `warrantydetail` ADD CONSTRAINT `fk_warrantydetail_product_id` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `fk_reviews_product_id` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `fk_reviews_account_id` FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invoice` ADD CONSTRAINT `Invoice_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`account_id`) ON DELETE CASCADE ON UPDATE CASCADE;
