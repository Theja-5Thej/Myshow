import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import type { TVShow } from '../types/tvshow';

interface Props {
  shows: TVShow[];
  loading?: Boolean;
  loadingMore?: Boolean;
  hasMore?: Boolean;
  onEdit: (show: TVShow) => void;
  onDelete: (id: string) => void;
}

export const TVShowTable = ({ shows, loadingMore, hasMore, loading, onEdit, onDelete }: Props) => {
  console.log(' loadingMore, hasMore, ', loadingMore, hasMore)
  return (
    <div
      className=''
      id="tvshow-table-container"
      style={{ height: '70vh', overflowY: 'auto' }}
    >
      <Table stickyHeader>
        <TableHead className="bg-gray-100 ">
          <TableRow>
            {/* <TableCell>Poster</TableCell> */}
            <TableCell>Title</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Director</TableCell>
            <TableCell>Budget</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Year</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shows.map((show) => (
            <TableRow key={show.id} className="bg-gray-300">
              {/* <TableCell >
                <Avatar src={show.posterUrl} variant="circular" />
              </TableCell> */}
              <TableCell>{show.title}</TableCell>
              <TableCell>{show.type}</TableCell>
              <TableCell>{show.director}</TableCell>
              <TableCell>₹{show.budget}</TableCell>
              <TableCell>{show.location}</TableCell>
              <TableCell>{show.duration}</TableCell>
              <TableCell>{show.year}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onEdit(show)} color="primary">
                  <Edit />
                </IconButton>
                <IconButton onClick={() => onDelete(show.id)} color="error">
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}

          {loadingMore && (
            <TableRow>
              <TableCell colSpan={9} align="center" className="bg-gray-300">
                <CircularProgress size={24} />
              </TableCell>
            </TableRow>
          )}

          {(!hasMore && !loadingMore ) && (
            <TableRow>
              <TableCell colSpan={9} align="center" className="bg-gray-300">
                All shows loaded
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>


  );
};
