import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { useTheme } from '@material-ui/core/styles';

const discord_link = "https://cdn.discordapp.com/";

interface ServerCardProps {
  serverName: string;
  serverId: string;
  serverIcon: string;
}

const ServerCard: FunctionComponent<ServerCardProps> = ({
  serverName,
  serverId,
  serverIcon,
}: ServerCardProps) => {
  const theme = useTheme()
  return (
    <Grid item xs={12} sm={6} md={3} key={serverId}>
      <Card variant="elevation" style={{ margin: `${theme.spacing()}px` }}>
        <Link href={"/servers/" + serverId}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={serverName + "'s icon"}
              image={`${discord_link}icons/${serverId}/${serverIcon}.webp?size=4096`}
              title={serverName + "'s icon"}
            />
            <CardContent>
              <Typography variant="h4" color="textPrimary">
                {`${serverName}`}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <Button
            size="large"
            color="primary"
            href={"/servers/" + serverId}
            variant="contained"
          >
            Polls
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ServerCard;
