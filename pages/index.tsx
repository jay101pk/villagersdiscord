import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const discord_link = "https://cdn.discordapp.com/"

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
          {servers.map(({server, serverId, serverIcon}) => (
            <div>
              <Link href={"/servers/" + serverId}><Image src={discord_link + "icons/" + serverId + "/"+ serverIcon+".png"} alt={server + "'s icon"} width={250} height={250}/></Link>
            </div>
          ))}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const servers = (await prisma.servers.findMany()).map(server => {

    return {
      server: server.name,
      serverId: server.id.toString(),
      serverIcon: server.icon
    }
  })
  prisma.$disconnect()
  return {
    props: {
      servers
    }
  }
}
