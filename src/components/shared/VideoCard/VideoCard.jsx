
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export default function ActionAreaCard() {
  return (
    <div className='wrapper'>
    <Card sx={{ maxWidth: 345, marginLeft:10, marginTop:10}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="fit-content"
          image="https://i.ytimg.com/vi/hQAHSlTtcmY/maxresdefault.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Title:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Description:
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
</div>
  );
  }