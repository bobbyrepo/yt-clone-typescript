import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import Watch from './pages/Watch'
import Sidebar from './components/Sidebar'
import { useSearchList } from './Hooks/useSearchList'
import Channel from './pages/Channel'



function App() {
  const [filter, setFilter] = useState<string>("home")
  const [categoryId, setCategoryId] = useState<null | string>(null)

  const [search, setSearch] = useState('');

  const { searchList, fetchSearch, setSearchList } = useSearchList();

  return (
    <div className="">
      <BrowserRouter>
        <div className="offcanvas offcanvas-start" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <Sidebar
            filter={filter}
            setFilter={setFilter}
            setCategoryId={setCategoryId} />
        </div>
        <Navbar
          search={search}
          setSearch={setSearch}
          fetchSearch={fetchSearch}
          setSearchList={setSearchList} />

        <Routes>
          <Route path="/" element={
            <Home
              filter={filter}
              categoryId={categoryId} />}
          />
          <Route path="/search" element={<Search setSearch={setSearch} />} />
          <Route path="/watch/:channelId/:videoId" element={<Watch />} />
          <Route path="/Channel/:channelId" element={<Channel />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;