-- AlterTable
ALTER TABLE `order` MODIFY `status` ENUM('UNAPPROVED', 'APPROVED', 'UNPAID', 'READY_TO_SHIP', 'PROCESSED', 'RETRY_SHIP', 'SHIPPED', 'TO_CONFIRM_RECEIVE', 'COMPLETED', 'TO_RETURN', 'IN_CANCEL', 'CANCELLED') NOT NULL DEFAULT 'UNPAID';
