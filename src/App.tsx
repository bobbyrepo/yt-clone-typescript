import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Watch from './pages/Watch'
import Sidebar from './components/Sidebar'
import { HomeVideoType } from './utils/Types'

interface SearchListState {
  videos: HomeVideoType[],
  nextPageToken: null | string
};

function App() {
  const [filter, setFilter] = useState<string>("home")
  const [categoryId, setCategoryId] = useState<null | string>(null)
  const [searchlist, setSearchList] = useState<SearchListState>({
    videos: [], nextPageToken: null
  });

  useEffect(() => {
    console.log("searchlist", searchlist)
  }, [searchlist])

  return (
    <div className="">
      <BrowserRouter>
        <div className="offcanvas offcanvas-start" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <Sidebar
            filter={filter}
            setFilter={setFilter}
            setCategoryId={setCategoryId} />
        </div>
        <Navbar searchlist={searchlist} setSearchList={setSearchList} />
        <Routes>
          <Route path="/" element={
            <Home
              filter={filter}
              categoryId={categoryId}
              searchlist={searchlist}
            />}
          />
          {/* <Route path="/movies" element={<Movies />} /> */}
          <Route path="/watch/:channelId/:videoId" element={<Watch />} />
          {/* <Route path="*" element={<Navigate to="/" />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
