import React, { useState } from 'react';

import Searchbar from './components/Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import { AppContainer } from './App.styled';

function App() {
  const [query, setQuery] = useState(() => '');

  console.log(query);

  return (
    <AppContainer>
      <Searchbar setQuery={setQuery} />
      {/* <ImageGallery query={this.state.searchQuery} /> */}
      <ToastContainer />
    </AppContainer>
  );
}

export default App;
