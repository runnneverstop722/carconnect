
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar.tsx';
import LoginModal from './components/LoginModal.tsx';
import CarSearch from './components/CarSearch.tsx';
import DealershipEmailer from './components/DealershipEmailer.tsx';
import LikedCarsList from './components/LikedCarsList.tsx';
import DealershipLocator from './components/DealershipLocator.tsx';
import Footer from './components/Footer.tsx';
import SearchHistoryList from './components/SearchHistoryList.tsx'; // New
import CarComparisonView from './components/CarComparisonView.tsx'; // New
import CarTypesGuide from './components/CarTypesGuide.tsx'; // New
import { User, LikedCar, HistoricCarSearch, CarDetails } from './types.ts';
import { mockLogout } from './services/mockAuthService.ts';
import { fetchCarDetailsFromGemini } from './services/geminiService.ts';
import { APP_NAME, MOCK_DEALERSHIPS } from './constants.ts';
import { XCircleIcon, BookOpenIcon } from './components/icons.tsx';


const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  
  const [historicSearches, setHistoricSearches] = useState<HistoricCarSearch[]>([]);
  const [activeSearch, setActiveSearch] = useState<HistoricCarSearch | null>(null);
  const [isCarSearchLoading, setIsCarSearchLoading] = useState(false);
  const [carSearchError, setCarSearchError] = useState<string | null>(null);
  
  const [likedCars, setLikedCars] = useState<LikedCar[]>([]);
  const [modelForDealershipSearch, setModelForDealershipSearch] = useState<string | null>(null);

  const [comparisonList, setComparisonList] = useState<HistoricCarSearch[]>([]);
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

  const saveHistoricSearches = (searches: HistoricCarSearch[]) => {
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
    setModelForDealershipSearch(null); 
    setIsComparisonViewActive(false); 

    const userLang = navigator.language || 'en';

    try {
      const details: CarDetails = await fetchCarDetailsFromGemini(modelName.trim(), userLang);
      const newSearch: HistoricCarSearch = { 
        modelName: modelName.trim(), 
        details, 
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
       // Scroll to results after search
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
    setModelForDealershipSearch(null);
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

  const handleFindDealersForModel = (modelName: string) => {
    setModelForDealershipSearch(modelName);
    setIsComparisonViewActive(false);
    const locatorElement = document.getElementById('dealership-locator-section');
    if (locatorElement) locatorElement.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleCloseDealershipLocator = () => {
    setModelForDealershipSearch(null);
  }

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
    setModelForDealershipSearch(null);
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
    setIsCarTypesGuideOpen(false); // Close the guide
    // Prefill the search bar in CarSearch.tsx - This requires CarSearch to accept a prop or a ref to update its internal state.
    // For now, we can directly initiate search. If prefill is strongly desired, CarSearch needs minor refactor.
    // Let's find the CarSearch input and set its value if possible, then initiate search.
    const searchInput = document.querySelector('#car-search-section input[type="text"]') as HTMLInputElement;
    if (searchInput) {
        searchInput.value = modelName;
         // Dispatch an input event so React recognizes the change if CarSearch is controlled
        const event = new Event('input', { bubbles: true });
        searchInput.dispatchEvent(event);
    }
    handleInitiateSearch(modelName); // Initiate search for the selected model
  };


  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar
        currentUser={currentUser}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogoutClick={handleLogout}
      />
      
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8 max-w-4xl">
        {/* Removed API Key check from frontend */}

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
              onFindDealers={handleFindDealersForModel}
            />

            {modelForDealershipSearch && (
              <div id="dealership-locator-section">
                <DealershipLocator 
                  carModel={modelForDealershipSearch} 
                  onClose={handleCloseDealershipLocator} 
                />
              </div>
            )}
            
            {!modelForDealershipSearch && activeSearch && activeSearch.details.manufacturerInfo && (
              <DealershipEmailer currentCarModel={activeSearch.modelName} />
            )}
            {!modelForDealershipSearch && !activeSearch && MOCK_DEALERSHIPS.length > 0 && (
               <DealershipEmailer />
            )}
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