import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import ImageApi from '../service/api';
import Loader from 'components/Loader';
import ButtonLoadMore from 'components/Button';
import { StyledApp } from './App.styled';

class App extends Component {
  state = {
    searchImage: '',
    status: 'idle',
    page: 1,
    images: [],
    totalImages: 0,
  };
  // componentDidUpdate(prevProps, prevState) {
  //   const { searchImage, page } = this.state;
  //   if (prevState.searchImage !== searchImage) {
  //     this.setState({ images: [], page: 1 }, () => this.getImages());
  //   } else if (prevState.page !== page) {
  //     this.getImages();
  //   }
  // }
  componentDidUpdate(prevProps, prevState) {
    const { searchImage, page } = this.state;
    if (prevState.searchImage !== searchImage || prevState.page !== page) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { searchImage, page } = this.state;

    this.setState({ status: 'pending' });

    try {
      const { images, totalImages } = await ImageApi(searchImage, page);

      if (images.length === 0) {
        toast.error(`Images ${searchImage} Not Found`);

        this.setState({
          status: 'rejected',
        });
      } else {
        if (images.length !== 0 && page === 1) {
          toast.success(`We found ${totalImages} pictures`);

          this.setState({
            totalImages,
          });
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolved',
          totalImages,
        }));
      }

      if (
        totalImages > 0 &&
        page !== 1 &&
        totalImages <= this.state.images.length + 12
      ) {
        toast.info(`The end of search results.`);
        this.setState({
          totalImages,
        });
      }
    } catch (error) {
      toast.error(`Images ${searchImage} Not Found`);
      this.setState({
        status: 'rejected',
      });
    }
  };
  clearImages = () => {
    this.setState({ images: [], page: 1 });
  };

  formSubmit = searchImage => {
    this.setState({ searchImage });
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { images, status, page, totalImages } = this.state;
    return (
      <StyledApp>
        <Searchbar
          onSubmit={this.formSubmit}
          onClearImages={this.clearImages}
        />
        {status === 'pending' && <Loader />}
        {(status === 'resolved' || (status === 'pending' && page !== 1)) && (
          <ImageGallery images={images} />
        )}
        {((totalImages !== images.length && status === 'resolved') ||
          (status === 'pending' && page > 1)) && (
          <ButtonLoadMore onClick={this.onLoadMore} />
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
  }
}

export default App;
