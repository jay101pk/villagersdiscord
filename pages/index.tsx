import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { PrismaClient } from "@prisma/client";
import { GetStaticProps } from "next";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import ServerCard from "../src/components/serverCard";

const prisma = new PrismaClient();

const discord_link = "https://cdn.discordapp.com/";

export default function Home({ servers }) {
  return (
    <>
      <Head>
        <title>Discord Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h2" align="left">
              Welcome to website for a discord bot{" "}
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid
          container
          spacing={0}
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          {servers.map(({ server, serverId, serverIcon }) => (
            <>
              <ServerCard
                serverName={server}
                serverIcon={serverIcon}
                serverId={serverId}
              />
            </>
          ))}
        </Grid>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const servers = (await prisma.servers.findMany()).map((server) => {
    return {
      server: server.name,
      serverId: server.id.toString(),
      serverIcon: server.icon,
    };
  });
  prisma.$disconnect();
  return {
    props: {
      servers,
    },
  };
};
