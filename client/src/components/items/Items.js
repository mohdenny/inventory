import { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../../actions/item';
import FormItemModal from './FormItemModal';
import AlertBox from '../layout/AlertBox';
import ItemModal from './ItemModal';

const ITEMS_PER_PAGE = 6;

const Items = ({ getItems, item: { items } }) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  
  useEffect(() => {
    if (items) {
      setFilteredItems(items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase())));
    }
  }, [items, searchQuery]);

  const totalItems = filteredItems ? filteredItems.length : 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCards = filteredItems ? filteredItems.slice(startIndex, endIndex) : [];

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <AlertBox/>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Search items"
          value={searchQuery}
          onChange={handleSearch}
          style={{ padding: '8px', marginBottom: '8px', width: '300px' }}
        />

        <FormItemModal style={{ marginLeft: '16px' }} />
      </div>

      {filteredItems && totalItems > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gridGap: '16px' }}>
          {currentCards.map((card, index) => (
            <Card key={index} onClick={() => handleOpenModal(card)}>
              <CardMedia component="img" height="140" image={`http://localhost:5000/${card.path}`} alt={card.name} />
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

      {selectedItem && (
        <ItemModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} item={selectedItem} />
      )}
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
