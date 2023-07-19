import React, { useState, useEffect } from 'react';
import CricketerCard from './cricketerCard';
import './App.css';
import getPlayers, { TPlayer } from './get-players';

const Cricketers: React.FC = () => {
  const [cricketers, setCricketers] = useState<TPlayer[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cricketersPerPage] = useState<number>(10);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchCricketers = async () => {
      const players = await getPlayers();
      setCricketers(players);
    };

    fetchCricketers();
  }, []);

  useEffect(() => {
    const savedFilter = localStorage.getItem('filter');
    const savedSearchQuery = localStorage.getItem('searchQuery');

    if (savedFilter) {
      setFilter(savedFilter);
    }

    if (savedSearchQuery) {
      setSearchQuery(savedSearchQuery);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('filter', filter);
    localStorage.setItem('searchQuery', searchQuery);
  }, [filter, searchQuery]);

  const indexOfLastCricketer = currentPage * cricketersPerPage;
  const indexOfFirstCricketer = indexOfLastCricketer - cricketersPerPage;

  let filteredCricketers = cricketers;
  if (filter !== 'all') {
    filteredCricketers = cricketers.filter((cricketer) => cricketer.type === filter);
  }
  if (searchQuery.trim() !== '') {
    filteredCricketers = filteredCricketers.filter((cricketer) =>
      cricketer.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const currentCricketers = filteredCricketers.slice(
    indexOfFirstCricketer,
    indexOfLastCricketer
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <h1>Cricketers</h1>
      <div className="features">
        <div className='search'>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name"
          />
        </div>
        <div className='filter'>
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="batsman">Batsman</option>
            <option value="bowler">Bowler</option>
            <option value="allRounder">All-Rounder</option>
            <option value="wicketKeeper">Wicket Keeper</option>
          </select>
        </div>
      </div>
      {currentCricketers.length > 0 ? (
        <div className="card-container">
          {currentCricketers.map((cricketer, index) => (
            <CricketerCard key={index} cricketer={cricketer} />
          ))}
        </div>
      ) : (
        <p>No cricketers of this type.</p>
      )}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredCricketers.length / cricketersPerPage) }, (_, index) => (
          <button
            key={index}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Cricketers;




// import React, { useState, useEffect } from 'react';
// import CricketerCard from './cricketerCard';
// import './App.css';
// import getPlayers, { TPlayer } from './get-players';

// const Cricketers: React.FC = () => {
//   const [cricketers, setCricketers] = useState<TPlayer[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [cricketersPerPage] = useState<number>(10);
//   const [filter, setFilter] = useState<string>('all'); // State variable for filter selection
//   const [searchQuery, setSearchQuery] = useState<string>(''); // State variable for search query

//   useEffect(() => {
//     // Fetch cricketer data from the getPlayers function
//     const fetchCricketers = async () => {
//       const players = await getPlayers();
//       setCricketers(players);
//     };

//     fetchCricketers();
//   }, []);

//   const indexOfLastCricketer = currentPage * cricketersPerPage;
//   const indexOfFirstCricketer = indexOfLastCricketer - cricketersPerPage;

//   // Filter cricketers based on the selected filter value and search query
//   let filteredCricketers = cricketers;
//   if (filter !== 'all') {
//     filteredCricketers = cricketers.filter((cricketer) => cricketer.type === filter);
//   }
//   if (searchQuery.trim() !== '') {
//     filteredCricketers = filteredCricketers.filter((cricketer) =>
//       cricketer.name?.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//   }

//   const currentCricketers = filteredCricketers.slice(
//     indexOfFirstCricketer,
//     indexOfLastCricketer
//   );

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);

//     // Scroll to the top of the website when navigating to a new page
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setFilter(event.target.value);
//     setCurrentPage(1); // Reset the current page when the filter changes
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//     setCurrentPage(1); // Reset the current page when the search query changes
//   };
  
//   const searchQueryLowerCase = searchQuery.toLowerCase();
//   if (searchQuery.trim() !== '') {
//     filteredCricketers = filteredCricketers.filter((cricketer) =>
//       cricketer.name?.toLowerCase().includes(searchQueryLowerCase)
//     );
//   }
  

//   return (
//     <div>
//       <h1>Cricketers</h1>
//       <div>
//         {/* Input field for search */}
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           placeholder="Search by name"
//         />
//       </div>
//       <div>
//         {/* Dropdown for filter selection */}
//         <select value={filter} onChange={handleFilterChange}>
//           <option value="all">All</option>
//           <option value="batsman">Batsman</option>
//           <option value="bowler">Bowler</option>
//           <option value="allRounder">All-Rounder</option>
//           <option value="wicketKeeper">Wicket Keeper</option>
//         </select>
//       </div>
//       {currentCricketers.length > 0 ? (
//         <div className="card-container">
//           {currentCricketers.map((cricketer, index) => (
//             <CricketerCard key={index} cricketer={cricketer} />
//           ))}
//         </div>
//       ) : (
//         <p>No cricketers of this type.</p>
//       )}
//       <div className="pagination">
//         {Array.from({ length: Math.ceil(filteredCricketers.length / cricketersPerPage) }, (_, index) => (
//           <button
//             key={index}
//             className={currentPage === index + 1 ? 'active' : ''}
//             onClick={() => handlePageChange(index + 1)}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Cricketers;
