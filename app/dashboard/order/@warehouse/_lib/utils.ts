import { Order, OrderStatus } from "@prisma/client"
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons"

import { Box, CheckCircle, Circle, CircleDashed, LucideIcon, Ship } from "lucide-react"

/**
 * Returns the appropriate status icon based on the provided status.
 * @param status - The status of the order.
 * @returns A React component representing the status icon.
 */
export function getStatusIcon(status: string | OrderStatus) {
  const statusIcons = new Map<string | OrderStatus , LucideIcon>([
    ['PENDING', CircleDashed ],
    ['UNPAID',  Circle ],
    ['READY_TO_SHIP', Box ],
    ['PROCESSED', CheckCircle ],
    ['COMPLETED', CheckCircle ],
    ['SHIPPED', Ship ],
    // ['RETRY_SHIP', RetryCircle ],
    // ['TO_CONFIRM_RECEIVE', ConfirmCircle ],
    // ['TO_RETURN', ReturnBox ],
    // ['IN_CANCEL', CancelCircle ],
    // ['CANCELLED', CancelCircle ],
  ]);
  return statusIcons.get(status) || CircleIcon
}
