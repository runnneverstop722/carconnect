import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar.tsx';
import LoginModal from './components/LoginModal.tsx';
import CarSearch from './components/CarSearch.tsx';
import LikedCarsList from './components/LikedCarsList.tsx';
import Footer from './components/Footer.tsx';
import SearchHistoryList from './components/SearchHistoryList.tsx';
import CarComparisonView from './components/CarComparisonView.tsx';
import CarTypesGuide from './components/CarTypesGuide.tsx';
import { User, LikedCar, HistoricCarSearch, CarDetails } from './types.ts';
import { mockLogout } from './services/mockAuthService.ts';
import { fetchCarDetailsFromGemini } from './services/geminiService.ts';
import { searchYouTubeVideos } from './services/youtubeService.ts';
import { APP_NAME } from './constants.ts';
import { XCircleIcon, BookOpenIcon } from './components/icons.tsx';

const App = () => { 
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const [historicSearches, setHistoricSearches] = useState<Array<HistoricCarSearch>>([]);
  const [activeSearch, setActiveSearch] = useState<HistoricCarSearch | null>(null);
  const [isCarSearchLoading, setIsCarSearchLoading] = useState(false);
  const [carSearchError, setCarSearchError] = useState<string | null>(null);
  
  const [likedCars, setLikedCars] = useState<Array<LikedCar>>([]);
  
  const [comparisonList, setComparisonList] = useState<Array<HistoricCarSearch>>([]);
  const [isComparisonViewActive, setIsComparisonViewActive] = useState(false);
  const [isCarTypesGuideOpen, setIsCarTypesGuideOpen] = useState(false);

  useEffect(() => {
    document.title = APP_NAME;
    const storedUser = localStorage.getItem('carConnectUser');
    if (storedUser) try { setCurrentUser(JSON.parse(storedUser)); } catch (e) { localStorage.removeItem('carConnectUser'); }
    
    const storedLikedCars = localStorage.getItem('carConnectLikedCars');
    if (storedLikedCars) try { setLikedCars(JSON.parse(storedLikedCars)); } catch (e) { localStorage.removeItem('carConnectLikedCars'); }

    const storedHistoricSearches = localStorage.getItem('carConnectHistoricSearches');
    if (storedHistoricSearches) try { 
      const searches = JSON.parse(storedHistoricSearches);
      setHistoricSearches(searches);
    } catch (e) { localStorage.removeItem('carConnectHistoricSearches'); }
  }, []);

  const saveHistoricSearches = (searches: Array<HistoricCarSearch>) => {
    setHistoricSearches(searches);
    localStorage.setItem('carConnectHistoricSearches', JSON.stringify(searches));
  };

  const handleLoginSuccess = useCallback((user: User) => {
    setCurrentUser(user);
    localStorage.setItem('carConnectUser', JSON.stringify(user));
    setIsLoginModalOpen(false);
  }, []);

  const handleLogout = useCallback(async () => {
    await mockLogout();
    setCurrentUser(null);
    localStorage.removeItem('carConnectUser');
  }, []);
  
  const handleInitiateSearch = useCallback(async (modelName: string) => {
    if (!modelName.trim()) {
      setCarSearchError("Please enter a car model.");
      return;
    }
    setIsCarSearchLoading(true);
    setCarSearchError(null);
    setActiveSearch(null); 
    setIsComparisonViewActive(false); 

    const userLang = navigator.language || 'en';

    try {
      // Get car details from Gemini
      const details = await fetchCarDetailsFromGemini(modelName.trim(), userLang);
      
      // Get YouTube videos
      const youtubeVideos = await searchYouTubeVideos(modelName.trim());
      
      // Combine the results
      const combinedDetails = {
        ...details,
        youtubeVideos // This will override any YouTube videos from Gemini with real ones
      };

      const newSearch = { 
        modelName: modelName.trim(), 
        details: combinedDetails,
        timestamp: Date.now(),
        searchLanguage: userLang
      };
      
      setActiveSearch(newSearch);
      setHistoricSearches(prevSearches => {
        const existingIndex = prevSearches.findIndex(s => s.modelName.toLowerCase() === newSearch.modelName.toLowerCase());
        let updatedSearches;
        if (existingIndex > -1) {
          updatedSearches = [...prevSearches];
          updatedSearches[existingIndex] = newSearch; 
        } else {
          updatedSearches = [newSearch, ...prevSearches]; 
        }
        if (updatedSearches.length > 10) {
            updatedSearches = updatedSearches.slice(0, 10);
        }
        localStorage.setItem('carConnectHistoricSearches', JSON.stringify(updatedSearches));
        return updatedSearches;
      });
      const searchResultsElement = document.getElementById('car-search-results-area');
      if (searchResultsElement) {
        searchResultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

    } catch (err) {
      setCarSearchError(err instanceof Error ? err.message : 'An unknown error occurred during search.');
      setActiveSearch(null);
    } finally {
      setIsCarSearchLoading(false);
    }
  }, []);

  const handleSelectHistoricSearch = (search: HistoricCarSearch) => {
    setActiveSearch(search);
    setCarSearchError(null); 
    setIsComparisonViewActive(false);
    const searchResultsElement = document.getElementById('car-search-results-area');
    if (searchResultsElement) {
        searchResultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        const carSearchSection = document.getElementById('car-search-section'); 
        if(carSearchSection) carSearchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const handleClearSearchHistory = () => {
    saveHistoricSearches([]);
    setActiveSearch(null);
    setComparisonList([]);
  };


  const handleToggleLikeCar = useCallback((modelName: string) => {
    setLikedCars(prevLikedCars => {
      const isLiked = prevLikedCars.includes(modelName);
      const updatedLikedCars = isLiked
        ? prevLikedCars.filter(car => car !== modelName)
        : [...prevLikedCars, modelName];
      localStorage.setItem('carConnectLikedCars', JSON.stringify(updatedLikedCars));
      return updatedLikedCars;
    });
  }, []);

  const handleToggleCompare = (searchItem: HistoricCarSearch) => {
    setComparisonList(prev => {
      if (prev.find(item => item.modelName === searchItem.modelName)) {
        return prev.filter(item => item.modelName !== searchItem.modelName);
      } else {
        if (prev.length < 5) { 
            return [...prev, searchItem];
        }
        alert("You can compare up to 5 cars at a time."); 
        return prev;
      }
    });
  };

  const handleStartComparison = () => {
    if (comparisonList.length < 2) {
      alert("Please select at least two cars to compare.");
      return;
    }
    setIsComparisonViewActive(true);
    setActiveSearch(null); 
    setTimeout(() => { 
        const comparisonViewElement = document.getElementById('car-comparison-view-section');
        if (comparisonViewElement) {
            comparisonViewElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 0);
  };
  
  const handleExitComparison = () => {
    setIsComparisonViewActive(false);
  };

  const handleSelectModelFromGuideAndSearch = (modelName: string) => {
    setIsCarTypesGuideOpen(false); 
    const searchInput = document.querySelector('#car-search-section input[type="text"]');
    if (searchInput && searchInput instanceof HTMLInputElement) {
        searchInput.value = modelName;
        const event = new Event('input', { bubbles: true });
        searchInput.dispatchEvent(event);
    }
    handleInitiateSearch(modelName); 
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar
        currentUser={currentUser}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogoutClick={handleLogout}
      />
      
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8 max-w-4xl">

        {isComparisonViewActive ? (
          <div id="car-comparison-view-section">
            <CarComparisonView 
              carsToCompare={comparisonList} 
              onExit={handleExitComparison}
            />
          </div>
        ) : (
          <>
            <div id="car-search-section">
              <CarSearch 
                activeSearch={activeSearch}
                isLoading={isCarSearchLoading}
                error={carSearchError}
                onInitiateSearch={handleInitiateSearch}
                likedCars={likedCars}
                onToggleLike={handleToggleLikeCar}
              />
            </div>
            
            <div className="my-4 sm:my-6 text-center">
                <button
                    onClick={() => setIsCarTypesGuideOpen(true)}
                    className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition duration-150 ease-in-out shadow-lg transform hover:scale-105 text-sm sm:text-base"
                >
                    <BookOpenIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Explore Car Types & Benefits
                </button>
            </div>


            <SearchHistoryList
              historicSearches={historicSearches}
              activeSearchModelName={activeSearch?.modelName}
              onSelectSearch={handleSelectHistoricSearch}
              onClearHistory={handleClearSearchHistory}
              comparisonList={comparisonList}
              onToggleCompare={handleToggleCompare}
              onStartComparison={handleStartComparison}
              canCompare={comparisonList.length >=2}
            />
            
            <LikedCarsList 
              likedCars={likedCars} 
              onUnlikeCar={handleToggleLikeCar}
            />
          </>
        )}

      </main>
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <CarTypesGuide 
        isOpen={isCarTypesGuideOpen}
        onClose={() => setIsCarTypesGuideOpen(false)}
        onSelectModelAndSearch={handleSelectModelFromGuideAndSearch}
      />
      
      <Footer />
    </div>
  );
};

export default App;
