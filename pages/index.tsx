import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default function Home({servers}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Discord Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to website for a discord bot </h1>
          {servers.map(({server, server_id}) => (
            <a className={styles.description} href={"/servers/" + server_id} key={server_id}>{server}</a>
          ))}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const servers = await (await prisma.servers.findMany()).map(server => {
    return {
      server: server.name,
      server_id: server.id
    }
  })
  return {
    props: {
      servers
    }
  }
}
