import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMoreItems = () => {
    setLoading(true);
    // Simulate an API call here to fetch more items
    setTimeout(() => {
      const newItems = Array.from({ length: 10 }, (_, index) => items.length + index + 1);
      setItems([...items, ...newItems]);
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchMoreItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchMoreItems();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div className="App">
      <h1>Infinite Scroll Example</h1>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default App;
