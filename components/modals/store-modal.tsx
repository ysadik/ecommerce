'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'

import { useStoreModal } from '@/hooks/use-store-modal'
import { Modal } from '../ui/modal'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import toast from 'react-hot-toast'

const formSchema = z.object({
  name: z.string().min(1),
})

export const StoreModal = () => {
  const storeModal = useStoreModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/stores', values)

      toast.success('Store created.')
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }

  return (
    <Modal
      title="Store Modal"
      description="Create your store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-6 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={form.formState.isSubmitting}
                        placeholder="Store's name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-6 space-x-2 flex justify-end items-center w-full">
                <Button
                  disabled={form.formState.isSubmitting}
                  variant="outline"
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button disabled={form.formState.isSubmitting} type="submit">
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  )
}
