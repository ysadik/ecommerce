import getBillboard from '@/actions/get-billboard'
import Billboard from '@/components/billboard'
import Container from '@/components/ui/container'

export const revalidate = 0

const HomePage = async () => {
  const billboard = await getBillboard('d8491cae-d3ca-428c-90b9-ce1e24923550')
  return (
    <Container>
      <div className="space-x-10 pb-10">
        <Billboard data={billboard} />
      </div>
    </Container>
  )
}
export default HomePage
