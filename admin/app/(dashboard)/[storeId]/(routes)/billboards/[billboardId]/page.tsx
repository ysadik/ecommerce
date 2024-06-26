import prismadb from '@/lib/prismadb'
import BillboardForm from './components/billboard-form'

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string }
}) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
      //   no id in params = no initialData = a create form (/new)
      //   id in params = initialData = an edit form (/id)
    },
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  )
}
export default BillboardPage
