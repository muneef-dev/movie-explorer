import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const TrailerDialog = ({ open, onClose, trailer, title }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
    <DialogTitle sx={{ pr: 7 }}>
      {title} — Official trailer
      <IconButton aria-label="Close trailer" onClick={onClose} sx={{ position: 'absolute', right: 12, top: 10 }}>
        <CloseRoundedIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent sx={{ p: 0, aspectRatio: '16 / 9' }}>
      {trailer && (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1`}
          title={`${title} trailer`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: 0, display: 'block' }}
        />
      )}
    </DialogContent>
  </Dialog>
);

export default TrailerDialog;
