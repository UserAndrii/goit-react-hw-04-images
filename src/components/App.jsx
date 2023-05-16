import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';
import galleryAPI from '../services/galleryAPI';
import errorImg from '../images/oops-error.jpg';

import { Container } from './App.styled';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import HandleError from './HandleError';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!searchValue) {
      return;
    }

    const fetchGallery = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await galleryAPI(searchValue, page);
        const { total, hits, totalHits } = response.data;

        if (total === 0) {
          setError(true);
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        setImages(prev => [...prev, ...hits]);
        setPageCount(Math.ceil(totalHits / 12));
      } catch (error) {
        setError(true);
        toast.error(
          'Oops, something went wrong 🙁. Please try reloading the page and try again.'
        );
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [page, searchValue]);

  const handleFormSubmit = value => {
    if (value === searchValue) {
      toast.error(
        'You have already searched for this keyword. Please try another one.'
      );
      return;
    }

    setSearchValue(value);
    setPage(1);
    setImages([]);
  };

  return (
    <Container>
      <Searchbar onSubmit={handleFormSubmit} />
      {loading && <Loader />}

      {images.length > 0 && <ImageGallery images={images} />}

      {page < pageCount && <Button onClick={() => setPage(prev => prev + 1)} />}

      {error && (
        <HandleError imageURL={errorImg} alt={'Something went wrong'} />
      )}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
        }}
      />
    </Container>
  );
};

export default App;

// export class App extends Component {
//   state = {
//     searchValue: '',
//     page: 1,
//     pageCount: 0,
//     images: [],
//     loading: false,
//     error: false,
//   };

//   async componentDidUpdate(_, prevState) {
//     const { page, images, searchValue } = this.state;

//     if (prevState.searchValue !== searchValue || prevState.page !== page) {
//       try {
//         this.setState({ loading: true, error: false });
//         const response = await galleryAPI(searchValue, page);
//         const { total, hits, totalHits } = response.data;

//         if (total === 0) {
//           this.setState({ error: true });
//           toast.error(
//             'Sorry, there are no images matching your search query. Please try again.'
//           );
//           return;
//         }

//         this.setState({
//           images: [...images, ...hits],
//           pageCount: Math.ceil(totalHits / 12),
//         });
//       } catch (error) {
//         this.setState({ error: true });
//         toast.error(
//           'Oops, something went wrong 🙁. Please try reloading the page and try again.'
//         );
//         console.log(error.message);
//       } finally {
//         this.setState({ loading: false });
//       }
//     }
//   }

//   handleFormSubmit = searchValue => {
//     if (searchValue === this.state.searchValue) {
//       toast.error(
//         'You have already searched for this keyword. Please try another one.'
//       );
//       return;
//     }
//     this.setState({ searchValue, page: 1, images: [], pageCount: 0 });
//   };

//   handleLoadMoreClick = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//   };

//   calculatePageCount = (totalItems, itemsPerPage) => {
//     return Math.ceil(totalItems / itemsPerPage);
//   };

//   render() {
//     const { images, loading, page, pageCount, error } = this.state;

//     return (
//       <Container>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {loading && <Loader />}

//         {images.length > 0 && <ImageGallery images={images} />}

//         {page < pageCount && <Button onClick={this.handleLoadMoreClick} />}

//         {error && (
//           <HandleError imageURL={errorImg} alt={'Something went wrong'} />
//         )}

//         <Toaster
//           position="top-right"
//           toastOptions={{
//             duration: 2000,
//           }}
//         />
//       </Container>
//     );
//   }
// }
