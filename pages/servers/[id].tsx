import { GetStaticPaths, GetStaticProps } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default function Server({ server_id }: { server_id : string }) {
    return <p>{server_id}</p>
}

export const getStaticPaths: GetStaticPaths = async () => {
    const servers = await prisma.servers.findMany()
    await prisma.$disconnect()

    const serverNames = servers.map(server => {
        return server.id.toString()
    })


    const paths =  serverNames.map(serverName => {
        return {
          params: {
            id: serverName
          }
        }
      })


    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    return {
        props: {
            server_id: params.id as string
        }
    }
}

