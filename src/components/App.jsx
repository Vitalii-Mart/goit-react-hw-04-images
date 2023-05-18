import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import ImageApi from '../service/api';
import Loader from 'components/Loader';
import ButtonLoadMore from 'components/Button';
import { StyledApp } from './App.styled';

const App = () => {
  const [searchImage, setSearchImage] = useState('');
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    const getImages = async () => {
      setStatus('pending');

      try {
        const { images, totalImages } = await ImageApi(searchImage, page);

        if (images.length === 0) {
          toast.error(`Images ${searchImage} Not Found`);
          setStatus('rejected');
        } else {
          if (images.length !== 0 && page === 1) {
            toast.success(`We found ${totalImages} pictures`);
            setTotalImages(totalImages);
          }
          setImages(prevImage => [...prevImage, ...images]);
          setStatus('resolved');
          setTotalImages(totalImages);
        }
        if (totalImages > 0 && page !== 1 && totalImages <= images.length + (page - 1) * 12) {
          toast.info(`The end of search results.`);
          setTotalImages(totalImages);
        }
      } catch (error) {
        toast.error(`Images ${searchImage} Not Found`);
        setStatus('rejected');
      }
    };
    if (searchImage !== '' && page !== 0) {
      getImages();
    }
  }, [searchImage, page]);

  const formSubmit = e => {
    if (e !== searchImage) {
      setSearchImage(e);
      setImages([]);
      setPage(1);
    }
  };

  const onLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <StyledApp>
      <Searchbar onSubmit={formSubmit} />
      {status === 'pending' && <Loader />}
      {(status === 'resolved' || (status === 'pending' && page !== 1)) && (
        <ImageGallery images={images} />
      )}
      {((totalImages !== images.length && status === 'resolved') ||
        (status === 'pending' && page > 1)) && (
        <ButtonLoadMore onClick={onLoadMore} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </StyledApp>
  );
};

export default App;
