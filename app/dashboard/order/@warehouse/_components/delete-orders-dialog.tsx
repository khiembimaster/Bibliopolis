"use client"

import * as React from "react"
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons"
import { type Row } from "@tanstack/react-table"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { deleteOrders } from "../../_lib/actions"
import { Order } from "@/types/index"

interface DeleteOrdersDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  orders: Row<Order>["original"][]
  showTrigger?: boolean
  onSuccess?: () => void
}

export function DeleteOrdersDialog({
  orders,
  showTrigger = true,
  onSuccess,
  ...props
}: DeleteOrdersDialogProps) {
  const [isDeletePending, startDeleteTransition] = React.useTransition()

  return (
    <Dialog {...props}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({orders.length})
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete these{" "}
            <span className="font-medium">{orders.length}</span>
            {orders.length === 1 ? " order" : " orders"} from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:space-x-0">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={() => {
              startDeleteTransition(async () => {
                const { error } = await deleteOrders({
                  ids: orders.map((order) => order.id),
                })

                if (error) {
                  toast.error(error)
                  return
                }

                props.onOpenChange?.(false)
                toast.success("Orders deleted")
                onSuccess?.()
              })
            }}
            disabled={isDeletePending}
          >
            {isDeletePending && (
              <ReloadIcon
                className="mr-2 size-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
