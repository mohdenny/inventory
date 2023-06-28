import { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../../actions/item';
import FormItemModal from './FormItemModal';
import AlertBox from '../layout/AlertBox';

const ITEMS_PER_PAGE = 6;

const Items = ({ getItems, item: { items } }) => {
  useEffect(() => {
    getItems();
  }, [getItems, items]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = items ? items.length : 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCards = items ? items.slice(startIndex, endIndex) : [];

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <AlertBox/>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <FormItemModal />
      </div>
      {items && totalItems > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gridGap: '16px' }}>
          {items &&
            currentCards.map((card, index) => (
              <Card key={index}>
                <CardMedia component="img" height="140" image='' alt={card.name} />
                <CardContent>
                  <Typography variant="h5" component="div">
                    {card.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Jumlah stock: {card.stock}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </div>
      ) : (
        <Card>
          <CardContent style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <Typography variant="body1" align="center">
              No items recorded
            </Typography>
          </CardContent>
        </Card>
      )}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
      />
    </div>
  );
};

Items.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  item: state.item
});

export default connect(mapStateToProps, { getItems })(Items);
