'use client'

import { AlertModal } from '@/components/modals/alert-modal'
import { ApiAlert } from '@/components/ui/api-alert'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import ImageUpload from '@/components/ui/image-upload'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useOrigin } from '@/hooks/use-origin'
import { zodResolver } from '@hookform/resolvers/zod'
import { Billboard } from '@prisma/client'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as z from 'zod'

interface BillboardFormProps {
  initialData: Billboard | null
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
})

type BillboardFormValues = z.infer<typeof formSchema>

const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false)
  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()

  const title = initialData ? 'Edit billboard' : 'Create billboard'
  const description = initialData ? 'Edit a billboard' : 'Add a new billboard'
  const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created.'
  const action = initialData ? 'Save changes' : 'Create'

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: '',
    },
  })

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        )
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data)
      }
      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      toast.error('Something went wrong.')
    }
  }

  const onDelete = async () => {
    try {
      await axios.delete(
        `/api/stores/${params.storeId}/billboards/${params.billboardId}`
      )
      router.refresh()
      router.push('/')
      toast.success('Billboard deleted.')
    } catch (error) {
      toast.error('Please remove all categories using this billboard first.')
    } finally {
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={form.formState.isSubmitting}
      />

      <div className="flex justify-between items-center">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={form.formState.isSubmitting}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={form.formState.isSubmitting}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={form.formState.isSubmitting}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={form.formState.isSubmitting}
            className="ml-auto"
            type="submit"
          >
            {action}
          </Button>
        </form>
      </Form>

      <Separator />
    </>
  )
}
export default BillboardForm
