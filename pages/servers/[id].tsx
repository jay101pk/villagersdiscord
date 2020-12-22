import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Server({ server_id }: { server_id: string }) {
  return <p>{server_id}</p>;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = params.id as string
  const servers = await prisma.servers.findMany();
  await prisma.$disconnect();

  const serverNames = servers.map((server) => {
    return server.id.toString();
  });

  if (!serverNames.includes(query)) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      server_id: params.id as string,
    },
  };
};
